import React from "react";

import styles from "../styles/services.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class CoreBanking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <GlobalWrapper page={"coreBanking"}>
                <div className={styles.wrapper}>
                    <p className={styles.content}>
                        We work on requirement elicitation, software design,
                        customization, Go Live release support, production
                        support, Manual testing, automated testing, chair UAT,
                        release upgrade and system performance tuning projects.
                    </p>
                    <p className={styles.content}>
                        We provide consulting and services on core banking
                        package software AVALOQ.
                    </p>
                    <p className={styles.content} style={{fontWeight: 600}}>
                        Services offered in detail:
                    </p>
                    <div className={styles.benifits}>
                        <p className={styles.content}>
                            1. Implementation of new booking center.
                        </p>
                        <p className={styles.content}>
                            2. Implementation of new / enhancements on functional modules, reports and Interfaces. 
                        </p>
                        <p className={styles.content}>
                            3. Release upgrade.
                        </p>
                        <p className={styles.content}>
                            4. Production support.
                        </p>
                        <p className={styles.content}>
                            5. Platform stabilization and performance tuning.
                        </p>
                        <p className={styles.content}>
                            6. Build automation testing repository and upscale testing quality.
                        </p>
                    </div>
                </div>
            </GlobalWrapper>
        );
    }
}
