// App.jsx
import React, { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check if user is already logged in when the app loads
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (username, password) => {
    // This is a simple mock authentication
    // In a real app, you would validate against a backend
    if (username && password) {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App