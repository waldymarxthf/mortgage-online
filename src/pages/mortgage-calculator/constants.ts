import * as Yup from "yup";
import { MyFormValues } from "./ui";
import { cities } from "~components/city-purchase-dropdown/constants";
import { validateInitialPayment } from "~utils/validate-initial-payment";

export const initialValues: MyFormValues = {
  propertyCost: 1000000,
  cityPurchase: "",
  mortgagePeriod: "",
  propertyType: "",
  ownProperty: "",
  initialPayment: 500000,
  deadline: 30,
  monthlyPayment: 2654,
};

export const validationSchema = Yup.object().shape({
  propertyCost: Yup.number()
    .max(10000000, "Стоимость недвижимости не может превышать 10,000,000")
    .required("Обязательно для заполнения"),
  cityPurchase: Yup.string()
    .defined()
    .test("is-city-in-list", "Введенный город не существует", function (value) {
      return cities.includes(value);
    })
    .required("Выберите ответ"),
  mortgagePeriod: Yup.string().required("Выберите ответ"),
  initialPayment: Yup.number()
    .test(
      "initial-payment-percentage",
      "Сумма первоначального взноса меньше 25% от стоимости недвижимости",
      function (value) {
        const propertyCost: number = this.parent.propertyCost || 0;
        return validateInitialPayment(propertyCost, value);
      },
    )
    .required("Обязательно для заполнения"),
  propertyType: Yup.string().required("Выберите ответ"),
  ownProperty: Yup.string().required("Выберите ответ"),
  deadline: Yup.number()
    .min(4, "Cрок ипотеки не может быть меньше 4 года")
    .max(30, "Cрок ипотеки не может превышать 30 лет")
    .required("Обязательно для заполнения"),
  monthlyPayment: Yup.number()
    .min(
      2654,
      "Размер ежемесячного платежа не может быть меньше 2,654 иначе срок будет больше 30 лет",
    )
    .required("Обязательно для заполнения"),
});
