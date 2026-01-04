import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AddNote from './pages/add_note.jsx'
import EditNote from './pages/edit_note.jsx'
import Register from './pages/Register.jsx'


function app() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new_note" element={<AddNote />} />
            <Route path="/edit_note/:id" element={<EditNote />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default app