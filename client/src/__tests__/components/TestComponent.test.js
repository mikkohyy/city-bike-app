import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import TestComponent from '../../components/TestComponent'

let button, inputField
const onClickMock = jest.fn()

describe('<TestComponent>', () => {
  beforeEach(() => {
    render(<TestComponent buttonText='Press me' handleClick={onClickMock} />)
    button = screen.getByRole('button', { name: 'Press me' })
    inputField = screen.getByLabelText('A text field', {
      selector: 'input',
    })
  })

  describe('Initial state', () => {
    test('Renders button with expected text', () => {
      expect(button).toBeDefined()
    })

    test('The button is disabled', () => {
      expect(button).toBeDisabled()
    })

    test('Input field is empty', () => {
      expect(inputField.value).toBe('')
    })
  })

  describe('After user actions', () => {
    beforeEach(async () => {
      await userEvent.type(inputField, 'Test text')
    })

    test('Input field has changed', () => {
      expect(inputField.value).toBe('Test text')
    })

    test('The button is not disabled', () => {
      expect(button).not.toBeDisabled()
    })

    test('Function is called when clicked', async () => {
      await userEvent.click(button)
      expect(onClickMock).toBeCalledTimes(1)
    })
  })
})
