export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Search Colleges",
      desc: "Use our search bar to find colleges by name, location, or program.",
    },
    {
      number: 2,
      title: "Compare & Select",
      desc: "Check admission dates, events, and student reviews to make the right choice.",
    },
    {
      number: 3,
      title: "Apply Online",
      desc: "Submit your admission application directly through our platform easily and securely.",
    },
    {
      number: 4,
      title: "Track & Get Updates",
      desc: "Monitor your application status and receive notifications instantly.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Follow these simple steps to find and apply to your dream college.
          </p>
        </div>
        <div className="space-y-10">
          {steps.map(({ number, title, desc }) => (
            <div
              key={number}
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="w-14 h-14 min-w-[3.5rem] flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold shadow-md">
                {number}
              </div>
              <div className="text-left max-w-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {title}
                </h3>
                <p className="text-gray-700 text-base">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
