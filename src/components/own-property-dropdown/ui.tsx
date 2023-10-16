import { Dropdown } from "~shared/dropdown";
import { FIELD } from "~utils/constants-field";
import { owner } from "./constants";
import { useFormikContext } from "formik";

export function OwnPropertyDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    ownProperty: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue(FIELD.OWN_PROPERTY, value);
  };

  return (
    <div>
      <Dropdown
        data={owner}
        error={touched.ownProperty && errors.ownProperty}
        fieldName={FIELD.OWN_PROPERTY}
        handleBlur={() => setFieldTouched(FIELD.OWN_PROPERTY, true)}
        label="Вы уже владеете недвижимостью?"
        placeholder="Выберите ответ"
        value={values.ownProperty}
        onChange={handleChange}
      />
    </div>
  );
}
