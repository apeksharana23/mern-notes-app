import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-6 flex flex-col"
      style={{ backgroundImage: "url('/img/brown.png')" }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 -z-10" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center z-10 relative">
        <h1 className="text-3xl font-bold text-white">📝 Notes App</h1>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-10 z-10 relative mt-12">
        {/* Left Text */}
        <div className="text-center md:text-left text-white max-w-xl">
          <h2 className="text-4xl font-extrabold mb-4">
            Take <strong className="text-[#5C4033]">Notes</strong>, Stay <strong className="text-[#5C4033]">Organized</strong>
          </h2>
          <p className="text-lg mb-6">
            A secure and efficient way to manage your thoughts, tasks, and ideas — anytime, anywhere.
          </p>
          <Link href="/sign-up">
            <button className="px-6 py-3 bg-[#5C4033] hover:bg-[#A67B6D] text-white rounded-lg transition">
              Start Now
            </button>
          </Link>
        </div>

        {/* Right Hero Image */}
        <div className="w-full max-w-md">
          <Image
            src="/img/bg-img.webp"
            alt="Notes App Illustration"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-white mt-10 text-sm z-10 relative">
        &copy; {new Date().getFullYear()} Notes App. All rights reserved.
      </footer>
    </div>
  );
}
