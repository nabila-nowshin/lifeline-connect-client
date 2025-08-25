import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "You must be generally healthy, aged 18-65, and meet the minimum weight requirement. Please check the eligibility section for detailed rules.",
  },
  {
    question: "How often can I donate?",
    answer:
      "Whole blood donations can typically be made every 3 months. Platelets or plasma donations may have different intervals.",
  },
  {
    question: "Is donating blood safe?",
    answer:
      "Yes! All equipment is sterile and used only once. The process is closely monitored by trained professionals.",
  },
  {
    question: "How do I become a verified donor?",
    answer:
      "Sign up on our platform, complete your profile, and submit the required documents. Our team will verify your details.",
  },
  {
    question: "What happens after I submit a donation request?",
    answer:
      "Your request is reviewed, matched with available donors, and you’ll get notified when a donor accepts it.",
  },
  {
    question: "Can I cancel or reschedule my donation?",
    answer:
      "Yes. You can manage your upcoming donations from your dashboard under 'My Donation Schedule'.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/"); // navigate to Home first
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // small delay to let Home render
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Here are some common questions to help you understand our platform.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-base-200 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-base-content">
                {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-700 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-12 text-center"
        data-aos="fade-up"
        data-aos-delay={faqs.length * 100}
      >
        <p className="text-lg text-gray-600 mb-4">
          💡 Still have questions? Feel free to contact us!
        </p>
        <a onClick={goToContact} className="btn btn-primary">
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default FAQ;
