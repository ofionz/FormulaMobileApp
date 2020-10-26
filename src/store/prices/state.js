export default function() {
  return {
    prices: [
      {
        name: "Акции",

        type: 'promotion',
        tariffs: [
          {
            imageURL:
              "https://formula.as/local/templates/formula_2018/images/iphone.png",
            imageDescription: "Описание 1 "
          },
          {
            imageURL:
              "https://avatars.mds.yandex.net/get-altay/216588/2a0000015b16baebafc912af2dcbd328beff/XXL",
            imageDescription: "Описание"
          },
          {
            imageURL:
              "https://formula.as/upload/iblock/82f/82f797175d84607f7de75fcaa05e8266.png",
            imageDescription: "Описание"
          }
        ]
      },
      {
        name: "Категория B",
        type: 'regular',
        tariffs: [
          {
            id: '1',
            price: "15 900₽",
            name: "Акционный",
            fullName: '«В» Акционный',
            shortDescriptionRows: [
              "56 часов практики",
              "1 бесплатный внутр. экзамен"
            ],
            detailDescriptionRows: [
              { name: "Теория", value: "136 ч" },
              { name: "Вождение", value: "56 ч" },
              { name: "Трансфер во время экзамена", value: "бесплатно" },
              { name: "Пересдача внутр. экзамена", value: "бесплатно" },
              { name: "Доп. вождение", value: "25% скидка" },
              {
                name: "Рассрочка на период обучения (без банка)",
                value: "без %"
              },
              { name: "Первоначальный взнос", value: "от 1000 руб" }
            ]
          },
          {
            id: '2',
            price: "1 500₽",
            shortDescriptionRows: [
              "0 часов практики",
              "0 бесплатный внутр. экзамен"
            ],
            name: "Бюджетный",
            fullName: '«В» Бюджетный',
            detailDescriptionRows: [
              { name: "Теория", value: "1 ч" },
              { name: "Вождение", value: "1 ч" },
              {
                name: "Рассрочка на период обучения (без банка)",
                value: "без %"
              },
              { name: "Первоначальный взнос", value: "от 10 000 руб" }
            ]
          },
          {
            id: '3',
            shortDescriptionRows: ["0 часов практики", "Права без экзамена"],
            price: "350 000₽",
            name: "Люкс",
            fullName: '«В» Люкс',
            detailDescriptionRows: [
              { name: "Теория", value: "336 ч" },
              { name: "Вождение", value: "560 ч" },
              { name: "Трансфер во время экзамена", value: "бесплатно" },
              { name: "Пересдача внутр. экзамена", value: "бесплатно" },
              { name: "Трансфер во время экзамена", value: "бесплатно" },
              { name: "Пересдача внутр. экзамена", value: "бесплатно" },
              { name: "Доп. вождение", value: "125% скидка" },

              { name: "Первоначальный взнос", value: "от 100 000 руб" }
            ]
          }
        ]
      }
    ]
  };
}
