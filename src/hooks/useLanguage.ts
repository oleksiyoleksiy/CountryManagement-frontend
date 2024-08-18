import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import uk from '../lang/uk'
import en from '../lang/en'
import de from '../lang/de'
import { Localization } from '../lang/types'
import cs from '../lang/cs'
import es from '../lang/es'
import pl from '../lang/pl'

const languages: Record<string, Localization> = {
  uk: uk,
  en: en,
  de: de,
  cs: cs,
  es: es,
  pl: pl
}

export const availableLanguages: Array<Object> = [
  {
    label: 'українська',
    value: 'uk',
  },
  {
    label: 'english',
    value: 'en',
  },
  {
    label: 'deutsch',
    value: 'de',
  },
  {
    label: 'polski',
    value: 'pl',
  },
  {
    label: 'español',
    value: 'es',
  },
  {
    label: 'čeština',
    value: 'cs',
  },
]

const useLanguage = (): Localization => {
  const selectedLanguage = useSelector((state: any) => state.auth.language)
  const selectedStorageLanguage = localStorage.getItem('lang') ?? 'en'

  return languages[selectedLanguage] ?? languages[selectedStorageLanguage]
}

export default useLanguage
