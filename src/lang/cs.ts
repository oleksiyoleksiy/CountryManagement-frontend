import { Localization } from './types'

const cs: Localization = {
  register: {
    title: 'Registrace',
    form: {
      inputs: {
        name: 'Jméno',
        email: 'E-mail',
        password: 'Heslo',
        passwordConfirmation: 'Potvrdit heslo',
      },
      submitButton: 'Registrovat se',
    },
    placeholder: {
      text: 'Už máte účet? Přihlaste se a používejte naše služby.',
      link: 'Přihlásit se',
    },
  },
  login: {
    title: 'Přihlásit se',
    form: {
      inputs: {
        email: 'E-mail',
        password: 'Heslo',
      },
      submitButton: 'Přihlásit se',
    },
    placeholder: {
      text: 'Nemáte účet? Vytvořte si nový a používejte naše služby.',
      link: 'Registrovat se',
    },
  },
  selectCountry: {
    title: 'Vyberte zemi',
  },
  createCountry: {
    title: 'Vytvořit zemi',
    form: {
      inputs: {
        name: 'Jméno',
      },
      submitButton: 'Vytvořit',
    },
    hint: 'Název země by měl začínat velkým písmenem (pouze první písmeno velké) a obsahovat pouze latinská písmena, minimálně 3 znaky.',
  },
  modal: {
    deleteMessage: 'Smazat zemi',
  },
  building: {
    hint: 'Zde uvidíte budovy, které jste zakoupili. Je čas koupit si první budovu!',
  },
  productDashboard: {
    title: 'Žhavé nové položky',
    showAll: 'Zobrazit vše',
  },
  general: {
    minute: 'm',
    perUnit: 'za jednotku',
    soldBy: 'prodává',
    availableFossils: 'dostupné fosilie',
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Množství',
      },
      total: 'Celkem',
      submitButton: 'Koupit',
    },
  },
  createProduct: {
    title: 'Vytvořit produkt',
    form: {
      inputs: {
        type: 'Typ',
        fossil: 'Fosil',
        count: 'Množství',
        price: 'Cena za jednotku',
      },
      total: 'Celkem',
      submitButton: 'Koupit',
    },
  },
  toolbar: {
    filter: 'Filtr',
  },
  editProduct: {
    title: 'Úprava produktu',
    form: {
      inputs: {
        count: 'Množství',
        price: 'Cena za jednotku',
      },
      submitButton: 'Aktualizovat',
    },
  },
  settings: {
    title: 'Nastavení',
    form: {
      inputs: {
        language: 'Jazyk',
      },
    },
  },
}

export default cs
