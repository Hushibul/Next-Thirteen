type Props = {
  promise: Promise<Post[]>;
};

const UserPost = async ({ promise }: Props) => {
  const posts = await promise;

  const content = posts.map((item) => {
    return (
      <article key={item.id}>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
      </article>
    );
  });
  return content;
};

export default UserPost;
