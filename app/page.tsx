import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1>Home Page</h1>
      <Link href={"/users"}>Link to Users</Link>
    </main>
  );
}
