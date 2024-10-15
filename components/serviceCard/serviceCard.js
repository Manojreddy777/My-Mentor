import React from "react";

import styles from "./serviceCard.module.css";

export default class ServiceCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, description, icon, link, alt } = this.props;

		return (
			<div
				className={styles.container}
				style={link && { padding: 10, paddingTop: 30 }}
			>
				<div className={styles.icon}>
          			<img src={icon} alt={alt} onClick={() => window.location = "/corebanking"} />
        		</div>
				<div className={styles.icon}>
          			<img src={icon} alt={alt} onClick={() => window.location = "/web-technology"} />
        		</div>
				
				<h4 className={styles.title}>{title}</h4>
				{description != undefined && (
					<p className={styles.description}>{description}</p>
				)}
				{link != undefined && (
					<button
						className={styles.button}
						onClick={() => (window.location = "/careers")}
					>
						{"See Open Positions"}
					</button>
				)}
			</div>
		);
	}
}
