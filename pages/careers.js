import React from "react";

import styles from "../styles/career.module.css";

import GlobalWrapper from "../components/globalWrapper/globalWrapper";

import CareersHelper from "../helper/career";

export default class Careers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			careers: [
				{
					id: 1,
					title: "Core Banking",
				},
				{
					id: 2,
					title: "Web Technology",
				},
			],
			jobs: [],
		};
	}

	componentDidMount() {
		this.getCareeers();
	}

	getCareeers() {
		CareersHelper.get()
			.then((data) => {
				this.setState({ jobs: data });
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { careers, jobs } = this.state;

		return (
			<GlobalWrapper page={"careers"}>
				<div className={styles.wrapper}>
					<p className={styles.aboutusTag}>
						Are you looking forward to be a part of the family where
						your thoughts are valued and humanity is respected? Then
						you are at the right place. Finari services whole
						heartly welcomes you to be part of their family. Our
						workplace consists of a good mixture of fresh minds with
						bright/right potential and senior members vastly
						experienced to nurture those fresh minds to grow their
						knowledge in the domain.
					</p>
					<select className={styles.selectCareer}>
						<option value={0} disabled selected>
							{"Career Options"}
						</option>
						{careers.map((s) => (
							<option className={styles.optionCareer}>
								{s.title}
							</option>
						))}
					</select>
					<button className={`button ${styles.button}`}>
						Search
					</button>
					<div className={styles.sectionTitle}>
						List of Job Openings
					</div>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Reference Code</th>
								<th>Role</th>
								<th>More Details</th>
							</tr>
						</thead>
						<tbody>
							{jobs.map((j) => (
								<tr>
									<td>{j.job_id}</td>
									<td>{j.role}</td>
									<td
										onClick={() =>
											(window.location = `careers/${j.job_id}/${j.role}`)
										}
										style={{ cursor: "pointer" }}
									>
										Apply
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</GlobalWrapper>
		);
	}
}
