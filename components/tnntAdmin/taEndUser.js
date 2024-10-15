import React from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import EndUserHelper from "../../helper/tnntAdmin/taEndUser";
import RoleHelper from "../../helper/tnntAdmin/taRoleUser";

export default class EndUser extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            array_Role: [],
            role_list: [],
            id_user_id: undefined,
            employee_id: "",
            txt_user_name: "",
            editable: false,
            username: "",
            email_id: "",
            show_New_Password: false,
            new_password: "",
            show_Confirm_New_Password: false,
            confirm_new_password: "",
            tnnt_id: global.config.tnnt_id,
            is_active: true,
            is_loading: false
        };
        if (props.data !== undefined) {
            stateData.txt_user_name = props.data.user_name;
            stateData.employee_id = props.data.employee_id;
            stateData.email_id = props.data.email_id;
            stateData.role_list = props.data.role_list;
            stateData.id_user_id = props.data.user_id;
            stateData.is_active = props.data.is_active;
            stateData.editable = true;
        }
        this.state = {
            ...stateData,
        };
    }
    componentDidMount() {
        const username = global.localStorage.username;
        const tnnt_id = global.localStorage.tnnt_id;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: tnnt_id,
            });
            this.getRoleDet();
        }
    }

    getRoleDet() {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
            is_active: "active",
        };

        RoleHelper.getMultiDropdown(filter)
            .then((data) => {
                console.log(data)
                this.setState({ array_Role: data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(e) {
        const re = /^(?=.*?[A-Z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{7,}\S+$/;
        return re.test(e);
    }

    async insertRecord() {
        const {
            txt_user_name,
            role_list,
            role_ids,
            employee_id,
            username,
            email_id,
            new_password,
            confirm_new_password,
            tnnt_id
        } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (role_list === undefined) {
                alertText += "* Role Name\n";
            }

            if (employee_id === "") {
                alertText += "* Employee Id\n";
            }

            if (txt_user_name === "") {
                alertText += "* User Name\n";
            }

            if (email_id === "") {
                alertText += "• Email ID\n";
            } else if (!this.validateEmail(email_id)) {
                alertText += "• Invalid Email ID\n";
            }

            if (new_password === "") {
                alertText += ". Password\n"
            } else if (!this.validatePassword(new_password)) {
                alertText += ". Password must have minimum 8 characters \n  with 1 capital letter, 1 numeric and 1 special \n  character\n";
            }
            if (confirm_new_password === "") {
                alertText += "* Confirm Password\n";
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

            if (new_password !== confirm_new_password) {
                Swal.fire({
                    icon: 'error',
                    text: "Password do not match",
                    confirmButtonColor: Colors.primaryColor,
                    allowOutsideClick: false,
                });
                return;
            }

            const filter = {
                account_name: txt_user_name,
                // tnnt_id: tnnt_id,
            }

            const usernameExists = await EndUserHelper.checkUsername(filter);
            if (!usernameExists) {
                this.setState({ is_loading: false });
                Swal.fire({
                    icon: "info",
                    text: "Username already exists! Please enter unique username",
                    confirmButtonColor: Colors.primaryColor,
                    allowOutsideClick: false,
                });
                return;
            }

            const data = {
                role_list: role_list,
                role_ids: role_list[0].value,
                employee_id: employee_id,
                user_name: txt_user_name.replace(/,/g, ""),
                email_id: email_id,
                password: new_password,
                created_by: username,
                tnnt_id: tnnt_id,
            };
            this.setState({ is_loading: true });
            EndUserHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        Swal.fire({
                            text: "End User is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getEndUserDet();
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
            id_user_id,
            txt_user_name,
            role_list,
            role_ids,
            email_id,
            employee_id,
            is_active,
            tnnt_id,
        } = this.state;

        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_user_name === undefined) {
                alertText += "* User Name\n";
            }
            if (role_list === undefined) {
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
                });
                return;
            }

            const data = {
                user_id: id_user_id,
                employee_id: employee_id,
                user_name: txt_user_name.replace(/,/g, ""),
                role_list: role_list,
                role_ids: role_list[0].value,
                email_id: email_id,
                is_active: is_active == false ? "inactive" : "active",
                tnnt_id: tnnt_id,
            };

            console.log(data)
            this.setState({ is_loading: true });
            EndUserHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {

                        Swal.fire({
                            text: "End User is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getEndUserDet();
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

    getRoleValues = (selectedOptions, e) => {
        this.setState({ role_list: selectedOptions.map(option => option) });
    }

    render() {
        const { setVisibility } = this.props;
        const {
            array_Role,
            employee_id,
            txt_user_name,
            role_list,
            email_id,
            new_password,
            confirm_new_password,
            editable,
            is_active,
            is_loading
        } = this.state;

        const custom_style = {
            dropdownIndicator: (base) => ({
                ...base,
                color: "#4473db",
            }),

            valueContainer: (provided, state) => ({
                ...provided,
                whiteSpace: "nowrap",
                overflow: "hidden",
                flexWrap: "nowrap",
            }),

            control: (provided) => ({
                ...provided,
                border: '1px solid #4473db',
                borderRadius: '10px',
            }),
        };

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
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src="/assets/close-red.png"
                        className={styles.closeButton}
                        onClick={() => setVisibility(false)}
                    />
                    <div>
                        <p className={styles.title}>{editable ? "Update End User" : "Create End User"}</p>

                        <div className={styles.inputAlignment}>
                            <p>Role Name:</p>
                            <div className={styles.multiSelect}>
                                <Select
                                    placeholder={"Select Roles"}
                                    styles={custom_style}
                                    options={array_Role}
                                    value={role_list}
                                    onChange={this.getRoleValues}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    allowSelectAll={true}
                                />
                            </div>
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>Employee Id:</p>
                            {editable ? <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={employee_id}
                                    onChange={(e) =>
                                        this.setState({
                                            employee_id: e.target.value,
                                        })
                                    }
                                    disabled
                                />
                            </div>
                                :
                                <div className={styles.inputCustom}>
                                    <CustomInput
                                        inputType={"text"}
                                        maxLength={"100"}
                                        value={employee_id}
                                        onChange={(e) =>
                                            this.setState({
                                                employee_id: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            }
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>User Name:</p>
                            {editable ? <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={txt_user_name}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_user_name: e.target.value,
                                        })
                                    }
                                    disabled
                                />

                            </div>
                                :
                                <div className={styles.inputCustom}>
                                    <CustomInput
                                        inputType={"text"}
                                        maxLength={"100"}
                                        value={txt_user_name}
                                        onChange={(e) =>
                                            this.setState({
                                                txt_user_name: e.target.value,
                                            })
                                        }
                                    />

                                </div>
                            }
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>Email:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={email_id}
                                    onChange={(e) =>
                                        this.setState({
                                            email_id: e.target.value,
                                        })
                                    }
                                />

                            </div>
                        </div>

                        {!(editable) &&
                            <div>
                                <div className={styles.inputAlignment}>
                                    <p>Password:</p>
                                    <div className={styles.inputCustom} style={{ display: "flex" }}>
                                        <CustomInput
                                            type={
                                                this.state.show_New_Password
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={new_password}
                                            onChange={(e) =>
                                                this.setState({
                                                    new_password: e.target.value,
                                                })
                                            }
                                        />

                                        <i
                                            className={`material-icons visibility ${styles.pass}`}
                                            onClick={() =>
                                                this.setState({
                                                    show_New_Password: !this.state.show_New_Password,
                                                })
                                            }
                                        >
                                            {this.state.show_New_Password ? (
                                                "visibility_off"

                                            ) : (
                                                "visibility_on"
                                            )}
                                        </i>
                                    </div>
                                </div>

                                <div className={styles.passRequirement}>
                                    <span>
                                        {"*Password must have minimum 8 characters with 1 capital letter, \n 1 numeric and 1 special character"}
                                    </span>
                                </div>

                                <div className={styles.inputAlignment}>
                                    <p className={styles.heading}>Confirm New Password:</p>
                                    <div className={styles.inputCustom} style={{ display: "flex" }}>
                                        <CustomInput
                                            type={
                                                this.state.show_Confirm_New_Password
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirm_new_password}
                                            onChange={(e) =>
                                                this.setState({
                                                    confirm_new_password: e.target.value,
                                                })

                                            }
                                        />

                                        <i
                                            className={`material-icons visibility ${styles.pass}`}
                                            onClick={() =>
                                                this.setState({
                                                    show_Confirm_New_Password: !this.state.show_Confirm_New_Password,
                                                })
                                            }
                                        >
                                            {this.state.show_Confirm_New_Password ? (
                                                "visibility_off"

                                            ) : (
                                                "visibility_on"
                                            )}
                                        </i>
                                    </div>
                                </div>
                            </div>
                        }

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
