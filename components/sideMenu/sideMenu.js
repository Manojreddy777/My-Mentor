import React from "react";
import styles from "./sideMenu.module.css";
import Header from "../header/header";


const MENU = {
    HrMgmt: {
        id: 1,
        title: "HR Details",
    },
    MyProfile: {
        id: 2,
        title: "My Profile",
    },
    tasklist: {
        id: 3,
        title: "My Task List",
    },
    MyLeave: {
        id: 4,
        title: "My Leave Details",
    },
    timesheet: {
        id: 5,
        title: "Timesheet",
    },
    TsWbs: {
        id: 10,
        title: "Deliverable Details",
    },
    TsProject: {
        id: 11,
        title: "Project Details",
    },
    TsEpic: {
        id: 12,
        title: "Epic Details",
    },
    TsFeature: {
        id: 13,
        title: "Feature Details",
    },
    TsUS: {
        id: 14,
        title: "User Story Details",
    },
    TsTask: {
        id: 15,
        title: "Task Details",
    },
    TsSubTask: {
        id: 21,
        title: "Sub - Task Details",
    },
    TsSubTaskDashboard: {
        id: 19,
        title: "Sub - Task Dashboard",
    },
    TsTimesheetTeam: {
        id: 16,
        title: "Team Timesheet Details",
    },
    TsDashboard: {
        id: 17,
        title: "Time Mgmt Dashboard",
    },
    academy: {
        id: 6,
        title: "Academy",
    },
    AcCategory: {
        id: 7,
        title: "Course Categories",
    },
    AcSubCategory: {
        id: 8,
        title: "Course Sub-Categories",
    },
    AcCourse: {
        id: 9,
        title: "Course List",
    },
    examPaper: {
        id: 10,
        title: "Take Exam",
    },
    scoreCard: {
        id: 11,
        title: "ScoreCard History",
    },
    learning: {
        id: 12,
        title: "Learning Materials",
        selected: false,
        SubMenu: {
            AcAvqFoundTamil: {
                id: 13,
                title: "Avaloq Foundation-Tamil",
            },
            AcAvqFoundTelugu: {
                id: 14,
                title: "Avaloq Foundation-Telugu",
            },
        }
    },
    sdlc: {
        id: 15,
        title: "Project SDLC Mgmt",
        selected: false,
        SubMenu: {
            SdlcClient: {
                id: 26,
                title: "SDLC Client Details",
            },
            SdlcProject: {
                id: 26,
                title: "SDLC Project Details",
            },
            SdlcModule: {
                id: 17,
                title: "SDLC Module Details",
            },
            SdlcFeature: {
                id: 18,
                title: "SDLC Feature Details",
            },
            SdlcUS: {
                id: 19,
                title: "SDLC US Details",
            },
            SdlcAC: {
                id: 20,
                title: "SDLC AC Details",
            },
            SdlcBug: {
                id: 21,
                title: "SDLC Bug Details",
            },
            SdlcRelease: {
                id: 23,
                title: "SDLC Release Details",
            }, 
            SdlcTestCycle: {
                id: 24,
                title: "SDLC Test Cycle Details",
            },
            SdlcDashboard: {
                id: 25,
                title: "SDLC Dashboard",
            },
        }
    },
    Assets: {
        id: 10,
        title: "Assets Details",
    },
    AssetsAudit: {
        id: 10,
        title: "Assets Audit Details",
    },
    AssetsAllocation: {
        id: 10,
        title: "Assets Allocation",
    },
    AssetsHealthCheck: {
        id: 10,
        title: "Assets Health Check",
    },
    AssetsMaintenance: {
        id: 10,
        title: "Assets Maintenance",
    },
    changePassword: {
        id: 10,
        title: "Change Password",
    },    
    taRoleUser: {
        id: 11,
        title: "Role User"
    },
    taEndUser: {
        id: 12,
        title: "End User"
    },
    customFields: {
        id: 13,
        title: "Custom Fields"
    },
    comments: {
        id: 22,
        title: "Comments Setup"
    },
    pfTenant: {
        id: 14,
        title: "Tenant Details"
    },
    TsProjectTeam: {
        id: 15,
        title: "Project- Team Allocation"
    },
    cltClient: {
        id: 16,
        title: "Client Details",
    },
    securityQuestions: {
        id: 17,
        title: "Security Questions",
    },
    stallDetails: {
        id: 18,
        title: "Stall SetUp"
    },
    projectStatistics: {
        id: 19,
        title: "Stall Project Statistics"
    },
    gstDetails: {
        id: 20,
        title: "Gst SetUp"
    },
    stallPayment: {
        id: 20,
        title: "Stall Payment"
    },
    codeTable: {
        id: 21,
        title: "Code Table"
    },
    hrManpower: {
        id: 21,
        title: "Man Power Requisition"
    },
    auditManPower: {
        id: 63,
        title: "Man Power Requisition Audit Details"
    },
    hrApplication: {
        id: 21,
        title: "Application Details"
    },
    auditApplication: {
        id: 21,
        title: "Application Audit Details"
    },
    staffRecords: {
        id: 63,
        title: "Staff Records"
    },
    pfWhattsApp: {
        id: 64,
        title: "WhattsApp Notification"
    },
     pfWhattsAppTemplate: {
        id: 65,
        title: "WhattsApp Template"
    },
    generateNotif: {
       id: 66,
       title: "Email Notification"
   },
   categoryDetails: {
    id: 67,
    title: "Category Details"
   },
   bankAccount: {
    id: 67,
    title: "Bank Account Details"
   },
}


