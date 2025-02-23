import Link from "next/link";


export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to Smart Pill Dispenser</h1>
      <p className="text-gray-600 mt-2">Track and manage your prescriptions easily.</p>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/prescriptions">Prescriptions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}