export interface Inputs {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  count?: string
  price?: string
  type?: string
  fossil?: string
  language?: string
}

export interface Form {
  inputs: Inputs
  submitButton?: string
  total?: string
}

export interface Placeholder {
  text: string
  link: string
}

export interface General {
  minute: string
  perUnit: string
  soldBy: string
  availableFossils: string
}

export interface Modal {
  deleteMessage: string
}

export interface ProductDashboard {
  title: string
  showAll: string
}

export interface CreateProduct {
  title: string
  form: Form
}

export interface Toolbar {
  filter: string
}
export interface EditProduct {
  title: string
  form: Form
}
export interface Settings {
  title: string
  form: Form
}

export interface CreateCountry {
  title: string
  form: Form
  hint: string
}

export interface Localization {
  register?: {
    title: string
    form: Form
    placeholder: Placeholder
  }
  login?: {
    title: string
    form: Form
    placeholder: Placeholder
  }
  selectCountry?: {
    title: string
  }
  createCountry?: CreateCountry
  modal?: Modal
  building?: {
    hint: string
  }
  productDashboard?: ProductDashboard
  general?: General
  productPurchase?: {
    form: Form
  }
  toolbar?: Toolbar
  editProduct?: EditProduct
  createProduct?: CreateProduct
  settings?: Settings
}
