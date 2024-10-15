import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/aim/aimMyProfile";

export default class AimMyProfile extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:104,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_user_name: "",
      date_dob: "",
      text_mobile_nr: "",
      text_email_id: "",
      int_gender: "",
      int_membership_id: "",


    };
    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.id = props.data;
    }

    this.state = {
      ...stateData,
    };
  }
  componentDidMount() {
    const { editable } = this.state;
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    editable !== undefined && this.getRecord();
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    SampleHelper.getRecord(filter)
      .then((data) => {
        this.setState({
          // update the state of the component

          text_user_name: data[0].user_name,
          date_dob: data[0].date_dob == null
          ? ""
          : new Date(moment(data[0].dob).format("DD/MMM/YYYY")),
          text_mobile_nr: data[0].mobile_nr,
          text_email_id: data[0].email_id,
          int_gender: data[0].gender,
          int_membership_id: data[0].membership_id,
          created_by: data[0].created_by, 
          // tnnt_id: data[0].tnnt_id,
          is_active: data[0].is_active == "active" ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async insertRecord() {
    const {
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      text_user_name,
      date_dob,
      text_mobile_nr,
      text_email_id,
      int_gender,
      int_membership_id,


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
        // task_3 : add more properties to data

        user_name: text_user_name,
        dob: date_dob,
        mobile_nr: text_mobile_nr,
        email_id: text_email_id,
        gender: int_gender,
        membership_id: int_membership_id,


        lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.insertRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + data.id + " created successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: false });
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

  async updateRecord() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      text_user_name,
      date_dob,
      text_mobile_nr,
      text_email_id,
      int_gender,
      int_membership_id,


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
        // task_3 : add more properties to data

        user_name: text_user_name,
        dob: date_dob,
        mobile_nr: text_mobile_nr,
        email_id: text_email_id,
        gender: int_gender,
        membership_id: int_membership_id,



        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + id + " updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: true });
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
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      is_active,
      // task_2 : all declared variable add here

      text_user_name,
      date_dob,
      text_mobile_nr,
      text_email_id,
      int_gender,
      int_membership_id,


    } = this.state;

    return (
      <div className={styles.mainWrapper}>
        {is_loading && (
          <div className={"loadingWrapper"}>
            <div className={"innerLoadingWrapper"}>
              <div class="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>
              {editable == undefined ? "Create" : editable ? "Update" : "View"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
             <div className={styles.sideWrapper}>

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>User Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_user_name}
                                    onChange={(e) =>
                                    this.setState({
                                        text_user_name: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_user_name</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.inputAlignment}>
                            <p>Date of Birth
                            <span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                                    <div className={styles.inputCustom}>
                                        <DatePicker
                                            className={styles.date}
                                            dateFormat="dd-MM-yyyy"
                                            selected={date_dob}
                                            onChange={(e) =>
                                                this.setState({ date_dob: e })
                                            }
                                        />
                                    </div>
                                </div>    
                        
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Mobile Number:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_mobile_nr}
                                    onChange={(e) =>
                                    this.setState({
                                        text_mobile_nr: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_mobile_nr</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Email ID:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_email_id}
                                    onChange={(e) =>
                                    this.setState({
                                        text_email_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_email_id</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Gender:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_gender}
                                    onChange={(e) =>
                                    this.setState({
                                        int_gender: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>int_gender</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Membership ID:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_membership_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_membership_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>int_membership_id</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                 </div>

            <div className={styles.inputAlignment}>
              <p className={`mandatory`}>* are mandatory fields</p>
            </div>
            <div
              className={styles.inputAlignment}
              style={{
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              {editable !== undefined && (
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={is_active}
                      onChange={(e) =>
                        this.setState({
                          is_active: e.target.checked,
                        })
                      }
                      disabled={editable == false}
                    />
                    <span className="slider round"></span>
                  </label>
                  <p className={styles.statusText}>
                    {is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              )}
            </div>
            {editable != false && (
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.insertRecord()
                      : editable && this.updateRecord()
                  }
                >
                  {editable == undefined ? "Create" : editable && "Update"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}