import React from "react";
import Swal from "sweetalert2";
import styles from "./pfMgmt.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfTenantHelper from "../../helper/pfmMgmt/pfTenant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default class pfTenant extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            tnnt_id: global.config.tnnt_id,
            username: "",
            txt_tenant_name: "",
            txt_abbr: "",
            txt_database_name: "",
            txt_error_message: "",
            txt_user_name: "",
            start_date: new Date(),
            end_date: new Date(),
            editable: false,
            is_loading: false,
            show_New_Password: false,
            new_password: "",
            show_Confirm_New_Password: false,
            confirm_new_password: "",
            id: undefined,
        };
        if (props.data !== undefined) {
            stateData.id = props.data.tnnt_id;
            stateData.txt_tenant_name = props.data.tnnt_name;
            stateData.txt_abbr = props.data.abbr;
            stateData.txt_database_name = props.data.database_name;
            stateData.txt_user_name = props.data.user_name;
            stateData.start_date = props.data.start_date == "" || props.data.editable == true
                ? ""
                : new Date(props.data.start_date),
                stateData.end_date = props.data.end_date == "" || props.data.editable == true
                    ? ""
                    : new Date(props.data.end_date),
                stateData.editable = true;
        }
        this.state = {
            ...stateData,
        };
    }
    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,

            });
        }
    }

    validatePassword(e) {
        const re = /^(?=.*?[A-Z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{7,}\S+$/;
        return re.test(e);
    }

    async insertRecord() {
        const {
            txt_tenant_name,
            txt_abbr,
            txt_database_name,
            start_date,
            end_date,
            txt_user_name,
            new_password,
            confirm_new_password,
        } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (txt_tenant_name === "") {
                alertText += "• Tenant Name\n";
            }
            if (txt_abbr === "") {
                alertText += "• Abbreviation\n";
            } else if (txt_abbr.length <= 1) {
                alertText += "• Abbreviation field must have more than one letter\n"
            }
            if (txt_database_name === "") {
                alertText += "• DataBase Name\n";
            }
            if (new_password === "") {
                alertText += "• Password\n"
            } else if (!this.validatePassword(new_password)) {
                alertText += "• Password must have minimum 8 characters \n  with 1 capital letter, 1 numeric and 1 special \n  character\n";
            }
            if (confirm_new_password === "") {
                alertText += "• Confirm Password\n";
            }
            if (alertText !== alertInitial) {
                Swal.fire({
                    title: "Fill these fields:\n",
                    html:
                        '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
                        alertText +
                        "</pre>",
                    confirmButtonColor: Colors.primaryColor,
                    width: 520,
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
                abbr: txt_abbr,
            }

            const abbrExists = await pfTenantHelper.checkAbbreviation(filter);

            if (!abbrExists) {
                Swal.fire({
                    icon: 'error',
                    text: "Abbreviation " + txt_abbr + " Already Exists!!!",
                    confirmButtonColor: Colors.primaryColor,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                return;
            }

            if (txt_abbr.length <= 1) {
                Swal.fire({
                    icon: 'error',
                    text: "Abbreviation field must have more than one letter.",
                    confirmButtonColor: Colors.primaryColor,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                return;
            }

            const data = {
                tnnt_name: txt_tenant_name.replace(/,/g, ""),
                abbr: txt_abbr.replace(/,/g, ""),
                database_name: txt_database_name.replace(/,/g, ""),
                admin_password: new_password,
                start_date: moment(start_date).format("YYYY-MM-DD"),
                end_date: moment(end_date).format("YYYY-MM-DD"),
                user_name: txt_user_name,
            };

            this.setState({ is_loading: true });

            pfTenantHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {

                        Swal.fire({
                            icon: 'success',
                            text: " Tenant Admin is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });

                        this.props.getTenantDet();
                        this.props.getTenantDropdown();
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
            txt_tenant_name,
            id,
            txt_abbr,
            txt_database_name,
            start_date,
            end_date,
        } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_tenant_name === "") {
                alertText += "• Tenant Name\n";
            }
            if (txt_database_name === "") {
                alertText += "• DataBase Name\n";
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
                tnnt_name: txt_tenant_name.replace(/,/g, ""),
                database_name: txt_database_name.replace(/,/g, ""),
                start_date: moment(start_date).format("YYYY-MM-DD"),
                end_date: moment(end_date).format("YYYY-MM-DD"),
            };

            this.setState({ is_loading: true });

            pfTenantHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getTenantDet();
                        this.props.getTenantDropdown();
                        Swal.fire({
                            text: "PF Tenant is Successfully Updated!",
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

    abbrValidation(value) {
        if (value.length <= 1) {
            this.setState({ txt_error_message: "*Input must have more than One letter" })
        } else {
            this.setState({ txt_error_message: "" })
        }

        if (value.length == 0) {
            this.setState({
                txt_abbr: value.toUpperCase(),
                txt_user_name: ""
            })
        } else {
            this.setState({
                txt_abbr: value.toUpperCase(),
                txt_user_name: value.toLowerCase() + "_tenant_admin"  //Auto Genarate username
            })
        }
    }

    handleKeyDown(event) {
        if (!/[a-zA-Z]/i.test(event.key)) {
            event.preventDefault();
        }
    };

    render() {
        const { setVisibility } = this.props;

        const {
            txt_tenant_name,
            txt_abbr,
            txt_database_name,
            start_date,
            end_date,
            editable,
            is_loading,
            txt_error_message,
            txt_user_name,
            new_password,
            confirm_new_password,
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
                        <p className={styles.title}>{editable ? "Update Tenant" : "Create Tenant"}</p>
                        <div className={styles.inputAlignment}>
                            <p>Tenant Name:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={txt_tenant_name}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_tenant_name: e.target.value,
                                        })
                                    }
                                />

                            </div>
                        </div>
                        <div className={styles.inputAlignment}>
                            <p className={styles.heading}>Abbreviation:</p>
                            <div className={styles.inputCustom}>
                                {editable ?
                                    <CustomInput
                                        inputType={"text"}
                                        maxLength={"100"}
                                        value={txt_abbr}
                                        style={{ backgroundColor: '#EBEBEB' }}
                                        disabled
                                    />
                                    :
                                    <CustomInput
                                        inputType={"text"}
                                        maxLength={"100"}
                                        value={txt_abbr}
                                        onChange={(e) =>
                                            this.abbrValidation(e.target.value)
                                        }
                                        onKeyDown={this.handleKeyDown}
                                    />
                                }
                                <p className={styles.errorMessage}>{txt_error_message}</p>
                            </div>
                        </div>
                        <div className={styles.inputAlignment}>
                            <p className={styles.heading}>Database Name:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={txt_database_name}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_database_name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.inputAlignment}>
                            <p className={styles.heading}>Username:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    maxLength={"100"}
                                    value={txt_user_name}
                                    style={{ backgroundColor: '#EBEBEB' }}
                                    disabled
                                />
                            </div>
                        </div>

                        {!(editable) &&
                            <div>
                                <div className={styles.inputAlignment}>
                                    <p>Admin Password:</p>
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
                                    <p className={styles.heading}>Confirm Admin Password:</p>
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

                        <div className={styles.inputAlignment}>
                            <p>Start Date:</p>
                            <div className={styles.inputCustom}>
                                <DatePicker
                                    className={styles.date}
                                    dateFormat="dd-MM-yyyy"
                                    selected={start_date}
                                    onChange={(e) => {
                                        if (end_date && e > end_date) {
                                            Swal.fire({
                                                icon: "warning",
                                                text: "End date must be after the Start Date",
                                                confirmButtonColor: Colors.red,
                                                width: Colors.width,
                                                allowOutsideClick: false,
                                            });
                                        } else {

                                            this.setState({ start_date: e })
                                        }
                                    }
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.inputAlignment}>
                            <p>End Date:</p>
                            <div className={styles.inputCustom}>
                                <DatePicker
                                    className={styles.date}
                                    dateFormat="dd-MM-yyyy"
                                    selected={end_date}
                                    onChange={(e) => {
                                        if (start_date && e < start_date) {
                                            Swal.fire({
                                                icon: "warning",
                                                text: "End date must be after the Start Date",
                                                confirmButtonColor: Colors.red,
                                                width: Colors.width,
                                                allowOutsideClick: false,
                                            });
                                        } else {

                                            this.setState({ end_date: e })
                                        }
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.button}>
                            <button
                                className={`button`}
                                onClick={() =>
                                    editable ? this.updateRecord() : this.insertRecord()
                                }
                            >
                                {editable ? "Update" : "Create"}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
