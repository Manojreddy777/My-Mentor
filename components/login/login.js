import React from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "./login.module.css";
import CustomInput from "../customInput/customInput";
import UserHelper from "../../helper/user";
import MenuHelper from "../../helper/menu";

export default class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            showPassword: false,
            is_loading: false,
            forgotPassVisibility: false,
        };
    }

    checkValues() {
        const { username, password } = this.state;
        if (username === "" || password === "") {
            Swal.fire({
                text: "Fill the fields to continue!",
                confirmButtonColor: Colors.primaryColor,
                width: Colors.width,
                allowOutsideClick: false,
            });
        } else {
            this.loginUser(username, password);
        }
    }

    async loginUser(username, password) {
        try {
            const data = await UserHelper.get(username, password);
            if (data.code == 404) {
                Swal.fire({
                    text: "Invalid Username or Password!",
                    confirmButtonColor: Colors.primaryColor,
                    width: Colors.width,
                    allowOutsideClick: false,
                });
            } else if (data.code == 200) {            

                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_role", data.user_type_id);
                localStorage.setItem("tnnt_id", data.tnnt_id);
                localStorage.setItem("session_id", data.session_id);

                const menu = await MenuHelper.get(data.username, data.token);
                localStorage.setItem("menu", JSON.stringify(menu));

                window.location = "/home";

            } else {
                throw `${data.msg}`;
            }
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const { setVisibility } = this.props;
        const { username, password, is_loading } = this.state;
        return (
            <div className={styles.mainWrapper}>
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src="/assets/close-red.png"
                        className={styles.closeButton}
                        onClick={() => setVisibility(false)}
                    />
                    <h2 className={styles.title}>Login</h2>
                    <div className={styles.content}>
                        <div style={{ marginBottom: 40, position: "relative" }}>
                            <CustomInput
                                placeholder={"Username"}
                                value={username}
                                onChange={(e) =>
                                    this.setState({
                                        username: e.target.value,
                                    })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        this.checkValues();
                                    }
                                }}
                            />
                        </div>
                        <div style={{ position: "relative" }}>
                            <CustomInput
                                type={this.state.showPassword ? "text" : "password"}
                                placeholder={"Password"}
                                value={password}
                                onChange={(e) =>
                                    this.setState({
                                        password: e.target.value,
                                    })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        this.checkValues();
                                    }
                                }}
                            />
                            <i
                                className={`material-icons visibility ${styles.pass}`}
                                onClick={() =>
                                    this.setState({
                                        showPassword: !this.state.showPassword,
                                    })
                                }
                            >
                                {this.state.showPassword ? (
                                    "visibility_off"

                                ) : (
                                    "visibility_on"
                                )}
                            </i>
                        </div>
                    </div>
                    <button
                        className={`button ${styles.button}`}
                        onClick={() => this.checkValues()}
                        disabled={is_loading}
                    >
                        {is_loading ? "Logging In" : "Login"}
                    </button>

                    <a
                        className={styles.subText}
                        style={{ cursor: "pointer" }}
                        href="/reset-password"
                        // onClick={() =>
                        //     this.setState({
                        //         forgotPassVisibility: true,
                        //     })
                        // }
                        target="_blank"
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
        );
    }
}
