import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CommentsHelper from "../../helper/tnntAdmin/taComments";

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            tnnt_id: global.config.tnnt_id,
            editable: false,
            num_com_id: undefined,
            txt_module_name: "",
            txt_component_name: "",
            bl_comment_status: "",
            is_loading: false,
        };
        if (props.data !== undefined) {
            stateData.editable = props.editable;
            stateData.num_com_id = props.data.rec_id;
            stateData.txt_module_name = props.data.module_name;
            stateData.txt_component_name = props.data.component_name;
            stateData.bl_comment_status = props.data.comment_status;
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

    async update() {

        const {
            num_com_id,
            bl_comment_status,
            tnnt_id
        } = this.state;

        const data = {
            id: num_com_id,
            comment_status: bl_comment_status == true ? 'active' : 'inactive',
            // tnnt_id: tnnt_id,
        }

        console.log(data)

        CommentsHelper.updateRecord(data)
            .then((data) => {
                console.log(data)
                if (data.code == 200) {
                    Swal.fire({
                        text: "Successfully Updated!",
                        confirmButtonColor: Colors.primaryColor,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    this.props.getComponents();
                    this.props.setVisibility(false);
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


    render() {
        const { setVisibility } = this.props;
        const {
            editable,
            txt_module_name,
            txt_component_name,
            bl_comment_status,
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
                        <p className={styles.title}>{editable ? "Update Comments Section" : "Create Custom Tables"}</p>

                        <div className={styles.inputAlignment}>
                            <p>Module Name:</p>
                            <div className={styles.inputCustom}>
                                {txt_module_name}
                            </div>
                        </div>

                        <div className={styles.inputAlignment}>
                            <p>Component Name:</p>
                            <div className={styles.inputCustom}>
                                {txt_component_name}
                            </div>
                        </div>

                        <div className={styles.inputAlignment}
                            style={{
                                justifyContent: "space-around",
                                display: "flex",
                            }}>
                            <div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={bl_comment_status}
                                        onChange={(e) =>
                                            this.setState({
                                                bl_comment_status: e.target.checked,
                                            })
                                        }
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <p className={styles.statusText}>
                                    {bl_comment_status ? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>

                        <div className={`${styles.button}`}>
                            <button
                                className={`button`}
                                onClick={() => this.update()}
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
