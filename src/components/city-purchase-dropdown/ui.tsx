import { Autocomplete } from "~shared/autocomplete";
import { FIELD } from "~utils/constants-field";
import { MagnifyingGlassIcon } from "~shared/icons/magnifying-glass-icon";
import { cities } from "./constants";
import { getLocation } from "~api/getLocation";
import { useEffect } from "react";
import { useFormikContext } from "formik";

export function CityPurchaseDropdown() {
  const { setFieldValue, errors, touched, setFieldTouched, values } = useFormikContext<{
    cityPurchase: string;
  }>();

  const handleChange = (value: string) => {
    setFieldValue(FIELD.CITY_PURCHASE, value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const cityName = await getLocation(lat, lon);

        if (!values.cityPurchase) {
          setFieldValue(FIELD.CITY_PURCHASE, cityName);
        }
      });
    }
  }, [setFieldValue, values.cityPurchase]);

  return (
    <Autocomplete
      data={cities}
      error={touched.cityPurchase && errors.cityPurchase}
      fieldName={FIELD.CITY_PURCHASE}
      handleBlur={() => setFieldTouched(FIELD.CITY_PURCHASE, true)}
      label="Город покупки недвижимости"
      leftSection={<MagnifyingGlassIcon />}
      placeholder="Поиск..."
      value={values.cityPurchase}
      onChange={handleChange}
    />
  );
}
