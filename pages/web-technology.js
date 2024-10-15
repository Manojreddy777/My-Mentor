import React from "react";

import styles from "../styles/services.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class WebTechnology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"webTechnology"}>
                <div className={styles.wrapper}>
                    <p className={styles.content}>
                        We work on requirement elicitation, software design,
                        customization, Go Live release support, production
                        support, Manual testing, automated testing, chair UAT,
                        release upgrade and system performance tuning projects.
                    </p>
                    <p className={styles.content} style={{fontWeight: 600}}>
                        Services offered in detail:
                    </p>
                    <div className={styles.benifits}>
                        <p className={styles.content}>
                            1. Implementation of web components in multi stack.
                        </p>
                        <p className={styles.content}>
                            2. Digital transformation
                            <div className={styles.subPoints}>
                                <p className={styles.content}>
                                    a. Setup new infrastructure in cloud.
                                </p>
                                <p className={styles.content}>
                                    b. Migrate existing physical infrastructure
                                    to cloud.
                                </p>
                            </div>
                        </p>
                        <p className={styles.content}>
                            3. Maintenance of Dev/ Testing / Production Servers
                            in GCP / AWS / Digital Ocean cloud platforms.
                        </p>
                    </div>
                </div>
            </GlobalWrapper>
        );
    }
}
