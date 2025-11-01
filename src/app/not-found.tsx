import Link from "next/link";
import Home from "../../public/home.svg";

export default function NotFound() {
  return (
    <div className="h-dvh items-center justify-center px-4 max-w-md w-full text-center space-y-4 flex flex-col">
      <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-lg">
          Oops! The page you're looking for doesn't exist.
          <br />
          It might have been moved or deleted.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
        <Link
          href="/"
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg w-full sm:w-auto justify-center"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
