
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './component/Home'
import View from './component/View'

function App() {
  

  return (
    <>
      <Routes>
			<Route path="/" element={<Home />} />
			<Route path='/View' element={<View />}/>
      </Routes>
    </>
  )
}

export default App
