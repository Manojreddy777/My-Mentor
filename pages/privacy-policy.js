import React from "react";

import styles from "../styles/career.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"privacyPolicy"}>
                <div className={styles.wrapper}>
                    <p className={styles.heading}>Last Updated: March 6,2024</p>
                    <div className={styles.mainParagraph}>
                        <p>
                            Welcome to Finari Services Private Limited's website. Your privacy
                            is important to us, and we are committed to protecting your
                            personal information. This Privacy Policy outlines how we collect,
                            use, disclose, and protect the information you provide to us
                            through our website and related services.
                        </p>
                    </div>
                    <div className={styles.mainHeading}>
                    <p className={styles.heading}>1. Information We Collect:</p>
                        <p>
                            Personal Information: We may collect personal information such as
                            your name, email address, phone number, and other contact details
                            when you voluntarily submit them through our website's contact
                            forms or when you communicate with us via email or phone.
                        </p>

                        <p>
                            Usage Information: We may collect non-personal information about
                            your interactions with our website, such as the pages visited, the
                            duration of your visit, and other website analytics data collected
                            through cookies and similar technologies.
                        </p>
                    </div>
                    <div className={styles.mainHeading}>
                        {/* <span>2. How We Use Your Information:</span> */}
                        <p className={styles.heading}>2. How We Use Your Information:</p>
                        <p>
                            We use the information we collect to provide, maintain, and
                            improve our services, to communicate with you about our products
                            and services, and to respond to your inquiries and requests.
                        </p>
                        <p>
                            We may also use your information to personalize your experience on
                            our website, to analyze trends and user behavior, and to comply
                            with legal and regulatory requirements.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>3. Data Security: </span> */}
                        <p className={styles.heading}>3. Data Security: </p>
                        <p>
                            We employ industry-standard security measures to protect the
                            confidentiality, integrity, and availability of your personal
                            information. This includes the use of encryption technologies to
                            safeguard your data during transmission and storage. However,
                            please note that no method of transmission over the internet or
                            electronic storage is completely secure, and we cannot guarantee
                            the absolute security of your information.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>4. Your Choices and Rights: </span> */}
                        <p className={styles.heading}>4. Your Choices and Rights: </p>
                        <p>
                            You have the right to access, update, and delete your personal
                            information. You may also choose to opt out of receiving marketing
                            communications from us at any time by following the instructions
                            provided in such communications.
                        </p>
                        <p>
                            Please note that certain information may be necessary for us to
                            provide our services to you, and deleting such information may
                            affect your ability to use our services
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>5. Changes to this Privacy Policy: </span> */}
                        <p className={styles.heading}>5. Changes to this Privacy Policy:  </p>
                        <p>
                            We reserve the right to update or modify this Privacy Policy at
                            any time. Any changes will be effective immediately upon posting
                            the updated Privacy Policy on our website. Your continued use of
                            our website after any such changes constitutes your acceptance of
                            the updated Privacy Policy.
                        </p>
                    </div>
                </div>
            </GlobalWrapper>
        );
    }
}
