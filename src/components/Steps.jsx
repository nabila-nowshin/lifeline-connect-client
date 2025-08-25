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
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-left">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          How It Works
        </h2>
        <p className="text-base-content/70 text-lg">
          Step-by-step process to start donating and saving lives
        </p>
      </div>

      <div
        className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between"
        data-aos="fade-right"
      >
        {/* Connecting line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-base-300 z-0 hidden md:block"></div>

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative z-10 flex flex-col items-center text-center mb-8 md:mb-0 w-full md:w-1/3 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border-2 border-base-content flex items-center justify-center mb-3 bg-base-100 text-base-content transition-colors duration-300 hover:border-primary hover:text-primary">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-1">
              {step.title}
            </h3>
            <p className="text-base-content/70 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
