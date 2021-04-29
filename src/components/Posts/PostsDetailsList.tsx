import React, { FC, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog } from "@fluentui/react/lib/Dialog";
import { columns } from "../../styles/columns";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";

/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {
  /* Сет выбранного пользователя */
  const [pickedUser, setPickedUser] = useState<ISetUser[]>([]);

  const PickedUser = (user: ISetUser): void => {
    setPickedUser(user.userId.toString());
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
    }),
    [labelId, subTextId]
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
          >
            {pickedUser.length == 0 ? (
              <div>Пожалуйста, выберите сообщение</div>
            ) : (
              <PickedUserForm pickedUser={pickedUser} />
            )}
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
        {/* Прелоадер */}
        <div>
          {posts.length == 0 ? (
            <ProgressIndicator label="Loading" />
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default PostsDetailsList;
