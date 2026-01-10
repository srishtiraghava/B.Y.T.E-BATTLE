import { useState } from 'react'
import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ByteBattleHomepage from './components/ByteBattleHomepage.jsx'
import Login from './components/Login.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ByteBattleHomepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App