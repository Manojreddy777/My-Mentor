import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import ExportExcel from "../../utils/exportExcel";
import moment from "moment";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import EndUserHelper from "../../helper/tnntAdmin/taEndUser";
import RoleHelper from "../../helper/tnntAdmin/taRoleUser";
import UserHelper from "../../helper/user";
import Class from "../../components/tnntAdmin/taEndUser";
import Head from "../../components/head";

export default class taEndUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_endUser: [],
            array_role: [],
            classEditVisibility: false,
            selectedData: undefined,
            id_selectedRole: undefined,
            username: "",
            editable: false,
            pageNumber: 0,
            tnnt_id: global.config.tnnt_id,
            id_selectusername: undefined,
            array_username: [],
            activeRow: null,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
            this.getEndUserDet();
            this.getRoleUserDet();
            this.getUserList();
            document.addEventListener("click", this.onClickOutside);
            
        }
    }
    
    componentWillUnmount() {
        document.removeEventListener("click", this.onClickOutside);
    }

    onClickOutside = (e) => {
        this.setState({ activeRow: null });
    };

    onClick = (rowId) => (e) => {
        e.stopPropagation();
        this.setState((prevState) => ({
            activeRow: prevState.activeRow === rowId ? null : rowId,
        }));
    };    
    
    getRoleUserDet() {
        const { tnnt_id } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };

        RoleHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ array_role: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getUserList() {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,

        }

        UserHelper.getAll(filter)
            .then((data) => {
                this.setState({ array_username: data });
            })
            .catch((err) => {
                console.log(err);
            });

    }
    getEndUserDet(type) {
        const { tnnt_id, array_endUser, id_selectedRole } = this.state;

        

            const filter = {
                created_by: global.config.username,
                role_id: id_selectedRole,
                tnnt_id: tnnt_id,
            };

            EndUserHelper.getFilteredData(filter)
                .then((data) => {
                    console.log(data)
                    this.setState({ array_endUser: data });
                })
                .catch((err) => console.log(err));
       
    }
    async getData() {
        try {
            const { id_selectedRole, id_selectusername, tnnt_id } = this.state;

            const alertInitial = "";
            let alertText = alertInitial;

            if ((id_selectedRole === undefined || id_selectedRole === "") && (id_selectusername === undefined || id_selectusername === "")) {
                alertText += "* Fill any one of the fields to continue.\n";
            }

            if (alertText !== alertInitial) {
                Swal.fire({
                    title: "Fill these fields:\n",
                    html:
                        '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
                        alertText +
                        "</pre>",
                    confirmButtonColor: Colors.primaryColor,
                    width: 500,
                });
                return;
            } else {
                const data = {
                    created_by: global.config.username,
                    role_id: id_selectedRole,
                    account_name: id_selectusername,
                    tnnt_id: tnnt_id,
                };

                EndUserHelper.getFilteredData(data)
                    .then((data) => {
                        this.setState({ array_endUser: data });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            text: "Error",
                            confirmButtonColor: Colors.primaryColor,
                        });
                        console.log(err);
                    });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                text: "Error!",
                confirmButtonColor: Colors.primaryColor,
            });
            console.log(err);
        }
    }
    handleClearFilter = () => {
        this.setState({
            id_selectedRole: undefined,
            id_selectusername: undefined,
        }, () => {
            this.getEndUserDet();
        });
    }
    render() {
        const {
            activeRow,
            array_role,
            id_selectedRole,
            array_username,
            id_selectusername,
            array_endUser,
            classEditVisibility,
            selectedData,
            pageNumber,
            editable,
        } = this.state;
        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(array_endUser.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                {classEditVisibility && (
                    <Class
                        data={selectedData}
                        editable={editable}
                        visibility={classEditVisibility}
                        setVisibility={(v) => this.setState({ classEditVisibility: v })}
                        getEndUserDet={() => this.getEndUserDet()}
                    />
                )}
                <SideMenu tag="taEndUser">
                    <Head title="End User Details" />
                    <div className={styles.wrapper}>
                        <p className={styles.title}>Selection Criteria:</p>
                        <div className={styles.rowAlignment}>
                            <div className={styles.inputAlignment}>
                                <p>Role Name:</p>
                                <select
                                    value={id_selectedRole === undefined ? 0 : id_selectedRole}
                                    onChange={(e) =>
                                        this.setState({
                                            id_selectedRole: e.target.value
                                        })
                                    }
                                >
                                    <option value={0} disabled>
                                        {"Select Role Name"}
                                    </option>
                                    {array_role.map((p) => (
                                        <option key={p.role_id} value={p.role_id}>{p.role_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputAlignment}>
                                <p>Username:</p>
                                <select
                                    value={id_selectusername === undefined ? 0 : id_selectusername}
                                    onChange={(e) =>
                                        this.setState({
                                            id_selectusername: e.target.value
                                        })
                                    }
                                >
                                    <option value={0} disabled>
                                        {"Select User Name"}
                                    </option>
                                    {array_username.map((p) => (
                                        <option key={p.account_name} value={p.account_name}>{p.account_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.filterbutton}>
                            <button className={`button`} onClick={() => this.getData()}>
                                {"Submit"}
                            </button>
                            <button className={`button`} onClick={this.handleClearFilter}>
                                {"Clear"}
                            </button>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={`${styles.button}`}>
                            <button
                                className={`button`}
                                onClick={() =>
                                    this.setState({
                                        classEditVisibility: true,
                                        editable: false,
                                        selectedData: undefined,
                                    })
                                }
                            >
                                <i style={{ paddingRight: 10 }} class="fa fa-plus" />
                                {"Create"}
                            </button>
                        </div>
                        <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User Name</th>
                                    <th>Role Name List</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_endUser
                                    .slice(pagesVisited, pagesVisited + PAGINATE_COUNT)
                                    .map((t) => (
                                        <tr key={t.user_id}>
                                            <td>{t.user_id}</td>
                                            <td>{t.user_name}</td>
                                            {/* <td>
                                                {t.role_list.map((r) => r.label).join(', ')}
                                            </td> */}
                                            <td>
                                                {Array.isArray(t.role_list)
                                                    ? t.role_list.map((r) => r.label).join('; ')
                                                    : ""}
                                            </td>
                                            <td>
                                                <div
                                                    className={t.is_active ? styles.active : styles.inactive}
                                                >
                                                    {t.is_active ? "Active" : "Inactive"}
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`container`}>
                                                    <div className={`menuContainer`}>
                                                        <button
                                                            onClick={this.onClick(t.user_id)}
                                                            className={`menuTrigger`}
                                                        >
                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        {activeRow === t.user_id && (
                                                            <nav className={`menu active`}>
                                                                <ul>
                                                                    <li>
                                                                        <div>View Record</div>
                                                                    </li>
                                                                    <li>
                                                                        <div>View Audit Report</div>
                                                                    </li>
                                                                    <li>
                                                                        <div onClick={() =>
                                                                            this.setState({
                                                                                classEditVisibility: true,
                                                                                editable: true,
                                                                                selectedData: t,
                                                                            })
                                                                        }>Edit Record</div>
                                                                    </li>
                                                                </ul>
                                                            </nav>
                                                        )}
                                                    </div>
                                                </div>                                       
                                               
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={
                                <i className={`fa fa-chevron-left`} aria-hidden="true" />
                            }
                            nextLabel={
                                <i className={`fa fa-chevron-right`} aria-hidden="true"></i>
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={paginationStyle.paginationButtons}
                            previousClassName={paginationStyle.preButton}
                            nextClassName={paginationStyle.nextButton}
                            activeClassName={paginationStyle.paginationActive}
                        />
                    </div>
                    <div className={styles.excelcontainer}>
                        <ExportExcel excelData={array_endUser} fileName={"TA_User_Details_" + moment().format("DDMMYYhhmmss")} />
                    </div>
                </SideMenu>
            </div>
        );
    }
}
