import React from "react";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import PfNotifWapp from "../../helper/pfmMgmt/pfNotifWapp";
import UserClaim from "../../helper/tnntAdmin/taUserComClm";
import { PAGINATE_COUNT } from "../../constants/constants";
import Head from "../../components/head";

export default class EmailNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      com_id: 0,
      arr_com_claim: [],
      arr_parentTable: [],
      err_message: "",
    };
  }

  componentDidMount() {
    this.getClamiAccess();
    this.getPageDet();
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

  getPageDet() {
    const { tnnt_id } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
    };

    PfNotifWapp.getWhattsAppCount(filter)
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

  render() {
    const {
      arr_parentTable,
      pageNumber,
      err_message,
    } = this.state;

    const pagesVisited = pageNumber * PAGINATE_COUNT;
    const pageCount = Math.ceil(arr_parentTable.length / PAGINATE_COUNT);
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
    };

    return (
      <div>
        <SideMenu tag="pfWhattsAppStats">
          <Head title="WhattsApp Stats" />
          <div className={styles.wrapper}>
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Total number of WhattsApp</th>
                  <th>Delivered</th>
                  <th>Read</th>
                </tr>
              </thead>
              <tbody>
                {err_message.length != 0 ? (
                  <div className={`noData`}>No data found</div>
                ) : (
                  arr_parentTable
                    .slice(pagesVisited, pagesVisited + PAGINATE_COUNT)
                    .map((t) => (
                      <tr>
                        <td>{t.total_count}</td>
                        <td>{t.delivery_count}</td>
                        <td>{t.read_count}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </SideMenu>
      </div>
    );
  }
}
