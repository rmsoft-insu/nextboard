import { useRouter } from "next/router";
import { useEffect } from "react";

const PostDetail = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
  }, [router]);

  return (
    <div>
      <h1>Detail</h1>
    </div>
  );
};

export default PostDetail;
