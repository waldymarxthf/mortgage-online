import { Dropdown } from "~shared/dropdown";
import { FIELD } from "~utils/constants-field";
import { period } from "./constants";
import { useFormikContext } from "formik";

export function MortgagePeriodDropdown() {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<{
    mortgagePeriod: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue(FIELD.MORTGAGE_PERIOD, value);
  };

  return (
    <div>
      <Dropdown
        data={period}
        error={touched.mortgagePeriod && errors.mortgagePeriod}
        fieldName={FIELD.MORTGAGE_PERIOD}
        handleBlur={() => setFieldTouched(FIELD.MORTGAGE_PERIOD, true)}
        label="Когда вы планируете оформить ипотеку?"
        placeholder="Выберите период"
        value={values.mortgagePeriod}
        onChange={handleChange}
      />
    </div>
  );
}
