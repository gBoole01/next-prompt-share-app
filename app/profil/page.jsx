"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchData();
  }, []);

  const handleEdit = (post) => {
    router.push(`/modifier-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;

    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };

  if (!session?.user) return router.push("/");

  return (
    <section>
      <Profile
        name="Mon"
        desc="Bienvue sur votre profil, vous pouvez voir vos prompts ici"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default MyProfile;
