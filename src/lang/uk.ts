import { Localization } from './types'

const uk: Localization = {
  register: {
    title: 'Реєстрація',
    form: {
      inputs: {
        name: "Ім'я",
        email: 'Електронна пошта',
        password: 'Пароль',
        passwordConfirmation: 'Підтвердження паролю',
      },
      submitButton: 'Зареєструватись',
    },
    placeholder: {
      text: 'Маєте обліковий запис? Увійдіть, щоб користуватись нашим сервісом.',
      link: 'Увійти',
    },
  },
  login: {
    title: 'Вхід',
    form: {
      inputs: {
        email: 'Електронна пошта',
        password: 'Пароль',
      },
      submitButton: 'Увійти',
    },
    placeholder: {
      text: 'Немаєте облікового запису? Створіть новий, щоб користуватись нашим сервісом.',
      link: 'Зареєструватись',
    },
  },
  selectCountry: {
    title: 'Оберіть країну',
  },
  createCountry: {
    title: 'Створення країни',
    form: {
      inputs: {
        name: 'Назва',
      },
      submitButton: 'Створити',
    },
    hint: 'Назва країни повинна починатись з великої літери (тільки перша літера у верхньому регістрі) і містити тільки букви латинського алфавіту, принаймні 3 символи',
  },
  modal: {
    deleteMessage: 'Видалити країну',
  },
  building: {
    hint: 'Тут будуть відображатися придбані вами будівлі. Настав час придбати свою першу будівлю!',
  },
  productDashboard: {
    title: 'Гарячі новинки',
    showAll: 'Показати все',
  },
  general: {
    minute: 'хв',
    perUnit: 'за одиницю',
    soldBy: 'продавець',
    availableFossils: 'доступні копалини'
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Кількість',
      },
      total: 'Сума',
      submitButton: 'Купити',
    },
  },
  createProduct: {
    title: 'Створення товару',
    form: {
      inputs: {
        type: 'Тип',
        fossil: 'Копалина',
        count: 'Кількість',
        price: 'Ціна за одиницю',
      },
      total: 'Сума',
      submitButton: 'Купити',
    },
  },
  toolbar: {
    filter: 'Фільтрувати',
  },
  editProduct: {
    title: 'Редагування',
    form: {
      inputs: {
        count: 'Кількість',
        price: 'Ціна за одиницю',
      },
      submitButton: 'Оновити',
    },
  },
  settings: {
    title: 'Налаштування',
    form: {
      inputs: {
        language: 'Мова',
      },
    },
  },
}

export default uk
