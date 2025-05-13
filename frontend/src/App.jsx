// App.jsx
import React, { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  // Check if user is already logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} user={user} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App