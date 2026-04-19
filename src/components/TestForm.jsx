import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'

export default function TestForm({ onSuccess }) {
  const plans = [
    { name: 'One Day Free Visit', price: 'Free', period: '1 day' },
    { name: 'BASIC', price: '1,999', period: '1 month' },
    { name: 'PRO', price: '7,999', period: '6 month' },
    { name: 'ELITE', price: '11,999', period: '1 year' }
  ]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    goal: '',
    plan: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  // Indian phone number validation regex (10 digits, starting with 6-9)
  const isValidIndianPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  // Check if name contains only letters and spaces
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]*$/
    return nameRegex.test(name)
  }

  // Check if phone already exists in database
  const checkPhoneExists = async (phone) => {
    try {
      const q = query(collection(db, 'gym_leads'), where('phone', '==', phone))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty
    } catch (error) {
      console.error('Error checking phone:', error)
      return false
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    // Only allow letters and spaces
    if (isValidName(value) || value === '') {
      setFormData(prev => ({
        ...prev,
        name: value
      }))
    }
  }

  const handlePhoneChange = async (e) => {
    const value = e.target.value
    // Only allow numbers
    const numbersOnly = value.replace(/\D/g, '')
    
    setFormData(prev => ({
      ...prev,
      phone: numbersOnly
    }))

    // Check phone format and database
    if (numbersOnly.length === 10) {
      if (!isValidIndianPhone(numbersOnly)) {
        setPhoneError('❌ Invalid Indian phone number format')
      } else {
        const exists = await checkPhoneExists(numbersOnly)
        if (exists) {
          setPhoneError('❌ Phone number already exists')
        } else {
          setPhoneError('')
        }
      }
    } else if (numbersOnly.length > 0) {
      setPhoneError('❌ Phone number must be 10 digits')
    } else {
      setPhoneError('')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAutoScroll = (e) => {
    // Scroll element into view with smooth behavior
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.gender || !formData.goal || !formData.plan) {
      setMessage('❌ Please fill all fields')
      setLoading(false)
      return
    }

    // Validate phone format
    if (!isValidIndianPhone(formData.phone)) {
      setMessage('❌ Please enter a valid Indian phone number')
      setLoading(false)
      return
    }

    // Validate name
    if (!isValidName(formData.name)) {
      setMessage('❌ Name should contain only letters and spaces')
      setLoading(false)
      return
    }

    // Check if phone exists before submission
    const phoneExists = await checkPhoneExists(formData.phone)
    if (phoneExists) {
      setMessage('❌ Phone number already exists')
      setLoading(false)
      return
    }

    try {
      // Save to Firestore
      await addDoc(collection(db, 'gym_leads'), {
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        goal: formData.goal,
        plan: formData.plan,
        status: 'Not Talked',
        timestamp: serverTimestamp()
      })
      
      console.log('Form Data:', formData)
      setMessage('✅ Thank you for choosing us! Our team will contact you soon.')
      setFormData({ name: '', phone: '', gender: '', goal: '', plan: '' })
      setPhoneError('')
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: '20px',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            onFocus={handleAutoScroll}
            placeholder="Enter your name"
            disabled={loading}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#0a0e27',
              border: '1px solid #34d5ff',
              color: '#fff',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onFocus={handleAutoScroll}
            placeholder="Enter your phone no"
            disabled={loading}
            maxLength="10"
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#0a0e27',
              border: phoneError ? '1px solid #ff274f' : '1px solid #34d5ff',
              color: '#fff',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {phoneError && (
            <div style={{
              color: '#ff274f',
              fontSize: '12px',
              marginTop: '5px'
            }}>
              {phoneError}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Gender:</label>
          <div style={{ display: 'flex', gap: '20px' }} onFocus={handleAutoScroll}>
            {['Male', 'Female', 'Other'].map((option) => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  disabled={loading}
                  onFocus={handleAutoScroll}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Goal:</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            onFocus={handleAutoScroll}
            disabled={loading}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#0a0e27',
              border: '1px solid #34d5ff',
              color: '#fff',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select your goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle">Muscle Building</option>
            <option value="Strength">Strength Training</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ff274f', fontWeight: 'bold' }}>
            Membership Plan: <span style={{ color: '#ff274f' }}>*</span>
          </label>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            onFocus={handleAutoScroll}
            disabled={loading}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#0a0e27',
              border: '1px solid #34d5ff',
              color: '#fff',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select membership plan</option>
            {plans.map((plan, index) => (
              <option key={index} value={`${plan.name} - ₹${plan.price}/${plan.period}`}>
                {plan.name} - ₹{plan.price}/{plan.period}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          onFocus={handleAutoScroll}
          disabled={loading || phoneError !== '' || !formData.name.trim() || !formData.phone || !formData.gender || !formData.goal || !formData.plan}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: (loading || phoneError !== '' || !formData.name.trim() || !formData.phone || !formData.gender || !formData.goal || !formData.plan) ? '#666' : '#ff274f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: (loading || phoneError !== '' || !formData.name.trim() || !formData.phone || !formData.gender || !formData.goal || !formData.plan) ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('✅') ? '#0a6ba0' : '#6b0a0a',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
    </div>
  )
}
