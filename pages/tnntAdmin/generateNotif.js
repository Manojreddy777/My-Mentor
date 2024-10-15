import React from "react";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import SendWappHelper from "../../helper/pfmMgmt/pfNotifWapp";
import SendMailHelper from "../../helper/pfmMgmt/pfNotifEmail";
import Head from "../../components/head";

export default class GenNotif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsEditVisibility: false,
      selectedData: undefined,
      pageNumber: 0,
      com_id: 84,
      tnnt_id: global.config.tnnt_id,
      arr_data: [],
    };
  }

  componentDidMount() {
    const username = global.localStorage.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.localStorage.tnnt_id,
      });
    }
  }

  sendWappMessage() {
    SendWappHelper.genWapp()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  sendEmail() {
    SendMailHelper.genEmail()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { arr_data, pageNumber, editable } = this.state;

    const pagesVisited = pageNumber * PAGINATE_COUNT;
    const pageCount = Math.ceil(arr_data.length / PAGINATE_COUNT);
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
    };

    return (
      <div>
        <SideMenu tag="generateNotif">
          <Head title="Generate Notification" />

          <div className={styles.wrapper}>
            <div className={`${styles.viewWrapper}`}>
              <div className={`${styles.button}`}>
                <button
                  className={`button`}
                  onClick={() => this.sendWappMessage()}
                >
                  {"Send WhattsApp Message"}
                </button>
              </div>
              <div className={`${styles.button}`}>
                <button className={`button`} onClick={() => this.sendEmail()}>
                  {"Send Mail"}
                </button>
              </div>
            </div>
          </div>
        </SideMenu>
      </div>
    );
  }
}
