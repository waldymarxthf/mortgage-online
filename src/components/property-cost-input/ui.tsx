import { ActiveFieldContext } from "~context/active-field-context";
import { CurrencyIcon } from "~shared/icons/currency-icon";
import { TextField } from "~shared/text-field";
import { useContext } from "react";
import { useFormikContext } from "formik";

export function PropertyCostInput() {
  const { values, setFieldValue, errors } = useFormikContext<{ propertyCost: number }>();
  const { setActiveField } = useContext(ActiveFieldContext);

  const handleChange = (value: number) => {
    setFieldValue("propertyCost", value);
    setActiveField("deadline");
  };

  return (
    <div>
      <TextField
        error={errors.propertyCost}
        label="Стоимость недвижимости"
        placeholder="Введите сумму"
        rightSection={<CurrencyIcon />}
        value={values.propertyCost}
        onChange={handleChange}
      />
    </div>
  );
}
