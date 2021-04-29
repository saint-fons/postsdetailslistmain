import React, { FC, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { columns } from "../../styles/columns";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";

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

  const dialogStyles = { main: { maxWidth: 450 } };



  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId]
  );

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Missing Subject",
    closeButtonAriaLabel: "Close",
    subText: "Do you want to send this message without a subject?",
  };


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
      name: "id",
      fieldName: "id",
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: () =>{
        return <div>
          <DefaultButton
        secondaryText="Opens the Sample Dialog"
        onClick={toggleHideDialog}
        text="Open Dialog"
      />
        </div>
      }
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



  return (
    <div data-is-scrollable={true}>
      <div>
      <DefaultButton
        secondaryText="Opens the Sample Dialog"
        onClick={toggleHideDialog}
        text="Open Dialog"
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        pickedUser={pickedUser}
      />
      </div>
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
