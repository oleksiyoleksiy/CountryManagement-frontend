import { Localization } from './types'

const de: Localization = {
  register: {
    title: 'Registrierung',
    form: {
      inputs: {
        name: 'Name',
        email: 'E-Mail',
        password: 'Passwort',
        passwordConfirmation: 'Passwort bestätigen',
      },
      submitButton: 'Registrieren',
    },
    placeholder: {
      text: 'Haben Sie bereits ein Konto? Melden Sie sich an, um unseren Service zu nutzen.',
      link: 'Anmelden',
    },
  },
  login: {
    title: 'Anmelden',
    form: {
      inputs: {
        email: 'E-Mail',
        password: 'Passwort',
      },
      submitButton: 'Anmelden',
    },
    placeholder: {
      text: 'Noch kein Konto? Erstellen Sie ein neues, um unseren Service zu nutzen.',
      link: 'Registrieren',
    },
  },
  selectCountry: {
    title: 'Land auswählen',
  },
  createCountry: {
    title: 'Land erstellen',
    form: {
      inputs: {
        name: 'Name',
      },
      submitButton: 'Erstellen',
    },
    hint: 'Der Ländername sollte mit einem Großbuchstaben beginnen (nur der erste Buchstabe groß) und nur lateinische Buchstaben enthalten, mindestens 3 Zeichen.',
  },
  modal: {
    deleteMessage: 'Land löschen',
  },
  building: {
    hint: 'Hier sehen Sie die Gebäude, die Sie gekauft haben. Es ist Zeit, Ihr erstes Gebäude zu kaufen!',
  },
  productDashboard: {
    title: 'Heiße neue Artikel',
    showAll: 'Alle anzeigen',
  },
  general: {
    minute: 'm',
    perUnit: 'pro Einheit',
    soldBy: 'verkauft von',
    availableFossils: 'verfügbare Fossilien',
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Menge',
      },
      total: 'Gesamt',
      submitButton: 'Kaufen',
    },
  },
  createProduct: {
    title: 'Produkt erstellen',
    form: {
      inputs: {
        type: 'Typ',
        fossil: 'Fossil',
        count: 'Menge',
        price: 'Preis pro Einheit',
      },
      total: 'Gesamt',
      submitButton: 'Kaufen',
    },
  },
  toolbar: {
    filter: 'Filter',
  },
  editProduct: {
    title: 'Produkt bearbeiten',
    form: {
      inputs: {
        count: 'Menge',
        price: 'Preis pro Einheit',
      },
      submitButton: 'Aktualisieren',
    },
  },
  settings: {
    title: 'Einstellungen',
    form: {
      inputs: {
        language: 'Sprache',
      },
    },
  },
}

export default de
