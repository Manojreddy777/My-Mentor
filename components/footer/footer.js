import React, { Component } from "react";
import styles from "./footer.module.css";
import { withRouter } from "next/router";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className={styles.mainWrapper}>
				{/* <img
					className={styles.logoImg}
					src={"/assets/logo.png"}
					alt="Finari"
					onClick={() => (window.location = "/")}
				/> */}
				<div className={styles.wrapper}>
					<div className={styles.footerDetails}>
						<p className={styles.heading}>{"Pages"}</p>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/careers")}
						>
							{"Careers "}
						</p>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/about-us")}
						>
							{"About Us "}
						</p>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/contact-us")}
						>
							{"Contact Us "}
						</p>
					</div>

					<div className={styles.socialIcons}>
						<p className={styles.heading}>{"Follow us "}</p>
						<div>
							<a href="https://www.instagram.com" target="_blank">
								<img
									alt="insta"
									src="/assets/insta.png"
									className={styles.socialLogo}
								/>
							</a>
							<a href="https://www.facebook.com" target="_blank">
								<img
									alt="fb"
									src="/assets/facebook.png"
									className={styles.socialLogo}
								/>
							</a>
							<a href="https://twitter.com" target="_blank">
								<img
									alt="twitter"
									src="/assets/twitter.png"
									className={styles.socialLogo}
								/>
							</a>
							<a href="http://linkedin.com" target="_blank">
								<img
									alt="linkedin"
									src="/assets/linkedin.png"
									className={styles.socialLogo}
								/>
							</a>
						</div>
					</div>
				</div>

				<div className={styles.footerData}>
					<p className={styles.footerText}>&#169; 2021-24 Finari.com. All Rights Reserved</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Footer);
