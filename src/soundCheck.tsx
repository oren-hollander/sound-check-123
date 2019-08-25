import React, { FC, useState, useRef } from 'react'
import { AudioContext, IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context'
import './soundCheck.css'

const loadSoundCheck = async (context: AudioContext): Promise<AudioBuffer> => {
  const response = await fetch('sound-check.mp3')
  const arrayBuffer = await response.arrayBuffer()

  return new Promise<AudioBuffer>((resolve, reject) => {
    context.decodeAudioData(arrayBuffer, resolve, reject)
  })
}

export const SoundCheck: FC = () => {
  const [active, setActive] = useState(false)
  const bufferSource = useRef<IAudioBufferSourceNode<IAudioContext>>()

  const play = async () => {
    setActive(true)
    const context = new AudioContext()

    const source = context.createBufferSource()
    source.buffer = await loadSoundCheck(context)
    source.connect(context.destination)
    source.addEventListener('ended', () => {
      setActive(false)
    })
    bufferSource.current = source
    source.start()
  }

  const stop = () => {
    if (bufferSource.current) {
      bufferSource.current.stop()
      bufferSource.current = undefined
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: 'lightblue',
            fontSize: 24,
            border: '5px solid darkblue',
            borderRadius: '75px'
          }}
          // disabled={!active}
          onClick={active ? stop : play}
        >
          {active ? 'Stop' : 'Play'}
        </button>
      </header>
    </div>
  )
}
