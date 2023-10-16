import { Dropdown } from "~shared/dropdown";
import { propertyType } from "./constants";
import { useFormikContext } from "formik";

export function PropertyTypeDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    propertyType: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue("propertyType", value);
  };

  return (
    <div>
      <Dropdown
        data={propertyType}
        error={touched.propertyType && errors.propertyType}
        fieldName="propertyType"
        handleBlur={() => setFieldTouched("propertyType", true, false)}
        label="Тип недвижимости"
        placeholder="Выберите тип недвижимости"
        value={values.propertyType}
        onChange={handleChange}
      />
    </div>
  );
}
