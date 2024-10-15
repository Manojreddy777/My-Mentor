import React from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import CustomFieldHelper from "../../helper/tnntAdmin/customFields";

export default class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            table_id: "",
            tnnt_id: global.config.tnnt_id,
            editable: false,
            is_active: true,
            is_loading: false,
            num_total_options: "",
            txt_table_name: "CODE_",
            arr_new_options: [],
            arr_old_options: [],
            bl_checked: false,
        };
        if (props.data !== undefined) {
            stateData.editable = true;
            stateData.txt_table_name = props.data;
        }
        this.state = {
            ...stateData,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const { editable } = this.state;
        const username = global.localStorage.username;

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
        }

        editable &&
            this.getTableNames();
    }

    getTableNames() {
        const { txt_table_name, tnnt_id } = this.state;

        const filter = {
            table_name: txt_table_name,
            tnnt_id: tnnt_id,
        }

        CustomFieldHelper.getDropdown(filter)
            .then((data) => {
                this.setState({ arr_old_options: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    handleOptionChange = (index, value) => {
        const updatedOptions = [...this.state.arr_new_options];
        updatedOptions[index] = value;
        this.setState({ arr_new_options: updatedOptions });
    };

    create = async () => {
        const {
            txt_table_name,
            arr_new_options,
            num_total_options,
            username,
            tnnt_id
        } = this.state;

        const alertInitial = "";
        let alertText = alertInitial;

        if (txt_table_name === "" || txt_table_name == "CODE_") {
            alertText += ". Table Name\n";
        }

        if (num_total_options === ""  || num_total_options.length === 0) {
            alertText += ". Total Number of Options:\n";
        }

        if (arr_new_options.length != num_total_options) {
            alertText += ". Options\n";
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
            table_name: txt_table_name,
            options: arr_new_options,
            created_by: username,
            tnnt_id: tnnt_id,
        }

        CustomFieldHelper.createTable(data)
            .then((data) => {
                if (data == 200) {
                    Swal.fire({
                        text: "Successfully Created!",
                        confirmButtonColor: Colors.primaryColor,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    this.props.setVisibility(false);
                    this.props.getCutomFieldDetails();
                } else if (data == 500) {
                    Swal.fire({
                        text: "Table Already Exists!",
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
            });
    };

    update() {
        const {
            txt_table_name,
            arr_new_options,
            arr_old_options,
            num_total_options,
            bl_checked,
            username,
            tnnt_id
        } = this.state;

        const alertInitial = "";
        let alertText = alertInitial;

        if (bl_checked) {
            if (num_total_options === "" || num_total_options.length === 0) {
                alertText += ". Total Number of Options:\n";
            } else {
                if (arr_new_options.length != num_total_options) {
                    alertText += ". Options\n";
                }
            }
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
            table_name: txt_table_name,
            update_options: arr_old_options,
            options: arr_new_options,
            created_by: username,
            tnnt_id: tnnt_id,
        }

        CustomFieldHelper.insertRecord(data)
            .then((data) => {
                if (data.code == 200) {
                    Swal.fire({
                        text: "Successfully Updated!",
                        confirmButtonColor: Colors.primaryColor,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    this.props.setVisibility(false);
                    this.props.getCutomFieldDetails();
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
            });
    }

    updateValues = (e, index) => {
        const { arr_old_options } = this.state;
        const updatedOptions = [...arr_old_options];
        updatedOptions[index].name = e.target.value;

        this.setState({
            arr_old_options: updatedOptions,
        });
    };

    handleChange(event) {
        this.setState({ txt_table_name: event.target.value.toUpperCase() });
      }

    render() {
        const { setVisibility } = this.props;
        const {
            editable,
            is_loading,
            txt_table_name,
            num_total_options,
            arr_new_options,
            arr_old_options,
            bl_checked,
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
                        <p className={styles.title}>{editable ? "Update Custom Tables" : "Create Custom Tables"}</p>

                        <div className={styles.inputAlignment}>
                            <p>Table Name:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    type="text"
                                    value={txt_table_name}
                                    onChange={this.handleChange}
                                    // onChange={(e) =>
                                    //     this.setState({
                                    //         txt_table_name: e.target.value.toUpperCase(),
                                    //     })
                                    // }
                                    disabled={editable}
                                />
                            </div>
                        </div>

                        {editable &&
                            <div className={styles.inputAlignment}>
                                <p>Table Values:</p>
                                <div className={styles.inputCustom}>
                                    {arr_old_options.map((a, index) =>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <CustomInput
                                            type="text"
                                            value={a.name}
                                            // value={!arr_old_options[1] ? null : Object.values(arr_old_options[1])}
                                            // onChange={(e) =>
                                            //     this.setState({
                                            //         table_name: e.target.value,
                                            //     })
                                            // }
                                            onChange={(e) =>
                                                this.updateValues(e, index)
                                            }
                                        />
                                        </div>
                                    )}
                                </div>
                            </div>
                        }

                        {editable ?
                            <div>
                                <div className={styles.inputAlignment}>
                                    <div className={styles.checkbox}>
                                        <label>Add New Values</label>
                                        <input
                                            type="checkbox"
                                            checked={bl_checked}
                                            onChange={(e) =>
                                                this.setState({
                                                    bl_checked: e.target.checked
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                {bl_checked &&
                                    <div className={styles.inputAlignment}>
                                        <p>Total Number of Options:</p>
                                        <div className={styles.inputCustom}>
                                            <CustomInput
                                                type="number"
                                                value={num_total_options}
                                                onChange={(e) =>
                                                    this.setState({
                                                        num_total_options: e.target.value,
                                                    })
                                                }
                                                min={0}
                                                onWheel={(e) => e.target.blur()}
                                            />
                                        </div>
                                    </div>
                                }
                            </div> :
                            <div className={styles.inputAlignment}>
                                <p>Total Number of Options:</p>
                                <div className={styles.inputCustom}>
                                    <CustomInput
                                        type="number"
                                        value={num_total_options}
                                        onChange={(e) =>
                                            this.setState({
                                                num_total_options: e.target.value,
                                            })
                                        }
                                        min={0}
                                        onWheel={(e) => e.target.blur()}
                                    />
                                </div>
                            </div>
                        }

                        {Array.from({ length: num_total_options }).map((_, index) => (
                            <div key={index} className={styles.inputAlignment}>
                                <p>{`Option ${index + 1}:`}</p>
                                <div className={styles.inputCustom}>
                                    <CustomInput
                                        type="text"
                                        value={arr_new_options[index] || ''}
                                        onChange={(e) => this.handleOptionChange(index, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className={`${styles.button}`}>
                            <button
                                className={`button`}
                                onClick={() => editable ? this.update() : this.create()}
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
