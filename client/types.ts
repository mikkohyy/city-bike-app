export type LanguageContextType = {
  languageChoices: Language[]
  selectedLanguage: Language
  stationNameKey: string
  stationAddressKey: string
  cityNameKey: string
  setLanguage(language: string): void
  defaultLanguage: Language
}

export type Language = 'Finnish' | 'Swedish' | 'English'
