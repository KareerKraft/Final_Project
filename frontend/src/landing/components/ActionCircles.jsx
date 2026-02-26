import '../styles/Home.css';

function ActionCircles() {
  return (
    <div className="action-section">
      <div className="circles-container">
        <div className="action-circle apply-circle">
          <div className="circle-content">
            <div className="circle-icon">💼</div>
            <h3>Apply For Jobs</h3>
            <p>Find your suitable job</p>
            <button className="circle-btn">APPLY NOW</button>
          </div>
        </div>

        <div className="action-circle resume-circle">
          <div className="circle-content">
            <div className="circle-icon">📝</div>
            <h3>Create Resume</h3>
            <p>Build your professional resume</p>
            <button className="circle-btn">CREATE NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionCircles;