import TestForm from './TestForm'

export default function FormModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#0a0e27',
          borderRadius: '12px',
          border: '2px solid #ff274f',
          boxShadow: '0 0 30px rgba(255, 39, 79, 0.3)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#ff274f',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#34d5ff'
            e.target.style.color = '#0a0e27'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ff274f'
            e.target.style.color = '#fff'
          }}
        >
          ✕
        </button>

        <div style={{ padding: '40px 20px 20px' }}>
          <h2 style={{ textAlign: 'center', color: '#34d5ff', marginBottom: '20px' }}>
            JOIN NOW
          </h2>
          <TestForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  )
}
