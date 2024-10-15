import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfCSDet";
import UserHelper from "../../helper/user";
import TaskHelper from "../../helper/timeMgmt/tsTask";

export default class PfCSDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id: 142,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      int_clt_ref_id: "",
      text_subject: "",
      text_descr: "",
      raised_date: new Date(),
      closed_date: "",
      closed_by: "",
      uc_category_id: "",
      resolution: "",
      bug_id: "",
      cr_id: "",
      eta: "",
      arr_status: [
        {
          id: 1,
          title: "Showstopper",
          value: "Showstopper",
        },
        {
          id: 2,
          title: "High",
          value: "High",
        },
        {
          id: 3,
          title: "Medium",
          value: "Medium",
        },
        {
          id: 4,
          title: "Low",
          value: "Low",
        },
      ],
      id_selectedStatus: undefined,
      arr_csstatus: [
        {
          id: 1,
          title: "Raised",
          value: "Raised",
        },
        {
          id: 2,
          title: "Analysis",
          value: "Analysis",
        },
        {
          id: 3,
          title: "WIP",
          value: "WIP",
        },
        {
          id: 4,
          title: "Ready To Test",
          value: "Ready To Test",
        },
      ],
      id_selectedcsStatus: undefined,
      arr_user_name: [],
      idSelectedUserName: undefined,

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
    this.getUserName();
    this.getAccountName();
    editable !== undefined && this.getRecord();
  }

  getUserName() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
    };

    UserHelper.getAll(filter)
      .then((data) => {
        this.setState({ arr_user_name: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAccountName() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    TaskHelper.getRecordById(filter)
      .then((data) => {
        this.setState({
          // update the state of the component

          account_name: data[0].account_name,
          assigned_to: data[0].assigned_to,
        });
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

          int_clt_ref_id: data[0].clt_ref_id,
          text_subject: data[0].subject,
          text_descr: data[0].descr,
          raised_date: data[0].raised_date === null ? null : new Date(moment(data[0].raised_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
          closed_date: data[0].closed_date === null ? null : new Date(moment(data[0].closed_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
          closed_by: data[0].closed_by,
          uc_category_id: data[0].uc_category_id,
          resolution: data[0].resolution,
          bug_id: data[0].bug_id,
          cr_id: data[0].cr_id,
          eta: data[0].eta === null ? null : new Date(moment(data[0].eta, "DD/MM/YYYY").format("DD/MMM/YYYY")),
          id_selectedStatus: data[0].ticket_status_id,
          id_selectedcsStatus: data[0].status_id,
          idSelectedUserName: data[0].assigned_to,
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

      int_clt_ref_id,
      text_subject,
      text_descr,
      id_selectedStatus,
      raised_date,
      status_id
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (text_subject === "") {
        alertText += "* .Subject\n";
      }

      if (text_descr === "") {
        alertText += "* .Description\n";
      }

      if (id_selectedStatus === undefined) {
        alertText += "* .Severity\n";
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
        // task_3 : add more properties to data

        clt_ref_id: int_clt_ref_id,
        subject: text_subject,
        descr: text_descr,
        ticket_status_id: id_selectedStatus,
        raised_date: moment(raised_date).format("YYYY-MM-DD"),
        lc_status_id: 1,
        status_id: 1,
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

      int_clt_ref_id,
      text_subject,
      text_descr,
      raised_date,
      closed_date,
      closed_by,
      uc_category_id,
      resolution,
      bug_id,
      cr_id,
      eta,
      ticket_status_id,
      id_selectedcsStatus,
      id_selectedStatus,
      idSelectedUserName

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

        clt_ref_id: int_clt_ref_id,
        subject: text_subject,
        descr: text_descr,
        raised_date: moment(raised_date).format("YYYY-MM-DD"),
        closed_date: closed_date === null ? null : moment(closed_date).format("YYYY-MM-DD"),
        closed_by: closed_by,
        uc_category_id: uc_category_id,
        resolution: resolution,
        bug_id: bug_id,
        cr_id: cr_id,
        eta: eta === null ? null : moment(eta).format("YYYY-MM-DD"),
        ticket_status_id: id_selectedStatus,
        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: tnnt_id,
        assigned_to: idSelectedUserName,
        status_id: id_selectedcsStatus,
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

      int_clt_ref_id,
      text_subject,
      text_descr,
      raised_date,
      closed_date,
      closed_by,
      uc_category_id,
      resolution,
      bug_id,
      cr_id,
      eta,
      ticket_status_id,
      id_selectedStatus,
      arr_status,
      assigned_to,
      id_selectedcsStatus,
      arr_csstatus,
      idSelectedUserName,
      arr_user_name,
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
              {editable == undefined ? "Create Record" : editable ? "Update Record" : "View Record"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
            <div className={styles.sideWrapper}>
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Subject:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_subject}
                        onChange={(e) =>
                          this.setState({
                            text_subject: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_subject}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Description:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        inputType={"textarea"}
                        value={text_descr}
                        onChange={(e) =>
                          this.setState({
                            text_descr: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_descr}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Severity:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
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
                        {"Select Severity Status"}
                      </option>
                      {arr_status.map((s) => (
                        <option value={s.id}>{s.value}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{id_selectedStatus}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.inputAlignment}>
                <p>Raised Date:
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={raised_date}
                      onChange={(e) =>
                        this.setState({ raised_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{moment(raised_date).format("DD-MMM-YYYY")}</p>
                  </div>
                )}
              </div>

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Closed Date:
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <DatePicker
                        className={styles.date}
                        dateFormat="dd-MM-yyyy"
                        selected={closed_date}
                        onChange={(e) =>
                          this.setState({ closed_date: e })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{moment(closed_date).format("DD-MMM-YYYY")}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Closed By:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={closed_by}
                        onChange={(e) =>
                          this.setState({
                            closed_by: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{closed_by}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>UseCase Category ID:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="number"
                        value={uc_category_id}
                        onChange={(e) =>
                          this.setState({
                            uc_category_id: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{uc_category_id}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Resolution:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        inputType={"textarea"}
                        value={resolution}
                        onChange={(e) =>
                          this.setState({
                            resolution: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{resolution}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Bug ID:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="number"
                        value={bug_id}
                        onChange={(e) =>
                          this.setState({
                            bug_id: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{bug_id}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>CR ID:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="number"
                        value={cr_id}
                        onChange={(e) =>
                          this.setState({
                            cr_id: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{cr_id}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>ETA:
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <DatePicker
                        className={styles.date}
                        dateFormat="dd-MM-yyyy"
                        selected={eta}
                        onChange={(e) =>
                          this.setState({ eta: e })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{moment(eta).format("DD-MMM-YYYY")}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Assigned To:</p>
                  {editable != false ? (
                    <select
                      value={idSelectedUserName === undefined ? 0 : idSelectedUserName}
                      onChange={(e) =>
                        this.setState({
                          idSelectedUserName: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected>
                        {"Assigned To"}
                      </option>
                      {arr_user_name.map((s) => (
                        <option value={s.id}>{s.account_name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{idSelectedUserName}</p>
                    </div>
                  )}
                </div>
              )}

              {editable !== undefined && (
                <div className={styles.inputAlignment}>
                  <p>Status:</p>
                  {editable != false ? (
                    <select
                      value={
                        id_selectedcsStatus === undefined ? 0 : id_selectedcsStatus
                      }
                      onChange={(e) =>
                        this.setState({
                          id_selectedcsStatus: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected>
                        {"Select Status"}
                      </option>
                      {arr_csstatus.map((p) => (
                        <option value={p.id}>{p.value}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{id_selectedcsStatus}</p>
                    </div>
                  )}
                </div>
              )}
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
            <span style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              * {"  "} are mandatory fields
            </span>
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