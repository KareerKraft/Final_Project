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
        </div>
      </div>
    </div>
  );
}

export default Help;