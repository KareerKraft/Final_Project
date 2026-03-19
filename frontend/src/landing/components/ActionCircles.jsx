import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function ActionCircles() {
  const navigate = useNavigate();

  return (
    <div className="action-section">
      <div className="circles-container">
        <div className="action-circle apply-circle">
          <div className="circle-content">
            <div className="circle-icon">💼</div>
            <h3>Apply For Jobs</h3>
            <p>Find your suitable job</p>
            <button className="circle-btn" onClick={() => navigate('/login')}>
              APPLY NOW
            </button>

          </div>
        </div>

        <div className="action-circle resume-circle">
          <div className="circle-content">
            <div className="circle-icon" >📝</div>
            <h3>Create Resume</h3>
            <p>Build your professional resume</p>
            <button
              className="circle-btn"
              onClick={() => (window.location.href = 'https://resume-portal-final.vercel.app/')}
            >
              CREATE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionCircles;