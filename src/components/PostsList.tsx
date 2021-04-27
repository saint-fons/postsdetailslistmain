import React, { FC } from 'react';
import { IPost } from '../types/types';
import style from "../styles/style.module.css"

interface PostsListProps {
    posts: IPost[];
}

const PostsList: FC<PostsListProps> = ({posts}) => {
    return (
        <div>
            {
                posts.map(post =>
                    <div
                    className={style.container}
                    key={post.id}>
                        Post by user: {post.userId}. User ID: {post.userId}. Post title: {post.title}. Post message: {post.body}
                    </div>
                    )}
        </div>
    );
};

export default PostsList;