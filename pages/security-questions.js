import React from "react";
import Swal from "sweetalert2";
import Colors from "../constants/colors";

import styles from "../styles/securityQuestions.module.css";
import SideMenu from "../components/sideMenu/sideMenu";
import CustomInput from "../components/customInput/customInput";

import UserHelper from "../helper/user";
import Head from "../components/head";

export default class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: global.config.username,
			tnnt_id: global.config.tnnt_id,
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
				}
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
				}
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
				}
			],
			id_selectedQuestion_1: undefined,
			id_selectedQuestion_2: undefined,
			id_selectedQuestion_3: undefined,
			txt_answer_1: "",
			txt_answer_2: "",
			txt_answer_3: "",
			bl_update: undefined,
		};
	}

	componentDidMount() {
		const username = global.config.username;
		if (username != null && username !== undefined) {
			this.setState({
				username: username,
				tnnt_id: global.config.tnnt_id,
			});
		}

		this.checkSecurityAnswer();
	}

	checkSecurityAnswer() {
		const { username, tnnt_id, } = this.state;

		const filter = {
			account_name: username,
			tnnt_id: tnnt_id,
		}

		UserHelper.checkSecurityAnswer(filter)
			.then((data) => {
				this.setState({ bl_update: data.code == 200 ? false : true })
			})
			.catch((err) => {
				console.log(err)
			})

	}

	async insertSecurityAnswer() {
		const {
			id_selectedQuestion_1,
			id_selectedQuestion_2,
			id_selectedQuestion_3,
			txt_answer_1,
			txt_answer_2,
			txt_answer_3,
			username,
			tnnt_id,
		} = this.state;
		try {

			// this.setState({ is_loading: true });

			const alertInitial = "";
			let alertText = alertInitial;

			if (id_selectedQuestion_1 === undefined) {
				alertText += ". Security Question 1\n";
			}

			if (id_selectedQuestion_2 === undefined) {
				alertText += ". Security Question 2\n";
			}

			if (id_selectedQuestion_3 === undefined) {
				alertText += ". Security Question 3\n";
			}

			if (txt_answer_1 === "") {
				alertText += ". Answer for Question 1\n";
			}

			if (txt_answer_2 === "") {
				alertText += ". Answer for Question 2\n";
			}

			if (txt_answer_3 === "") {
				alertText += ". Answer for Question 3\n";
			}

			if (alertText !== alertInitial) {
				Swal.fire({
					title: "Fill these fields:\n",
					html:
						'<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
						alertText +
						"</pre>",
					confirmButtonColor: Colors.primaryColor,
					width: Colors.width,
					allowOutsideClick: false,
				});
				return;
			}

			const data = {
				question_1: id_selectedQuestion_1,
				answer_1: txt_answer_1,
				question_2: id_selectedQuestion_2,
				answer_2: txt_answer_2,
				question_3: id_selectedQuestion_3,
				answer_3: txt_answer_3,
				account_name: username,
				tnnt_id: tnnt_id,
			}

			this.setState({ is_loading: true });

			UserHelper.insertSecurityAnswer(data)
				.then((data) => {
					if (data.code == 200) {
						Swal.fire({
							icon: 'success',
							text: "Successfully updated the Security Questions!",
							confirmButtonColor: Colors.primaryColor,
							allowOutsideClick: false,
						}).then((result) => {
							if (result.isConfirmed) {
								this.setState({ is_loading: false });
								this.checkSecurityAnswer();
							}
						})
					} else {
						Swal.fire({
							icon: 'error',
							text: "Error updating!",
							confirmButtonColor: Colors.primaryColor,
							allowOutsideClick: false,
						});
						this.setState({ is_loading: false });
					}
				})
				.catch((err) => {
					console.log(err)
					Swal.fire({
						icon: 'error',
						text: "Error updating!",
						confirmButtonColor: Colors.primaryColor,
						allowOutsideClick: false,
					});
					this.setState({ is_loading: false });
				})

		} catch (err) {
			console.log(err);
		}
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
			bl_update,
		} = this.state;

		return (
			<div>
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
				<SideMenu tag="securityQuestions">
					<Head title="Security Questions" />
					<div className={styles.wrapper}>
						{bl_update ?

							<div className={styles.borderAlignment}>
								<div style={{ textAlign: "center", alignItems: "center" }}>
									<p>Update your security questions</p>
									<p>In case you forgot your password</p>
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
											<option value={p.id}>
												{p.title}
											</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div className={styles.inputCustom} style={{ position: "relative" }}>
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
											<option value={p.id}>
												{p.title}
											</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div className={styles.inputCustom} style={{ position: "relative" }}>
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
											<option value={p.id}>
												{p.title}
											</option>
										))}
									</select>
									<div className={styles.inputAlignment}>
										<div className={styles.inputCustom} style={{ position: "relative" }}>
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
											onClick={() => this.insertSecurityAnswer()}
										>
											{"Submit"}
										</button>
									</div>
								</div>
							</div>
							:
							<div>
								<p className={styles.heading}>The Security Question has already been updated!!</p>
							</div>
						}
					</div>
				</SideMenu>
			</div>
		);
	}
}
