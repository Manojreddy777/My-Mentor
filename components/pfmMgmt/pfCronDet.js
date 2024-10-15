import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfCronDet";


export default class CommScheduler extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:76,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_collect_name: "",
      int_value_type_id: undefined,
      int_collect_of_id: undefined,
      text_function_name: "",
      text_descr: "",
      int_lc_status_id: "",
      arr_valueType: [],
      arr_collectOf: [],


      sch_minute: "*",
      sch_hour: "*",
      sch_day: "*",
      sch_month: "*",
      sch_week: "*",
      process_id: ""

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
    // this.getDropDown();
    editable !== undefined && this.getRecord();
  }

  // getDropDown() {
  //   const {
  //     tnnt_id,
  //   } = this.state;

  //   const filter = {
  //     tnnt_id: tnnt_id,
  //   };

  //   DdValues.getValueType(filter)
  //     .then((data) => {
  //       this.setState({ arr_valueType: data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   DdValues.getCollectOf(filter)
  //     .then((data) => {
  //       this.setState({ arr_collectOf: data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
         
          sch_minute: data[0].sch_minute,
          sch_hour: data[0].sch_hour,
          sch_day: data[0].sch_day,
          sch_month: data[0].sch_month,
          sch_week: data[0].sch_week,
          process_id: data[0].process_id,
          int_lc_status_id: data[0].lc_status_id,
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

      sch_minute, 
      sch_hour, 
      sch_day, 
      sch_month, 
      sch_week, 
      process_id


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (sch_minute === "") {
        alertText += "* .Minute\n";
      }
      if (sch_hour === "") {
        alertText += "* .Hour\n";
      }
      if (sch_day === "") {
        alertText += "* .Day\n";
      }
      if (sch_month === "") {
        alertText += "* .Month\n";
      }
      if (sch_week === "") {
        alertText += "* .Week\n";
      }
      if (process_id === "") {
        alertText += "* .Process\n";
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
        sch_minute: sch_minute,
        sch_hour: sch_hour,
        sch_day: sch_day,
        sch_month: sch_month,
        sch_week: sch_week,
        process_id: process_id,

        lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };
      console.log(data)

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

      sch_minute, 
      sch_hour, 
      sch_day, 
      sch_month, 
      sch_week, 
      process_id,
      lc_status_id,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (sch_minute === "") {
        alertText += "* .Minute\n";
      }
      if (sch_hour === "") {
        alertText += "* .Hour\n";
      }
      if (sch_day === "") {
        alertText += "* .Day\n";
      }
      if (sch_month === "") {
        alertText += "* .Month\n";
      }
      if (sch_week === "") {
        alertText += "* .Week\n";
      }
      if (process_id === "") {
        alertText += "* .Process\n";
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
        // task_3 : add more properties to data

        sch_minute: sch_minute,
        sch_hour: sch_hour,
        sch_day: sch_day,
        sch_month: sch_month,
        sch_week: sch_week,
        process_id: process_id,

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

      text_collect_name,
      int_value_type_id,
      int_collect_of_id,
      text_function_name,
      text_descr,
      int_lc_status_id,
      arr_valueType,
      arr_collectOf,
      value_type_name,
      collect_of_name,

      sch_minute, 
      sch_hour, 
      sch_day, 
      sch_month, 
      sch_week, 
      process_id,

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
              {editable == undefined ? "Create Scheduler" : editable ? "Update Scheduler" : "View Scheduler"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
            <div className={styles.sideWrapper}>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Minute:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={sch_minute}
                        onChange={(e) =>
                          this.setState({
                            sch_minute: e.target.value,
                          })
                        }
                      />
                      {(!sch_minute.match(/^\+?[0-9,*,/,,,-]*$/) && sch_minute.trim() !== "") && (
                        <p className={styles.validationError}>
                            Invalid input. Only numbers and '*,-/' symbol are allowed.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sch_minute}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Hour:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={sch_hour}
                        onChange={(e) =>
                          this.setState({
                            sch_hour: e.target.value,
                          })
                        }
                      />
                      {(!sch_hour.match(/^\+?[0-9,*,/,,,-]*$/) && sch_hour.trim() !== "") && (
                        <p className={styles.validationError}>
                            Invalid input. Only numbers and '*,-/' symbol are allowed.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sch_hour}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Day:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={sch_day}
                        onChange={(e) =>
                          this.setState({
                            sch_day: e.target.value,
                          })
                        }
                      />
                      {(!sch_day.match(/^\+?[0-9,*,/,,,-]*$/) && sch_day.trim() !== "") && (
                        <p className={styles.validationError}>
                            Invalid input. Only numbers and '*,-/' symbol are allowed.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sch_day}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Month:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={sch_month}
                        onChange={(e) =>
                          this.setState({
                            sch_month: e.target.value,
                          })
                        }
                      />
                      {(!sch_month.match(/^\+?[0-9,*,/,,,-]*$/) && sch_month.trim() !== "") && (
                        <p className={styles.validationError}>
                           Invalid input. Only numbers and '*,-/' symbol are allowed.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sch_month}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Week:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={sch_week}
                        onChange={(e) =>
                          this.setState({
                            sch_week: e.target.value,
                          })
                        }
                      />
                      {(!sch_week.match(/^\+?[0-9,*,/,,,-]*$/) && sch_week.trim() !== "") && (
                        <p className={styles.validationError}>
                          Invalid input. Only numbers and '*,-/' symbol are allowed.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sch_week}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Process:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="number"
                        value={process_id}
                        onChange={(e) =>
                          this.setState({
                            process_id: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{process_id}</p>
                    </div>
                  )}
                </div>
              </div>

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
            <div>
              <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>* are mandatory fields</p>
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