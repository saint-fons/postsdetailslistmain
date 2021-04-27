import React from 'react';
import { DetailsList, MarqueeSelection, Selection } from '@fluentui/react';
import { IPost, IDetailsListUserSelection } from '../types/types';

  
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

    const _selection = new Selection({
        onselectionchange: () => {console.log("hi")}
      });

      const _onItemInvoked = (userId: IDetailsListUserSelection): void => {
        alert(`Item invoked: ${userId.userId}`);
      };

    return (
        <div data-is-scrollable={true}>
      <div>
      <MarqueeSelection selection={_selection}>
        <DetailsList
          items={posts}
          columns={columns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"

          onItemInvoked={_onItemInvoked}

        />
        </MarqueeSelection>
      </div>
    </div>
    );
};

export default PostsDetailsList;