import { Dropdown } from "~shared/dropdown";
import { period } from "./constants";
import { useFormikContext } from "formik";

export function MortgagePeriodDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    mortgagePeriod: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue("mortgagePeriod", value);
  };

  return (
    <div>
      <Dropdown
        data={period}
        error={touched.mortgagePeriod && errors.mortgagePeriod}
        fieldName="mortgagePeriod"
        handleBlur={() => setFieldTouched("mortgagePeriod", true, false)}
        label="Когда вы планируете оформить ипотеку?"
        placeholder="Выберите период"
        value={values.mortgagePeriod}
        onChange={handleChange}
      />
    </div>
  );
}
