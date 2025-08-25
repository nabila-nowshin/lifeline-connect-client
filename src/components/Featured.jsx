import { FaHeartbeat, FaHandHoldingHeart, FaShieldAlt } from "react-icons/fa";

const Featured = () => {
  return (
    <section className="bg-base-100 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
          Why Choose Our Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 shadow-md rounded-xl bg-base-200 text-center">
            <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Real-Time Donor Match
            </h3>
            <p>
              Connect instantly with verified donors nearby when every second
              matters.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-base-200 text-center">
            <FaHandHoldingHeart className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
            <p>
              Donor profiles are vetted to ensure safe, reliable blood donations
              every time.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-base-200 text-center">
            <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
            <p>
              See how many lives you’ve helped save. Your generosity doesn’t go
              unnoticed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
