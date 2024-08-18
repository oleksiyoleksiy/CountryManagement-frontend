import { Localization } from './types'

const en: Localization = {
  register: {
    title: 'Registration',
    form: {
      inputs: {
        name: 'Name',
        email: 'Email',
        password: 'Password',
        passwordConfirmation: 'Confirm Password',
      },
      submitButton: 'Register',
    },
    placeholder: {
      text: 'Already have an account? Log in to use our service.',
      link: 'Log in',
    },
  },
  login: {
    title: 'Login',
    form: {
      inputs: {
        email: 'Email',
        password: 'Password',
      },
      submitButton: 'Log in',
    },
    placeholder: {
      text: 'Don’t have an account? Create a new one to use our service.',
      link: 'Register',
    },
  },
  selectCountry: {
    title: 'Select Country',
  },
  createCountry: {
    title: 'Create Country',
    form: {
      inputs: {
        name: 'Name',
      },
      submitButton: 'Create',
    },
    hint: 'The country name should start with a capital letter (only the first letter in uppercase) and contain only Latin letters, at least 3 characters',
  },
  modal: {
    deleteMessage: 'Delete Country',
  },
  building: {
    hint: 'Here you will see the buildings you have purchased. It’s time to buy your first building!',
  },
  productDashboard: {
    title: 'Hot New Items',
    showAll: 'Show All',
  },
  general: {
    minute: 'm',
    perUnit: 'per unit',
    soldBy: 'sold by',
    availableFossils: 'available fossils',
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Quantity',
      },
      total: 'Total',
      submitButton: 'Buy',
    },
  },
  createProduct: {
    title: 'Create Product',
    form: {
      inputs: {
        type: 'Type',
        fossil: 'Fossil',
        count: 'Quantity',
        price: 'Price per unit',
      },
      total: 'Total',
      submitButton: 'Buy',
    },
  },
  toolbar: {
    filter: 'Filter',
  },
  editProduct: {
    title: 'Editing product',
    form: {
      inputs: {
        count: 'Quantity',
        price: 'Price per unit',
      },
      submitButton: 'Update',
    },
  },
  settings: {
    title: 'Settings',
    form: {
      inputs: {
        language: 'Language',
      },
    },
  },
}

export default en
