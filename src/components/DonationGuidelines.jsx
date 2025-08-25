export default function DonationGuidelines() {
  const guidelines = [
    "Stay hydrated – drink plenty of water before donation.",
    "Have a light meal, avoid oily/heavy food.",
    "Carry a valid ID proof for verification.",
    "Rest for at least 10 minutes after donating.",
    "Avoid heavy exercise for the next 24 hours.",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl font-bold text-red-600 mb-10"
          data-aos="fade-up"
        >
          Donation Guidelines
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {guidelines.map((guide, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-medium text-gray-700">{guide}</p>
            </div>
          ))}
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay={guidelines.length * 150}
          className="mt-8 text-gray-600 text-lg"
        >
          ✅ Following these steps ensures a safe and smooth donation process.
        </p>
      </div>
    </section>
  );
}
