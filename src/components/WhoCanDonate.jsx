export default function WhoCanDonate() {
  const rules = [
    "Age between 18–60 years",
    "Weight above 50 kg",
    "In good health, no recent fever or major illness",
    "At least 3 months gap since your last donation",
    "Free from transmissible diseases (Hepatitis, HIV, etc.)",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl font-bold text-red-600 mb-10"
          data-aos="fade-up"
        >
          Who Can Donate?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {rules.map((rule, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="text-lg font-medium text-gray-700">{rule}</p>
            </div>
          ))}
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay={rules.length * 150}
          className="mt-8 text-gray-600 text-lg"
        >
          💡 If you fit these, congratulations—you’re a potential lifesaver!
        </p>
      </div>
    </section>
  );
}
