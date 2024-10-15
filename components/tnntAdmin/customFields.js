import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import CustomFieldHelper from "../../helper/tnntAdmin/customFields";
import ComponentHelper from "../../helper/pfmMgmt/pfComponent";

export default class CustomField extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            tnnt_id: global.config.tnnt_id,
            editable: false,
            is_active: true,
            is_loading: false,
            array_components: [],
            array_field_type: [
                {
                    id: 1,
                    value: "Text",
                },
                {
                    id: 2,
                    value: "Number",
                },
                {
                    id: 3,
                    value: "Date",
                },
                {
                    id: 4,
                    value: "Dropdown",
                },
            ],
            arr_table_name: [],
            id_selectedTableName: undefined,
            txt_field_name: "",
            txt_field_type: undefined,
            id_selectedComponent: undefined,
            id_selectedFieldType: undefined,
            id: "",
        };

        if (props.data !== undefined) {
            stateData.editable = true;
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
                tnnt_id: global.localStorage.tnnt_id,
            });
        }
        this.getComponent();
        editable &&
            this.getRecord();
    }

    getComponent() {
        const { tnnt_id } = this.state;

        const filter = {
            is_active: 'active',
            tnnt_id: tnnt_id,
        }

        ComponentHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ array_components: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getRecord() {
        const {
            id,
            tnnt_id,
        } = this.state;

        const filter = {
            id: id,
            tnnt_id: tnnt_id,
        }

        CustomFieldHelper.getRecord(filter)
            .then((data) => {
                this.setState({
                    id_selectedComponent: data[0].comp_type_id,
                    txt_field_name: data[0].field_name,
                    txt_field_type: data[0].field_type,
                    id_selectedTableName: data[0].table_id,
                });

                data[0].field_type === "Dropdown" && this.getTableName();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    getTableName() {
        const { tnnt_id } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        }

        CustomFieldHelper.getTableName(filter)
            .then((data) => {
                this.setState({ arr_table_name: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    create() {
        const {
            txt_field_name,
            txt_field_type,
            id_selectedComponent,
            id_selectedFieldType,
            id_selectedTableName,
            tnnt_id,
        } = this.state;

        const alertInitial = "";
        let alertText = alertInitial;

        if (txt_field_name === "" || txt_field_name.length === 0) {
            alertText += ". Field Name\n";
        }

        if (id_selectedComponent === undefined) {
            alertText += ". Component\n";
        }

        if (id_selectedFieldType === undefined) {
            alertText += ". Field Type\n";
        }

        if (id_selectedFieldType == 4 && id_selectedTableName === undefined) {
            alertText += ". Table\n";
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
            com_id: id_selectedComponent,
            field_name: txt_field_name,
            field_type_id: id_selectedFieldType,
            field_type: txt_field_type,
            table_id: id_selectedTableName === undefined ? 0 : id_selectedTableName,
            tnnt_id: tnnt_id,
        };

        CustomFieldHelper.create(data)
            .then((data) => {
                if (data.code == 200) {
                    Swal.fire({
                        text: "Field is Successfully Created!",
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

    update() {
        const {
            id,
            txt_field_name,
        } = this.state;

        
        const alertInitial = "";
        let alertText = alertInitial;

        if (txt_field_name === "" || txt_field_name.length === 0) {
            alertText += ". Field Name\n";
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
            field_name: txt_field_name,
        };

        CustomFieldHelper.update(data)
            .then((data) => {
                if (data == 200) {
                    Swal.fire({
                        text: "Field Name is Successfully Updated!",
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

    render() {
        const { setVisibility } = this.props;
        const {
            editable,
            is_active,
            is_loading,
            array_components,
            txt_field_name,
            array_field_type,
            id_selectedComponent,
            id_selectedFieldType,
            txt_field_type,
            arr_table_name,
            id_selectedTableName,
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
                        <p className={styles.title}>{editable ? "Update Custom Field" : "Create Custom Field"}</p>

                        <div className={styles.inputAlignment}>
                            <p>Component:</p>
                            <select
                                value={id_selectedComponent}
                                onChange={(e) =>
                                    this.setState({
                                        id_selectedComponent: e.target.value
                                    })
                                }
                                disabled={editable}
                            >
                                <option value={0} selected disabled>
                                    {"Select Component"}
                                </option>
                                {array_components.map((p) => (
                                    <option key={p.com_id} value={p.com_id}>{p.com_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>Field Name:</p>
                            <div className={styles.inputCustom}>
                                <CustomInput
                                    type="text"
                                    value={txt_field_name}
                                    onChange={(e) =>
                                        this.setState({
                                            txt_field_name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>Field Type:</p>
                            <select
                                value={txt_field_type}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    const selectedId = e.target.options[e.target.selectedIndex].getAttribute("data-id");

                                    this.setState({
                                        txt_field_type: selectedValue,
                                        id_selectedFieldType: selectedId,
                                    });

                                    selectedId == 4 && this.getTableName()
                                }}
                                disabled={editable}
                            >
                                <option value={0} selected disabled>
                                    {"Select Field Type"}
                                </option>
                                {array_field_type.map((p) => (
                                    <option key={p.id} value={p.value} data-id={p.id}>{p.value}</option>
                                ))}
                            </select>
                        </div>

                        {txt_field_type === "Dropdown" &&
                            <div className={styles.inputAlignment}>
                                <p></p>
                                <select
                                    value={id_selectedTableName}
                                    onChange={(e) => {
                                        this.setState({
                                            id_selectedTableName: e.target.value,
                                        });
                                    }}
                                    disabled={editable}
                                >
                                    <option value={0} selected disabled>
                                        {"Select Table"}
                                    </option>
                                    {arr_table_name.map((p) => (
                                        <option key={p.id} value={p.id}>{p.table_name}</option>
                                    ))}
                                </select>
                            </div>}

                        <div className={`${styles.button}`}>
                            <button
                                className={`button`}
                                onClick={() => editable ? this.update() : this.create()}
                            >
                                {"Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
