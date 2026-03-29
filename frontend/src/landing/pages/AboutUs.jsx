import '../styles/Pages.css';

function AboutUs() {
  return (
    <div className="page-container about-page">
      <div className="page-content">
        <h1 className="page-title">About Us</h1>
        <div className="page-divider"></div>

        <div className="content-grid">
          <div className="content-card">
            <div className="card-icon"></div>
            <h3>Our Mission</h3>
            <p>
              We are dedicated to connecting talented professionals with their dream jobs. 
              KAREER KRAFT empowers job seekers with the tools they need to build impressive 
              resumes and find opportunities that match their skills.
            </p>
          </div>

          <div className="content-card">
            <div className="card-icon"></div>
            <h3>Why Choose Us</h3>
            <p>
              With thousands of job listings from top companies, an intuitive resume builder, 
              and personalized job recommendations, we make career growth simple and accessible 
              to everyone.
            </p>
          </div>

          <div className="content-card">
            <div className="card-icon"></div>
            <h3>Our Features</h3>
            <p>
              • AI-powered resume building<br/>
              • Smart job matching<br/>
              • Profile optimization tips<br/>
              • Direct employer connections
            </p>
          </div>

          <div className="content-card">
            <div className="card-icon"></div>
            <h3>Our Vision</h3>
            <p>
              To be the leading platform that transforms careers by providing opportunities 
              and tools for professional growth and success worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;