import React from 'react';
import { DetailsList } from '@fluentui/react';
import { IPost } from '../types/types';

  
  const columns = [
    { key: 'column1', 
    name: 'userId', 
    fieldName: 'userId', 
    minWidth: 100, 
    maxWidth: 100, 
    isResizable: true },
    { key: 'column2', 
    name: 'id', 
    fieldName: 'id', 
    minWidth: 100, 
    maxWidth: 100, 
    isResizable: true },
    { key: 'column3', 
    name: 'title', 
    fieldName: 'title', 
    minWidth: 100, 
    maxWidth: 300, 
    isResizable: true },
    { key: 'column4', 
    name: 'body', 
    fieldName: 'body', 
    minWidth: 100, 
    maxWidth: 300, 
    isResizable: true },
  ]


  interface PostsListProps {
    posts: IPost[];
}


const PostsDetailsList:  FC<PostsListProps> = ({posts}) => {
    return (
        <div data-is-scrollable={true}>
      <div>
        <DetailsList
          items={posts}
          columns={columns}
          selectionMode={0}
        />
      </div>
    </div>
    );
};

export default PostsDetailsList;