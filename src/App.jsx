import { useState } from 'react'
import React from 'react'
import './global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ByteBattleHomepage from './pages/ByteBattleHomepage.jsx'
import Login from './pages/Login.jsx'
import { ThemeProvider } from './Theme/ThemeContext.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ByteBattleHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App