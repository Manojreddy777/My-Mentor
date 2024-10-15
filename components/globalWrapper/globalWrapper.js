import React from "react";

import styles from "./globalWrapper.module.css";

import Header from "../header/header";
import Head from "../head";
import Footer from "../footer/footer";

export default class GlobalWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: {
				home: {
					title: "Home",
					hidden: true,
					link: "/",
					description: "This is home page",
					pageTitle: "Home",
				},
				contact: {
					title: "Contact Us",
					hidden: false,
					link: "/contact-us",
					description: "This is home page",
					pageTitle: "Contact Us",
				},
				careers: {
					title: "Careers",
					hidden: false,
					link: "/careers",
					description: "This is home page",
					pageTitle: "Careers",
				},
				careersList: {
					title: "Careers",
					hidden: false,
					link: "/careers",
					description: "This is home page",
					pageTitle: "Careers",
				},
				about: {
					title: "About Us",
					hidden: false,
					link: "/about-us",
					description: "This is home page",
					pageTitle: "About Us",
				},
				coreBanking: {
					title: "Core Banking",
					hidden: false,
					link: "/core-banking",
					description: "This is home page",
					pageTitle: "Core Banking",
				},
				webTechnology: {
					title: "Web Technology",
					hidden: false,
					link: "/web-technology",
					description: "This is home page",
					pageTitle: "Web Technology",
				},
				founder: {
					title: "Founder's Message",
					hidden: false,
					link: "/founder",
					description: "Founder's Message",
					pageTitle: "Founder's Message",
				},
				resetPassword: {
					title: "Reset Password",
					hidden: false,
					link: "/reset-password",
					description: "Reset Password",
					pageTitle: "Reset Password",
				},
				loghours: {
					title: "Add Log Hours",
					hidden: false,
					link: "/timesheet",
					description: "Add Log Hours",
					pageTitle: "Add Log Hours",
				},
				privacyPolicy: {
					title: "Privacy Policy",
					hidden: false,
					link: "/privacy-Policy",
					description: "This is home page",
					pageTitle: "PrivacyPolicy",
				},
				termsOfService: {
					title: "Terms Of Service",
					hidden: false,
					link: "/terms-of-service",
					description: "This is home page",
					pageTitle: "Terms Of Service",
				}
			},
		};
	}

	componentDidMount() {
		const { page, title, description } = this.props;
		const { menu } = this.state;

		if (page == "careersList") {
			menu[page].pageTitle = `${title} | Careers`;
			menu[page].description = description;
			this.setState({ menu: menu });
		}
	}

	render() {
		const { children, page } = this.props;
		const { menu } = this.state;
		return (
			<div>
				<Header />
				<Head
					title={menu[page].pageTitle}
					description={menu[page].description}
				/>
				{!menu[page].hidden && (
					<div className={styles.headerTitle}>
						<h1>{menu[page].title}</h1>
					</div>
				)}
				{children}
				<Footer />
			</div>
		);
	}
}
