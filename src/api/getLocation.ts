export async function getLocation(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();

    const cityName = data.address?.town || "Неизвестный город";

    return cityName;
  } catch (error) {
    return "Неизвестный город";
  }
}
