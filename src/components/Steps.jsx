import { FaUserPlus, FaTint, FaCheckCircle } from "react-icons/fa";

const Steps = () => {
  const steps = [
    {
      title: "Register as Donor",
      icon: <FaUserPlus />,
      desc: "Sign up and become a verified donor.",
    },
    {
      title: "Donate Blood",
      icon: <FaTint />,
      desc: "Donate at nearby drives or hospitals.",
    },
    {
      title: "Track Impact",
      icon: <FaCheckCircle />,
      desc: "See how many lives you helped save.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12" data-aos="fade-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-600">
          Step-by-step process to start donating and saving lives
        </p>
      </div>

      <div
        className="flex items-center justify-between max-w-3xl mx-auto relative"
        data-aos="fade-right"
      >
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0"></div>

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative z-10 flex flex-col items-center text-center w-1/3 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center mb-2 bg-white transition-colors duration-300 hover:border-primary hover:text-primary">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
