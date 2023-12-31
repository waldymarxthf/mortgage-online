import { useContext, useEffect, useState } from "react";
import { ActiveFieldContext } from "~context/active-field-context";
import { Alert } from "~shared/alert";
import { CurrencyIcon } from "~shared/icons";
import { FIELD } from "~utils/constants-field";
import { InitialPaymentHint } from "~components/initial-payment-hint";
import { InputWithRange } from "~shared/input-with-range";
import { useFormikContext } from "formik";

export function InitialPaymentInput() {
  const [isInputActive, setInputActive] = useState(false);
  const { setActiveField } = useContext(ActiveFieldContext);

  const { values, setFieldValue, errors } = useFormikContext<{
    initialPayment: number;
    propertyCost: number;
  }>();

  // Проверка, чтобы первоначальный взнос не превышал стоимость недвижимости
  useEffect(() => {
    if (values.initialPayment > values.propertyCost) {
      setFieldValue(FIELD.INITIAL_PAYMENT, values.propertyCost);
    }
  }, [values.propertyCost, values.initialPayment, setFieldValue]);

  const handleChange = (value: number) => {
    setFieldValue(FIELD.INITIAL_PAYMENT, value);
    setActiveField(FIELD.DEADLINE);
  };

  const handleFocus = () => {
    setInputActive(true);
  };

  const handleBlur = () => {
    setInputActive(false);
  };

  /**
   * Функционал форматирования суммы и высчитывания процентов
   * 1. Записывает число через запятую 1,000,000
   * 2. Высчитывает кол-во процентов от стоимости недвижимости
   */

  const amountFinanced = parseInt(String(values.initialPayment), 10).toLocaleString("en-US");
  const percentFinanced = Math.trunc((values.initialPayment / values.propertyCost) * 100);

  return (
    <div>
      <InputWithRange
        error={errors.initialPayment}
        hint={<InitialPaymentHint />}
        label="Первоначальный взнос"
        max={values.propertyCost}
        min={0}
        placeholder="Введите сумму"
        rightSection={<CurrencyIcon />}
        value={values.initialPayment}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <Alert isVisible={isInputActive}>
        <p>Сумма финансирования: {amountFinanced} ₪</p>
        <p>Процент финансирования: {percentFinanced} %</p>
      </Alert>
    </div>
  );
}
