import React from "react";
import Swal from "sweetalert2";
import Colors from "../constants/colors";

import styles from "../styles/contact-us.module.css";

import ContactHelper from "../helper/contact";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import CustomInput from "../components/customInput/customInput";

export default class ContactUs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email_id: "",
			contact_no: "",
			country: "",
			relationship: "",
			your_query: "",
		};
	}

	validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	getData() {
		const {
			name,
			email_id,
			contact_no,
			country,
			relationship,
			your_query,
		} = this.state;
		const alertInitText = "";
		let alertText = alertInitText;

		if (name === "") {
			alertText += "• Name\n";
		}

		if (email_id === "") {
			alertText += "• Email ID\n";
		} else if (!this.validateEmail(email_id)) {
			alertText += "• Invalid Email ID\n";
		}

		if (contact_no === "") {
			alertText += "• Mobile Number\n";
		} else if (isNaN(contact_no)) {
			alertText += "• Invalid Mobile Number\n";
		} else if (contact_no.length !== 11 && contact_no.length !== 10) {
			alertText += "• Invalid Mobile Number\n";
		}

		if (country === "") {
			alertText += "• Country\n";
		}

		if (relationship === "") {
			alertText += "• Relationship with Company\n";
		}

		if (your_query === "") {
			alertText += "• Your Query\n";
		}

		if (alertText !== alertInitText) {
			Swal.fire({
				title: "Fill these fields to continue:\n",
				html:
					'<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
					alertText +
					"</pre>",
				confirmButtonColor: Colors.primaryColor,
				width: Colors.width,
				allowOutsideClick: false,
			});
			//alert(alertText);
			return;
		}
		const data = {
			name: name,
			contact_no: contact_no,
			country: country,
			email_id: email_id,
			relationship: relationship,
			query: your_query,
		};

		ContactHelper.create(data)
			.then((data) => {
				if (data.code == 200) {
					this.setState({
						name: "",
						email_id: "",
						country: "",
						relationship: "",
						your_query: "",
						contact_no: "",
					});
					Swal.fire({
						text: "Your query was sent to our team. We will get back to you as soon as possible",
						confirmButtonColor: Colors.primaryColor,
						width: Colors.width,
						allowOutsideClick: false,
					});
					// alert(
					// 	"Your query was sent to our team. We will get back to you as soon as possible"
					// );
				} else {
					throw "err";
				}
			})
			.catch((err) => {
				Swal.fire({
					text: "An error occurred!\n Please try again later",
					confirmButtonColor: Colors.primaryColor,
					width: Colors.width,
					allowOutsideClick: false,
				});
				//alert("An error occurred!\n Please try again later");
				console.log(err);
			});
	}

	render() {
		const {
			name,
			email_id,
			country,
			relationship,
			your_query,
			contact_no,
		} = this.state;
		return (
			<GlobalWrapper page={"contact"}>
				<div className={styles.wrapper}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<p className={styles.titleText}>Finari Services</p>
						<p className={styles.subText}>
							We'd love to hear from you.
						</p>
						<div className={styles.contactDetails}>
							<div>
								<p>Email Us</p>
								<button className={`button ${styles.button}`}>
									support@finari.com
								</button>
							</div>
							<div>
								<p>Call Us</p>
								<button className={`button ${styles.button}`}>
									+91 9840449446
								</button>
							</div>
						</div>
						<div className={styles.contactDetails}>
							<div>
								<p>{" Registered Address "}</p>
								<span>Plot No: 20, 2nd street,</span><br />
								<span>Thirumagal Nagar,</span><br />
								<span>Selaiyur Post,</span><br /> 
								<span>Chennai – 600 073,</span><br />
								<span>Tamil Nadu, India.</span>
							</div>
							<div>
								<p>{" Corporate Office Address "}</p>
								<span>TechNest No.7, 2nd Floor,</span><br />
								<span>Software Technology Parks of India (STPI),</span><br />
								<span>No. 5, Rajiv Gandhi Salai,</span><br /> 
								<span>Tharamani,</span><br />
								<span>Chennai – 600113,</span><br />
								<span>Tamil Nadu, India.</span>
							</div>
						</div>
						<div className={styles.socialIconsWrapper}>
							<p>{"Connect With Us "}</p>
							<div>
								<a
									href="https://www.instagram.com"
									target="_blank"
								>
									<img
										alt="insta"
										src="/assets/insta.png"
										className={styles.socialLogo}
									/>
								</a>
								<a
									href="https://www.facebook.com"
									target="_blank"
								>
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
					<div className={styles.contactContent}>
						<p className={styles.titleText}>Get in Touch!</p>
						<CustomInput
							placeholder={"Full Name"}
							value={name}
							onChange={(e) =>
								this.setState({
									name: e.target.value,
								})
							}
						/>
						<CustomInput
							placeholder={"Email ID"}
							value={email_id}
							onChange={(e) =>
								this.setState({
									email_id: e.target.value,
								})
							}
						/>
						<CustomInput
							type="tel"
							placeholder={"Contact No"}
							value={contact_no}
							onChange={(e) =>
								this.setState({
									contact_no: e.target.value,
								})
							}
						/>
						<CustomInput
							placeholder={"Country"}
							value={country}
							onChange={(e) =>
								this.setState({
									country: e.target.value,
								})
							}
						/>
						<CustomInput
							placeholder={"Relationship with Company"}
							value={relationship}
							onChange={(e) =>
								this.setState({
									relationship: e.target.value,
								})
							}
						/>
						<CustomInput
							placeholder={"Your Query"}
							inputType={"textarea"}
							value={your_query}
							onChange={(e) =>
								this.setState({
									your_query: e.target.value,
								})
							}
						/>

						<center>
							<button
								className={`button`}
								style={{ width: "100%" }}
								onClick={() => this.getData()}
							>
								{"Submit"}
							</button>
						</center>
					</div>
				</div>
			</GlobalWrapper>
		);
	}
}
