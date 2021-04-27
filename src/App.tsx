import axios from "axios";
import React, { useEffect, useState } from "react";
import PostsDetailsList from "./components/PostsDetailsList";
import PostsList from "./components/PostsList";
import { IPost } from "./types/types";

const App = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get<IPost>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <PostsDetailsList posts={posts} />
      {/* <PostsList posts={posts} /> */}
    </div>
  );
};

export default App;
