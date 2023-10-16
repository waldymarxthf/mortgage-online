import { ActiveFieldContext } from "~context/active-field-context";
import { InputWithRange } from "~shared/input-with-range";
import { MyFormValues } from "~pages/mortgage-calculator/ui";
import { useContext } from "react";
import { useFormikContext } from "formik";

export function DeadlineInput() {
  const { values, errors, setFieldValue } = useFormikContext<MyFormValues>();
  const { setActiveField } = useContext(ActiveFieldContext);

  const handleChange = (value: number) => {
    setFieldValue("deadline", value);
    setActiveField("deadline");
  };

  return (
    <div>
      <InputWithRange
        error={errors.deadline}
        label="Cрок"
        marks={["4 года", "30 лет"]}
        max={30}
        min={4}
        placeholder="Введите срок"
        value={values.deadline}
        onChange={handleChange}
      />
    </div>
  );
}
