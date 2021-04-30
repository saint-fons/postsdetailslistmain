import React, { FC, useState } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog } from "@fluentui/react/lib/Dialog";
import { columns } from "../../styles/columns";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import ReactPaginate from "react-paginate";
import style from "../../styles/ProfileStyle.module.css";

/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {

  const postsPerPage = 10;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const [pageNumber, setPageNumber] = useState<any>(0);

  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

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
            {pickedUser.length === 0 ? (
              <div>Пожалуйста, выберите сообщение</div>
            ) : (
              <PickedUserForm pickedUser={pickedUser} />
            )}
          </Dialog>
        </>
      </div>
      <div>
        <DetailsList
          items={displayPosts}
          columns={columns}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          onItemInvoked={PickedUser}
        />
        <div>
          {/* Прелоадер */}
          {posts.length === 0 ? (
            <ProgressIndicator label="Loading" />
          ) : undefined}
        </div>
        <div>
          <ReactPaginate
            previousLabel={"Previous"}
            netLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={style.paginationBttns}
            previousLinkClassName={"previousBttn"}
            nextLinkClassname={"nextBttn"}
            disableClassname={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsDetailsList;
