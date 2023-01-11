import { LanguageContextType } from '../../../types'
import useLanguageSelector from '../../hooks/useLanguageSelector'
import { useState } from 'react'
import styled from 'styled-components'
import LanguageSelector from './LanguageSelector'
import NavigationButton from './NavigationButton'

const ControlBarContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.main}
`

const ButtonsContainer = styled.div`
  ${(props) => props.theme.components.containers.controlBar.buttons}
`

const ControlBar = () => {
  const { languageChoices, defaultLanguage }: LanguageContextType =
    useLanguageSelector()

  const [selectedView, setSelectedView] = useState<string | undefined>(
    undefined
  )

  const setView = (viewName: string) => {
    setSelectedView(viewName)
  }

  return (
    <ControlBarContainer>
      <ButtonsContainer>
        <NavigationButton
          linkTo='/'
          text='City bike app'
          isSelected={false}
          setView={setView}
        />
        <NavigationButton
          linkTo='/stations'
          text='Stations'
          isSelected={selectedView === 'Stations'}
          setView={setView}
        />
        <NavigationButton
          linkTo='/journeys'
          text='Journeys'
          isSelected={selectedView === 'Journeys'}
          setView={setView}
        />
      </ButtonsContainer>
      <LanguageSelector
        values={languageChoices}
        defaultValue={defaultLanguage}
      />
    </ControlBarContainer>
  )
}

export default ControlBar
