import CountUp from "react-countup";
import { FaUsers, FaTint, FaHeart } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: <FaUsers className="text-4xl text-primary mb-2" />,
      label: "Verified Donors",
      value: 1200,
    },
    {
      icon: <FaTint className="text-4xl text-red-500 mb-2" />,
      label: "Blood Units Collected",
      value: 3500,
    },
    {
      icon: <FaHeart className="text-4xl text-pink-500 mb-2" />,
      label: "Lives Saved",
      value: 2800,
    },
  ];

  return (
    <section className="py-20 bg-base-100 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Our Impact
        </h2>
        <p className="text-gray-600">
          See how your contribution is making a difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl shadow-md bg-base-200 flex flex-col items-center"
          >
            {stat.icon}
            <h3 className="text-3xl font-bold text-primary mb-1">
              <CountUp end={stat.value} duration={5} separator="," />
            </h3>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
