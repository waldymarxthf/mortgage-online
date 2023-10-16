import { Autocomplete } from "~shared/autocomplete";
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
    setFieldValue("cityPurchase", value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const cityName = await getLocation(lat, lon);

        if (!values.cityPurchase) {
          setFieldValue("cityPurchase", cityName);
        }
      });
    }
  }, [setFieldValue, values.cityPurchase]);

  return (
    <Autocomplete
      data={cities}
      error={touched.cityPurchase && errors.cityPurchase}
      fieldName="cityPurchase"
      handleBlur={() => setFieldTouched("cityPurchase", true)}
      label="Город покупки недвижимости"
      leftSection={<MagnifyingGlassIcon />}
      placeholder="Поиск..."
      value={values.cityPurchase}
      onChange={handleChange}
    />
  );
}
