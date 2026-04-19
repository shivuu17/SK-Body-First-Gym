import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'

export default function AdminPanel({ onLogout }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState(null)
  const [viewMode, setViewMode] = useState('leads') // 'leads' or 'analytics'
  const statusOptions = ['Not Talked', 'Talked', 'Joined']

  useEffect(() => {
    const q = query(collection(db, 'gym_leads'), orderBy('timestamp', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setLeads(data)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching data:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteDoc(doc(db, 'gym_leads', id))
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'gym_leads', id), {
        status: newStatus,
        statusUpdatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const goalMatch = filter === 'all' || lead.goal === filter
    const statusMatch = statusFilter === 'all' || lead.status === statusFilter
    return goalMatch && statusMatch
  })

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate?.() || new Date(timestamp)
    return date.toLocaleString('en-IN')
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#0a0e27', color: '#fff', minHeight: '100vh' }}>
      <style>
        {`
          @media (max-width: 768px) {
            .admin-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 15px !important;
              margin-bottom: 20px !important;
            }
            .admin-header-content {
              flex-direction: column !important;
              gap: 10px !important;
            }
            .admin-buttons {
              flex-direction: column !important;
              width: 100% !important;
              gap: 8px !important;
            }
            .admin-btn {
              padding: 8px 12px !important;
              font-size: 12px !important;
              flex: 1 !important;
            }
            .filter-section {
              flex-direction: column !important;
              gap: 10px !important;
            }
            .table-container {
              overflow-x: auto !important;
              font-size: 12px !important;
            }
            .table-container table th,
            .table-container table td {
              padding: 8px !important;
            }
            .table-container table th {
              font-size: 11px !important;
            }
            .status-radio {
              gap: 5px !important;
              flex-wrap: wrap !important;
            }
            .status-radio label {
              font-size: 10px !important;
            }
            .status-radio span {
              padding: 2px 6px !important;
              font-size: 10px !important;
            }
            .delete-btn {
              padding: 4px 8px !important;
              font-size: 11px !important;
            }
            @media (max-width: 480px) {
              .admin-btn {
                font-size: 11px !important;
                padding: 6px 8px !important;
              }
              .table-container {
                font-size: 11px !important;
              }
              .table-container table th,
              .table-container table td {
                padding: 6px !important;
              }
            }
          }
        `}
      </style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="admin-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="admin-header-content" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img
              src="/dumbell.png"
              alt="SK Body First Gym"
              style={{ width: '50px', height: '50px' }}
            />
            <div>
              <h1 style={{ color: '#34d5ff', marginBottom: '5px', fontSize: '24px' }}>
                Admin Dashboard
              </h1>
              <p style={{ color: '#aaa', fontSize: '14px' }}>SK Body-First-Gym</p>
            </div>
          </div>
          <div className="admin-buttons" style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setViewMode(viewMode === 'leads' ? 'analytics' : 'leads')}
              className="admin-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: viewMode === 'analytics' ? '#7b8cff' : '#34d5ff',
                color: '#0a0e27',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7b8cff'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = viewMode === 'analytics' ? '#7b8cff' : '#34d5ff'
              }}
            >
              <i className="fas fa-chart-line"></i> Analytics
            </button>
            <button
              onClick={() => setViewMode('leads')}
              className="admin-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: viewMode === 'leads' ? '#7b8cff' : '#34d5ff',
                color: '#0a0e27',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7b8cff'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = viewMode === 'leads' ? '#7b8cff' : '#34d5ff'
              }}
            >
              <i className="fas fa-home"></i> Home
            </button>
            <button
              onClick={onLogout}
              className="admin-btn"
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff274f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff5577'
                e.target.style.boxShadow = '0 0 15px rgba(255, 39, 79, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ff274f'
                e.target.style.boxShadow = 'none'
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {viewMode === 'leads' ? (
          <>
            <div className="filter-section" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <span style={{ marginRight: '10px', color: '#34d5ff', fontSize: '14px' }}>Filter by Goal:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #ff274f',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Leads ({leads.length})</option>
                  <option value="Weight Loss">Weight Loss ({leads.filter(l => l.goal === 'Weight Loss').length})</option>
                  <option value="Muscle">Muscle Building ({leads.filter(l => l.goal === 'Muscle').length})</option>
                  <option value="Strength">Strength Training ({leads.filter(l => l.goal === 'Strength').length})</option>
            </select>
          </div>
              <div>
                <span style={{ marginRight: '10px', color: '#34d5ff', fontSize: '14px' }}>Filter by Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #7b8cff',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Status ({leads.length})</option>
                  <option value="Not Talked">Not Talked ({leads.filter(l => l.status === 'Not Talked').length})</option>
                  <option value="Talked">Talked ({leads.filter(l => l.status === 'Talked').length})</option>
                  <option value="Joined">Joined ({leads.filter(l => l.status === 'Joined').length})</option>
            </select>
          </div>
          <div style={{ color: '#34d5ff', fontSize: '14px' }}>
            <strong>{filteredLeads.length}</strong> records
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#1a1f3a',
            borderRadius: '8px',
            border: '2px dashed #ff274f'
          }}>
            <p>No leads found</p>
          </div>
        ) : (
          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#1a1f3a',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#0a0e27', borderBottom: '2px solid #ff274f' }}>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Name</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Phone</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Gender</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Goal</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Plan</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Date & Time</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#34d5ff',
                    fontWeight: 'bold',
                    borderRight: '1px solid #333'
                  }}>Status</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'center',
                    color: '#34d5ff',
                    fontWeight: 'bold'
                  }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: '1px solid #333',
                      backgroundColor: index % 2 === 0 ? '#1a1f3a' : '#151a2f',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1f2540'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 39, 79, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1a1f3a' : '#151a2f'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <td style={{ padding: '15px', borderRight: '1px solid #333' }}>
                      <strong style={{ color: '#fff' }}>{lead.name}</strong>
                    </td>
                    <td style={{ padding: '15px', borderRight: '1px solid #333' }}>
                      <a href={`tel:${lead.phone}`} style={{ color: '#34d5ff', textDecoration: 'none' }}>
                        {lead.phone}
                      </a>
                    </td>
                    <td style={{ padding: '15px', borderRight: '1px solid #333', fontSize: '12px', color: '#aaa' }}>
                      {lead.gender || 'N/A'}
                    </td>
                    <td style={{ padding: '15px', borderRight: '1px solid #333' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: '#ff274f',
                        color: '#fff',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {lead.goal}
                      </span>
                    </td>
                    <td style={{ padding: '15px', borderRight: '1px solid #333', fontSize: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        backgroundColor: '#34d5ff',
                        color: '#0a0e27',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>
                        {lead.plan || 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '15px', borderRight: '1px solid #333', fontSize: '12px', color: '#aaa' }}>
                      {formatDate(lead.timestamp)}
                    </td>
                    <td style={{ padding: '10px', borderRight: '1px solid #333', textAlign: 'center' }}>
                      <div className="status-radio" style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexDirection: 'row' }}>
                        {statusOptions.map((status) => (
                          <label key={status} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <input
                              type="radio"
                              name={`status-${lead.id}`}
                              value={status}
                              checked={lead.status === status}
                              onChange={() => handleStatusUpdate(lead.id, status)}
                              style={{ marginRight: '5px', cursor: 'pointer' }}
                            />
                            <span style={{
                              fontSize: '11px',
                              padding: '3px 8px',
                              borderRadius: '3px',
                              backgroundColor: lead.status === status ? (
                                status === 'Joined' ? '#0a6ba0' :
                                status === 'Talked' ? '#7b8cff' :
                                '#666'
                              ) : '#333',
                              color: '#fff'
                            }}>
                              {status}
                            </span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="delete-btn"
                        style={{
                          backgroundColor: '#6b0a0a',
                          border: 'none',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#ff274f'
                          e.target.style.boxShadow = '0 0 15px rgba(255, 39, 79, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#6b0a0a'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </>
        ) : (
          // Analytics View
          <div>
            <h2 style={{ color: '#34d5ff', marginBottom: '30px', fontSize: '24px' }}>
              <i className="fas fa-chart-pie"></i> Analytics Dashboard
            </h2>
            
            {/* Pie Chart - Goals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#1a1f3a',
                borderRadius: '12px',
                border: '2px solid #34d5ff',
                boxShadow: '0 0 20px rgba(52, 213, 255, 0.2)'
              }}>
                <h3 style={{ color: '#34d5ff', marginBottom: '20px' }}>
                  <i className="fas fa-chart-pie"></i> Goals Distribution (Pie Chart)
                </h3>
                <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '250px', margin: '0 auto' }}>
                  {(() => {
                    const weightLoss = leads.filter(l => l.goal === 'Weight Loss').length
                    const muscle = leads.filter(l => l.goal === 'Muscle').length
                    const strength = leads.filter(l => l.goal === 'Strength').length
                    const total = leads.length || 1
                    
                    let currentAngle = 0
                    const data = [
                      { val: weightLoss, label: 'Weight Loss', color: '#ff274f' },
                      { val: muscle, label: 'Muscle', color: '#7b8cff' },
                      { val: strength, label: 'Strength', color: '#34d5ff' }
                    ]
                    
                    return data.map((item, idx) => {
                      const sliceAngle = (item.val / total) * 360
                      const startAngle = currentAngle
                      const endAngle = currentAngle + sliceAngle
                      
                      const startRad = (startAngle * Math.PI) / 180
                      const endRad = (endAngle * Math.PI) / 180
                      
                      const x1 = 50 + 40 * Math.cos(startRad)
                      const y1 = 50 + 40 * Math.sin(startRad)
                      const x2 = 50 + 40 * Math.cos(endRad)
                      const y2 = 50 + 40 * Math.sin(endRad)
                      
                      const largeArc = sliceAngle > 180 ? 1 : 0
                      const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
                      
                      currentAngle = endAngle
                      
                      return <path key={idx} d={path} fill={item.color} stroke="#0a0e27" strokeWidth="1" />
                    })
                  })()}
                </svg>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Weight Loss', count: leads.filter(l => l.goal === 'Weight Loss').length, color: '#ff274f' },
                    { label: 'Muscle Building', count: leads.filter(l => l.goal === 'Muscle').length, color: '#7b8cff' },
                    { label: 'Strength Training', count: leads.filter(l => l.goal === 'Strength').length, color: '#34d5ff' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '2px' }}></div>
                      <span style={{ color: '#aaa' }}>{item.label}:</span>
                      <span style={{ color: item.color, fontWeight: 'bold' }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart - Status */}
              <div style={{
                padding: '20px',
                backgroundColor: '#1a1f3a',
                borderRadius: '12px',
                border: '2px solid #ff274f',
                boxShadow: '0 0 20px rgba(255, 39, 79, 0.2)'
              }}>
                <h3 style={{ color: '#ff274f', marginBottom: '20px' }}>
                  <i className="fas fa-chart-bar"></i> Status Distribution (Bar Chart)
                </h3>
                <div style={{ padding: '20px' }}>
                  {[
                    { label: 'Not Talked', count: leads.filter(l => l.status === 'Not Talked').length, color: '#666' },
                    { label: 'Talked', count: leads.filter(l => l.status === 'Talked').length, color: '#7b8cff' },
                    { label: 'Joined', count: leads.filter(l => l.status === 'Joined').length, color: '#0a9fbf' }
                  ].map((item, idx) => {
                    const maxCount = leads.length || 1
                    const barWidth = (item.count / maxCount) * 100
                    
                    return (
                      <div key={idx} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: '#aaa', fontSize: '12px' }}>{item.label}</span>
                          <span style={{ color: item.color, fontWeight: 'bold', fontSize: '12px' }}>{item.count}</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '30px',
                          backgroundColor: '#0a0e27',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${barWidth}%`,
                            backgroundColor: item.color,
                            transition: 'width 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '10px',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}>
                            {barWidth > 5 && `${barWidth.toFixed(0)}%`}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Radar/Spider Chart - Plans */}
              <div style={{
                padding: '20px',
                backgroundColor: '#1a1f3a',
                borderRadius: '12px',
                border: '2px solid #7b8cff',
                boxShadow: '0 0 20px rgba(123, 140, 255, 0.2)',
                gridColumn: 'span 1'
              }}>
                <h3 style={{ color: '#7b8cff', marginBottom: '20px' }}>
                  <i className="fas fa-spider"></i> Plans Distribution (Radar)
                </h3>
                <svg viewBox="0 0 200 200" style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
                  {/* Grid lines */}
                  {[40, 80, 120].map((r, idx) => (
                    <circle key={idx} cx="100" cy="100" r={r} fill="none" stroke="#333" strokeWidth="0.5" />
                  ))}
                  {/* Axes */}
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#333" strokeWidth="0.5" />
                  <line x1="100" y1="100" x2="175" y2="100" stroke="#333" strokeWidth="0.5" />
                  <line x1="100" y1="100" x2="62.5" y2="162.5" stroke="#333" strokeWidth="0.5" />
                  
                  {/* Data polygon */}
                  {(() => {
                    const basic = leads.filter(l => l.plan?.includes('BASIC')).length
                    const pro = leads.filter(l => l.plan?.includes('PRO')).length
                    const elite = leads.filter(l => l.plan?.includes('ELITE')).length
                    const max = Math.max(basic, pro, elite, 1)
                    
                    const points = [
                      { val: basic, angle: 0 },
                      { val: pro, angle: 120 },
                      { val: elite, angle: 240 }
                    ]
                    
                    const coords = points.map(p => {
                      const r = (p.val / max) * 80
                      const rad = (p.angle * Math.PI) / 180
                      return {
                        x: 100 + r * Math.cos(rad - Math.PI / 2),
                        y: 100 + r * Math.sin(rad - Math.PI / 2)
                      }
                    })
                    
                    const pathData = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ') + ' Z'
                    
                    return (
                      <>
                        <path d={pathData} fill="#7b8cff" fillOpacity="0.3" stroke="#7b8cff" strokeWidth="2" />
                        {coords.map((c, i) => (
                          <circle key={i} cx={c.x} cy={c.y} r="3" fill="#7b8cff" />
                        ))}
                      </>
                    )
                  })()}
                  
                  {/* Labels */}
                  <text x="100" y="15" textAnchor="middle" fill="#34d5ff" fontSize="10">BASIC</text>
                  <text x="175" y="105" textAnchor="start" fill="#34d5ff" fontSize="10">PRO</text>
                  <text x="62" y="172" textAnchor="end" fill="#34d5ff" fontSize="10">ELITE</text>
                </svg>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'BASIC', count: leads.filter(l => l.plan?.includes('BASIC')).length, color: '#ff274f' },
                    { label: 'PRO', count: leads.filter(l => l.plan?.includes('PRO')).length, color: '#34d5ff' },
                    { label: 'ELITE', count: leads.filter(l => l.plan?.includes('ELITE')).length, color: '#7b8cff' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '50%' }}></div>
                      <span style={{ color: '#aaa' }}>{item.label}:</span>
                      <span style={{ color: item.color, fontWeight: 'bold' }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div style={{
              padding: '25px',
              backgroundColor: '#1a1f3a',
              borderRadius: '12px',
              border: '2px solid #34d5ff',
              boxShadow: '0 0 30px rgba(52, 213, 255, 0.15)'
            }}>
              <h3 style={{ color: '#34d5ff', marginBottom: '20px', fontSize: '18px' }}>
                <i className="fas fa-chart-line"></i> Key Performance Indicators
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px'
              }}>
                {[
                  { label: 'Total Leads', value: leads.length, icon: 'users', color: '#34d5ff' },
                  { label: 'Active (Talked)', value: leads.filter(l => l.status === 'Talked' || l.status === 'Joined').length, icon: 'check-circle', color: '#0a9fbf' },
                  { label: 'Conversion Rate', value: `${leads.length > 0 ? ((leads.filter(l => l.status === 'Joined').length / leads.length) * 100).toFixed(1) : '0'}%`, icon: 'star', color: '#7b8cff' },
                  { label: 'Pending', value: leads.filter(l => l.status === 'Not Talked').length, icon: 'hourglass', color: '#ff274f' }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    padding: '15px',
                    backgroundColor: '#0a0e27',
                    borderRadius: '8px',
                    border: `1px solid ${stat.color}`,
                    textAlign: 'center'
                  }}>
                    <i className={`fas fa-${stat.icon}`} style={{ color: stat.color, fontSize: '20px', marginBottom: '10px', display: 'block' }}></i>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color, marginBottom: '5px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
