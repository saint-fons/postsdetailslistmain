/* стили колонок в дитейллист */

export const columns = [
    {
      key: "column1",
      name: "userId",
      fieldName: "userId",
      minWidth: 50,
      maxWidth: 50,
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
      key: "column2",
      name: "id",
      fieldName: "id",
      minWidth: 50,
      maxWidth: 50,
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