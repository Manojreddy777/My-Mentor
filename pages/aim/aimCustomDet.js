import React, { useState } from "react";
import styles from "../../styles/aim/aim_mobile_pages.module.css";
import Head from "../../components/head";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import Task from "../../components/aim/aimCustomDet";
import AimCustomDetHelper from "../../helper/aim/aimCustomDet";
import SideMenu from "../../components/sideMenu/sideMenu";

export default class aiMentorDet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_editable: false,
      component_id: 103,
      txt_username: global.config.username,
      tnnt_id: global.config.tnnt_id,
      id: "",
      ai_mentor_name: "",
      ai_refer_me_as: "",
    };
  }
  componentDidMount() {
    this.getCustomDet();
  }

  getCustomDet() {
    const { tnnt_id } = this.state;
    const filter = {
      user_name: global.config.username,
      tnnt_id: tnnt_id,
    };
    AimCustomDetHelper.getPageDet(filter)
      .then((data) => {
        this.setState({
          ai_mentor_name: data[0].ai_mentor_name,
          ai_refer_me_as: data[0].ai_refer_me_as,
          id: data[0].id
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
      // task_2 : all declared variable add here

      text_user_name,
      ai_mentor_name,
      ai_refer_me_as,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation



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
        user_name: global.config.username,
        ai_mentor_name: ai_mentor_name,
        ai_refer_me_as: ai_refer_me_as,
        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: global.config.username,
        tnnt_id: global.config.tnnt_id,
      };
      console.log(data)

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
              is_editable: false
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
      ai_mentor_name,
      ai_refer_me_as,
      is_editable,
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
                          value={ai_mentor_name}
                          onChange={(e) => {

                            this.setState({
                              ai_mentor_name: e.target.value
                            });
                          }}
                        />
                      ) : (
                        ai_mentor_name
                      )}
                    </td>

                  </tr>

                  <tr>
                    <td>AI Refer Me As</td>

                    <td>
                      {is_editable ? (
                        <input
                          type="text"
                          value={ai_refer_me_as}
                          onChange={(e) => {
                            this.setState({
                              ai_refer_me_as: e.target.value
                            });
                          }}
                        />
                      ) : (
                        ai_refer_me_as
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
