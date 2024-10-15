import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfApiDocument";
import DropdownHelper from "../../helper/pfmMgmt/pfDdLookup";
import FilesHelper from "../../helper/files";
import PfApihelper from "../../helper/pfmMgmt/pfApiDocument";
import DocumentModal from "../documentModal/documentModal";

export default class PfApiDocument extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id: 132,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      int_module_id: "",
      int_com_id: "",
      text_microservice_name: "",
      text_table_name: "",
      text_end_point_name: "",
      text_function_name: "",
      int_api_Method_id: "",
      int_current_status_id: "",
      text_ref_request: "",
      text_ref_response: "",
      array_modId: [],
      id_selectedModId: undefined,
      array_comId: [],
      id_selectedcomId: undefined,
      array_apiStatus: [],
      id_selectedapiStatus: undefined,
      array_apiMethod: [],
      id_selectedapiMethod: undefined,
      file_document: "",
      documentEditVisibility: false,
      file_document_view: undefined,
      text_api_method_name: "",

    };
    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.id = props.data;
    }

    this.state = {
      ...stateData,
    };
    this.filesData = {};
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
    this.getDropdown();
    editable !== undefined && this.getRecord();

  }

  getDropdown() {

    const filter = {
      is_active: "active",
    };

    DropdownHelper.getModuleId(filter)
      .then((data) => {
        console.log(data)
        this.setState({ array_modId: data });
      })
      .catch((err) => {
        console.log(err);
      });

    DropdownHelper.getComId(filter)
      .then((data) => {
        console.log(data)
        this.setState({ array_comId: data });
      })
      .catch((err) => {
        console.log(err);
      });

    DropdownHelper.getApiStatus(filter)
      .then((data) => {
        console.log(data)
        this.setState({ array_apiStatus: data });
      })
      .catch((err) => {
        console.log(err);
      });

    DropdownHelper.getApiMethod(filter)
      .then((data) => {
        console.log(data)
        this.setState({ array_apiMethod: data });
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

    PfApihelper.getRecord(filter)

      .then((data) => {

        this.setState({
          // update the state of the component

          id_selectedModId: data[0].module_id,
          mod_name: data[0].mod_name,
          id_selectedcomId: data[0].com_id,
          text_microservice_name: data[0].microservice_name,
          text_table_name: data[0].table_name,
          text_end_point_name: data[0].end_point_name,
          text_function_name: data[0].function_name,
          id_selectedapiMethod: data[0].api_method_id,
          text_api_method_name: data[0].api_method_name,
          id_selectedapiStatus: data[0].current_status_id,
          current_status_name: data[0].current_status_name,
          text_ref_request: data[0].ref_request,
          text_ref_response: data[0].ref_response,
          created_by: data[0].created_by,
          // tnnt_id: data[0].tnnt_id,
          is_active: data[0].is_active == "active" ? true : false,

          file_document: data[0].file_document,
        });
        FilesHelper.getFile(data[0].file_document)
          .then((data) => {

            this.setState({ file_document_view: data.data });
          })
          .catch((err) => {
            console.log(err);
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

      int_module_id,
      int_com_id,
      text_microservice_name,
      text_table_name,
      text_end_point_name,
      text_function_name,
      int_api_Method_id,
      int_current_status_id,
      text_ref_request,
      text_ref_response,
      file_document,
      id_selectedcomId,
      id_selectedModId,
      id_selectedapiStatus,
      id_selectedapiMethod,

    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      // if (file_document === undefined || file_document === "") {
      //   alertText += ". File\n";
      // }



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

      const check = (key, file) => {
        return (
          (file !== undefined || file != null) &&
          typeof file !== "string" &&
          (this.filesData[key] === undefined ||
            (this.filesData[key] !== undefined &&
              this.filesData[key].file == file.name))
        );
      };

      if (file_document !== undefined && file_document != null) {
        if (check("file_document", file_document)) {
          this.filesData["file_document"] = {
            file_url: (await FilesHelper.upload(file_document, "idproof", "test"))
              .data,
          };
        }
      }

      const data = {
        // task_3 : add more properties to data

        module_id: id_selectedModId,
        com_id: id_selectedcomId,
        microservice_name: text_microservice_name,
        table_name: text_table_name,
        end_point_name: text_end_point_name,
        function_name: text_function_name,
        api_method_id: id_selectedapiMethod,
        current_status_id: id_selectedapiStatus,
        ref_request: text_ref_request,
        ref_response: text_ref_response,


        lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      if (this.filesData["file_document"] !== undefined) {
        const file_name = this.filesData["file_document"].file_url;
        data.usecase9 = file_name.substring(file_name.lastIndexOf("/") + 1);
      }

      this.setState({ is_loading: true });
      PfApihelper.insertRecord(data)
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

      int_module_id,
      int_com_id,
      text_microservice_name,
      text_table_name,
      text_end_point_name,
      text_function_name,
      int_api_Method_id,
      int_current_status_id,
      text_ref_request,
      text_ref_response,
      file_document,
      id_selectedModId,
      id_selectedcomId,
      id_selectedapiStatus,
      id_selectedapiMethod,


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

      const check = (key, file) => {
        return (
          (file !== undefined || file != null) &&
          typeof file !== "string" &&
          (this.filesData[key] === undefined ||
            (this.filesData[key] !== undefined &&
              this.filesData[key].file == file.name))
        );
      };

      if (file_document !== undefined && file_document != null) {
        if (check("file_document", file_document)) {
          this.filesData["file_document"] = {
            file_url: (
              await PfApihelper.upload(file_document, file_document.name, "test")
            ).data,
          };
        }
      }

      const data = {
        id: id,
        // task_3 : add more properties to data

        module_id: id_selectedModId,
        com_id: id_selectedcomId,
        microservice_name: text_microservice_name,
        table_name: text_table_name,
        end_point_name: text_end_point_name,
        function_name: text_function_name,
        api_method_id: id_selectedapiMethod,
        current_status_id: id_selectedapiStatus,
        ref_request: text_ref_request,
        ref_response: text_ref_response,



        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: global.config.tnnt_id,
      };

      if (this.filesData["file_document"] !== undefined) {
        const file_name = this.filesData["file_document"].file_url;
        data.usecase9 = file_name.substring(file_name.lastIndexOf("/") + 1);
      } else {
        data.usecase9 = file_document;
      }

      this.setState({ is_loading: true });
      PfApihelper.updateRecord(data)
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

  getInputField(key, label, accept) {
    return (
      <div>
        <div className={`${styles.inputAlignment}`}>
          <label>{label}</label>
          <div className={styles.inputCustom}>
            <input
              type="file"
              accept={accept}
              onChange={(e) => this.checkFileSize(key, e)}
            />
          </div>
        </div>
      </div>
    );
  }

  checkFileSize = (key, e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 1024 * 1024 * 5;

    if (selectedFile && selectedFile.size > maxSize) {
      Swal.fire({
        icon: "warning",
        text: "File Size must be within 5MB",
        confirmButtonColor: Colors.primaryColor,
        allowOutsideClick: false,
      });
      e.target.value = null;
    } else {
      this.setState({ [key]: e.target.files[0] });
    }
  };

  getFileExtension = (filename) => {
    if (!filename) {
      return null;
    }

    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex === -1) {
      return null;
    }

    return filename.slice(dotIndex + 1);
  };

  handleDownload(file_data, file_name) {
    const { file_document } = this.state;

    let uint8Array;

    if (typeof file_name === "string") {
      try {
        const byteString = atob(file_data);
        const byteLength = byteString.length;
        const byteBuffer = new ArrayBuffer(byteLength);
        uint8Array = new Uint8Array(byteBuffer);

        // Convert each character in the byte string to a byte in the array
        for (let i = 0; i < byteLength; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const file_type = this.getFileExtension(file_name);

        if (uint8Array && file_type) {
          const blob = new Blob([uint8Array], {
            type: `application/${file_type}`,
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = file_name
            ? file_name.substring(file_name.lastIndexOf("/") + 1)
            : "downloaded-file";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Error decoding base64 data:", error);
        return;
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "Download is unavailable while you have a file chosen for upload.",
        confirmButtonColor: Colors.primaryColor,
        allowOutsideClick: false,
      });
      return;
    }
  }

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      is_active,
      // task_2 : all declared variable add here

      int_module_id,
      int_com_id,
      text_microservice_name,
      text_table_name,
      text_end_point_name,
      text_function_name,
      int_api_Method_id,
      int_current_status_id,
      text_ref_request,
      text_ref_response,
      array_modId,
      id_selectedModId,
      array_comId,
      id_selectedcomId,
      array_apiStatus,
      id_selectedapiStatus,
      array_apiMethod,
      id_selectedapiMethod,
      file_document,
      file_name,
      documentEditVisibility,
      file_document_view,
      selectedData,
      mod_name,
      api_Method_name,
      current_status_name,
      text_api_method_name,

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

        {documentEditVisibility && (
          <DocumentModal
            visibility={documentEditVisibility}
            setVisibility={(v) => this.setState({ documentEditVisibility: v })}
            file_name={file_name}
            data={selectedData}
          />
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

                  <p>Module ID:{" "}
                    <span
                      style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                    >
                      *
                    </span></p>
                  {editable != false ? (
                    <select
                      value={id_selectedModId}
                      onChange={(e) =>
                        this.setState({
                          id_selectedModId: e.target.value,
                        })
                      }
                    >
                      <option value={0} selected>
                        {"Select Module ID"}
                      </option>
                      {array_modId.map((p) => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{mod_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>

                  <p>Component ID:{" "}
                    <span
                      style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                    >
                      *
                    </span></p>
                  {editable != false ? (
                    <select
                      value={id_selectedcomId}
                      onChange={(e) =>
                        this.setState({
                          id_selectedcomId: e.target.value,
                        })
                      }
                    >
                      <option value={0} selected>
                        {"Select Component ID"}
                      </option>
                      {array_comId.map((p) => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{id_selectedcomId}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Microservice Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_microservice_name}
                        onChange={(e) =>
                          this.setState({
                            text_microservice_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_microservice_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Table Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_table_name}
                        onChange={(e) =>
                          this.setState({
                            text_table_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_table_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>End Point Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_end_point_name}
                        onChange={(e) =>
                          this.setState({
                            text_end_point_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_end_point_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Function Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_function_name}
                        onChange={(e) =>
                          this.setState({
                            text_function_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_function_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>

                  <p>API Method Name:{" "}
                    <span
                      style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                    >
                      *
                    </span></p>
                  {editable != false ? (
                    <select
                      value={id_selectedapiMethod}
                      onChange={(e) =>
                        this.setState({
                          id_selectedapiMethod: e.target.value,
                        })
                      }
                    >
                      <option value={0} selected>
                        {"Select API Method"}
                      </option>
                      {array_apiMethod.map((p) => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_api_method_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>

                  <p>Current Status:{" "}
                    <span
                      style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                    >
                      *
                    </span></p>
                  {editable != false ? (
                    <select
                      value={id_selectedapiStatus}
                      onChange={(e) =>
                        this.setState({
                          id_selectedapiStatus: e.target.value,
                        })
                      }
                    >
                      <option value={0} selected>
                        {"Select Current Status"}
                      </option>
                      {array_apiStatus.map((p) => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{current_status_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Reference Request:<span

                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_ref_request}
                        onChange={(e) =>
                          this.setState({
                            text_ref_request: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_ref_request}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Reference Response:<span

                  >
                    *
                  </span></p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_ref_response}
                        onChange={(e) =>
                          this.setState({
                            text_ref_response: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_ref_response}</p>
                    </div>
                  )}
                </div>
              </div>
             
              {editable == undefined &&
                this.getInputField("file_document", "usecase9: ", "application")}
                {editable && (
                <div className={styles.inputAlignment}>
                  <p className={styles.heading}>
                    usecase9:{" "}
                    <span
                      style={{
                        color: "red",
                        marginLeft: "3px",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </p>
                  <div className={styles.inputCustom}>
                    <div>
                      <label
                        htmlFor="file_document"
                        className={`button ${styles.customFileButton}`}
                      >
                        Upload New File
                        <i
                          style={{ marginLeft: 3 }}
                          className="fa fa-upload"
                          aria-hidden="true"
                        ></i>
                      </label>
                      <input
                        type="file"
                        placeholder=" "
                        id="file_document"
                        style={{ visibility: "hidden" }}
                        onChange={(e) => this.checkFileSize("file_document", e)}
                      />
                      {typeof file_document == "object" && (
                        <p>{file_document.name}</p>
                      )}
                    </div>
                    <div className={styles.documentAlignment}>
                      <div className={`${styles.buttonDownload}`}>
                        <button
                          className={`button`}
                          onClick={() =>
                            this.setState({
                              file_name: file_document,
                              selectedData: file_document_view,
                              documentEditVisibility: true,
                            })
                          }
                        >
                          View
                        </button>
                      </div>

                      <div className={`${styles.buttonDownload}`}>
                        <button
                          className={`button`}
                          onClick={(e) => this.handleDownload(file_document_view, file_document)}
                          style={{ cursor: "pointer" }}
                        >
                          Download
                          <i
                            style={{ marginLeft: 3 }}
                            className="fa fa-download"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className={styles.inputAlignment}>
            <span style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              * {"  "}  are mandatory fields
            </span>
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
    </div>
    );
  }
}
