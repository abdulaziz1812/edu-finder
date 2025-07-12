export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "🎓",
      title: "Expert Guidance",
      desc: "Get personalized advice from education experts to find the best college for you.",
    },
    {
      icon: "📚",
      title: "Wide Selection",
      desc: "Explore a vast database of colleges, programs, and scholarships all in one place.",
    },
    {
      icon: "⭐",
      title: "Trusted Reviews",
      desc: "Read genuine reviews from students and alumni to make informed decisions.",
    },
    {
      icon: "⚡",
      title: "Fast & Easy",
      desc: "Quickly search and apply with our user-friendly interface and seamless process.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-5xl mx-auto px-4">
       
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-lg">
            Helping you make smart decisions for your education journey with confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4" role="img" aria-label={title}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
