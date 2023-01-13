import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

const useLanguageSelector = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguageSelector can only be used inside a LanguageContextProvider'
    )
  }

  return context
}

export default useLanguageSelector
