import { Dropdown } from "~shared/dropdown";
import { FIELD } from "~utils/constants-field";
import { propertyType } from "./constants";
import { useFormikContext } from "formik";

export function PropertyTypeDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    propertyType: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue(FIELD.PROPERTY_TYPE, value);
  };

  return (
    <div>
      <Dropdown
        data={propertyType}
        error={touched.propertyType && errors.propertyType}
        fieldName={FIELD.PROPERTY_TYPE}
        handleBlur={() => setFieldTouched(FIELD.PROPERTY_TYPE, true, false)}
        label="Тип недвижимости"
        placeholder="Выберите тип недвижимости"
        value={values.propertyType}
        onChange={handleChange}
      />
    </div>
  );
}
