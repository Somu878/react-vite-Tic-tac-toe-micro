import './App.css'
import Quote from './quotes/Quote'
import Game from './game/game'
import { PrimeReactProvider } from 'primereact/api'; 
function App() {

  return (
    <>
      <Quote/>
  
      <PrimeReactProvider>
      <Game/>
      </PrimeReactProvider>
    </>
  )
}

export default App
