import React, { FC } from "react";
import { DetailsList } from "@fluentui/react";
import { IPost, IDetailsListUserSelection } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { columns } from "../../styles/columns";


interface PostsListProps {
  posts: IPost[];
}


/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {
  const pickedUser = (userId: IDetailsListUserSelection): void => {
    debugger
    alert(`Item invoked: ${userId.userId}`);
  };

  return (
    <div data-is-scrollable={true}>
      <div>
        <PickedUserForm />
          <DetailsList
            items={posts}
            columns={columns}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            onItemInvoked={pickedUser}
          />
      </div>
    </div>
  );
};

export default PostsDetailsList;
