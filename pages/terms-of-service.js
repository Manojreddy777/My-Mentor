import React from "react";

import styles from "../styles/career.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class TermsOfService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"termsOfService"}>
                <div className={styles.wrapper}>
                    <div className={styles.mainParagraph}>
                        <p>
                            Welcome to Finari Services Private Limited's website. These Terms
                            of Service ("Terms") govern your access to and use of our website
                            and related services. By accessing or using our website, you agree
                            to be bound by these Terms. If you do not agree to these Terms,
                            please do not use our website.
                        </p>
                    </div>
                    <div className={styles.mainHeading}>
                        {/* <span>1. Use of Our Website: </span> */}
                        <p className={styles.heading}>1. Use of Our Website: </p>
                        <p>
                            You may use our website for lawful purposes and in accordance with
                            these Terms. You agree not to use our website in any way that
                            violates any applicable laws or regulations.
                        </p>
                    </div>
                    <div className={styles.mainHeading}>
                        {/* <span>2. Intellectual Property Rights:</span> */}
                        <p className={styles.heading}>2. Intellectual Property Rights:</p>
                        <p>
                            All content, trademarks, logos, and other intellectual property
                            displayed on our website are owned by Finari Services Private
                            Limited or its licensors. You may not use, reproduce, distribute,
                            or modify any of our intellectual property without our prior
                            written consent.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>3. User Content: </span> */}
                        <p className={styles.heading}>3. User Content:</p>
                        <p>
                            You may have the opportunity to submit content, such as comments
                            or feedback, through our website. By submitting such content, you
                            grant us a non-exclusive, royalty-free, perpetual, irrevocable,
                            and fully sublicensable right to use, reproduce, modify, adapt,
                            publish, translate, distribute, and display such content
                            throughout the world in any media.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>4. Limitation of Liability: </span> */}
                        <p className={styles.heading}>4. Limitation of Liability: </p>
                        <p>
                            To the fullest extent permitted by law, Finari Services Private
                            Limited and its officers, directors, employees, and agents shall
                            not be liable for any indirect, incidental, special,
                            consequential, or punitive damages arising out of or in connection
                            with your use of our website.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>5. Indemnification: </span> */}
                        <p className={styles.heading}>5. Indemnification: </p>
                        <p>
                            You agree to indemnify and hold harmless Finari Services Private
                            Limited and its officers, directors, employees, and agents from
                            and against any and all claims, liabilities, damages, losses,
                            costs, and expenses (including reasonable attorneys' fees) arising
                            out of or in connection with your use of our website or your
                            violation of these Terms.
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>6. Governing Law: </span> */}
                        <p className={styles.heading}>6. Governing Law: </p>
                        <p>
                            These Terms shall be governed by and construed in accordance with
                            the laws of [jurisdiction], without regard to its conflict of law
                            principles
                        </p>
                    </div>

                    <div className={styles.mainHeading}>
                        {/* <span>6. Changes to These Terms: </span> */}
                        <p className={styles.heading}>7. Changes to These Terms: </p>
                        <p>
                            We reserve the right to update or modify these Terms at any time
                            without prior notice. Any changes will be effective immediately
                            upon posting the updated Terms on our website. Your continued use
                            of our website after any such changes constitutes your acceptance
                            of the updated Terms.
                        </p>
                    </div>
                </div>
            </GlobalWrapper>
        );
    }
}
