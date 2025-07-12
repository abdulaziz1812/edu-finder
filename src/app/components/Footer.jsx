import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">EduFinder</h3>
          <p className="text-sm text-gray-600">
            Helping students find the right college and scholarships with ease and confidence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">🏠 Home</Link></li>
            <li><Link href="/colleges">🎓 Colleges</Link></li>
            <li><Link href="/admission">📝 Admission</Link></li>
            <li><Link href="/my-college">📋 My College</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#scholarships">💰 Scholarships</Link></li>
            <li><Link href="/#research">📚 Research Papers</Link></li>
            <li><Link href="/#reviews">⭐ Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-sm text-gray-600">Email: support@edufinder.com</p>
          <p className="text-sm text-gray-600">Phone: +880 1234 567890</p>
          <p className="text-sm text-gray-600">Address: 123 College St, New York, USA</p>
        </div>
      </div>

      <div className="text-center border-t border-base-300 py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EduFinder. All rights reserved.
      </div>
    </footer>
  );
}
