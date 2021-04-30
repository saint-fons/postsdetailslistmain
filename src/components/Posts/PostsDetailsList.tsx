import React, { FC, useState, useEffect } from "react";
import { DetailsList } from "@fluentui/react";
import { ISetUser, PostsListProps } from "../../types/types";
import PickedUserForm from "../forms/PickedUserForm";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog } from "@fluentui/react/lib/Dialog";
import { columns } from "../../styles/columns";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import ReactPaginate from "react-paginate";
import "./../../styles/TabsPostsStyle.css";
import style from "../../styles/ProfileStyle.module.css";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { XYPlot, XAxis, YAxis, VerticalRectSeries, Highlight } from "react-vis";

/* получаем выбранного пользователя */
const PostsDetailsList: FC<PostsListProps> = ({ posts }) => {
  const postsPerPage = 10;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const [pageNumber, setPageNumber] = useState<any>(0);

  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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

  /* *************** Второй таб ***********************/

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "level of thiccness",
              data: empSal,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);

  /* Считаем посты в которых айдишки делятся на 3 и на 7 */

  useEffect(() => {
      let idDividedBy3 = 0;
      if (posts !== undefined && posts !== null) {
        debugger
        for (let i = 0; i <= posts.length; i++) {
          console.log(posts[i].id);
          debugger
        }
      }
  }, []);

  debugger;

  const DATA = [
    { x0: 0, x: 1, y: 1 },
    { x0: 1, x: 2, y: 2 },
    { x0: 2, x: 3, y: 10 },
  ];

  return (
    <div>
      <div>
        <div className="container">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Посты
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Графики
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              Tab 3
            </button>
          </div>
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              {/* Таб 1 */}
              {/* Прелоадер */}
              {posts.length === 0 ? (
                <ProgressIndicator label="Loading" />
              ) : (
                <div data-is-scrollable={true}>
                  <div>
                    <div>
                      <DefaultButton
                        secondaryText="Открыть профиль"
                        onClick={toggleHideDialog}
                        text="Открыть профиль"
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
              )}
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <div>
                <div>
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      title: { text: "THICCNESS SCALE", display: true },
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              autoSkip: true,
                              maxTicksLimit: 10,
                              beginAtZero: true,
                            },
                            gridLines: {
                              display: false,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: {
                              display: false,
                            },
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <div>
                <XYPlot width={1000} height={500} margin={150}>
                  <XAxis />
                  <YAxis />
                  <VerticalRectSeries
                    data={DATA}
                    stroke="white"
                    colorType="literal"
                  />

                  <Highlight color="#829AE3" drag enableY={false} />
                </XYPlot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsDetailsList;
