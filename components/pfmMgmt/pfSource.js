import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SourceHelper from "../../helper/pfmMgmt/pfSource";

export default class SampleModal extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id: 0,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      // text_src_name: "",
      // text_source_type_id: "",
      // text_version_id: "",
      // text_src_code: "",


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
    const username = global.localStorage.username;

    if (username != null && username !== undefined) {
      this.setState({
        username: username,
      });
    }

    editable !== undefined && this.getRecorddetails();
  }

  getRecorddetails() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    SourceHelper.getRecord(filter)
      .then((data) => {
        this.setState({
          // update the state of the component
          text_src_name: data[0].text_src_name,
          text_source_type_id: data[0].text_source_type_id,
          text_version_id: data[0].text_version_id,
          text_src_code: data[0].text_src_code,
          created_by: data[0].created_by,
          tnnt_id: data[0].tnnt_id,
          is_active: data[0].is_active == "active" ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async create() {
    const {
      tnnt_id,
      username,
      // task_2 : all declared variable add here
      text_src_name,
      text_source_type_id,
      text_version_id,
      text_src_code,


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
        });
        return;
      }

      const data = {
        // task_3 : add more properties to data

        src_name: text_src_name,
        src_type_id: text_source_type_id,
        version_id: text_version_id,
        src_code: text_src_code,


        created_by: username,
        tnnt_id: tnnt_id,
      };

      SourceHelper.insertRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + data.id + " created successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
            });
            this.props.setVisibility(false);
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
            });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  update() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      text_src_name,
      text_source_type_id,
      text_version_id,
      text_src_code,



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
          width: 500,
        });
        return;
      }

      const data = {
        id: id,
        // task_3 : add more properties to data

        src_name: text_src_name,
        src_type_id: text_source_type_id,
        version_id: text_version_id,
        src_code: text_src_code,

        created_by: username,
        tnnt_id: global.config.tnnt_id,
      };

      SourceHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + id + " updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
            });
            this.props.setVisibility(false);
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
            });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
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
      // task_2 : all declared variable add here

      text_src_name,
      text_source_type_id,
      text_version_id,
      text_src_code,

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
                            <p>Source Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_src_name}
                                    onChange={(e) =>
                                    this.setState({
                                        text_src_name: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_src_name</p>
                                </div>
                            )}
                            </div>
                        </div>

                        {/* <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Source Type:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_source_type_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_source_type_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>int_source_type_id</p>
                                </div>
                            )}
                            </div>
                        </div> */}

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Source Type:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_source_type_id}
                                    onChange={(e) =>
                                    this.setState({
                                        text_source_type_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_source_type_id</p>
                                </div>
                            )}
                            </div>
                        </div>

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Versioin Id:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={text_version_id}
                                    onChange={(e) =>
                                    this.setState({
                                        text_version_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_version_id</p>
                                </div>
                            )}
                            </div>
                        </div>

                        {/* <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Versioin Id:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_version_id}
                                    onChange={(e) =>
                                    this.setState({
                                        text_version_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_version_id</p>
                                </div>
                            )}
                            </div>
                        </div> */}

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Source Code:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_src_code}
                                    onChange={(e) =>
                                    this.setState({
                                        text_src_code: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>text_src_code</p>
                                </div>
                            )}
                            </div>
                        </div>

                 </div>

            {editable != false && (
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.create()
                      : editable && this.update()
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
