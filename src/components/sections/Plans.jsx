const Plans = () => {
  const plans = [
    { name: "BASIC", icon: "running", price: "1,999", period: "1 month", features: [
      { included: true, text: "Access to gym equipment" },
      { included: true, text: "Cardio & weight training" },
      { included: true, text: "Locker facility" },
      { included: true, text: "Shower & restroom" },
      { included: false, text: "Personal trainer" },
      { included: false, text: "Nutrition plan" },
      { included: false, text: "Group classes" }
    ] },
    { name: "PRO", icon: "fire", price: "7,999", period: "6 month", popular: true, features: [
      { included: true, text: "All Basic features" },
      { included: true, text: "8 personal training sessions" },
      { included: true, text: "Group classes (Yoga, Zumba)" },
      { included: true, text: "Custom workout plan" },
      { included: true, text: "Nutrition guidance" },
      { included: true, text: "Progress tracking" },
      { included: true, text: "Priority booking" }
    ] },
    { name: "ELITE", icon: "crown", price: "11,999", period: "1 year", features: [
      { included: true, text: "All Pro features" },
      { included: true, text: "Unlimited personal training" },
      { included: true, text: "All group classes" },
      { included: true, text: "Complete nutrition plan" },
      { included: true, text: "Body composition analysis" },
      { included: true, text: "Recovery & massage sessions" },
      { included: true, text: "Supplement discounts" },
      { included: true, text: "Guest passes (2/month)" }
    ] }
  ]

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="plans" className="plans-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Choose Your Plan</span>
          <h2 className="section-title">MEMBERSHIP <span className="neon-text">PLANS</span></h2>
          <div className="title-underline"></div>
          <p className="section-desc">Flexible plans designed to fit your fitness journey and budget</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card glass-card ${plan.popular ? 'popular-plan' : ''}`}>
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-icon"><i className={`fas fa-${plan.icon}`}></i></div>
              </div>
              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}><i className={`fas fa-${feature.included ? 'check' : 'times'}`}></i> {feature.text}</li>
                ))}
              </ul>
              <button onClick={scrollToContact} className={`plan-btn ${plan.popular ? 'glow-btn' : ''}`}>Get Started</button>
            </div>
          ))}
        </div>

        <div className="plan-quote">
          <i className="fas fa-quote-left"></i>
          <p>"The hardest lift is lifting your butt off the couch."</p>
          <i className="fas fa-quote-right"></i>
        </div>

        <div className="payment-info glass-card">
          <h3><i className="fas fa-credit-card"></i> Payment Options</h3>
          <p>We accept Google Pay, UPI, Credit/Debit Cards, and Cash</p>
          <div className="payment-icons">
            <i className="fab fa-google-pay"></i>
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fas fa-money-bill-wave"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plans
