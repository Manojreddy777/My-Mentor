import React from "react";

import styles from "../styles/about-us.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import Footer from "../components/footer/footer";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"about"}>
                <div className={styles.wrapper}>
                    <p className={styles.content}>
                        <span style={{ fontWeight: 600 }}>
                            Finari Services Pvt Ltd
                        </span>{" "}
                        was incorporated in June 2021 with 15 years of
                        experience in core banking
                        domain. We offer consulting & services in core banking
                        package software and web technology domains project.
                    </p>
                    <p className={styles.content}>
                        In today’s financial ecosystem for bridging business and
                        technology, there comes a need for a techno functional
                        consultants and Finari Services are specialized in it.
                    </p>
                    <p className={styles.content}>
                        We support our clients right from the budding stage of
                        their idea and support them throughout their journey. We
                        focus on delivering revenue growth and improving the
                        operational efficiency of our clients.
                    </p>
                    <p className={styles.heading}>Our Vision:</p>
                    <div className={styles.benifits}>
                        <ul>
                            <li>
                                Bring business and technology into one space.
                            </li>
                            <li>
                                Focus on delivering revenue growth and improve
                                operational efficiency of our clients.
                            </li>
                        </ul>
                    </div>
                    <p className={styles.heading}>Our Mission:</p>
                    <div className={styles.benifits}>
                        <ul>
                            <li>
                                To relentlessly drive quality, value and deliver
                                our best to customers.
                            </li>
                            <li>
                                To be a process driven, professionally managed
                                and profitable organization.
                            </li>
                            <li>
                                To become a great place to work where people are
                                inspired, motivated and given an opportunity to
                                become next generation leaders and
                                entrepreneurs.
                            </li>
                        </ul>
                    </div>
                    <p className={styles.heading}>Our Core Values:</p>
                    <div className={styles.benifits}>
                        <ul>
                            <li>Respect</li>
                            <li>Integrity</li>
                            <li>Service</li>
                            <li>Excellence</li>
                            <li>Stewardship</li>
                            <li>Self-Confidence</li>
                        </ul>
                    </div>
                    <p className={styles.founderMessage}>Founder's Message</p>
                    <div className={styles.innerWrapper}>
                        <div>
                            <div className={`${styles.mobileVersion}`}>
                                <img src="/assets/balaji.png" />
                            </div>
                            <p className={styles.name}>Balaji Murali</p>
                            <p className={styles.founder}>Founder</p>
                            <p className={styles.paragraph}>
                                <span style={{ fontWeight: 600 }}>
                                    Finari Services{" "}
                                </span>
                                strives to accelerate its banking & software
                                business with a profound understanding of the
                                client’s requirement and needs.
                            </p>

                            <p className={styles.paragraph}>
                                Our Client challenges are treated with utmost
                                respect and sincerity, as we work diligently to
                                exceed or meet their expectations.
                            </p>
                        </div>
                        <div className={`${styles.image} ${styles.hide}`}>
                            <img src="/assets/balaji.png" />
                        </div>
                    </div>
                </div>
                <div className={styles.version}>
                    Version: 6.7.6 
                </div>
            </GlobalWrapper>
        );
    }
}
