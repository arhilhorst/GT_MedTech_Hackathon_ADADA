import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-around">
      <Link href="/" className="text-primary font-semibold">Home</Link>
      <Link href="/dashboard" className="text-primary font-semibold">Dashboard</Link>
      <Link href="/prescriptions" className="text-primary font-semibold">Prescriptions</Link>
      <Link href="/refills" className="text-primary font-semibold">Refills</Link>
    </nav>
  );
}