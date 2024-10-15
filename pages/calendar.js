import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import CalendarModal from "../components/calendar/calendar";
import Component1 from "../components/calendar/component1";
import Component2 from "../components/calendar/component2";
import Head from "../components/head";
import styles from "../styles/calendar.module.css";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            tnnt_id: global.config.tnnt_id,
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

    render() {
        return (
            <SideMenu tag="calendar">
                <div className={styles.calendarPage}>
                    <Head title="Calendar" />

                    <div className={styles.leftPanel}>
                        <div className={styles.leftBox}>
                            <Component1 />
                        </div>
                        <div className={styles.leftBox}>
                            <Component2 />
                        </div>
                    </div>

                    <div className={styles.rightPanel}>
                        <div className={styles.rightBox}>
                            <CalendarModal />
                        </div>
                    </div>
                </div>
            </SideMenu>
        );
    }
}

