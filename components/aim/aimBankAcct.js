import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/aim/aimBankAcct";
import AimDDhelper from "../../helper/aim/aimDdLookup";

export default class AimBankAcct extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:101,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_user_name: "",
      int_bank_id: "",
      txt_bank_name: "",
      text_account_nr: "xxxxxxxxx",
      text_opening_bal: "",
      arr_bankName: [],

    };
    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.user_name = props.username;
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
      this.getBankName();
    }

    editable !== undefined && this.getRecord();
  }

  getBankName() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
    };

    AimDDhelper.getBankDet(filter)
        .then((data) => {
            this.setState({ arr_bankName: data });
        })
        .catch((err) => {
            console.log(err);
        });
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
          int_bank_id: data[0].bank_id,
          txt_bank_name: data[0].bank_name,
          text_account_nr: data[0].account_nr,
          text_opening_bal: data[0].opening_bal,
          created_by: data[0].created_by, 
        //  tnnt_id: data[0].tnnt_id,
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
      int_bank_id,
      text_account_nr,
      text_opening_bal,


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

        user_name: global.config.username,
        bank_id: int_bank_id,
        account_nr: text_account_nr,
        opening_bal: text_opening_bal,


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
      int_bank_id,
      text_account_nr,
      text_opening_bal,


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

        user_name: global.config.username,
        bank_id: int_bank_id,
        account_nr: text_account_nr,
        opening_bal: text_opening_bal,



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
      int_bank_id,
      text_account_nr,
      text_opening_bal,
      arr_bankName,
      txt_bank_name


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
              {editable == undefined ? "Create Bank Account" : editable ? "Update Bank Account" : "View Bank Account"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
             <div className={styles.sideWrapper}>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Bank ID:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                              <select
                        value={
                          int_bank_id === undefined ? 0 : int_bank_id
                        }
                        onChange={(e) =>
                          this.setState({
                            int_bank_id: e.target.value,
                          })
                        }
                      >
                        <option value={0} selected>
                            {"Select Bank Name "}
                          </option>
                        {arr_bankName.map((s) => (
                          <option value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.viewField}>
                        <p>{txt_bank_name}</p>
                      </div>
                    )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Account Number:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *  <br></br><p style={{ color: "red", marginLeft: "3px", fontSize: "10px" }}>(Kindly enter only the last three digits of your act number)</p>
                            </span> </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_account_nr}
                                    onChange={(e) =>
                                    this.setState({
                                        text_account_nr: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                  <p>{text_account_nr}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Opening Balance:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_opening_bal}
                                    onChange={(e) =>
                                    this.setState({
                                        text_opening_bal: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_opening_bal}</p>
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