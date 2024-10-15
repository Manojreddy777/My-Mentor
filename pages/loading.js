import React from "react";
import Head from "../components/head";

import styles from "../styles/loading.module.css";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Head title="Loading"/>
                <div className={styles.wrapper}>
                    <div className={styles.ring}>Loading
                        <span className={styles.loading}></span>
                    </div>
                </div>
            </div>
        );
    }
}
