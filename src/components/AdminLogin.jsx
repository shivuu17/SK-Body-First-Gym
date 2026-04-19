import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (err) {
      let errorMsg = 'Login failed'
      if (err.code === 'auth/user-not-found') {
        errorMsg = '❌ Invalid credentials'
      } else if (err.code === 'auth/wrong-password') {
        errorMsg = '❌ Invalid credentials'
      } else if (err.code === 'auth/invalid-credential') {
        errorMsg = '❌ Invalid credentials'
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = '❌ Invalid email'
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = '❌ Too many failed attempts. Try again later.'
      } else {
        errorMsg = '❌ Invalid credentials'
      }
      setError(errorMsg)
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0e27',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#1a1f3a',
        border: '2px solid #ff274f',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 0 30px rgba(255, 39, 79, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="/dumbell.png"
            alt="SK Body First Gym"
            style={{ width: '60px', marginBottom: '15px' }}
          />
          <h1 style={{ color: '#34d5ff', marginBottom: '5px' }}>Admin Panel</h1>
          <p style={{ color: '#aaa', fontSize: '14px' }}>SK Body-First-Gym</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#34d5ff',
              fontWeight: 'bold'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              disabled={loading}
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0a0e27',
                border: '2px solid #34d5ff',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff274f'
                e.target.style.boxShadow = '0 0 10px rgba(255, 39, 79, 0.3)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#34d5ff'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#34d5ff',
              fontWeight: 'bold'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 12px',
                  backgroundColor: '#0a0e27',
                  border: '2px solid #34d5ff',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff274f'
                  e.target.style.boxShadow = '0 0 10px rgba(255, 39, 79, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#34d5ff'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#34d5ff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ff274f'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#34d5ff'
                }}
              >
                <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#6b0a0a',
              border: '1px solid #ff274f',
              borderRadius: '6px',
              color: '#ff9999',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || email.length === 0 || password.length === 0}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: (email.length === 0 || password.length === 0) ? '#666' : (loading ? '#999' : '#ff274f'),
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: (email.length === 0 || password.length === 0) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading && email.length > 0 && password.length > 0) {
                e.target.style.backgroundColor = '#ff5577'
                e.target.style.boxShadow = '0 0 20px rgba(255, 39, 79, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && email.length > 0 && password.length > 0) {
                e.target.style.backgroundColor = '#ff274f'
                e.target.style.boxShadow = 'none'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <a href="#/" style={{
          display: 'block',
          textAlign: 'center',
          marginTop: '20px',
          color: '#34d5ff',
          textDecoration: 'none',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#ff274f'}
        onMouseLeave={(e) => e.target.style.color = '#34d5ff'}
        >
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
