const MONTHS_IN_YEAR = 12;
const PERCENT_TO_DECIMAL = 100;
const ANNUAL_RATE = 5;

/**
 * Формула для расчета ежемесячного платежа
 *
 * @param {number} propertyCost - Стоимость недвижимости
 * @param {number} initialPayment - Сумма первоначального взноса
 * @param {number} deadlineInYears - Срок ипотеки
 * @return {number} - сумму ежемесячного платежа
 */

export function calculateMonthlyPayment(
  propertyCost: number,
  initialPayment: number,
  deadlineInYears: number,
) {
  if (deadlineInYears <= 0 || propertyCost <= 0 || ANNUAL_RATE <= 0) {
    return 0;
  }

  if (initialPayment >= propertyCost) {
    return 0;
  }

  const remainingLoanAmount = propertyCost - initialPayment;
  const monthlyInterestRate = ANNUAL_RATE / MONTHS_IN_YEAR / PERCENT_TO_DECIMAL;
  const loanDurationInMonths = deadlineInYears * MONTHS_IN_YEAR;

  const monthlyPayment =
    remainingLoanAmount *
    (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanDurationInMonths)));
  return Math.trunc(monthlyPayment);
}

/**
 * Формула для расчета срока ипотеки
 *
 * @param {number} monthlyPayment - Сумма ежемесячного платежа
 * @param {number} propertyCost - Стоимость недвижимости
 * @param {number} initialPayment - Сумма первоначального взноса
 * @return {number} - Срок ипотеки
 */

export function calculateDeadline(
  monthlyPayment: number,
  propertyCost: number,
  initialPayment: number,
) {
  if (monthlyPayment <= 0 || propertyCost <= 0 || ANNUAL_RATE <= 0) {
    return 0;
  }

  const remainingLoanAmount = propertyCost - initialPayment;
  const monthlyInterestRate = ANNUAL_RATE / MONTHS_IN_YEAR / PERCENT_TO_DECIMAL;

  const loanDurationInMonths =
    Math.log(monthlyPayment / (monthlyPayment - monthlyInterestRate * remainingLoanAmount)) /
    Math.log(1 + monthlyInterestRate);

  const deadlineInYears = loanDurationInMonths / MONTHS_IN_YEAR;
  return Math.trunc(deadlineInYears);
}
