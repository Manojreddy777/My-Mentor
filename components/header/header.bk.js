import React from "react";

import styles from "../header/header.module.css";
import Menu from "../menu/menu";
import LoginModal from "../login/login";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: false,
            categoryListOpen: false,
            username: undefined,
            menu: [
                {
                    id: 5,
                    title: "Home",
                    link: "/",
                },
                {
                    id: 1,
                    title: "Services",
                    open: false,
                    subMenu: [
                        {
                            id: 1,
                            title: "Core Banking",
                            link: "/core-banking",
                        },
                        {
                            id: 2,
                            title: "Web Technology",
                            link: "/web-technology",
                        },
                    ],
                },
                {
                    id: 2,
                    title: "Careers",
                    link: "/careers",
                },
                {
                    id: 3,
                    title: "About Us",
                    link: "/about-us",
                },
                {
                    id: 4,
                    title: "Contact Us",
                    link: "/contact-us",
                },
            ],
            subscribe: [],
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

    async logout() {
        localStorage.clear();
        window.location = "/";
    }

    render() {
        const { categoryListOpen, menu, loginVisibility, username } = this.state;
        return (
            <div>
                {loginVisibility && (
                    <LoginModal
                        visibility={loginVisibility}
                        setVisibility={(v) =>
                            this.setState({ loginVisibility: v })
                        }
                    />
                )}
                <div className={styles.navBar}>
                    <img
                        className={styles.logoImg}
                        src={"/assets/logo.png"}
                        alt="Finari"
                        onClick={() => (window.location = "/")}
                    />

                    <div className={styles.menuWrapper}>
                        {menu.map((m) =>
                            m.subMenu?.length > 0 ? (
                                <div className={`dropdown`}>
                                    <a className={styles.menuTitle}>
                                        {m.title}
                                    </a>
                                    <div className={`dropdown-content`}>
                                        {m.subMenu.map((sm) => (
                                            <a href={sm.link}>{sm.title}</a>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a className={styles.menuTitle} href={m.link}>
                                    {m.title}
                                </a>
                            )
                        )}
                    </div>

                    {username == undefined ? (
                        <div className={styles.signup}>
                            <div>
                                <a
                                    onClick={() =>
                                        this.setState({
                                            loginVisibility: true,
                                        })
                                    }
                                    className={styles.menuTitle}
                                >
                                    {console.log(username)}
                                    {"Sign In"}
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.signup}>
                            <div>
                                <div className={`dropdown`}>
                                    <a className={styles.menuTitle}>
                                        {username}
                                    </a>
                                    <div
                                        className={`dropdown-content`}
                                        style={{ top: 20, left: -120 }}
                                    >
                                        <a
                                            onClick={() => {
                                                if (global.config.user_role == "6") {
                                                    window.location = "/ops/asset-details";
                                                } else if ( global.config.user_role == "1") {
                                                    window.location = "/employee/timesheet";
                                                } else if ( global.config.user_role == "9") {
                                                    window.location = "/guest/examPaper";
                                                } else if ( global.config.user_role == "3") {
                                                    window.location = "/comm/TsTask";
                                                } else if ( global.config.user_role == "2") {
                                                    window.location = "/hr/TsTask";
                                                } else if ( global.config.user_role == "5") {
                                                    window.location = "/employee/timesheet";
                                                } else if ( global.config.user_role == "7") {
                                                    window.location = "/employee/timesheet";
                                                } else if ( global.config.user_role == "10") {
                                                    window.location = "/em/emProject";
                                                } else if ( global.config.user_role == "11") {
                                                    window.location = "/em/emOnboard";
                                                } else if ( global.config.user_role == "12") {
                                                    window.location = "/em/emOrderQueue";
                                                }
                                            }
                                            }
                                        >
                                            Settings
                                        </a>
                                        <a onClick={() => this.logout()}>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className={styles.menuButton}
                        onClick={() =>
                            this.setState({
                                categoryListOpen: !categoryListOpen,
                            })
                        }
                    >
                        <i
                            class={`fa ${
                                categoryListOpen ? "fa-close" : "fa-bars"
                            }`}
                            aria-hidden="true"
                        ></i>
                    </div>
                </div>
                <Menu
                    menu={menu}
                    open={categoryListOpen}
                    setOpen={(v) => this.setState({ categoryListOpen: v })}
                />
            </div>
        );
    }
}
