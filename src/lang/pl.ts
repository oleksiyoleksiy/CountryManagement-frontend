import { Localization } from './types'

const pl: Localization = {
  register: {
    title: 'Rejestracja',
    form: {
      inputs: {
        name: 'Imię',
        email: 'E-mail',
        password: 'Hasło',
        passwordConfirmation: 'Potwierdź hasło',
      },
      submitButton: 'Zarejestruj się',
    },
    placeholder: {
      text: 'Masz już konto? Zaloguj się, aby korzystać z naszych usług.',
      link: 'Zaloguj się',
    },
  },
  login: {
    title: 'Logowanie',
    form: {
      inputs: {
        email: 'E-mail',
        password: 'Hasło',
      },
      submitButton: 'Zaloguj się',
    },
    placeholder: {
      text: 'Nie masz konta? Stwórz nowe, aby korzystać z naszych usług.',
      link: 'Zarejestruj się',
    },
  },
  selectCountry: {
    title: 'Wybierz kraj',
  },
  createCountry: {
    title: 'Utwórz kraj',
    form: {
      inputs: {
        name: 'Nazwa',
      },
      submitButton: 'Utwórz',
    },
    hint: 'Nazwa kraju powinna zaczynać się od wielkiej litery (tylko pierwsza litera wielka) i zawierać tylko litery łacińskie, co najmniej 3 znaki.',
  },
  modal: {
    deleteMessage: 'Usuń kraj',
  },
  building: {
    hint: 'Tutaj zobaczysz budynki, które kupiłeś. Czas kupić swój pierwszy budynek!',
  },
  productDashboard: {
    title: 'Gorące nowe produkty',
    showAll: 'Pokaż wszystkie',
  },
  general: {
    minute: 'm',
    perUnit: 'za jednostkę',
    soldBy: 'sprzedawany przez',
    availableFossils: 'dostępne skamieniałości',
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Ilość',
      },
      total: 'Razem',
      submitButton: 'Kup',
    },
  },
  createProduct: {
    title: 'Utwórz produkt',
    form: {
      inputs: {
        type: 'Rodzaj',
        fossil: 'Fossyl',
        count: 'Ilość',
        price: 'Cena za jednostkę',
      },
      total: 'Razem',
      submitButton: 'Kup',
    },
  },
  toolbar: {
    filter: 'Filtruj',
  },
  editProduct: {
    title: 'Edycja produktu',
    form: {
      inputs: {
        count: 'Ilość',
        price: 'Cena za jednostkę',
      },
      submitButton: 'Zaktualizuj',
    },
  },
  settings: {
    title: 'Ustawienia',
    form: {
      inputs: {
        language: 'Język',
      },
    },
  },
}

export default pl
