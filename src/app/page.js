
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
        Find Your Next Adventure
      </h1>
      <p className="text-lg leading-8 text-gray-600 mb-8 max-w-2xl text-center">
        Search for flights across the globe. Simple, fast, and transparent.
      </p>
      <a
        href="/flights"
        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
      >
        Start Searching
      </a>
    </div>
  );
}
