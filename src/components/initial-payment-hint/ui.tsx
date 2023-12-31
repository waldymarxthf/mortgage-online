import { Hint } from "~shared/hint/ui";

export function InitialPaymentHint() {
  return (
    <Hint>
      <div className="text-sm">
        <p> Основная квартира: у заемщика нет квартиры ставка финансирования Максимум до 75%</p>
        <br />
        <p>
          Альтернативная квартира: Для заемщика квартира, которую он обязуется продать в течение
          двух лет ставка финансирования Максимум до 70%
        </p>
        <br />
        <p>
          Вторая квартира или выше: у заемщика уже есть ставка финансирования квартиры Максимум до
          50%
        </p>
      </div>
    </Hint>
  );
}
