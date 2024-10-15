import React, { useState } from "react";
import styles from "../../styles/aim/aim_mobile_pages.module.css";
import Head from "../../components/head";
import Swal from "sweetalert2";
import moment from "moment";
import Colors from "../../constants/colors";
import Task from "../../components/aim/aimCustomDet";
import AimCustomDetHelper from "../../helper/aim/aimMyProfile";
import SideMenu from "../../components/sideMenu/sideMenu";
import Genderddlookup from "../../helper/aim/aimDdLookup";

export default class aiMentorDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_editable: false,
      component_id: 103,
      txt_username: "",
      tnnt_id: global.config.tnnt_id,
      id: "",
      date_dob: "",
      text_mobile_nr: "",
      text_email_id: "",
      int_gender: 1,
      txt_gender_name: "",
      int_membership_id: "",
      array_gender: [],
    };
  }
  componentDidMount() {
    this.getCustomDet();
    this.getGender();
  }

  getGender() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
    };

    Genderddlookup.getGenderType(filter)
      .then((data) => {
        this.setState({ array_gender: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCustomDet() {
    const { tnnt_id } = this.state;
    const filter = {
      // user_name: global.config.username,
      tnnt_id: tnnt_id,
    };
    AimCustomDetHelper.getPageDet(filter)
      .then((data) => {
        console.log(data);
        this.setState({
          txt_username: data[0].user_name,
          date_dob: data[0].dob,
          text_mobile_nr: data[0].mobile_nr,
          text_email_id: data[0].email_id,
          int_gender: data[0].gender_id,
          txt_gender_name: data[0].gender_name,
          int_membership_id: data[0].membership_id,
          created_by: data[0].created_by,
          is_active: data[0].is_active == "active" ? true : false,

          id: data[0].id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateRecord() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      date_dob,
      text_mobile_nr,
      text_email_id,
      int_gender,
      txt_username,
      int_membership_id,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation

      if (date_dob === "") {
        alertText += "* Date\n";
      }

      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {
        id: id,
        user_name: txt_username,
        dob: moment(date_dob).format("YYYY-MM-DD"),
        mobile_nr: text_mobile_nr,
        email_id: text_email_id,
        gender_id: int_gender,
        lc_status_id: 1,
        membership_id: int_membership_id,
        is_active: is_active == false ? "inactive" : "active",
        created_by: global.config.username,
        tnnt_id: global.config.tnnt_id,
      };

      this.setState({ is_loading: true });
      AimCustomDetHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.getCustomDet();
            Swal.fire({
              text: "Record Id: " + id + " updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({
              is_loading: true,
              is_editable: false,
            });
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      txt_username,
      date_dob,
      text_mobile_nr,
      text_email_id,
      int_gender,
      int_membership_id,
      is_editable,
      array_gender,
      txt_gender_name,
    } = this.state;
    return (
      <div>
        <SideMenu tag="AimCustomDet">
          <Head title="AI Mentor Details" />
          <div className={`${styles["aimPage"]}`}>
            <div className={styles.head}>AI Mentor Details</div>
            <div className={styles.tableContainer}>
              <table className={styles.holidayTable}>
                <tbody>
                  <tr>
                    <td>AI Mentor Name</td>
                    <td>
                      {is_editable ? (
                        <input
                          type="text"
                          value={txt_username}
                          onChange={(e) => {
                            this.setState({
                              txt_username: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        txt_username
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Date of Birth</td>

                    <td>
                      {is_editable ? (
                        <input
                          type="date"
                          value={date_dob}
                          onChange={(e) => {
                            this.setState({
                              date_dob: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        date_dob
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Email ID</td>
                    <td>
                      {is_editable ? (
                        <input
                          type="text"
                          value={text_email_id}
                          onChange={(e) => {
                            this.setState({
                              text_email_id: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        text_email_id
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile Number:</td>
                    <td>
                      {is_editable ? (
                        <input
                          type="number"
                          value={text_mobile_nr}
                          onChange={(e) => {
                            this.setState({
                              text_mobile_nr: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        text_mobile_nr
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>MemberShip Id:</td>
                    <td>
                      {is_editable ? (
                        <input
                          type="number"
                          value={int_membership_id}
                          onChange={(e) => {
                            this.setState({
                              int_membership_id: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        int_membership_id
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>
                      {is_editable ? (
                        <select
                          value={int_gender}
                          onChange={(e) =>
                            this.setState({
                              int_gender: e.target.value,
                            })
                          }
                        >
                          <option value={0} selected>
                            {"Select Gender "}
                          </option>
                          {array_gender.map((p) => (
                            <option value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      ) : (
                        txt_gender_name
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="Edit"
              className={`${styles.button}`}
              onClick={() => {
                this.setState({ is_editable: true });
                is_editable === true && this.updateRecord();
              }}
              style={{ float: "right" }}
            >
              {is_editable ? "Save" : "Edit"}
            </button>
          </div>
        </SideMenu>
      </div>
    );
  }
}
