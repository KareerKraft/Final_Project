import { useState } from 'react';
import '../styles/Pages.css';

function Help() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create a resume?",
      answer: "Click on 'Create Resume' button on the home page. Follow our step-by-step resume builder tool. You can choose from professional templates and customize them with your information."
    },
    {
      id: 2,
      question: "How can I find jobs?",
      answer: "Use the 'Apply For Jobs' section to search for positions. Filter by location, industry, and experience level. Save your favorite jobs and apply directly through our platform."
    },
    {
      id: 3,
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. Your information is never shared with third parties without your consent."
    },
    {
      id: 4,
      question: "How much does it cost?",
      answer: "KAREER KRAFT offers a free basic plan with full access to job listings. Premium features are available with a paid subscription."
    },
    {
      id: 5,
      question: "Can I edit my resume after creating it?",
      answer: "Absolutely! You can edit, update, and modify your resume anytime. Download it in PDF or Word format for easy sharing."
    },
    {
      id: 6,
      question: "How do I contact support?",
      answer: "Visit our Help section or email us at support@kareerkraft.com. Our team responds within 24 hours."
    }
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="page-container help-page">
      <div className="page-content">
        <h1 className="page-title">Help & FAQ</h1>
        <div className="page-divider"></div>

        <div className="faq-container">
          {faqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${activeAccordion === faq.id ? 'active' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleAccordion(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">{activeAccordion === faq.id ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="help-contact">
          <h3>Still need help?</h3>
          <p>Contact us at: <strong>support@kareerkraft.com</strong></p>
          <p>Phone: <strong>+1 (800) 123-4567</strong></p>

          <div className="social-icons">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kareerkraft24@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Email kareerkraft24@gmail.com"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#EA4335">
                <path d="M12 13.065L1.2 6V18h21.6V6l-10.8 7.065z" opacity=".15"/>
                <path d="M12 13.065L1.2 6h21.6L12 13.065z" opacity=".35"/>
                <path d="M3.6 18l4.762-3.055L3.6 11.087v6.913zm16.8-6.913l-4.762 3.058L20.4 18V11.087z" opacity=".15"/>
                <path d="M12 12.256l8.4-5.476H3.6L12 12.256z" fill="#FFFFFF"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kareer-kraft-917b663b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2">
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.73v20.538C0 23.228.792 24 1.77 24h20.46c.978 0 1.77-.772 1.77-1.732V1.73C24 .774 23.208 0 22.23 0zM7.078 20.452H3.56V9h3.518v11.452zM5.321 7.5c-1.13 0-1.995-.915-1.995-2.045C3.326 4.3 4.19 3.387 5.321 3.387c1.13 0 1.995.914 1.995 2.046 0 1.13-.865 2.067-1.995 2.067zM20.452 20.452h-3.518v-5.564c0-1.327-.027-3.037-1.851-3.037-1.852 0-2.135 1.446-2.135 2.943v5.658h-3.518V9h3.379v1.561h.048c.471-.89 1.625-1.829 3.345-1.829 3.579 0 4.243 2.356 4.243 5.421v6.299z"/>
              </svg>
            </a>
            <a
              href="https://x.com/KareerKraf35889"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Twitter profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.724-.949.564-2.000.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.917 2.203-4.917 4.917 0 .39.045.765.127 1.124C7.728 8.087 4.1 6.128 1.671 3.149c-.427.722-.666 1.56-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.416-1.685 1.327-3.808 2.118-6.102 2.118-.394 0-.779-.021-1.161-.067 2.179 1.397 4.768 2.21 7.557 2.21 9.054 0 14-7.496 14-13.986 0-.209 0-.42-.016-.63.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;