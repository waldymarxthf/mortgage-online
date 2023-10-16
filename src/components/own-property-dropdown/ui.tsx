import { Dropdown } from "~shared/dropdown";
import { owner } from "./constants";
import { useFormikContext } from "formik";

export function OwnPropertyDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    ownProperty: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue("ownProperty", value);
  };

  return (
    <div>
      <Dropdown
        data={owner}
        error={touched.ownProperty && errors.ownProperty}
        fieldName="ownProperty"
        handleBlur={() => setFieldTouched("ownProperty", true)}
        label="Вы уже владеете недвижимостью?"
        placeholder="Выберите ответ"
        value={values.ownProperty}
        onChange={handleChange}
      />
    </div>
  );
}
