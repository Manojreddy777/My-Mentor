import React from "react";
import "../styles/globals.css";
import "../constants/variables";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "./loading.js";

const unProtectedPath = {
    "/": true,
    "/careers": true,
    "/about-us": true,
    "/contact-us": true,
    "/reset-password": true,
    "/acWebinarReg": true,
    "/aim/aimCategory": true,
    "/aim/aimBankAcct": true,
};

export default class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };

        this.userInit();
    }

    componentDidMount() {
        this.userInit();
    }

    userInit() {
        const { router } = this.props;

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            try {
                const username = localStorage.getItem("username");
                const token = localStorage.getItem("token");
                const user_role = localStorage.getItem("user_role");
                const tnnt_id = localStorage.getItem("tnnt_id");
                const session_id = localStorage.getItem("session_id");
                const menu = JSON.parse(localStorage.getItem("menu"));

                if (token !== undefined || token !== null) {
                    global.config.username = username;
                    global.config.accessToken = token;
                    global.config.user_role = user_role;
                    global.config.tnnt_id = tnnt_id;
                    global.config.menu = menu;
                    global.config.session_id = session_id;
                    this.setState({ isAuthenticated: true });
                }


                if (!unProtectedPath[router.pathname] && !token) {
                    window.location = "/";
                }

            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        const { isAuthenticated } = this.state;
        const { Component, pageProps } = this.props;

        if (unProtectedPath[this.props.router.pathname] || isAuthenticated) {
            return <Component {...pageProps} />;
        } else {
            return <Loading />;
        }
    }
}
