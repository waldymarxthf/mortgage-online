import { ActiveFieldContext } from "~context/active-field-context";
import { CurrencyIcon } from "~shared/icons/currency-icon";
import { FIELD } from "~utils/constants-field";
import { TextField } from "~shared/text-field";
import { useContext } from "react";
import { useFormikContext } from "formik";

export function PropertyCostInput() {
  const { values, setFieldValue, errors } = useFormikContext<{ propertyCost: number }>();
  const { setActiveField } = useContext(ActiveFieldContext);

  const handleChange = (value: number) => {
    setFieldValue(FIELD.PROPERTY_COST, value);
    setActiveField(FIELD.DEADLINE);
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
