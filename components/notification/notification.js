import React from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "./notification.module.css";
import NotificationHelper from "../../helper/notification";

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            tnnt_id: global.config.tnnt_id,
            user_name: global.config.username,
            is_loading: false,
            bl_custom: false,
            arr_event_notify: [],
            arr_notify_message: [],
            num_com_id: 0,
            rec_id: 0,
            modalEditVisibility: true,
        };

        if (props.id !== undefined) {
        }
        this.state = {
            ...stateData,
        };
    }
    componentDidMount() {
        this.getNotifList();
    }

    getNotifList() {
        const { user_name, tnnt_id } = this.state;

        const filter = {
            user_name: user_name,
            tnnt_id: tnnt_id,
            is_active: "active",
        };

        NotificationHelper.getNotifList(filter)
            .then((data) => {
                this.setState({
                    arr_notify_message: data,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: "Error",
                    confirmButtonColor: Colors.red,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                console.log(err);
            });
    }

    getNotifParam() {
        const { user_name, tnnt_id } = this.state;

        const filter = {
            user_name: user_name,
            tnnt_id: tnnt_id,
            is_active: "active",
        };

        NotificationHelper.getNotifParam(filter)
            .then((data) => {
                this.setState({
                    arr_event_notify: data,
                    bl_custom: true,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: "Error",
                    confirmButtonColor: Colors.red,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                console.log(err);
            });
    }

    setDismiss() {
        const { user_name, tnnt_id } = this.state;

        const filter = {
            user_name: user_name,
            tnnt_id: tnnt_id,
            is_active: "active",
        };

        NotificationHelper.setDismiss(filter)
            .then((data) => {
                if (data.code == 200) {
                    this.setState({ arr_notify_message: [] })
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: "Error",
                    confirmButtonColor: Colors.red,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                console.log(err);
            });
    }

    handleCheckboxChange(e, index) {
        const { user_name, tnnt_id } = this.state;

        const newArr = [...this.state.arr_event_notify];

        newArr[index].user_choose = e.target.checked;
        this.setState({ arr_event_notify: newArr });

        const filter = {
            user_name: user_name,
            tnnt_id: tnnt_id,
            event_id: e.target.id,
            user_choose: e.target.checked == true ? 1 : 2,
        }

        NotificationHelper.updateRecord(filter)
            .then((data) => {
                if (data.code != 200) {
                    Swal.fire({
                        icon: 'error',
                        text: data.msg,
                        confirmButtonColor: Colors.red,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    text: "Error",
                    confirmButtonColor: Colors.red,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
                console.log(err);
            });
    }

    render() {
        const { setVisibility } = this.props;
        const { is_loading, bl_custom, arr_event_notify,
            arr_notify_message } =
            this.state;

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
                    <div>
                        <img
                            src="/assets/close-black.png"
                            className={styles.closeButton}
                            onClick={() => setVisibility(false)}
                        />
                        <p className={styles.title}>{"Notifications"}</p>
                        {bl_custom ? (
                            <div className={styles.customWrapper}>
                                <button
                                    className={styles.customiseButton}
                                    onClick={() => {
                                        this.getNotifList(),
                                            this.setState({ bl_custom: false })
                                    }}
                                >
                                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                                    <p>{"Back"}</p>
                                </button>
                                <div className={styles.customiseAlignment}>
                                    <p>Choose notifications you want to see here.</p>

                                    {arr_event_notify.map((a, index) => (
                                        <div className={styles.eventAlignment}>
                                            <p>@ {a.event_descr}</p>
                                            <div>
                                                <label className={styles.switch}>
                                                    <input
                                                        type="checkbox"
                                                        checked={a.user_choose}
                                                        id={a.event_id}
                                                        onChange={(e) =>
                                                            this.handleCheckboxChange(e, index)
                                                        }
                                                    />
                                                    <span
                                                        className={`${styles.slider} ${styles.round}`}
                                                    ></span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.customWrapper}>
                                <div className={styles.buttonAlignment}>
                                    <button
                                        className={styles.customiseButton}
                                        onClick={() => this.getNotifParam()}
                                    >
                                        <i class="fa fa-cogs" aria-hidden="true"></i>
                                        <p>{"Customise"}</p>
                                    </button>
                                    {arr_notify_message.length != 0 &&
                                        <button
                                            className={styles.customiseButton}
                                            onClick={() => this.setDismiss()}
                                        >
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                            <p>{"Dismiss All"}</p>
                                        </button>
                                    }
                                </div>

                                <div className={styles.alertWrapper}>
                                    {arr_notify_message.length == 0 ?
                                        <div>
                                            <p>You have no new notification</p>
                                        </div> :
                                        arr_notify_message.map((a) => (
                                            <div className={styles.messageWrapper}>
                                                <p className={styles.content}>{a.notif_content}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
