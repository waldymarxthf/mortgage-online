import { calculateDeadline, calculateMonthlyPayment } from "~utils/calculate-monthly-payment";
import { useContext, useEffect, useState } from "react";
import { ActiveFieldContext } from "~context/active-field-context";
import { Alert } from "~shared/alert";
import { CurrencyIcon } from "~shared/icons";
import { FIELD } from "~utils/constants-field";
import { InputWithRange } from "~shared/input-with-range";
import { MyFormValues } from "~pages/mortgage-calculator/ui";
import { useFormikContext } from "formik";

const MAX_PAYMENT = 51130;
const MIN_PAYMENT = 2654;
const MIN_VALUE = 4;
const MAX_VALUE = 30;

/**
 * Функционал который меняет значение либо ежемесячного платежа либо срока ипотеки
 * 1. функция высчитывания ежемесячного платежа через формулу
 * 2. та же самая функция только немного перевернутая которая из ежемесячного платежа высчитывает срок
 * 3. также есть проверка на NaN, чтобы не было ошибок
 */

const updateFieldValues = (
  activeField: string,
  values: MyFormValues,
  setFieldValue: (field: string, value: number) => void,
) => {
  if (activeField === FIELD.MONTHLY_PAYMENT) {
    const deadline = calculateDeadline(
      values.monthlyPayment,
      values.propertyCost,
      values.initialPayment,
    );
    if (!Number.isNaN(deadline)) {
      setFieldValue(FIELD.DEADLINE, deadline);
    }
  } else {
    const monthlyPayment = calculateMonthlyPayment(
      values.propertyCost,
      values.initialPayment,
      values.deadline,
    );
    if (!Number.isNaN(monthlyPayment)) {
      setFieldValue(FIELD.MONTHLY_PAYMENT, monthlyPayment);
    }
  }
};

/**
 * Функционал который высчитывает максимальное или минимальное значение ежемесячного платежа
 */

const updateMinMaxPayments = (
  values: MyFormValues,
  setMaxPayment: (max: number) => void,
  setMinPayment: (min: number) => void,
) => {
  const maxMonthlyPayment = calculateMonthlyPayment(
    values.propertyCost,
    values.initialPayment,
    MIN_VALUE,
  );
  if (!Number.isNaN(maxMonthlyPayment)) {
    setMaxPayment(Math.trunc(maxMonthlyPayment));
  }

  const minMonthlyPayment = calculateMonthlyPayment(
    values.propertyCost,
    values.initialPayment,
    MAX_VALUE,
  );
  if (!Number.isNaN(minMonthlyPayment)) {
    setMinPayment(Math.trunc(minMonthlyPayment));
  }
};

export function MonthlyPaymentInput() {
  const [isInputActive, setInputActive] = useState(false);
  const [maxPayment, setMaxPayment] = useState(MAX_PAYMENT);
  const [minPayment, setMinPayment] = useState(MIN_PAYMENT);
  const { values, errors, setFieldValue } = useFormikContext<MyFormValues>();
  const { activeField, setActiveField } = useContext(ActiveFieldContext);

  const handleChange = (value: number) => {
    setFieldValue(FIELD.MONTHLY_PAYMENT, value);
    setActiveField(FIELD.MONTHLY_PAYMENT);
  };

  const handleFocus = () => {
    setInputActive(true);
  };

  const handleBlur = () => {
    setInputActive(false);
  };

  useEffect(() => {
    updateFieldValues(activeField, values, setFieldValue);
    updateMinMaxPayments(values, setMaxPayment, setMinPayment);
  }, [values, activeField, setFieldValue]);

  useEffect(() => {
    if (MIN_PAYMENT > maxPayment) {
      setMaxPayment(MIN_PAYMENT);
    }
  }, [maxPayment]);

  const formattedMaxMonthlyPayment = parseInt(String(maxPayment), 10).toLocaleString("en-US");
  const formattedMinMonthlyPayment = parseInt(String(minPayment), 10).toLocaleString("en-US");

  return (
    <div>
      <InputWithRange
        error={errors.monthlyPayment}
        label="Ежемесячный платеж"
        marks={[`${formattedMinMonthlyPayment} ₪`, `${formattedMaxMonthlyPayment} ₪`]}
        max={maxPayment}
        min={minPayment}
        placeholder="Введите сумму"
        rightSection={<CurrencyIcon />}
        value={values.monthlyPayment}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <Alert isVisible={isInputActive}>
        <p>Увеличьте ежемесячный платеж и переплачивайте меньше</p>
      </Alert>
    </div>
  );
}
