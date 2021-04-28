import React, { FC, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { columns } from "../../styles/columns";

/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {
  /* Сет выбранного пользователя */
  const [pickedUser, setPickedUser] = useState<ISetUser[]>([]);

  const PickedUser = (user: ISetUser): void => {
    setPickedUser(user.userId.toString());
  };

  return (
    <div data-is-scrollable={true}>
      <div>
        <PickedUserForm pickedUser={pickedUser} />
        <DetailsList
          items={posts}
          columns={columns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          onItemInvoked={PickedUser}
        />
      </div>
    </div>
  );
};

export default PostsDetailsList;
