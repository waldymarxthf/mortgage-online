/**
 * Конвертация значения инпута в число
 * @param {string} value - Значение инпута
 * @return {number} конвертированное значение
 */

export function convertInputToNumber(value: string) {
  const numericValue = value.replace(/[^0-9]/g, "");
  return isNaN(parseInt(numericValue, 10)) ? 0 : parseInt(numericValue, 10);
}
