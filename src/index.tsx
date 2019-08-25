import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { SoundCheck } from './soundCheck'
import * as serviceWorker from './serviceWorker'

render(<SoundCheck />, document.getElementById('root'))

serviceWorker.unregister()
