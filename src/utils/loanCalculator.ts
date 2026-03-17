export type RepaymentType = 'period' | 'amount';

export interface LoanInput {
  balance: number; // 借入残高（万円）
  annualRate: number; // 年利（%）
  remainingYears: number; // 残り返済年数
  prepayment: number; // 繰り上げ返済額（万円）
  repaymentType: RepaymentType;
}

export interface MonthlyData {
  month: number;
  balanceWithout: number;
  balanceWith: number;
}

export interface LoanResult {
  // 繰り上げなし
  withoutMonthlyPayment: number;
  withoutTotalPayment: number;
  withoutTotalInterest: number;
  withoutMonths: number;
  // 繰り上げあり
  withMonthlyPayment: number;
  withTotalPayment: number;
  withTotalInterest: number;
  withMonths: number;
  // 差分
  savedAmount: number;
  savedMonths: number;
  // グラフ用データ
  chartData: MonthlyData[];
}

function calcMonthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function generateBalanceHistory(
  principal: number,
  monthlyRate: number,
  monthlyPayment: number,
  maxMonths: number
): number[] {
  const history: number[] = [principal];
  let balance = principal;
  for (let i = 0; i < maxMonths; i++) {
    const interest = balance * monthlyRate;
    balance = balance - (monthlyPayment - interest);
    if (balance <= 0) {
      history.push(0);
      break;
    }
    history.push(balance);
  }
  return history;
}

export function calculate(input: LoanInput): LoanResult {
  const { balance, annualRate, remainingYears, prepayment, repaymentType } = input;

  const principal = balance * 10000; // 円換算
  const prepaymentYen = prepayment * 10000;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = remainingYears * 12;

  // ===== 繰り上げなし =====
  const withoutMonthlyPayment = calcMonthlyPayment(principal, monthlyRate, totalMonths);
  const withoutTotalPayment = withoutMonthlyPayment * totalMonths;
  const withoutTotalInterest = withoutTotalPayment - principal;
  const withoutBalances = generateBalanceHistory(principal, monthlyRate, withoutMonthlyPayment, totalMonths);

  // ===== 繰り上げあり =====
  const newPrincipal = principal - prepaymentYen;
  let withMonthlyPayment: number;
  let withTotalMonths: number;
  let withTotalPayment: number;

  if (repaymentType === 'period') {
    // 期間短縮型：月々返済額は変えずに残年数を短縮
    withMonthlyPayment = withoutMonthlyPayment;
    // 新しい元本で何ヶ月で完済できるか逆算
    if (monthlyRate === 0) {
      withTotalMonths = Math.ceil(newPrincipal / withMonthlyPayment);
    } else {
      withTotalMonths = Math.ceil(
        -Math.log(1 - (newPrincipal * monthlyRate) / withMonthlyPayment) / Math.log(1 + monthlyRate)
      );
    }
    withTotalPayment = withMonthlyPayment * withTotalMonths + prepaymentYen;
  } else {
    // 返済額減額型：残年数は変えずに月々返済額を減らす
    withTotalMonths = totalMonths;
    withMonthlyPayment = calcMonthlyPayment(newPrincipal, monthlyRate, totalMonths);
    withTotalPayment = withMonthlyPayment * totalMonths + prepaymentYen;
  }

  const withTotalInterest = withTotalPayment - principal;
  const withBalances = generateBalanceHistory(newPrincipal, monthlyRate, withMonthlyPayment, withTotalMonths);

  const savedAmount = withoutTotalPayment - withTotalPayment;
  const savedMonths = withoutMonths(withoutBalances) - withTotalMonths;

  // グラフ用データ（年ごと）
  const maxMonths = Math.max(withoutBalances.length, withBalances.length);
  const chartData: MonthlyData[] = [];
  for (let m = 0; m < maxMonths; m += 12) {
    const year = m / 12;
    chartData.push({
      month: year,
      balanceWithout: Math.max(0, (withoutBalances[m] ?? 0) / 10000),
      balanceWith: Math.max(0, (withBalances[m] ?? 0) / 10000),
    });
  }

  return {
    withoutMonthlyPayment,
    withoutTotalPayment,
    withoutTotalInterest,
    withoutMonths: totalMonths,
    withMonthlyPayment,
    withTotalPayment,
    withTotalInterest,
    withMonths: withTotalMonths,
    savedAmount,
    savedMonths,
    chartData,
  };
}

function withoutMonths(balances: number[]): number {
  return balances.length - 1;
}
