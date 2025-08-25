export default function Testimonials() {
  const stories = [
    {
      quote:
        "BloodConnect helped me find a donor in just 30 minutes during an emergency. It saved my brother’s life.",
      author: "– Rahim, Dhaka",
    },
    {
      quote:
        "I never thought donating blood could be this simple. Now I donate regularly and feel proud every time.",
      author: "– Ayesha, Chattogram",
    },
    {
      quote:
        "Being a donor showed me how one small act can make a big difference. Highly recommend everyone to join.",
      author: "– Imran, Sylhet",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10"
          data-aos="fade-up"
        >
          Inspiring Stories
        </h2>

        <div className="grid gap-6 md:grid-cols-1">
          {stories.map((story, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-base-content/80 italic text-lg mb-4">
                "{story.quote}"
              </p>
              <p className="text-base-content/60 font-medium">{story.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
