export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-[var(--prussian-blue)] mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-[var(--penn-red)] mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        href="/dashboard"
        className="px-4 py-2 rounded-md bg-[var(--prussian-blue)] text-[var(--floral-white)] hover:bg-[var(--reseda-green)] transition-all duration-300"
      >
        Back to Home
      </a>
    </div>
  );
}
