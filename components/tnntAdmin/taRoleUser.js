import React from "react";
import Swal from "sweetalert2";
import styles from "./tnntAdmin.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import RoleUserHelper from "../../helper/tnntAdmin/taRoleUser";
import PfComponentHelper from "../../helper/pfmMgmt/pfComponent";

export default class RoleUser extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      username: global.config.username,
      tnnt_id: global.config.tnnt_id,
      editable: false,
      is_active: true,
      is_loading: false,
      id_role: undefined,
      txt_role_name: "",
      arr_component: [],
      arr_restriction: [
        {
          id: 1,
          title: "Yes",
        },
        {
          id: 2,
          title: "No",
        },
      ],
      arr_view: [
        {
          id: 1,
          title: "view my records",
        },
        {
          id: 2,
          title: "view my team records",
        },
        {
          id: 3,
          title: "view all records",
        },
        {
          id: 4,
          title: "Restricted view",
        },
      ],
      arr_create: [
        {
          id: 5,
          title: "create record for me",
        },
        {
          id: 6,
          title: "create record for my team",
        },
        {
          id: 7,
          title: "create record for all",
        },
        {
          id: 8,
          title: "Restricted create",
        },
      ],
      arr_update: [
        {
          id: 9,
          title: "update my records",
        },
        {
          id: 10,
          title: "update record for my team",
        },
        {
          id: 11,
          title: "update record for all",
        },
        {
          id: 12,
          title: "Restricted update",
        },
      ],
      arr_export: [
        {
          id: 13,
          title: "Yes",
        },
        {
          id: 14,
          title: "No",
        },
      ],
      arr_module_value: [],
      arr_component_value: [],
    };

    if (props.data !== undefined) {
      stateData.txt_role_name = props.data.role_name;
      stateData.id_role = props.data.role_id;
      stateData.is_active = props.data.is_active;
      stateData.editable = true;
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
        tnnt_id: global.localStorage.tnnt_id,
      });
      this.getComponent();

      editable && this.getRecord();
    }
  }

  getRecord() {
    const { tnnt_id, id_role } = this.state;

    const filter = {
      role_id: id_role,
      tnnt_id: tnnt_id,
    };

    RoleUserHelper.getRecord(filter)
      .then((data) => {
        this.setState({ arr_module_value: data });
        this.setState({ arr_component_value: [].concat(...data.map(item => item.arr_component_value)) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getComponent() {
    PfComponentHelper.getAllActive()
      .then((data) => {
        this.setState({ arr_component: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async insertRecord() {
    const {
      txt_role_name,
      arr_module_value,
      arr_component,
      arr_component_value,
      username,
      tnnt_id,
    } = this.state;
    try {
      const alertInitial = "";
      let alertText = alertInitial;

      // // Check if any of the values in arr_component_value are undefined
      // if (arr_component_value.some((c) => [undefined, null].includes(c.view) || [undefined, null].includes(c.create) || [undefined, null].includes(c.update) || [undefined, null].includes(c.export))) {
      //     alertText += "* View, Create, Update, and Export fields must be selected for all components\n";
      // }

      // Check if all modules are selected
      // if (arr_module_value.length !== arr_component.length) {
      //   alertText += "* All modules must be selected\n";
      // }

      if (txt_role_name === "") {
        alertText += "* Role User Name\n";
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
          width: 500,
        });
        return;
      }

      const data = {
        role_name: txt_role_name.replace(/,/g, ""),
        created_by: username,
        tnnt_id: tnnt_id,
        // arr_component_value: arr_component_value,
      };

      this.setState({ is_loading: true });
      RoleUserHelper.insertRecord(data)
          .then((data) => {
              if (data.code == 200) {
                  Swal.fire({
                      text: "Role User Name is Successfully Created!",
                      confirmButtonColor: Colors.primaryColor,
                      width: Colors.width,
                      allowOutsideClick: false,
                  });
                  this.props.getRoleUser(tnnt_id);
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
    const { txt_role_name, id_role, arr_component_value, tnnt_id, is_active } = this.state;
    try {
      const alertInitial = "";
      let alertText = alertInitial;
      if (txt_role_name === undefined) {
        alertText += "* Role Name\n";
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
        role_id: id_role,
        role_name: txt_role_name.replace(/,/g, ""),
        is_active: is_active == false ? "inactive" : "active",
        tnnt_id: tnnt_id,
        // arr_component_value: arr_component_value,
      };

      this.setState({ is_loading: true });
      RoleUserHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            Swal.fire({
              text: "Role Name is Successfully Updated!",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.getRoleUser(tnnt_id);
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

  handleRestrictChange = (id, restrict, isModule) => {
    if (isModule) {
      const { arr_module_value } = this.state;
      const existingIndex = arr_module_value.findIndex(
        (item) => item.mod_id === id
      );

      if (existingIndex !== -1) {
        arr_module_value[existingIndex].module_restrict = restrict;
      } else {
        arr_module_value.push({ mod_id: id, module_restrict: restrict });
      }

      this.setState({ arr_module_value });
    } else {
      const { arr_component_value } = this.state;
      const existingIndex = arr_component_value.findIndex(
        (item) => item.com_id === id
      );

      if (existingIndex !== -1) {
        // If the component is already in arr_value, update its restrict value
        if (restrict === "Yes") {
          arr_component_value[existingIndex].view = 4;
          arr_component_value[existingIndex].create = 8;
          arr_component_value[existingIndex].update = 12;
          arr_component_value[existingIndex].export = 14;
        } else {
          arr_component_value[existingIndex].view = undefined;
          arr_component_value[existingIndex].create = undefined;
          arr_component_value[existingIndex].update = undefined;
          arr_component_value[existingIndex].export = undefined;
        }
        arr_component_value[existingIndex].component_restrict = restrict;
      } else {
        // If the component is not in arr_value, add it with the selected restrict value
        if (restrict === "Yes") {
          arr_component_value.push({
            com_id: id,
            component_restrict: restrict,
            view: 4,
            create: 8,
            update: 12,
            export: 14,
          });
        } else {
          arr_component_value.push({
            com_id: id,
            component_restrict: restrict,
            view: undefined,
            create: undefined,
            update: undefined,
            export: undefined,
          });
        }
        // arr_component_value.push({ com_id: id, component_restrict: restrict });
      }

      this.setState({ arr_component_value });
    }
  };

  handleClaimChange = (index, e, actionType) => {
    const { arr_component_value } = this.state;
    const value = e.target.value;

    switch (actionType) {
      case "View":
        arr_component_value[index].view = value;
        break;
      case "Create":
        arr_component_value[index].create = value;
        break;
      case "Update":
        arr_component_value[index].update = value;
        break;
      case "Export":
        arr_component_value[index].export = value;
        break;
      default:
        break;
    }

    this.setState({ arr_component_value });
  };

  render() {
    const { setVisibility } = this.props;

    const {
      is_active,
      editable,
      is_loading,
      txt_role_name,
      arr_component,
      arr_restriction,
      arr_module_value,
      arr_component_value,
      arr_view,
      arr_create,
      arr_update,
      arr_export,
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
              {editable ? "Update Role Name" : "Create Role Name"}
            </p>

            <div className={styles.inputAlignment}>
              <p>Role Name:</p>
              <div className={styles.inputCustom}>
                <CustomInput
                  inputType={"text"}
                  maxLength={"100"}
                  value={txt_role_name}
                  onChange={(e) =>
                    this.setState({
                      txt_role_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* <div>
              {arr_component.map((module) => (
                <div>
                  <div className={styles.moduleAlignment}>
                    <table>
                      <tbody>
                        <tr>
                          <td>{module.mod_name}</td>
                          <td>
                            <div className={styles.claimAlignment}>
                              <select
                                value={
                                  arr_module_value.find(
                                    (v) => v.mod_id === module.mod_id
                                  )?.module_restrict || undefined
                                } // Pre-select the value from arr_module_value or default to 'Yes'
                                onChange={(e) => {
                                  const mod_id = module.mod_id;
                                  const restrict = e.target.value;
                                  this.handleRestrictChange(
                                    mod_id,
                                    restrict,
                                    true
                                  );
                                }}
                              >
                                <option value={0} disabled selected>
                                  {"Select"}
                                </option>
                                {arr_restriction.map((b) => (
                                  <option key={b.id} value={b.title}>
                                    {b.title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {module.component.map((component) => (
                    <div className={styles.middleWrapper}>
                      {arr_module_value.map(
                        (v) =>
                          v.module_restrict === "No" &&
                          v.mod_id === module.mod_id && (
                            <div className={styles.moduleWrapper}>
                              <table className={styles.table}>
                                <thead>
                                  <tr>
                                    <th style={{ width: "110px" }}></th>
                                    <th style={{ width: "110px" }}>Restrict</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{component.com_name}</td>
                                    <td>
                                      <div className={styles.claimAlignment}>
                                        <select
                                          value={
                                            arr_component_value.find(
                                              (c) => c.com_id === component.com_id
                                            )?.component_restrict || undefined
                                          }
                                          onChange={(e) => {
                                            const com_id = component.com_id;
                                            const restrict = e.target.value;
                                            this.handleRestrictChange(
                                              com_id,
                                              restrict,
                                              false
                                            );
                                          }}
                                        >
                                          <option value={0} disabled selected>
                                            {"Select"}
                                          </option>
                                          {arr_restriction.map((b) => (
                                            <option key={b.id} value={b.title}>
                                              {b.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )
                      )}

                      {arr_component_value.map((c, index) => (
                        <div>
                          {c.component_restrict === "No" &&
                            c.com_id === component.com_id && (
                              <table className={styles.table}>
                                <thead>
                                  <tr>
                                    <th>View</th>
                                    <th>Create</th>
                                    <th>Update</th>
                                    <th>Export</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className={styles.claimAlignment}>
                                        <select
                                          value={c.view}
                                          onChange={(e) => {
                                            this.handleClaimChange(
                                              index,
                                              e,
                                              "View"
                                            );
                                          }}
                                        >
                                          <option value={0} disabled selected>
                                            {"Select..."}
                                          </option>
                                          {arr_view.map((b) => (
                                            <option key={b.id} value={b.id}>
                                              {b.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.claimAlignment}>
                                        <select
                                          value={c.create}
                                          onChange={(e) => {
                                            this.handleClaimChange(
                                              index,
                                              e,
                                              "Create"
                                            );
                                          }}
                                        >
                                          <option value={0} disabled selected>
                                            {"Select..."}
                                          </option>
                                          {arr_create.map((b) => (
                                            <option key={b.id} value={b.id}>
                                              {b.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.claimAlignment}>
                                        <select
                                          value={c.update}
                                          onChange={(e) => {
                                            this.handleClaimChange(
                                              index,
                                              e,
                                              "Update"
                                            );
                                          }}
                                        >
                                          <option value={0} disabled selected>
                                            {"Select..."}
                                          </option>
                                          {arr_update.map((b) => (
                                            <option key={b.id} value={b.id}>
                                              {b.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.claimAlignment}>
                                        <select
                                          value={c.export}
                                          onChange={(e) => {
                                            this.handleClaimChange(
                                              index,
                                              e,
                                              "Export"
                                            );
                                          }}
                                        >
                                          <option value={0} disabled selected>
                                            {"Select..."}
                                          </option>
                                          {arr_export.map((b) => (
                                            <option key={b.id} value={b.id}>
                                              {b.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div> */}

            <div className={styles.inputDiv}>
              <div
                className={styles.inputGroup1}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginLeft: 270,
                }}
              >
                {this.props.data !== undefined && (
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
                      />
                      <span className="slider round"></span>
                    </label>
                    <p className={styles.statusText}>
                      {is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.button}>
              {editable ? (
                <button
                  className={`button`}
                  onClick={() => {
                    this.updateRecord();
                  }}
                >
                  {"Update"}
                </button>
              ) : (
                <button
                  className={`button`}
                  onClick={() =>
                    editable ? this.updateRecord() : this.insertRecord()
                  }
                >
                  {editable ? "Update" : "Create"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
