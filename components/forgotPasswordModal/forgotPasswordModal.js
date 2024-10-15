import React from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "./forgotPasswordModal.module.css";
import UserHelper from "../../helper/user";
import CustomInput from "../customInput/customInput";

export default class ForgotPasswordModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			newPass: "",
			confirmPass: "",
			otp: "",
			otpSent: false,
			showPassword_new: false,
			showPassword_confirm: false,
		};
	}

	validatePassword(e) {
		const re = /^(?=.*?[A-Z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{7,}\S+$/;
		return re.test(e);
	}

	sendOtp() {
		const { username } = this.state;

		UserHelper.sendForgotOtp(username)
			.then((data) => {
				if (data.code == 200) {
					this.setState({ otpSent: true });
					Swal.fire({
						icon: 'info',
						text: "OTP successfully sent!",
						confirmButtonColor: Colors.primaryColor,
					});
				} else if (data.code == 400) {
					Swal.fire({
						icon: 'error',
						text: "Invalid username!",
						confirmButtonColor: Colors.primaryColor,
					});
				} else {
					throw "error";
				}
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					text: "Error sending OTP!",
					confirmButtonColor: Colors.primaryColor,
				});
				console.log(err);
			});
	}

	setPassword() {
		const { otp, newPass } = this.state;
		const { setVisibility } = this.props;

		UserHelper.setForgotPass(newPass, otp)
			.then((data) => {
				if (data.code == 200) {
					Swal.fire({
						icon: 'success',
						text: "Password reset successfully! Login to continue",
						confirmButtonColor: Colors.primaryColor,
					});
					setVisibility(false);
				} else if (data.code == 400) {
					Swal.fire({
						icon: 'error',
						text: "Incorrect OTP!",
						confirmButtonColor: Colors.primaryColor,
					});
				} else {
					throw "error";
				}
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					text: "Error updating password! Try again later",
					confirmButtonColor: Colors.primaryColor,
				});
				console.log(err);
			});
	}

	checkValues() {
		const { username, newPass, confirmPass, otp } = this.state;

		const alertInitText = "";
		let alertText = alertInitText;

		if (username === "") {
			alertText += "• Username\n";
		}

		if (newPass === "") {
			alertText += "• New Password\n";
		} else if (!this.validatePassword(newPass)) {
			alertText += ". Password must have minimum 8 characters \n  with 1 capital letter, 1 numeric and 1 special \n  character\n";
		}

		if (confirmPass === "") {
			alertText += "• Confirm Password\n";
		}

		if (otp === "") {
			alertText += "• OTP\n";
		}

		if (alertText !== alertInitText) {
			Swal.fire({
				icon: 'warning',
				title: "Fill these fields to continue:\n",
				html: '<pre style="display: flex;text-align: left;flex-direction: column;align-items: center">' + alertText + '</pre>',
				confirmButtonColor: Colors.primaryColor,
			});
			return;
		} else {
			if (newPass !== confirmPass) {
				Swal.fire({
					icon: 'error',
					text: "Password do not match",
					confirmButtonColor: Colors.primaryColor,
				});
				return;
			}
		}

		this.setPassword();
	}

	render() {
		const { setVisibility, visibility } = this.props;
		const { username, newPass, confirmPass, otp, otpSent, showPassword_new, showPassword_confirm } = this.state;
		return (
			<div className={styles.mainWrapper}>
				<div
					className={styles.wrapper}
					onClick={(e) => e.stopPropagation()}
				>
					<img
						src="/assets/close-red.png"
						alt="Close Icon"
						className={styles.closeButton}
						onClick={() => setVisibility(false)}
					/>
					<h3 className={styles.title}>Forgot Password</h3>


					{/* <div className={styles.content}> */}
					<div style={{ position: "relative" }}>
						<CustomInput
							placeholder="Username"
							onChange={(e) =>
								this.setState({
									username: e.target.value,
								})
							}
						/>

						<p
							className={`${username.length > 0 && styles.selectedLabel
								} ${styles.labelContent}`}
							for="text1"
							onClick={(e) => {
								if (username.length > 0) {
									this.sendOtp();
								}
							}}
						>
							Send OTP
						</p>
					</div>


					<div style={{ position: "relative" }}>
						<CustomInput
							placeholder="OTP"
							value={otp}
							disabled={!otpSent}
							onChange={(e) =>
								this.setState({
									otp: e.target.value,
								})
							}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									this.checkValues();
								}
							}}
						/>
					</div>

					<div style={{ position: "relative" }}>
						<CustomInput
							type={
								this.state.showPassword_new
									? "text"
									: "password"
							}
							placeholder="New Password"
							value={newPass}
							disabled={!otpSent}
							onChange={(e) =>
								this.setState({
									newPass: e.target.value,
								})
							}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									this.checkValues();
								}
							}}
						/>
						<i
							className={`material-icons visibility ${styles.pass}`}
							onClick={() =>
								this.setState({
									showPassword_new: !this.state.showPassword_new,
								})
							}
						>
							{this.state.showPassword_new ? (
								"visibility_off"

							) : (
								"visibility_on"
							)}
						</i>
					</div>

					<div style={{ marginBottom: 40, position: "relative" }}>
						<CustomInput
							type={
								this.state.showPassword_confirm
									? "text"
									: "password"
							}
							placeholder="Confirm Password"
							value={confirmPass}
							disabled={!otpSent}
							onChange={(e) =>
								this.setState({
									confirmPass: e.target.value,
								})
							}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									this.checkValues();
								}
							}}
						/>
						<i
							className={`material-icons visibility ${styles.pass}`}
							onClick={() =>
								this.setState({
									showPassword_confirm: !this.state.showPassword_confirm,
								})
							}
						>
							{this.state.showPassword_confirm ? (
								"visibility_off"

							) : (
								"visibility_on"
							)}
						</i>
					</div>

					<button
						className={`button ${styles.button}`}
						onClick={() => this.checkValues()}
					>
						Confirm
					</button>
				</div>
			</div>
		);
	}
}
