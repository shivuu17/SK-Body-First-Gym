const LoadingScreen = () => {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading site">
      <div className="loading-screen__backdrop" />
      <div className="loading-screen__content">
        <div className="loading-screen__mark">
          <img src="/dumbell.png" alt="SK Body First Gym logo" className="loading-screen__logo" />
        </div>
        <div className="loading-screen__brand">
          <span className="loading-screen__title">SK Body-First-Gym</span>
          <span className="loading-screen__subtitle">Preparing your fitness experience</span>
        </div>
        <div className="loading-screen__bars" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen