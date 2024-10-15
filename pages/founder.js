import React from "react";

import styles from "../styles/founder.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"founder"}>
                <div className={styles.wrapper}>
                    <div className={styles.innerWrapper}>
                        <div className={`${styles.image} ${styles.hide}`}>
                            <img src="/assets/balaji.png" />
                        </div>
                        <div>
                            <div
                                className={`${styles.mobileVersion}`}
                            >
                                <img src="/assets/balaji.png" />
                            </div>
                            <p className={styles.name}>Balaji Murali</p>
                            <p className={styles.founder}>Founder</p>
                            <p className={styles.paragraph}>
                                Finari Services strives to accelerate its
                                banking & software business with a profound
                                understanding of the client’s requirement and
                                needs.
                            </p>

                            <p>
                                Our Client challenges are treated with utmost
                                respect and sincerity, as we work diligently to
                                exceed or meet their expectations.
                            </p>
                        </div>
                    </div>
                    {/* <div className={styles.ppt}>
                    <a href="/assets/Finari Services Corporate Profile-Website.pptx">
                        Download Profile
                    </a>
                    </div> */}
                </div>
            </GlobalWrapper>
        );
    }
}
