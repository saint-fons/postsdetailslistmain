import React, { useEffect, useState } from 'react';
import { IUsers } from "./types/types";

const UsersDetailsList = () => {

    const [users, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get<IPost>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setPosts(response.data);
    } catch (e) {
      alert(e);
    }
  }



    return (
        <div>
            hi
        </div>
    );
};

export default UsersDetailsList;