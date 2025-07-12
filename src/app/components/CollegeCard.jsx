import Link from "next/link";

export default function CollegeCard({ college }) {
  return (
    <article className="card bg-base-100 border border-base-200 shadow-lg rounded-lg overflow-hidden transition-transform hover:shadow-2xl hover:scale-[1.02] flex flex-col h-full">
      <div className="h-48 overflow-hidden rounded-t-lg">
        <img
          src={college.image || "/default-college.jpg"}
          alt={college.name ? `Image of ${college.name}` : "College image"}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="text-left space-y-2">
          <h3
            className="text-2xl text-center font-bold text-gray-900 hover:font-extrabold transition-colors duration-200"
            title={college.name}
          >
            {college.name || "Unnamed College"}
          </h3>

          <p className="text-sm text-gray-600" title="Admission Dates">
            <strong>Admission:</strong>{" "}
            {college.admissionDates?.start && college.admissionDates?.end
              ? `${college.admissionDates.start} to ${college.admissionDates.end}`
              : "N/A"}
          </p>

          <p className="text-sm text-gray-700" title="Upcoming Events">
            <strong>Events:</strong> {college.events?.length ? college.events.join(", ") : "N/A"}
          </p>

          <p className="text-sm text-gray-700" title="Research History">
            <strong>Research:</strong>{" "}
            {college.researchHistory?.length ? college.researchHistory.join(", ") : "N/A"}
          </p>

          <p className="text-sm text-gray-700" title="Sports Activities">
            <strong>Sports:</strong> {college.sports?.length ? college.sports.join(", ") : "N/A"}
          </p>
        </div>

        {college._id && (
          <div className="text-right mt-6">
            <Link href={`/colleges/${college._id}`}>
              <button
                className="btn btn-sm btn-primary btn-outline"
                aria-label={`View details about ${college.name}`}
                type="button"
              >
                Details
              </button>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
