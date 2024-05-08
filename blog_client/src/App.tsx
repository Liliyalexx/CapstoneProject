import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Home/>} />
      <Route path = "/about" element={<About/>} />
      <Route path = "/dashboard" element={<Dashboard/>} />
      <Route path = "/signIn" element={<SignIn/>} />
      <Route path = "/signUp" element={<SignUp/>} />
      <Route path = "/projects" element={<Projects/>} />
 
     


    </Routes>

    </BrowserRouter>
  )
}

