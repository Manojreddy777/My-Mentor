import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfModuleHelper from "../../helper/pfmMgmt/pfModule";

export default class pfModule extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            id_mod: undefined,
            txt_module_name: "",
            txt_abbr: "",
            id_tnnt_id: global.config.tnnt_id,
            editable: false,
            username: "",
            is_loading: false
        };
        if (props.data !== undefined) {
            stateData.id_mod = props.data.mod_id;
            stateData.txt_module_name = props.data.mod_name;
            stateData.txt_abbr = props.data.abbr;
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
                tnnt_id: global.localStorage.tnnt_id,

            });
        }
    }
    async insertRecord() {
        const {
            txt_module_name,
            txt_abbr,
            username,
        } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (txt_module_name === "") {
                alertText += "• Module Name\n";
            }
            if (txt_abbr === "") {
                alertText += "• Abbreviation\n";
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
                mod_name: txt_module_name.replace(/,/g, ""),
                abbr: txt_abbr.replace(/,/g, ""),
                created_by: username,
            };
            this.setState({ is_loading: true });
            pfModuleHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getModuleDet();
                        Swal.fire({
                            text: " PF Module is Successfully Created!",
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
            id_mod,
            txt_module_name,
            txt_abbr,
        } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_module_name === "") {
                alertText += "• Module Name\n";
            }
            if (txt_abbr === "") {
                alertText += "• Abbreviation\n";
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
                mod_id: id_mod,
                mod_name: txt_module_name.replace(/,/g, ""),
                abbr: txt_abbr.replace(/,/g, ""),
            };
            this.setState({ is_loading: true });
            pfModuleHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getModuleDet();
                        Swal.fire({
                            text: " PF Module is Successfully Updated!",
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
    render() {
        const { setVisibility } = this.props;
        const {

            txt_module_name,
            txt_abbr,
            editable,
            is_loading

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
                        <p className={styles.title}>{editable ? "Update Module" : "Create Module"}</p>
                        <div className={styles.inputAlignment}>
                            <p>Module Name:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={txt_module_name}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_module_name: e.target.value,
                                        })
                                    }
                                />

                            </div>
                        </div>
                        <div className={styles.inputAlignment}>
                            <p className={styles.heading}>Abbreviation:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"text"}
                                    maxLength={"100"}
                                    value={txt_abbr}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_abbr: e.target.value,
                                        })
                                    }
                                />
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
