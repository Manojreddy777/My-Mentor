import React from "react";
import styles from "./pfMgmt.module.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import PfNotifWapp from "../../helper/pfmMgmt/pfNotifWappTemplate";
import ddLookupHelper from "../../helper/ddLookup";

export default class WhattsAppTemplateModal extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      editable: undefined,
      arr_events: [],
      id_selectedEvent: undefined,
      arr_header_type: [],
      id_selectedHeader: undefined,
      txt_template_name: "",
      txt_message: "",
      txt_header: "",
      txt_header_image: "",
      is_loading: false,
      selectedData: undefined,
      com_id: 75,
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

    editable !== undefined && this.getRecord();
    this.getEvents();
    this.getHeaderType();
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    PfNotifWapp.getRecord(filter)
      .then((data) => {
        console.log(data);
        this.setState({
          txt_message: data[0].msg_content,
          txt_template_name: data[0].templ_name,
          id_selectedEvent: data[0].evt_id,
          id_selectedHeader: data[0].msg_header_type_id,
          txt_header: data[0].msg_header,
          txt_header_image: data[0].msg_image_url,
          is_active: data[0].is_active == "active" ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getEvents() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: "active",
      channel_wapp: 2,
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

  getHeaderType() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: "active",
    };

    ddLookupHelper
      .getHeaderType(filter)
      .then((data) => {
        console.log(data);
        this.setState({ arr_header_type: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async create() {
    const {
      username,
      tnnt_id,
      id_selectedEvent,
      id_selectedHeader,
      txt_template_name,
      txt_message,
      txt_header,
      txt_header_image,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedEvent === undefined) {
        alertText += ". Event Id\n";
      }

      if (txt_template_name === "") {
        alertText += ". Template\n";
      }

      if (id_selectedHeader === undefined) {
        alertText += ". Header Type\n";
      }

      if (txt_message === "") {
        alertText += ". Message Content\n";
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
        evt_id: id_selectedEvent,
        templ_name: txt_template_name,
        msg_content: txt_message,
        msg_header_type_id: id_selectedHeader,
        msg_header: txt_header,
        msg_image_url: txt_header_image,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      PfNotifWapp.insertRecord(data)
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
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
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

  async update() {
    const {
      id,
      username,
      tnnt_id,
      id_selectedEvent,
      id_selectedHeader,
      txt_template_name,
      txt_message,
      txt_header,
      txt_header_image,
      is_active,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedEvent === undefined) {
        alertText += ". Event Id\n";
      }

      if (txt_template_name === "") {
        alertText += ". Template\n";
      }

      if (id_selectedHeader === undefined) {
        alertText += ". Header Type\n";
      }

      if (txt_message === "") {
        alertText += ". Message Content\n";
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
        evt_id: id_selectedEvent,
        templ_name: txt_template_name,
        msg_content: txt_message,
        msg_header_type_id: id_selectedHeader,
        msg_header: txt_header,
        msg_image_url: txt_header_image,
        created_by: username,
        tnnt_id: tnnt_id,
        is_active: is_active == false ? "inactive" : "active",
      };

      PfNotifWapp.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + id + " Updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
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
      txt_template_name,
      txt_message,
      arr_header_type,
      id_selectedHeader,
      arr_events,
      id_selectedEvent,
      txt_header,
      txt_header_image,
      is_active,
      is_loading,
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
              {editable == undefined
                ? "Create WhatssApp Notification"
                : editable
                ? "Update WhatssApp Notification"
                : "View WhatssApp Notification"}
            </p>

            <div className={styles.inputAlignment}>
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
                    value={txt_template_name}
                    onChange={(e) =>
                      this.setState({
                        txt_template_name: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{txt_template_name}</p>
                </div>
              )}
            </div>

            <div className={styles.inputAlignment}>
              <p>Header Type:</p>
              {editable != false ? (
                <select
                  value={id_selectedHeader}
                  onChange={(e) => {
                    this.setState({ id_selectedHeader: e.target.value }),
                      e.target.value == 1 &&
                        this.setState({ txt_header: "", txt_header_image: "" });
                  }}
                >
                  <option value={0} disabled selected>
                    {"Select Header Type"}
                  </option>
                  {arr_header_type.map((p) => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                </select>
              ) : (
                arr_header_type.map(
                  (p) =>
                    p.id == id_selectedHeader && (
                      <div className={styles.viewField}>
                        <p>{p.name}</p>
                      </div>
                    )
                )
              )}
            </div>

            {id_selectedHeader == 2 ? (
              <div className={styles.inputAlignment}>
                <p>Header Image Url:</p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <CustomInput
                      inputType={"textarea"}
                      value={txt_header_image}
                      onChange={(e) =>
                        this.setState({
                          txt_header_image: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{txt_header_image}</p>
                  </div>
                )}
              </div>
            ) : (
              id_selectedHeader == 3 && (
                <div className={styles.inputAlignment}>
                  <p>Header Tag Text:</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        inputType={"textarea"}
                        value={txt_header}
                        onChange={(e) =>
                          this.setState({
                            txt_header: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{txt_header}</p>
                    </div>
                  )}
                </div>
              )
            )}

            <div className={styles.inputAlignment}>
              <p>Message content:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput
                    inputType={"textarea"}
                    value={txt_message}
                    onChange={(e) =>
                      this.setState({
                        txt_message: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{txt_message}</p>
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
