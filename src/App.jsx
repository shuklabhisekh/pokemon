import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './components/pages/Login'
import AllRoutes from './components/Routes/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className="App">
      <AllRoutes/>
    </h1>
  )
}

export default App
