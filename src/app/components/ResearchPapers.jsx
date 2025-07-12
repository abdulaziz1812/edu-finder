import React from "react";

const samplePapers = [
  {
    title: "Machine Learning and Deep Learning — A Review for Ecologists",
    url: "https://arxiv.org/pdf/2204.05023.pdf",
    authors: "Maximilian Pichler et al.",
  },
  {
    title: "A Review on the Complementarity of Renewable Energy Sources",
    url: "https://arxiv.org/pdf/1904.01667.pdf",
    authors: "Jakub Jurasz et al.",
  },
  {
    title: "Open-world Machine Learning: A Review and New Outlooks",
    url: "https://arxiv.org/pdf/2403.01759.pdf",
    authors: "Fei Zhu et al.",
  },
  {
    title: "An Extensive and Methodical Review of Smart Grids for Sustainable Energy",
    url: "https://arxiv.org/pdf/2501.14143.pdf",
    authors: "Parag Biswas et al.",
  },
  {
    title: "A Systematic Literature Review on the Use of Machine Learning in Software Engineering",
    url: "https://arxiv.org/pdf/2406.13877.pdf",
    authors: "Nyaga Fred & I. O. Temkin",
  },
];
export default function ResearchPapers({ papers = samplePapers }) {
  return (
    <section id="research" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        <h2 className="text-4xl font-extrabold text-black mb-3">
          Recommended Research Papers
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
          Explore important studies and cutting-edge research to stay informed and inspired in your academic journey.
        </p>

        {papers.length > 0 ? (
          <ul className="space-y-6">
            {papers.map((paper, i) => (
              <li
                key={i}
                className="border border-gray-200 rounded-lg p-5 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left"
              >
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline text-xl font-semibold"
                  aria-label={`Read research paper titled ${paper.title}`}
                >
                  {paper.title}
                </a>
                <p className="text-gray-600 mt-1 text-sm italic">
                  Authors: {paper.authors}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic">
            No research papers available.
          </p>
        )}
      </div>
    </section>
  );
}
