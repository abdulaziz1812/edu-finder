import React from "react";

const scholarships = [
  {
    title: "Merit-Based Scholarship",
    description: "For students with 90%+ scores in HSC or equivalent exams.",
    amount: "Up to 80% Tuition Waiver",
    image: "/scholarships/1.jpg",
    link: "#",
  },
  {
    title: "Need-Based Financial Aid",
    description: "Available for students from low-income families.",
    amount: "Covers up to 70% of total fees",
    image: "/scholarships/2.jpg",
    link: "#",
  },
  {
    title: "STEM Excellence Grant",
    description: "Encouraging students in Engineering & Science fields.",
    amount: "Flat BDT 30,000 per semester",
    image: "/scholarships/3.jpg",
    link: "#",
  },
];

export default function ScholarshipSection() {
  return (
    <section id="scholarships" className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title & Subtitle */}
        <div className="text-left mb-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
            Scholarships & Financial Aid
          </h2>
          <p className="text-gray-600 text-center">
            Explore available scholarships and financial aid options to ease your tuition burden and help you focus on your education.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholar, idx) => (
            <div
              key={idx}
              className="card bg-white border border-base-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <figure className="h-56 overflow-hidden">
                <img
                  src={scholar.image}
                  alt={scholar.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-lg font-bold  mb-1">{scholar.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{scholar.description}</p>
                <p className="text-sm font-semibold text-green-600">{scholar.amount}</p>
                <div className="card-actions justify-end mt-3">
                  <a
                    href={scholar.link}
                    className="btn btn-sm btn-outline btn-primary"
                    aria-label={`Learn more about ${scholar.title}`}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
