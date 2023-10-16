/**
 * Функция для валидации первоначального взноса
 * @param {number} propertyCost - Стоимость недвижимости
 * @param {number} [value] - Значение для валидации
 * @return {boolean} Возвращает true, если значение валидно
 */

export function validateInitialPayment(propertyCost: number, value?: number) {
  const minInitialPayment = propertyCost * 0.25;

  if (typeof value === "undefined") {
    return false;
  }

  return value >= minInitialPayment;
}
