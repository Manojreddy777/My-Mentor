import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/aim/aimTrxDet";
import CategoryDropdown from "../../helper/aim/aimDdLookup";

export default class AimTrxDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:105,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_user_name: "",
      date_trx_date: "",
      text_amount: "",
      int_category_id: "",
      int_bank_id: "",
      text_note: "",
      text_attachment1: "",
      int_trx_type_id: "",
      int_ai_assist_us_id: "",
      arr_categoryName: [],
      arr_trxType: [],
      text_categoryName: "",
      text_trxType: "",
      arr_aiAssistUc: [],
      text_aiAssistUc: "",
      arr_accountNumber: [],
      text_accountNumber: "",


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
      this.getCategoryName();
      this.getTrxType();
      this.getAiAssistUc();
      this.getAccountNumber();
    }

    editable !== undefined && this.getRecord();
  }

  getCategoryName() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
    };

    CategoryDropdown.getCategoryDet(filter)
        .then((data) => {
            this.setState({ arr_categoryName: data });
        })
        .catch((err) => {
            console.log(err);
        });
  }

getTrxType() {
  const {
      tnnt_id,
  } = this.state;

  const filter = {
      tnnt_id: tnnt_id,
  };

  CategoryDropdown.getTrxType(filter)
      .then((data) => {
          this.setState({ arr_trxType: data });
      })
      .catch((err) => {
          console.log(err);
      });
}

getAiAssistUc() {
  const {
      tnnt_id,
  } = this.state;

  const filter = {
      tnnt_id: tnnt_id,
  };

  CategoryDropdown.getAssistUc(filter)
      .then((data) => {
          this.setState({ arr_aiAssistUc: data });
      })
      .catch((err) => {
          console.log(err);
      });
}

getAccountNumber() {
  const {
      tnnt_id,
  } = this.state;

  const filter = {
      tnnt_id: tnnt_id,
  };

  CategoryDropdown.getAccountNumber(filter)
      .then((data) => {
          this.setState({ arr_accountNumber: data });
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
          // date_trx_date: data[0].trx_date,
          date_trx_date: new Date(moment(data[0].trx_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
          text_amount: data[0].amount,
          int_category_id: data[0].category_id,
          text_categoryName: data[0].category_name,
          int_bank_id: data[0].bank_id,
          text_accountNumber: data[0].account_nr,
          text_note: data[0].note,
          text_attachment1: data[0].attachment1,
          int_trx_type_id: data[0].trx_type_id,
          text_trxType: data[0].trx_type_name,
          int_ai_assist_us_id: data[0].ai_assist_us_id,
          text_aiAssistUc: data[0].ai_assist_us_name,
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
      date_trx_date,
      text_amount,
      int_category_id,
      int_bank_id,
      text_note,
      text_attachment1,
      int_trx_type_id,
      int_ai_assist_us_id,


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
        trx_date: moment(date_trx_date).format("YYYY-MM-DD"),
        amount: text_amount,
        category_id: int_category_id,
        bank_id: int_bank_id,
        note: text_note,
        attachment1: text_attachment1,
        trx_type_id: int_trx_type_id,
        ai_assist_us_id: int_ai_assist_us_id,


        lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.insertRecord(data)
        .then((data) => {
          if (data.code == 200) {
            // this.props.getData();
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
      date_trx_date,
      text_amount,
      int_category_id,
      int_bank_id,
      text_note,
      text_attachment1,
      int_trx_type_id,
      int_ai_assist_us_id,


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
        trx_date: moment(date_trx_date).format("YYYY-MM-DD"),
        amount: text_amount,
        category_id: int_category_id,
        bank_id: int_bank_id,
        note: text_note,
        attachment1: text_attachment1,
        trx_type_id: int_trx_type_id,
        ai_assist_us_id: int_ai_assist_us_id,



        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            // this.props.getData();
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
      date_trx_date,
      text_amount,
      int_category_id,
      int_bank_id,
      text_note,
      text_attachment1,
      int_trx_type_id,
      int_ai_assist_us_id,
      arr_categoryName,
      arr_trxType,
      text_categoryName,
      text_trxType,
      arr_aiAssistUc,
      text_aiAssistUc,
      arr_accountNumber,
      text_accountNumber,


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
              {editable == undefined ? "Create Transaction" : editable ? "Update Transaction" : "View Transaction"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
             <div className={styles.sideWrapper}>

                        <div className={styles.inputAlignment}>
                            <p>Transaction Date
                            <span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                                    <div className={styles.inputCustom}>
                                        <DatePicker
                                            className={styles.date}
                                            dateFormat="dd-MM-yyyy"
                                            selected={date_trx_date}
                                            onChange={(e) =>
                                                this.setState({ date_trx_date: e })
                                            }
                                        />
                                    </div>
                                </div>    
                        
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Amount:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={text_amount}
                                    onChange={(e) =>
                                    this.setState({
                                        text_amount: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_amount</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Category Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                              <select
                        value={
                          int_category_id === undefined ? 0 : int_category_id
                        }
                        onChange={(e) =>
                          this.setState({
                            int_category_id: e.target.value,
                          })
                        }
                      >
                        <option value={0} selected>
                            {"Select Category Name "}
                          </option>
                        {arr_categoryName.map((s) => (
                          <option value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.viewField}>
                        <p>{text_categoryName}</p>
                      </div>
                    )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Account:<span
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
                            {"Select Bank Account "}
                          </option>
                        {arr_accountNumber.map((s) => (
                          <option value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.viewField}>
                        <p>{text_accountNumber}</p>
                      </div>
                    )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Note:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_note}
                                    onChange={(e) =>
                                    this.setState({
                                        text_note: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_note</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Attachment1:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_attachment1}
                                    onChange={(e) =>
                                    this.setState({
                                        text_attachment1: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_attachment1</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Transaction Type ID:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                              <select
                        value={
                          int_trx_type_id === undefined ? 0 : int_trx_type_id
                        }
                        onChange={(e) =>
                          this.setState({
                            int_trx_type_id: e.target.value,
                          })
                        }
                      >
                        <option value={0} selected>
                            {"Select Transaction Type "}
                          </option>
                        {arr_trxType.map((s) => (
                          <option value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.viewField}>
                        <p>{text_trxType}</p>
                      </div>
                    )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>AI Assistance UC ID:</p>
                            {editable != false ? (
                              <select
                        value={
                          int_ai_assist_us_id === undefined ? 0 : int_ai_assist_us_id
                        }
                        onChange={(e) =>
                          this.setState({
                            int_ai_assist_us_id: e.target.value,
                          })
                        }
                      >
                        <option value={0} selected>
                            {"Select Ai Assist UC "}
                          </option>
                        {arr_aiAssistUc.map((s) => (
                          <option value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.viewField}>
                        <p>{text_aiAssistUc}</p>
                      </div>
                    )}
                            </div>
                        </div>
                            
                 </div>

            <div className={styles.inputAlignment}>
              <p className={`mandatory`}  style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}>* are mandatory fields</p>
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