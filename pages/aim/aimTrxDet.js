import React, { useState } from "react";
import styles from "../../styles/aim/aim_mobile_pages.module.css";
import Head from "../../components/head";
import Task from "../../components/aim/aimTrxDet";
import AimTrxDetHelper from "../../helper/aim/aimTrxDet";
import moment from "moment";
import SideMenu from "../../components/sideMenu/sideMenu";

export default class trxDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      is_trxDetVisibility: false,
      id_selectedData: undefined,
      is_editable: false,
      id_selectedTab: 1,
      component_id: 105,
      arr_txnperiod: [
        { id: 1, txnperiod: "Last Month" },
        { id: 2, txnperiod: "1 Year" },
      ],
      arr_trxDet: [],
      txt_username: global.config.username,
      id_tnnt: global.config.tnnt_id,
    };

    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {
    this.getTrxDet();
  }

  getTrxDet() {
    const { id_tnnt, id_selectedTab } = this.state;
    const filter = {
      tnnt_id: 9, // todo remove hardcoded value
    };

    AimTrxDetHelper.getPageDet(filter)
      .then((data) => {
        console.log(data);
        this.setState({ arr_trxDet: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddTransaction = () => {
    const {
      id_selectedTab,
      is_trxDetVisibility,
      id_selectedData,
      is_editable,
    } = this.state;

    if (id_selectedTab === 1) {
      console.log("hi");
    } else if (id_selectedTab === 2) {
      console.log("hello");
    }
  };

  render() {
    const {
      is_trxDetVisibility,
      id_selectedData,
      is_editable,
      arr_txnperiod,
      id_selectedTxnPeriod,
      id_selectedTab,
      arr_trxDet,
      arr_parentTable,
    } = this.state;

    return (
      <div>
        {is_trxDetVisibility && (
          <Task
            // visibility={is_trxDetVisibility}
            // setVisibility={(v) => this.setState({ is_trxDetVisibility: v })}
            // data={id_selectedData}
            // is_editable={is_editable}
            data={id_selectedData}
            editable={is_editable}
            visibility={is_trxDetVisibility}
            setVisibility={(v) =>
                this.setState({ is_trxDetVisibility: v })
            }
            // getData={() => this.getTrStaff()}
          />
        )}
        <SideMenu tag="AimTransactionDet">
          <Head title="Transaction Details" />
          <div className={`${styles["aimPage"]}`}>
            <div className={`${styles["pageHead"]}`}>
              <div className={`${styles["pageHeadLeft"]}`}>
                {/* Dropdown field */}
                <select
                  value={id_selectedTxnPeriod}
                  onChange={(e) =>
                    this.setState({
                      id_selectedTxnPeriod: e.target.value,
                    })
                  }
                >
                  <option value={0} disabled selected>
                    {"Select Transaction Period"}
                  </option>
                  {arr_txnperiod.map((b) => (
                    <option value={b.id}>{b.txnperiod}</option>
                  ))}
                </select>
              </div>
              <div className={`${styles["pageHeadRight"]}`}>
                <div className={styles["search-bar"]}>
                  <input type="text" placeholder="Search..." />
                  <i className={`fa fa-search ${styles["search-icon"]}`} />
                </div>
              </div>
            </div>
            <div className={`${styles["pageBody"]}`}>
              <div className={styles["tab-container"]}>
                <div className={styles["tab-header"]}>
                  {/* Tab 1 */}
                  <div
                    className={`${styles.tab} ${
                      id_selectedTab === 1 ? styles.active : ""
                    }`}
                    onClick={() => this.setState({ id_selectedTab: 1 })}
                  >
                    Draft Transaction
                  </div>
                  {/* Tab 2 */}
                  <div
                    className={`${styles.tab} ${
                      id_selectedTab === 2 ? styles.active : ""
                    }`}
                    onClick={() => this.setState({ id_selectedTab: 2 })}
                  >
                    Submitted Transaction
                  </div>
                </div>
              </div>

              <div className={`${styles.tabContent}`}>
                {id_selectedTab === 1 && (
                  <div className={styles.tableContainer}>
                    <table className={styles.holidayTable}>
                      <tr>
                        <th>TRX Date</th>
                        <th>Category Name</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                      <tbody>
                        {arr_trxDet.map((a) => (
                          <tr>
                            <td>{a.trx_date}</td>
                            <td>{a.category_name}</td>
                            <td>{a.amount}</td>
                            <td>
                              <img
                                src={"/assets/write.png"}
                                className={styles.icon}
                                onClick={() =>
                                  this.setState({
                                    is_trxDetVisibility: true,
                                    is_editable: true,
                                    id_selectedData: a.id,
                                  })
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Content for Tab 2 */}
                {id_selectedTab === 2 && (
                  <div className={styles.tableContainer}>
                    <table className={styles.holidayTable}>
                      <tr>
                        <th>TRX Date</th>
                        <th>Category Name</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                      <tbody></tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles["pageFooterContainer"]}`}>
              <button
                className={`${styles["footerButton"]}`}
                onClick={() =>
                  this.setState({
                    is_trxDetVisibility: true,
                    is_editable: false,
                    id_selectedData: undefined,
                  })
                }
              >
                <i style={{ paddingRight: 10 }} class="fa fa-plus" />
                Add Transaction
              </button>
            </div>
          </div>
        </SideMenu>
      </div>
    );
  }
}
