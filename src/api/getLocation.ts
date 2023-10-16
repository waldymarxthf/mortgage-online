export async function getLocation(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();

    return data.address?.city || data.address?.town || "Неизвестный город";
  } catch (error) {
    return "Неизвестный город";
  }
}
