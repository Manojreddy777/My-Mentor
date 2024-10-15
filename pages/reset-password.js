import React from "react";
import Swal from "sweetalert2";
import Colors from "../constants/colors";
import styles from "../styles/resetPassword.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import CustomInput from "../components/customInput/customInput";
import UserHelper from "../helper/user";

export default class ContactUs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			is_loading: false,
			arr_questions_1: [
				{
					id: 1,
					title: "What was your childhood nickname?",
				},
				{
					id: 2,
					title: "What is your favourite movie?",
				},
				{
					id: 3,
					title: "What's the name of the first school you attended?",
				},
			],
			arr_questions_2: [
				{
					id: 4,
					title: "What is you favorite pastime?",
				},
				{
					id: 5,
					title: "Where did you spend your childhood summers?",
				},
				{
					id: 6,
					title: "What was the first flim you saw in the theater?",
				},
			],
			arr_questions_3: [
				{
					id: 7,
					title: "What was you first pet's name?",
				},
				{
					id: 8,
					title: "What was your favorite subject in high school?",
				},
				{
					id: 9,
					title: "What was your dream job as child",
				},
			],
			id_selectedQuestion_1: undefined,
			id_selectedQuestion_2: undefined,
			id_selectedQuestion_3: undefined,
			txt_answer_1: "",
			txt_answer_2: "",
			txt_answer_3: "",
			account_name: "",
			new_password: "",
			confirm_new_password: "",
			show_New_Password: false,
			show_Confirm_New_Password: false,
			bl_next: false,
			tnnt_id: "",
		};
	}

	componentDidMount() {
		const username = global.config.username;
		if (username != null && username !== undefined) {
			this.setState({
				username: username,
			});
		}
	}

	validatePassword(e) {
		const re = /^(?=.*?[A-Z])(?=.*?[\d])(?=.*?[^\sa-zA-Z0-9]).{7,}\S+$/;
		return re.test(e);
	}

	async checkSecurityAnswer() {
		const {
			id_selectedQuestion_1,
			id_selectedQuestion_2,
			id_selectedQuestion_3,
			txt_answer_1,
			txt_answer_2,
			txt_answer_3,
			account_name,
		} = this.state;

		try {
			const alertInitText = "";
			let alertText = alertInitText;

			if (account_name === "") {
				alertText += "• Account Name\n";
			}

			if (id_selectedQuestion_1 === undefined) {
				alertText += "• Question 1\n";
			}

			if (id_selectedQuestion_2 === undefined) {
				alertText += "• Question 2\n";
			}

			if (id_selectedQuestion_3 === undefined) {
				alertText += "• Question 3\n";
			}

			if (txt_answer_1 === "") {
				alertText += "• Answer 1\n";
			}

			if (txt_answer_2 === "") {
				alertText += "• Answer 2\n";
			}

			if (txt_answer_3 === "") {
				alertText += "• Answer 3\n";
			}

			if (alertText !== alertInitText) {
				Swal.fire({
					icon: "warning",
					title: "Fill these fields to continue:\n",
					html:
						'<pre style="display: flex;text-align: left;flex-direction: column;align-items: center">' +
						alertText +
						"</pre>",
					confirmButtonColor: Colors.primaryColor,
					allowOutsideClick: false,
				});
				return;
			}

			this.setState({ is_loading: true });

			const filter = {
				question_1: id_selectedQuestion_1,
				question_2: id_selectedQuestion_2,
				question_3: id_selectedQuestion_3,
				answer_1: txt_answer_1,
				answer_2: txt_answer_2,
				answer_3: txt_answer_3,
				account_name: account_name,
			};

			console.log(filter);

			const usernameExists = await UserHelper.checkSecurityAnswer(filter);
			if (usernameExists.code == 403) {
				this.setState({ is_loading: false });
				Swal.fire({
					icon: "warning",
					text: "The provided answers do not match our records. Please ensure that you have entered the correct answers to the security questions associated with your account.",
					confirmButtonColor: Colors.primaryColor,
					allowOutsideClick: false,
				});
				return;
			} else if (usernameExists.code == 200) {
				this.setState({ is_loading: false });
				this.setState({
					bl_next: true,
					tnnt_id: usernameExists.data[0].tnnt_id,
					question_1: undefined,
					question_2: undefined,
					question_3: undefined,
					txt_answer_1: "",
					txt_answer_2: "",
					txt_answer_3: "",
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	updatePassword() {
		const { account_name, new_password, confirm_new_password, tnnt_id } = this.state;

		const alertInitText = "";
		let alertText = alertInitText;

		if (new_password === "") {
			alertText += ". New Password\n";
		} else if (!this.validatePassword(new_password)) {
			alertText +=
				". Password must have minimum 8 characters \n  with 1 capital letter, 1 numeric and 1 special \n  character\n";
		}

		if (confirm_new_password === "") {
			alertText += ".Confirm Password\n";
		}

		if (alertText !== alertInitText) {
			Swal.fire({
				icon: "warning",
				title: "Fill these fields to continue:\n",
				html:
					'<pre style="display: flex;text-align: left;flex-direction: column;align-items: center">' +
					alertText +
					"</pre>",
				confirmButtonColor: Colors.primaryColor,
				allowOutsideClick: false,
			});
			return;
		}
		if (new_password !== confirm_new_password) {
			Swal.fire({
				icon: "error",
				text: "Password do not match",
				confirmButtonColor: Colors.primaryColor,
				allowOutsideClick: false,
			});
			return;
		}

		const data = {
			account_name: account_name,
			password: new_password,
			tnnt_id: tnnt_id,
		};

		this.setState({ is_loading: true });

		UserHelper.updatenewPassword(data)
			.then((data) => {
				if (data.code == 200) {
					this.setState({ is_loading: false });
					Swal.fire({
						icon: "success",
						text: "Password successfully updated!",
						confirmButtonColor: Colors.primaryColor,
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isConfirmed) {
							window.location = "/";
						}
					});
				} else {
					Swal.fire({
						icon: "error",
						text: "Error updating Password!",
						confirmButtonColor: Colors.primaryColor,
						allowOutsideClick: false,
					});
					this.setState({ is_loading: false });
				}
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					icon: "error",
					text: "Error updating Password!",
					confirmButtonColor: Colors.primaryColor,
					allowOutsideClick: false,
				});
				this.setState({ is_loading: false });
			});
	}

	render() {
		const {
			is_loading,
			arr_questions_1,
			arr_questions_2,
			arr_questions_3,
			id_selectedQuestion_1,
			id_selectedQuestion_2,
			id_selectedQuestion_3,
			txt_answer_1,
			txt_answer_2,
			txt_answer_3,
			account_name,
			new_password,
			confirm_new_password,
			bl_next,
		} = this.state;
		return (
			<GlobalWrapper page={"resetPassword"}>
				{is_loading && (
					<div className={"loadingWrapper"}>
						<div className={"innerLoadingWrapper"}>
							<div class="bouncing-loader">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				)}
				<div className={styles.wrapper} style={{ padding: 10 }}>
					<div className={styles.borderAlignment}>
						{bl_next ? (
							<div>
								<div className={styles.inputAlignment}>
									<div
										className={styles.inputCustom}
										style={{ position: "relative" }}
									>
										<CustomInput
											value={account_name}
											placeholder={"Enter your username"}
											onChange={(e) =>
												this.setState({
													account_name: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className={styles.inputAlignment}>
									<div
										className={styles.inputCustom}
										style={{ position: "relative", display: "flex" }}
									>
										<CustomInput
											type={this.state.show_New_Password ? "text" : "password"}
											value={new_password}
											placeholder={"Your Password"}
											onChange={(e) =>
												this.setState({
													new_password: e.target.value,
												})
											}
										/>
										<i
											className={`material-icons visibility ${styles.pass}`}
											onClick={() =>
												this.setState({
													show_New_Password: !this.state.show_New_Password,
												})
											}
										>
											{this.state.show_New_Password
												? "visibility_off"
												: "visibility_on"}
										</i>
									</div>
								</div>

								<span className={styles.passRequirement}>
									{
										"*Password must have minimum 8 characters with 1 capital letter, 1 numeric and 1 special character"
									}
								</span>
								<div className={styles.inputAlignment}>
									<div
										className={styles.inputCustom}
										style={{ position: "relative", display: "flex" }}
									>
										<CustomInput
											type={
												this.state.show_Confirm_New_Password
													? "text"
													: "password"
											}
											value={confirm_new_password}
											placeholder={"Confirm Password"}
											onChange={(e) =>
												this.setState({
													confirm_new_password: e.target.value,
												})
											}
										/>
										<i
											className={`material-icons visibility ${styles.pass}`}
											onClick={() =>
												this.setState({
													show_Confirm_New_Password:
														!this.state.show_Confirm_New_Password,
												})
											}
										>
											{this.state.show_Confirm_New_Password
												? "visibility_off"
												: "visibility_on"}
										</i>
									</div>
								</div>

								<div className={styles.filterbutton}>
									<button
										className={`button`}
										onClick={() => this.updatePassword()}
									>
										{"Update Password"}
									</button>
								</div>
							</div>
						) : (
							<div>
								Answer the following question to reset your password.
								<div className={styles.inputAlignment}>
									<div
										className={styles.inputCustom}
										style={{ position: "relative" }}
									>
										<CustomInput
											value={account_name}
											placeholder={"Enter your username"}
											onChange={(e) =>
												this.setState({
													account_name: e.target.value,
												})
											}
										/>
									</div>
								</div>
								<div className={styles.selectAlignment}>
									<select
										className={styles.selectCareer}
										value={id_selectedQuestion_1}
										onChange={(e) =>
											this.setState({
												id_selectedQuestion_1: e.target.value,
											})
										}
									>
										<option value={0} disabled selected>
											{"Security Question 1"}
										</option>
										{arr_questions_1.map((p) => (
											<option value={p.id}>{p.title}</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div
											className={styles.inputCustom}
											style={{ position: "relative" }}
										>
											<CustomInput
												value={txt_answer_1}
												placeholder={"Your Answer"}
												onChange={(e) =>
													this.setState({
														txt_answer_1: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div className={styles.selectAlignment}>
									<select
										className={styles.selectCareer}
										value={id_selectedQuestion_2}
										onChange={(e) =>
											this.setState({
												id_selectedQuestion_2: e.target.value,
											})
										}
									>
										<option value={0} disabled selected>
											{"Security Question 2"}
										</option>
										{arr_questions_2.map((p) => (
											<option value={p.id}>{p.title}</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div
											className={styles.inputCustom}
											style={{ position: "relative" }}
										>
											<CustomInput
												value={txt_answer_2}
												placeholder={"Your Answer"}
												onChange={(e) =>
													this.setState({
														txt_answer_2: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div className={styles.selectAlignment}>
									<select
										className={styles.selectCareer}
										value={id_selectedQuestion_3}
										onChange={(e) =>
											this.setState({
												id_selectedQuestion_3: e.target.value,
											})
										}
									>
										<option value={0} disabled selected>
											{"Security Question 3"}
										</option>
										{arr_questions_3.map((p) => (
											<option value={p.id}>{p.title}</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div
											className={styles.inputCustom}
											style={{ position: "relative" }}
										>
											<CustomInput
												value={txt_answer_3}
												placeholder={"Your Answer"}
												onChange={(e) =>
													this.setState({
														txt_answer_3: e.target.value,
													})
												}
											/>
										</div>
									</div>
									<div className={styles.filterbutton}>
										<button
											className={`button`}
											onClick={() => this.checkSecurityAnswer()}
										>
											{"Submit"}
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</GlobalWrapper>
		);
	}
}
