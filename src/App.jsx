import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quote from './quotes/Quote'
import Game from './game/game'
function App() {

  return (
    <>
      <Quote/>
      <Game/>
    </>
  )
}

export default App
