import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { SoundCheck } from './soundCheck'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(<SoundCheck />, div)
  unmountComponentAtNode(div)
})
