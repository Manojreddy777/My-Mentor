import React from "react";

import styles from "./menu.module.css";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//menu: props.menu,
		};
	}

	setOpen(id, category) {
		const { menu } = this.state;

		let items = category;

		for (let c in items) {
			if (items[c].id == id) {
				items[c].open = !items[c].open;
				this.setState({ menu: menu });
				break;
			}
		}
	}

	getMenuItem(id, menu, open) {
		return (
			<div
				className={`${styles.navWrapper} ${
					open ? styles.displayNavWrapper : ""
				}`}
			>
				{menu?.map((category) => (
					<div>
						<div className={styles.menuItemWrapper}>
							<p
								className={styles.menuItem}
								onClick={() =>
									(window.location = category.link)
								}
							>
								{category.title}
							</p>
							{category.open == 'false' && (category.open = !category.open)}
							{category.subMenu?.length > 0 && (
								<i
									className={`fa fa-sort-down ${
										styles.openArrow
									} ${
										category.open ? styles.closeArrow : ""
									}`}
									aria-hidden="true"
									onClick={() => this.setOpen(category.id, menu)}
								></i>
							)}
						</div>
						{this.getMenuItem(
							category.id,
							category.subMenu,
							category.open
						)}
					</div>
				))}
			</div>
		);
	}

	render() {
		// const { menu } = this.state;
		const { open, menu } = this.props;
		return (
			<div>
				<div
					className={`${styles.navWrapper} ${
						open ? styles.displayNavWrapper : ""
					}`}
				></div>
				{this.getMenuItem(0, menu, open)}
			</div>
		);
	}
}

