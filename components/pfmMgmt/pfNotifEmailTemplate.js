import React from "react";
import styles from "./pfMgmt.module.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import DocumentModal from "../documentModal/documentModal";
import PfEmailTemplateHelper from "../../helper/pfmMgmt/pfNotifEmailTemplate";
import ddLookupHelper from "../../helper/ddLookup";
import FilesHelper from "../../helper/files";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      editable: undefined,
      id: "",
      arr_events: [],
      id_selectedEvent: undefined,
      txt_file_name: "",
      txt_email_subject: "",
      email_attachment1: "",
      email_attachment2: "",
      file_resume: "",
      file_document_view: undefined,
      view_attachment1: undefined,
      view_attachment2: undefined,
      is_loading: false,
      documentEditVisibility: false,
      selectedData: undefined,
      file_name: undefined,
      com_id: 74,
      is_active: true,
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
    const username = global.localStorage.username;

    if (username != null && username !== undefined) {
      this.setState({
        username: username,
      });
    }

    this.getForDropDown();

    editable !== undefined && this.getRecord();
    // editable == false && document.getElementById("editableContent").contentEditable = true;
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    PfEmailTemplateHelper.getRecord(filter)
      .then((data) => {
        this.setState({
          id_selectedEvent: data[0].event_id,
          txt_file_name: data[0].templ_name,
          txt_email_subject: data[0].email_sub,
          email_attachment1: data[0].email_attachment1,
          email_attachment2: data[0].email_attachment2,
          file_resume: data[0].email_content,
          is_active: data[0].is_active == "active" ? true : false,
        });

        FilesHelper.getFile(data[0].email_content)
          .then((data) => {
            this.setState({ file_document_view: data.data });
          })
          .catch((err) => {
            console.log(err);
          });

        FilesHelper.getFile(data[0].email_attachment1)
          .then((data) => {
            this.setState({ view_attachment1: data.data });
          })
          .catch((err) => {
            console.log(err);
          });

        FilesHelper.getFile(data[0].email_attachment2)
          .then((data) => {
            this.setState({ view_attachment2: data.data });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getForDropDown() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: "active",
      channel_email: 2,
    };

    ddLookupHelper
      .getEvent(filter)
      .then((data) => {
        this.setState({ arr_events: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  imageHandler = (e, key) => {
    const data = {};
    data[key] = e.target.files[0];
    this.setState(data);
  };

  async create() {
    const {
      id_selectedEvent,
      txt_email_subject,
      txt_file_name,
      file_resume,
      email_attachment1,
      email_attachment2,
      username,
      tnnt_id,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedEvent === undefined) {
        alertText += ". Event\n";
      }

      if (txt_email_subject === "") {
        alertText += ". Email Subject\n";
      }

      if (txt_file_name === "") {
        alertText += ". Template Name\n";
      }

      if (file_resume === undefined || file_resume === "") {
        alertText += ". File\n";
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

      const check = (key, file) => {
        return (
          (file !== undefined || file != null) &&
          typeof file !== "string" &&
          (this.filesData[key] === undefined ||
            (this.filesData[key] !== undefined &&
              this.filesData[key].file == file.name))
        );
      };

      if (file_resume !== undefined && file_resume != null) {
        if (check("file_resume", file_resume)) {
          this.filesData["file_resume"] = {
            file_url: (
              await FilesHelper.upload(file_resume, "email_template", "test")
            ).data,
          };
        }
      }

      if (email_attachment1 !== undefined && email_attachment1 != null) {
        if (check("email_attachment1", email_attachment1)) {
          this.filesData["email_attachment1"] = {
            file_url: (
              await FilesHelper.upload(
                email_attachment1,
                "email_attachment",
                "test"
              )
            ).data,
          };
        }
      }

      if (email_attachment2 !== undefined && email_attachment2 != null) {
        if (check("email_attachment2", email_attachment2)) {
          this.filesData["email_attachment2"] = {
            file_url: (
              await FilesHelper.upload(
                email_attachment2,
                "email_attachment",
                "test"
              )
            ).data,
          };
        }
      }

      const data = {
        event_id: id_selectedEvent,
        templ_name: txt_file_name,
        email_sub: txt_email_subject,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      if (this.filesData["file_resume"] !== undefined) {
        const file_name = this.filesData["file_resume"].file_url;
        data.email_content = file_name.substring(
          file_name.lastIndexOf("/") + 1
        );
      }

      if (this.filesData["email_attachment1"] !== undefined) {
        const email_attachment1 = this.filesData["email_attachment1"].file_url;
        data.email_attachment1 = email_attachment1.substring(
          email_attachment1.lastIndexOf("/") + 1
        );
      }

      if (this.filesData["email_attachment2"] !== undefined) {
        const email_attachment2 = this.filesData["email_attachment2"].file_url;
        data.email_attachment2 = email_attachment2.substring(
          email_attachment2.lastIndexOf("/") + 1
        );
      }

      this.setState({ is_loading: true });
      PfEmailTemplateHelper.insertRecord(data)
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
          this.setState({ is_loading: false });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async update() {
    const {
      id,
      id_selectedEvent,
      txt_file_name,
      txt_email_subject,
      file_resume,
      email_attachment1,
      email_attachment2,
      username,
      tnnt_id,
      is_active,
    } = this.state;

    this.setState({ is_loading: true });

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedEvent === undefined) {
        alertText += ". Event\n";
      }

      if (txt_file_name === "") {
        alertText += ". Template Name\n";
      }

      if (txt_email_subject === "") {
        alertText += ". Email Subject\n";
      }

      if (file_resume === undefined || file_resume === "") {
        alertText += ". File\n";
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

      const check = (key, file) => {
        return (
          (file !== undefined || file != null) &&
          typeof file !== "string" &&
          (this.filesData[key] === undefined ||
            (this.filesData[key] !== undefined &&
              this.filesData[key].file == file.name))
        );
      };

      if (file_resume !== undefined && file_resume != null) {
        if (check("file_resume", file_resume)) {
          this.filesData["file_resume"] = {
            file_url: (
              await FilesHelper.upload(file_resume, "email_template", "test")
            ).data,
          };
        }
      }

      if (email_attachment1 !== undefined && email_attachment1 != null) {
        if (check("email_attachment1", email_attachment1)) {
          this.filesData["email_attachment1"] = {
            file_url: (
              await FilesHelper.upload(
                email_attachment1,
                "email_attachment",
                "test"
              )
            ).data,
          };
        }
      }

      if (email_attachment2 !== undefined && email_attachment2 != null) {
        if (check("email_attachment2", email_attachment2)) {
          this.filesData["email_attachment2"] = {
            file_url: (
              await FilesHelper.upload(
                email_attachment2,
                "email_attachment",
                "test"
              )
            ).data,
          };
        }
      }

      const data = {
        template_details: {
          id: id,
          event_id: id_selectedEvent,
          templ_name: txt_file_name,
          email_sub: txt_email_subject,
          created_by: username,
          is_active: is_active == false ? "inactive" : "active",
        },
        file_details: {
          file_content: document.getElementById("preview-element").innerHTML,
          file_name: file_resume,
          file_path: "test",
        },
      };

      if (this.filesData["file_resume"] !== undefined) {
        const file_name = this.filesData["file_resume"].file_url;
        data.template_details.email_content = file_name.substring(
          file_name.lastIndexOf("/") + 1
        );
      }

      if (this.filesData["email_attachment1"] !== undefined) {
        const email_attachment1 = this.filesData["email_attachment1"].file_url;
        data.template_details.email_attachment1 = email_attachment1.substring(
          email_attachment1.lastIndexOf("/") + 1
        );
      }

      if (this.filesData["email_attachment2"] !== undefined) {
        const email_attachment2 = this.filesData["email_attachment2"].file_url;
        data.template_details.email_attachment2 = email_attachment2.substring(
          email_attachment2.lastIndexOf("/") + 1
        );
      }

      this.setState({ is_loading: true });
      PfEmailTemplateHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              //   text: "Record Id: " + id + " updated successfully.",
              text: " Updated successfully.",
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
          this.setState({ is_loading: false });
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

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      arr_events,
      id_selectedEvent,
      txt_file_name,
      txt_email_subject,
      is_active,
      file_resume,
      email_attachment1,
      email_attachment2,
      documentEditVisibility,
      file_document_view,
      view_attachment1,
      view_attachment2,
      is_loading,
      selectedData,
      file_name,
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
              {editable == undefined
                ? "Upload Email Template"
                : editable
                ? "Update Email Template"
                : "View Email Template"}
            </p>

            <div className={`borderColorMan ${styles.inputAlignment}`}>
              <p>Event:</p>
              {editable != false ? (
                <select
                  value={id_selectedEvent}
                  onChange={(e) =>
                    this.setState({ id_selectedEvent: e.target.value })
                  }
                >
                  <option value={0} disabled selected>
                    {"Select Template"}
                  </option>
                  {arr_events.map((p) => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                </select>
              ) : (
                arr_events.map(
                  (p) =>
                    p.id == id_selectedEvent && (
                      <div className={styles.viewField}>
                        <p>{p.name}</p>
                      </div>
                    )
                )
              )}
            </div>

            <div className={styles.inputAlignment}>
              <p>Template Name:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput
                    value={txt_file_name}
                    onChange={(e) =>
                      this.setState({
                        txt_file_name: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{txt_file_name}</p>
                </div>
              )}
            </div>

            <div className={styles.inputAlignment}>
              <p>Email Subject:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput
                    value={txt_email_subject}
                    onChange={(e) =>
                      this.setState({
                        txt_email_subject: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{txt_email_subject}</p>
                </div>
              )}
            </div>

            {editable == undefined &&
              this.getInputField("email_attachment1", "Attachment1: ", ".pdf")}

            {editable && (
              <div className={styles.inputAlignment}>
                <p className={styles.heading}>Attachment1:</p>
                <div className={styles.inputCustom}>
                  <div>
                    <label
                      htmlFor="email_attachment1"
                      className={`button ${styles.customFileButton}`}
                    >
                      Upload New File
                      <i
                        style={{ marginLeft: 3 }}
                        class="fa fa-upload"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <input
                      type="file"
                      placeholder=" "
                      id="email_attachment1"
                      style={{ visibility: "hidden" }}
                      accept="application/pdf"
                      onChange={(e) =>
                        this.checkFileSize("email_attachment1", e)
                      }
                    />

                    {typeof email_attachment1 == "object" && (
                      <p>
                        {email_attachment1 != null && email_attachment1.name}
                      </p>
                    )}
                  </div>
                  {email_attachment1 != null && (
                    <div className={styles.documentAlignment}>
                      <div className={`${styles.buttonDownload}`}>
                        <button
                          className={`button`}
                          onClick={() =>
                            this.setState({
                              selectedData: view_attachment1,
                              file_name: email_attachment1,
                              documentEditVisibility: true,
                            })
                          }
                        >
                          View
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {email_attachment1 != null && editable == false && (
              <div className={styles.inputAlignment}>
                <p className={styles.heading}>Attachment1:</p>
                <div className={styles.documentAlignment}>
                  <div className={`${styles.buttonDownload}`}>
                    <button
                      className={`button`}
                      onClick={() =>
                        this.setState({
                          selectedData: view_attachment1,
                          file_name: email_attachment1,
                          documentEditVisibility: true,
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}

            {editable == undefined &&
              this.getInputField("email_attachment2", "Attachment2: ", ".pdf")}

            {editable && (
              <div className={styles.inputAlignment}>
                <p className={styles.heading}>Attachment2:</p>
                <div className={styles.inputCustom}>
                  <div>
                    <label
                      htmlFor="email_attachment2"
                      className={`button ${styles.customFileButton}`}
                    >
                      Upload New File
                      <i
                        style={{ marginLeft: 3 }}
                        class="fa fa-upload"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <input
                      type="file"
                      placeholder=" "
                      id="email_attachment2"
                      style={{ visibility: "hidden" }}
                      accept="application/pdf"
                      onChange={(e) =>
                        this.checkFileSize("email_attachment2", e)
                      }
                    />

                    {typeof email_attachment2 == "object" && (
                      <p>
                        {email_attachment2 != null && email_attachment2.name}
                      </p>
                    )}
                  </div>
                  {email_attachment2 != null && (
                    <div className={styles.documentAlignment}>
                      <div className={`${styles.buttonDownload}`}>
                        <button
                          className={`button`}
                          onClick={() =>
                            this.setState({
                              selectedData: view_attachment2,
                              file_name: email_attachment2,
                              documentEditVisibility: true,
                            })
                          }
                        >
                          View
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {email_attachment2 != null && editable == false && (
              <div className={styles.inputAlignment}>
                <p className={styles.heading}>Attachment2:</p>
                <div className={styles.documentAlignment}>
                  <div className={`${styles.buttonDownload}`}>
                    <button
                      className={`button`}
                      onClick={() =>
                        this.setState({
                          selectedData: view_attachment2,
                          file_name: email_attachment2,
                          documentEditVisibility: true,
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}

            {editable == undefined &&
              this.getInputField("file_resume", "Email Template: ", ".html")}

            <div
              // style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html:
                  editable == true
                    ? file_document_view
                    : file_document_view
                    ? file_document_view.replace(
                        /contenteditable="plaintext-only"/g,
                        ""
                      )
                    : "",
              }}
              id="preview-element"
              // dangerouslySetInnerHTML={{ __html: file_document_view }}
            />

            <div
              className={styles.inputAlignment}
              style={{
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              {editable && (
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
