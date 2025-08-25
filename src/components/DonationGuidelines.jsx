export default function DonationGuidelines() {
  const guidelines = [
    "Stay hydrated – drink plenty of water before donation.",
    "Have a light meal, avoid oily/heavy food.",
    "Carry a valid ID proof for verification.",
    "Rest for at least 10 minutes after donating.",
    "Avoid heavy exercise for the next 24 hours.",
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10"
          data-aos="fade-left"
        >
          Donation Guidelines
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {guidelines.map((guide, index) => (
            <div
              key={index}
              data-aos="fade-right"
              data-aos-delay={index * 150}
              className="p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <p className="text-lg font-medium text-base-content">{guide}</p>
            </div>
          ))}
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay={guidelines.length * 150}
          className="mt-8 text-base-content/70 text-lg"
        >
          ✅ Following these steps ensures a safe and smooth donation process.
        </p>
      </div>
    </section>
  );
}
