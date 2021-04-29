import React, { FC, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogFooter } from "@fluentui/react/lib/Dialog";
import style from "./../../styles/FormUsers.module.css";

/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {
  /* Сет выбранного пользователя */
  const [pickedUser, setPickedUser] = useState<ISetUser[]>([]);

  const PickedUser = (user: ISetUser): void => {
    setPickedUser(user.userId.toString());
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");



  const columns = [
    {
      key: "column1",
      name: "userId",
      fieldName: "userId",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Pick a user",
      fieldName: "id",
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: "column3",
      name: "title",
      fieldName: "title",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column4",
      name: "body",
      fieldName: "body",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: style,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );

  return (
    <div data-is-scrollable={true}>
      <div>
        <div>
          <DefaultButton
            secondaryText="Open Profile"
            onClick={toggleHideDialog}
            text="Open Profile"
          />
        </div>
        <>
          <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            modalProps={modalProps}
            pickedUser={pickedUser}
          >
            <PickedUserForm pickedUser={pickedUser} />
          </Dialog>
        </>
      </div>
      <div>
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
