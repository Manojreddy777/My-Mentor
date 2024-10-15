import React from "react";
import styles from "./pfMgmt.module.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import PfNotifEmailHelper from "../../helper/pfmMgmt/pfNotifEmail";
import PfEmailTemplateHelper from "../../helper/pfmMgmt/pfNotifEmailTemplate";
import FilesHelper from "../../helper/files";
import DdValues from "../../helper/comm/commDdLookup";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EmailNotifiModal extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      editable: undefined,
      id: "",
      num_from_id: "erp_support@finari.com",
      num_to_id: undefined,
      num_event_id: "",
      num_template_id: "",
      num_status_id: "",
      email_subject: "",
      email_content: "",
      email_attachment1: "",
      email_attachment2: "",
      is_loading: false,
      selectedData: undefined,
      file_document_view: undefined,
      arr_template: [],
      id_selectedTemplate: undefined,
      com_id: 78,
      is_active: true,
      arr_sendTo: [
        {
          id: 1,
          title: "Individual",
          value: "Individual",
        },
        {
          id: 2,
          title: "Collection",
          value: "Collection",
        }
      ],
      id_selectedSendTo: undefined,
      arr_funcName: [],
      arr_sendAt: [
        {
          id: 1,
          title: "Now",
          value: "Now",
        },
        {
          id: 2,
          title: "Later",
          value: "Later",
        }
      ],
      id_selectedSendAt: 1,
      sentOn_date: new Date(),
      sentOn_time: "",

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

    this.getDropdown();
    this.getDdFunction();
    editable !== undefined && this.getRecord();
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    PfNotifEmailHelper.getRecord(filter)
      .then((data) => {
        console.log(data);
        this.setState({
          email_attachment1: data[0].email_attachment1,
          email_attachment2: data[0].email_attachment2,
          email_content: data[0].email_content,
          email_subject: data[0].email_subject,
          id_selectedTemplate: data[0].template_id,
          num_template_id: data[0].template_id,
          num_from_id: data[0].from_id,
          num_to_id: data[0].to_id,
          num_event_id: data[0].evt_id,
          num_status_id: data[0].status_id,
          is_active: data[0].is_active == "active" ? true : false,
          sentOn_date: data[0].sched_date,
          sentOn_time: data[0].sched_time,
        });

        FilesHelper.getFile(data[0].email_content)
          .then((htmlContent) => {
            const tags = data[0];
            const replacedHtml = htmlContent.data.replace(/\{\{tag_(\d+)\}\}/g, (match, tagNumber) => {
              const tagName = `tag_${tagNumber}`;
              const tagValue = tags[tagName] || '';
              return tagValue;
            });
            this.setState({ file_document_view: replacedHtml });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDropdown() {
    const { tnnt_id, editable } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: editable === true ? undefined : "active",
    };

    PfEmailTemplateHelper.getFilteredData(filter)
      .then((data) => {
        console.log(data)
        this.setState({ arr_template: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDdFunction() {
    const {
      tnnt_id,
    } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
    };

    DdValues.getCollectDet(filter)
      .then((data) => {
        this.setState({ arr_funcName: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async create() {
    const {
      username,
      id_selectedTemplate,
      tnnt_id,
      num_from_id,
      num_to_id,
      num_template_id,
      num_event_id,
      email_content,
      email_attachment1,
      email_attachment2,
      email_subject,
      sentOn_date,
      sentOn_time
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedTemplate === undefined) {
        alertText += ". Template\n";
      }

      if (num_to_id === "") {
        alertText += ". To Id\n";
      }

      if (email_content === "") {
        alertText += ". Message\n";
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
        com_id: 0,
        com_rec_id: 0,
        evt_id: num_event_id,
        template_id: num_template_id,
        from_id: num_from_id,
        to_id: num_to_id,
        email_subject: email_subject,
        email_content: email_content,
        email_attachment1: email_attachment1,
        email_attachment2: email_attachment2,
        sched_date: moment(sentOn_date).format("YYYY-MM-DD"),
        sched_time: sentOn_time,
        status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

       

      PfNotifEmailHelper.insertRecord(data)
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
      username,
      id_selectedTemplate,
      tnnt_id,
      num_from_id,
      num_to_id,
      num_template_id,
      num_event_id,
      num_status_id,
      email_content,
      email_subject,
      email_attachment1,
      email_attachment2,
      is_active,
      id,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedTemplate === undefined) {
        alertText += ". Template\n";
      }

      if (num_to_id === "") {
        alertText += ". To Id\n";
      }

      if (email_content === "") {
        alertText += ". Message\n";
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
        com_id: 0,
        com_rec_id: 0,
        evt_id: num_event_id,
        template_id: num_template_id,
        from_id: num_from_id,
        to_id: num_to_id,
        email_subject: email_subject,
        email_content: email_content,
        email_attachment1: email_attachment1,
        email_attachment2: email_attachment2,
        status_id: num_status_id,
        created_by: username,
        tnnt_id: tnnt_id,
        is_active: is_active == true ? "active" : "inactive",
      };

      PfNotifEmailHelper.updateRecord(data)
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

  fillTextMessage(e) {
    const { arr_template } = this.state;

    const id = e.target.value;

    arr_template.map(
      (a) =>
        a.id == id &&
        this.setState({
          id_selectedTemplate: e.target.value,
          num_event_id: a.event_id,
          num_template_id: e.target.value,
          email_subject: a.email_sub,
          email_content: a.email_content,
          email_attachment1: a.email_attachment1,
          email_attachment2: a.email_attachment2,
        })
    );
  }

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      arr_template,
      id_selectedTemplate,
      num_from_id,
      num_to_id,
      email_content,
      email_subject,
      is_active,
      is_loading,
      file_document_view,
      id_selectedSendTo,
      arr_sendTo,
      arr_funcName,
      arr_sendAt,
      id_selectedSendAt,
      sentOn_date,
      sentOn_time
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
                ? "Create E-Mail Notification"
                : editable
                  ? "Update E-Mail Notification"
                  : "View E-Mail Notification"}
            </p>

            <div className={styles.inputAlignment}>
              <p>From:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput value={num_from_id} />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{"erp_support@finari.com"}</p>
                </div>
              )}
            </div>

            <div className={styles.leftWrapper}>
              <div className={styles.inputAlignment}>
                <p>Send To:</p>
                {editable != false ? (
                  <select
                    value={
                      id_selectedSendTo === undefined ? 0 : id_selectedSendTo
                    }
                    onChange={(e) =>
                      this.setState({
                        id_selectedSendTo: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Send To"}
                    </option>
                    {arr_sendTo.map((s) => (
                      <option value={s.id}>{s.value}</option>
                    ))}
                  </select>
                ) : (
                  <div className={styles.viewField}>
                    <p>{id_selectedSendTo}</p>
                  </div>
                )}
              </div>
            </div>
            {id_selectedSendTo == 2 && (
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>To:</p>
                  {editable != false ? (
                    <select
                      value={
                        num_to_id === undefined ? 0 : num_to_id
                      }
                      onChange={(e) =>
                        this.setState({
                          num_to_id: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected>
                        {"Select Send To"}
                      </option>
                      {arr_funcName.map((s) => (
                        <option value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{num_to_id}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {id_selectedSendTo == 1 && (
              <div className={styles.inputAlignment}>
                <p>To:</p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <CustomInput
                      value={num_to_id}
                      onChange={(e) =>
                        this.setState({
                          num_to_id: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{num_to_id}</p>
                  </div>
                )}
              </div>
            )}

            <div className={`borderColorMan ${styles.inputAlignment}`}>
              <p>Template:</p>
              {editable != false ? (
                <select
                  value={id_selectedTemplate}
                  onChange={(e) => {
                    this.fillTextMessage(e);
                  }}
                >
                  <option value={0} disabled selected>
                    {"Select Template"}
                  </option>
                  {arr_template.map((p) => (
                    <option value={p.id}>
                      Event: {p.event_id} - {p.templ_name}
                    </option>
                  ))}
                </select>
              ) : (
                arr_template.map(
                  (p) =>
                    p.id == id_selectedTemplate && (
                      <div className={styles.viewField}>
                        <p>Event: {p.event_id} - {p.templ_name}</p>
                      </div>
                    )
                )
              )}
            </div>

            <div className={styles.inputAlignment}>
              <p>Email Subject:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput
                    value={email_subject}
                    inputType={"text"}
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{email_subject}</p>
                </div>
              )}
            </div>

            <div className={styles.leftWrapper}>
              <div className={styles.inputAlignment}>
                <p>Send At:</p>
                {editable != false ? (
                  <select
                    value={
                      id_selectedSendAt === undefined ? 0 : id_selectedSendAt
                    }
                    onChange={(e) =>
                      this.setState({
                        id_selectedSendAt: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Send At"}
                    </option>
                    {arr_sendAt.map((s) => (
                      <option value={s.id}>{s.value}</option>
                    ))}
                  </select>
                ) : (
                  <div className={styles.viewField}>
                    <p>{id_selectedSendAt}</p>
                  </div>
                )}
              </div>
            </div>

            {id_selectedSendAt == 2 && (
              <div className={styles.inputAlignment}>
                <p>Sent On:
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={sentOn_date}
                      onChange={(e) =>
                        this.setState({ sentOn_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{moment(sentOn_date).format("DD-MMM-YYYY")}</p>
                  </div>
                )}
              </div>
            )}

            {id_selectedSendAt == 2 && (
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Time: (HH:MM - 24Hr Format)</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="time"
                        value={sentOn_time}
                        onChange={(e) =>
                          this.setState({
                            sentOn_time: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sentOn_time}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

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
