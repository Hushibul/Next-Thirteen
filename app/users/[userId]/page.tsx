import getAllUsers from "@/lib/getAllUsers";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import UserPost from "./components/UserPost";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  if (!user?.name) {
    return {
      title: "User not found!",
    };
  }

  return {
    title: user?.name,
    description: `This is the page of ${user.name}`,
  };
}

const UserPage = async ({ params: { userId } }: Params) => {
  const userData: Promise<User> = getUser(userId);
  const userPostData: Promise<any> = getUserPosts(userId);

  const [user, userPost] = await Promise.all([userData, userPostData]);

  if (!user?.name) return notFound();

  return (
    <>
      <h2>{user?.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPost promise={userPost} />
      </Suspense>
    </>
  );
};

export async function generateStaticParams() {
  const userData: Promise<User[]> = getAllUsers();

  const users = await userData;

  return users.map((item) => ({ userId: item.id.toString() }));
}

export default UserPage;
