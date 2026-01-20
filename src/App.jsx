import { useState } from 'react'
import React from 'react'
import './global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ByteBattleHomepage from './components/ByteBattleHomepage.jsx'
import Login from './components/Login.jsx'
import { ThemeProvider } from './components/ThemeContext.jsx'
import Profile from './components/Profile.jsx'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ByteBattleHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App