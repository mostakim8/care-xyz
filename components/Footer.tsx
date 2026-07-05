export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Care.xyz. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Providing professional care for your loved ones with compassion.
        </p>
      </div>
    </footer>
  );
}
