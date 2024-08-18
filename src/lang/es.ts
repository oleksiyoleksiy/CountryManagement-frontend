import { Localization } from './types'

const es: Localization = {
  register: {
    title: 'Registro',
    form: {
      inputs: {
        name: 'Nombre',
        email: 'Correo electrónico',
        password: 'Contraseña',
        passwordConfirmation: 'Confirmar contraseña',
      },
      submitButton: 'Registrarse',
    },
    placeholder: {
      text: '¿Ya tienes una cuenta? Inicia sesión para usar nuestro servicio.',
      link: 'Iniciar sesión',
    },
  },
  login: {
    title: 'Iniciar sesión',
    form: {
      inputs: {
        email: 'Correo electrónico',
        password: 'Contraseña',
      },
      submitButton: 'Iniciar sesión',
    },
    placeholder: {
      text: '¿No tienes una cuenta? Crea una nueva para usar nuestro servicio.',
      link: 'Registrarse',
    },
  },
  selectCountry: {
    title: 'Seleccionar país',
  },
  createCountry: {
    title: 'Crear país',
    form: {
      inputs: {
        name: 'Nombre',
      },
      submitButton: 'Crear',
    },
    hint: 'El nombre del país debe comenzar con una letra mayúscula (solo la primera letra en mayúscula) y contener solo letras latinas, al menos 3 caracteres.',
  },
  modal: {
    deleteMessage: 'Eliminar país',
  },
  building: {
    hint: 'Aquí verás los edificios que has comprado. ¡Es hora de comprar tu primer edificio!',
  },
  productDashboard: {
    title: 'Nuevos productos destacados',
    showAll: 'Mostrar todo',
  },
  general: {
    minute: 'm',
    perUnit: 'por unidad',
    soldBy: 'vendido por',
    availableFossils: 'fósiles disponibles',
  },
  productPurchase: {
    form: {
      inputs: {
        count: 'Cantidad',
      },
      total: 'Total',
      submitButton: 'Comprar',
    },
  },
  createProduct: {
    title: 'Crear producto',
    form: {
      inputs: {
        type: 'Tipo',
        fossil: 'Fósil',
        count: 'Cantidad',
        price: 'Precio por unidad',
      },
      total: 'Total',
      submitButton: 'Comprar',
    },
  },
  toolbar: {
    filter: 'Filtrar',
  },
  editProduct: {
    title: 'Editar producto',
    form: {
      inputs: {
        count: 'Cantidad',
        price: 'Precio por unidad',
      },
      submitButton: 'Actualizar',
    },
  },
  settings: {
    title: 'Configuraciones',
    form: {
      inputs: {
        language: 'Idioma',
      },
    },
  },
}

export default es
