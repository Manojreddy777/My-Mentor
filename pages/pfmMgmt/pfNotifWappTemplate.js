import React from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Colors from "../../constants/colors";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import CommentsModal from "../../components/comments/comments";
import WhattsAppTemplateModal from "../../components/pfmMgmt/pfNotifWappTemplate";
import PfNotifWapp from "../../helper/pfmMgmt/pfNotifWappTemplate";
import ddLookupHelper from "../../helper/ddLookup";
import UserClaim from "../../helper/tnntAdmin/taUserComClm";
import CommentsHelper from "../../helper/tnntAdmin/taComments";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import ExportExcel from "../../utils/exportExcel";
import Head from "../../components/head";

export default class WhattsAppTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      editable: undefined,
      selectedData: undefined,
      pageNumber: 0,
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      com_id: 75,
      arr_com_claim: [],
      arr_parentTable: [],
      arr_exportData: [],
      activeRow: null,
      arr_comments_status: [],
      commentEditVisibility: false,
      arr_status: [
        {
          id: 1,
          title: "Active",
          value: "active",
        },
        {
          id: 2,
          title: "In-Active",
          value: "inactive",
        },
        {
          id: 3,
          title: "All",
          value: "all",
        },
      ],
      id_selectedStatus: undefined,
      err_message: "",
      columnHeaders: [],
    };
  }

  componentDidMount() {
    this.getClamiAccess();
    this.getCommentStatus();
    document.addEventListener("click", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  }

  onClickOutside = (e) => {
    this.setState({ activeRow: null });
  };

  onClick = (rowId) => (e) => {
    e.stopPropagation();
    this.setState((prevState) => ({
      activeRow: prevState.activeRow === rowId ? null : rowId,
    }));
  };

  getCommentStatus() {
    const { tnnt_id, com_id } = this.state;

    const filter = {
      com_id: com_id,
      tnnt_id: tnnt_id,
    };

    CommentsHelper.getCommentStatus(filter)
      .then((data) => {
        this.setState({ arr_comments_status: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getClamiAccess() {
    const { com_id, tnnt_id } = this.state;

    const filter = {
      user_name: global.config.username,
      com_id: com_id,
      tnnt_id: tnnt_id,
    };

    UserClaim.getClaim(filter)
      .then((data) => {
        this.setState({ arr_com_claim: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getData() {
    const {
      arr_com_claim,
      id_selectedStatus,
      username,
      tnnt_id,
    } = this.state;

    try {
      if (id_selectedStatus == undefined) {
        Swal.fire({
          icon: "warning",
          text: "Select any field to continue!",
          confirmButtonColor: Colors.primaryColor,
          allowOutsideClick: false,
        });
        return;
      }

      const filter = {
        is_active: id_selectedStatus == "all" ? undefined : id_selectedStatus,
        tnnt_id: tnnt_id,
      };

      arr_com_claim[0].clm_view == 3 &&
        (this.getPageDet(filter), this.getFilteredData(filter));

      arr_com_claim[0].clm_view == 2 &&
        (this.getPageDet(filter), this.getFilteredData(filter));

      arr_com_claim[0].clm_view == 1 &&
        ((filter.user_name = username),
          this.getPageDet(filter),
          this.getFilteredData(filter));
    } catch (err) {
      console.log(err);
    }
  }

  getPageDet(filter) {
    const { com_id } = this.state;

    filter.com_id = com_id;

    PfNotifWapp.getPageDet(filter)
      .then((data) => {
        this.setState({ arr_parentTable: data });
        data.length == 0
          ? this.setState({ err_message: "No data found" })
          : this.setState({ err_message: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFilteredData(filter) {
    PfNotifWapp.getFilteredData(filter)
      .then((data) => {
        this.setState({
          arr_exportData: data,
          columnHeaders: {
            id: "Id",
            evt_id: "Event Id",
            templ_name: "Template Name"
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClearFilter = () => {
    this.setState({
      id_selectedStatus: undefined,
      err_message: "",
      arr_parentTable: [],
      arr_exportData: [],
    });
  };

  render() {
    const {
      arr_parentTable,
      selectedData,
      modalVisibility,
      editable,
      pageNumber,
      arr_com_claim,
      activeRow,
      arr_comments_status,
      commentEditVisibility,
      com_id,
      id_selectedStatus,
      arr_status,
      arr_exportData,
      err_message,
      columnHeaders,
    } = this.state;

    const pagesVisited = pageNumber * PAGINATE_COUNT;
    const pageCount = Math.ceil(arr_parentTable.length / PAGINATE_COUNT);
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
    };

    return (
      <div>
        {modalVisibility && (
          <WhattsAppTemplateModal
            visibility={modalVisibility}
            setVisibility={(v) => this.setState({ modalVisibility: v })}
            data={selectedData}
            editable={editable}
            getData={() => this.getData()}
          />
        )}

        {commentEditVisibility && (
          <CommentsModal
            id={selectedData}
            com_id={com_id}
            visibility={commentEditVisibility}
            setVisibility={(v) => this.setState({ commentEditVisibility: v })}
            getCount={() => this.getData()}
          />
        )}

        <SideMenu tag="pfWhattsAppTemplate">
          <Head title="WhattsApp Template" />
          <div className={styles.wrapper}>
            <div>
              <p className={styles.title}>Selection Criteria:</p>
              <div className={styles.rowAlignment}>
                <div className={styles.inputAlignment}>
                  <p>Status:</p>
                  <select
                    value={
                      id_selectedStatus === undefined ? 0 : id_selectedStatus
                    }
                    onChange={(e) =>
                      this.setState({
                        id_selectedStatus: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Status "}
                    </option>
                    {arr_status.map((s) => (
                      <option value={s.value}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.filterbutton}>
                <button className={`button`} onClick={() => this.getData()}>
                  {"Submit"}
                </button>
                <button
                  className={`button`}
                  onClick={() => this.handleClearFilter()}
                >
                  {"Clear"}
                </button>
              </div>
            </div>

            {arr_com_claim.map(
              (c) =>
                c.clm_create != 8 && (
                  <div className={`${styles.button}`}>
                    <button
                      className={`button`}
                      onClick={() =>
                        this.setState({
                          modalVisibility: true,
                          editable: undefined,
                          selectedData: undefined,
                        })
                      }
                    >
                      <i style={{ paddingRight: 10 }} class="fa fa-plus" />
                      {"Create"}
                    </button>
                  </div>
                )
            )}

            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Event Id</th>
                  <th>Template Name</th>
                  <th>Action</th>
                  {arr_comments_status.map(
                    (c) => c.comment_status && <th>Comments</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {err_message.length != 0 ? (
                  <div className={`noData`}>No data found</div>
                ) : (
                  arr_parentTable
                    .slice(pagesVisited, pagesVisited + PAGINATE_COUNT)
                    .map((t) => (
                      <tr
                        className={`${t.is_active == "inactive" && "isActive"}`}
                      >
                        <td>{t.evt_id}</td>
                        <td>{t.templ_name}</td>
                        <td>
                          <div className={`container`}>
                            <div className={`menuContainer`}>
                              <button
                                onClick={this.onClick(t.id)}
                                className={`menuTrigger`}
                              >
                                <i
                                  className="fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              {activeRow === t.id && (
                                <nav className={`menu active`}>
                                  <ul>
                                    <li>
                                      <div
                                        onClick={() =>
                                          this.setState({
                                            modalVisibility: true,
                                            editable: false,
                                            selectedData: t.id,
                                          })
                                        }
                                      >
                                        View Record
                                      </div>
                                    </li>
                                    {arr_com_claim.map(
                                      (c) =>
                                        c.clm_update != 12 && (
                                          <li>
                                            <div
                                              onClick={() =>
                                                this.setState({
                                                  modalVisibility: true,
                                                  editable: true,
                                                  selectedData: t.id,
                                                })
                                              }
                                            >
                                              Edit Record
                                            </div>
                                          </li>
                                        )
                                    )}
                                  </ul>
                                </nav>
                              )}
                            </div>
                          </div>
                        </td>
                        {arr_comments_status.map(
                          (a) =>
                            a.comment_status && (
                              <td>
                                <img
                                  src={"/assets/chat.png"}
                                  className={styles.iconComment}
                                  onClick={() =>
                                    this.setState({
                                      commentEditVisibility: true,
                                      editable: true,
                                      selectedData: t.id,
                                    })
                                  }
                                />
                                {"(" + t.comment_cnt + ")"}
                              </td>
                            )
                        )}
                      </tr>
                    ))
                )}
              </tbody>
            </table>

            <ReactPaginate
              previousLabel={
                <i className={`fa fa-chevron-left`} aria-hidden="true" />
              }
              nextLabel={
                <i className={`fa fa-chevron-right`} aria-hidden="true"></i>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={paginationStyle.paginationButtons}
              previousClassName={paginationStyle.preButton}
              nextClassName={paginationStyle.nextButton}
              activeClassName={paginationStyle.paginationActive}
            />

            {arr_com_claim.map(
              (c) =>
                c.clm_export == 13 && (
                  <div className={styles.excelcontainer}>
                    <ExportExcel
                      excelData={arr_exportData}
                      fileName={
                        "PF_NOTIF_WAPP_" + moment().format("DDMMYYhhmmss")
                      }
                      columnHeaders={columnHeaders}
                    />
                  </div>
                )
            )}
          </div>
        </SideMenu>
      </div>
    );
  }
}
