import type { Metadata } from "next";
import Link from "next/link";
import getAllUsers from "../../lib/getAllUsers";

export const metadata: Metadata = {
  title: "Users",
};
const Users = async () => {
  const userData: Promise<User[]> = getAllUsers();

  const users = await userData;

  const content = (
    <section>
      <h2>
        <Link href={"/"}>Back to Home</Link>
      </h2>
      <br />

      {users.map((item) => {
        return (
          <>
            <p key={item?.id}>
              <Link href={`/users/${item?.id}`}>{item?.name}</Link>
            </p>
          </>
        );
      })}
    </section>
  );
  return content;
};

export default Users;
