import { calculateDeadline, calculateMonthlyPayment } from "~utils/calculate-monthly-payment";
import { useContext, useEffect, useState } from "react";
import { ActiveFieldContext } from "~context/active-field-context";
import { Alert } from "~shared/alert";
import { CurrencyIcon } from "~shared/icons";
import { InputWithRange } from "~shared/input-with-range";
import { MyFormValues } from "~pages/mortgage-calculator/ui";
import { useFormikContext } from "formik";

const MAX_PAYMENT = 51130;
const MIN_PAYMENT = 2654;
const MARKS = ["2,654 ₪", "51,130 ₪"];

export function MonthlyPaymentInput() {
  const [isInputActive, setInputActive] = useState(false);
  const { values, errors, setFieldValue } = useFormikContext<MyFormValues>();
  const { activeField, setActiveField } = useContext(ActiveFieldContext);

  const handleChange = (value: number) => {
    setFieldValue("monthlyPayment", value);
    setActiveField("monthlyPayment");
  };

  const handleFocus = () => {
    setInputActive(true);
  };

  const handleBlur = () => {
    setInputActive(false);
  };

  /**
   * Функционал который меняет значение либо ежемесячного платежа либо срока ипотеки
   * 1. функция высчитывания ежемесячного платежа через формулу
   * 2. та же самая функция только немного перевернутая которая из ежемесячного платежа высчитывает срок
   * 3. также есть проверка на NaN, чтобы не было ошибок
   */

  useEffect(() => {
    if (activeField === "monthlyPayment") {
      const deadline = calculateDeadline(
        values.monthlyPayment,
        values.propertyCost,
        values.initialPayment,
      );
      if (!Number.isNaN(deadline)) {
        setFieldValue("deadline", deadline);
      }
    } else {
      const monthlyPayment = calculateMonthlyPayment(
        values.propertyCost,
        values.initialPayment,
        values.deadline,
      );
      if (!Number.isNaN(monthlyPayment)) {
        setFieldValue("monthlyPayment", monthlyPayment);
      }
    }
  }, [values, activeField, setFieldValue]);

  return (
    <div>
      <InputWithRange
        error={errors.monthlyPayment}
        label="Ежемесячный платеж"
        marks={MARKS}
        max={MAX_PAYMENT}
        min={MIN_PAYMENT}
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
