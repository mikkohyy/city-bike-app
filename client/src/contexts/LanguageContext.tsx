import { LanguageContextType, Language } from '../../types'
import { createContext, ReactNode, useState } from 'react'

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

const stationNameKeys: { [keyName: string]: string } = {
  Finnish: 'nameInFinnish',
  Swedish: 'nameInSwedish',
  English: 'nameInEnglish',
}

const stationAddressKeys: { [keyName: string]: string } = {
  Finnish: 'addressInFinnish',
  Swedish: 'addressInSwedish',
  English: 'addressInFinnish',
}

const cityNameKeys: { [keyName: string]: string } = {
  Finnish: 'cityInFinnish',
  Swedish: 'cityInSwedish',
  English: 'cityInFinnish',
}

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const languageChoices: Language[] = ['Finnish', 'Swedish', 'English']
  const defaultLanguage: Language = languageChoices[0]
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Finnish')
  const [stationNameKey, setStationNameKey] = useState<string>('nameInFinnish')
  const [stationAddressKeyName, setStationAddressKeyName] =
    useState<string>('addressInFinnish')
  const [cityNameKey, setCityNameKey] = useState<string>('cityInFinnish')

  const setLanguage = (language: Language) => {
    setSelectedLanguage(language)
    setStationNameKey(stationNameKeys[language])
    setStationAddressKeyName(stationAddressKeys[language])
    setCityNameKey(cityNameKeys[language])
  }

  return (
    <LanguageContext.Provider
      value={{
        languageChoices,
        selectedLanguage,
        stationNameKey,
<<<<<<< HEAD
        stationAddressKeyName,
=======
        stationAddressKey,
>>>>>>> 8d950cd183c18013ffd4704826add2b05cf64456
        cityNameKey,
        setLanguage,
        defaultLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageContextProvider }
