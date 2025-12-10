import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen w-full flex-col">
      <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
      <Link href="/" className="underline block">
        Back Home
      </Link>
    </div>
  );
}