export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        let menu = MENU;
        // if (global.config.user_role == "6") {
        // 	menu = OPS;
        // } else if (global.config.user_role == "1"){
        // 	menu = USER;
        //         } else if (global.config.user_role == "2"){
        //                 menu = HR;
        //         } else if (global.config.user_role == "3"){
        //                 menu = PM;
        //         } else if (global.config.user_role == "5"){
        //                 menu = FI;
        //         } else if (global.config.user_role == "7"){
        //                 menu = AC;
        //         } else if (global.config.user_role == "9"){
        //                 menu = GUEST;
        //         } else if (global.config.user_role == "10") {
        //             menu = EVNTMGMT_TL;
        //         } else if (global.config.user_role == "11") {
        //             menu = EVNTMGMT_JN_CS;
        //         } else if (global.config.user_role == "12") {
        //             menu = EVNTMGMT_SN_CS;
        //         } else if (global.config.user_role == "14") {
        //             menu = TNNT_ADMIN;
        //         }

        this.state = {
            menu: menu,
            username: undefined,
            loading: false,
            closed: true,
            open: true,
        };
    }

    // componentDidMount() {
    //     const { tag, subTag } = this.props;
    //     const { menu } = this.state;

    //     if (menu[tag] !== undefined) {
    //         menu[tag].selected = true;
    //         if (menu[tag].SubMenu != undefined) {
    // 	menu[tag].SubMenu[subTag].selected = true;
    //     }
    //         this.setState({ menu: menu });
    //     }
    // }
    // setOpen(id) {
    // 	const { menu } = this.state;
    // 	for (let c in menu) {
    // 		if (menu[c].id == id) {
    // 			menu[c].selected = !menu[c].selected;
    // 			this.setState({ sub: menu });
    // 		}
    // 	}
    // }

    // getMenuItem(id, menu, open) {
    // 	return (
    // 		<div
    // 			className={`${styles.menuWrapper} ${open ? styles.displayNavWrapper : ""
    // 				}`}
    // 		>
    // 			{menu != undefined &&
    // 				Object.keys(menu).map((key) => (
    // 					<div>
    // 						<div className={styles.menuItemWrapper}>
    // 							<a href={menu[key].link}
    // 								className={
    // 									menu[key].selected ? styles.selected : ""
    // 								}
    // 							>
    // 								{menu[key].title}
    // 							</a>
    // 							{menu[key].SubMenu != undefined &&
    // 								Object.keys(menu[key].SubMenu)?.length > 0 && (
    // 									<i
    // 										className={`fa fa-sort-down ${styles.openArrow
    // 											}
    //                                                                                             ${menu[key].selected
    // 												? styles.closeArrow
    // 												: ""
    // 											}`}
    // 										aria-hidden="true"
    // 										onClick={() =>
    // 											this.setOpen(menu[key].id)
    // 										}
    // 									></i>
    // 								)}
    // 						</div>
    // 						{this.getMenuItem(
    // 							menu[key].id,
    // 							menu[key].SubMenu,
    // 							menu[key].selected
    // 						)}
    // 					</div>
    // 				))}
    // 		</div>
    // 	);
    // }


    render() {
        const { tag, subTag, title, loading } = this.props;
        const { menu, closed, open } = this.state;

        return (
            <div>
                <Header />
                <div className={styles.wrapper}>
                    {loading && (
                        <div className={styles.loadingMainDiv}>
                            <div className={styles.loadingDiv}>
                                <div className="bouncing-loader">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            {menu[tag] !== undefined ?
                                <p>
                                    {menu[tag].SubMenu !== undefined ?
                                        menu[tag].SubMenu[subTag].title
                                        : menu[tag].title}
                                </p>
                                : title}
                        </h2>
                        <div className={styles.line} />
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
