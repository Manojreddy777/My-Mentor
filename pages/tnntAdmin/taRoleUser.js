import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import taRoleUserHelper from "../../helper/tnntAdmin/taRoleUser";
import Components from "../../components/tnntAdmin/taRoleUser";
import ExportExcel from "../../utils/exportExcel";
import moment from "moment"; 
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants"; 
import Head from "../../components/head";

export default class TaRoleUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_taRoleUser: [],
            roleUserEditVisibility: undefined,
            selectedData: undefined,
            username: "",
            editable: false,
            pageNumber: 0,
            tnnt_id: global.config.tnnt_id,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
            this.getRoleUser();
        }
    }

    getRoleUser() {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };

        taRoleUserHelper.getAllActive(filter)
            .then((data) => {
                this.setState({ array_taRoleUser: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getRoleUser_Det(type) {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };
        taRoleUserHelper.getAllActive(filter)
         .then((data) => {
            
             this.setState({ array_taRoleUser: data });
             
         })
         .catch((err) => console.log(err));
   }

    render() {
        const {
            array_taRoleUser,
            roleUserEditVisibility,
            editable,
            selectedData,
            pageNumber
        } = this.state;
        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(array_taRoleUser.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                {roleUserEditVisibility && (
                    <Components
                        visibility={roleUserEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ roleUserEditVisibility: v })
                        }
                        data={selectedData}
                        editable={editable}
                        getRoleUser={() => this.getRoleUser()}
                    />
                )}
                <SideMenu tag="taRoleUser">
                    <Head title="Role User" />
                    <div className={styles.wrapper}>

                        <div className={`${styles.button}`}>
                            <button
                                className={`button`}
                                onClick={() =>
                                    this.setState({
                                        selectedData: undefined,
                                        roleUserEditVisibility: true,
                                        editable: false,
                                    })
                                }
                            >
                                <i
                                    style={{ paddingRight: 10 }}
                                    class="fa fa-plus"
                                />
                                {"Create"}
                            </button>
                        </div>
                        <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Role User Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_taRoleUser
                                 .slice(
                                    pagesVisited,
                                    pagesVisited + PAGINATE_COUNT
                                    )
                                    .map((t) => (
                                        <tr>
                                            <td>{t.role_id}</td>
                                            <td>{t.role_name}</td>
                                            <td>
                                                <div
                                                    className={t.is_active ? styles.active : styles.inactive}
                                                >
                                                    {t.is_active ? "Active" : "Inactive"}
                                                </div>
                                            </td>
                                            <td>
                                                <img
                                                    src={"/assets/write.png"}
                                                    className={styles.icon}
                                                    onClick={() =>
                                                        this.setState({
                                                            roleUserEditVisibility: true,
                                                            editable: true,
                                                            selectedData: t,
                                                        })
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={
                                <i
                                    className={`fa fa-chevron-left`}
                                    aria-hidden="true"
                                />
                            }
                            nextLabel={
                                <i
                                    className={`fa fa-chevron-right`}
                                    aria-hidden="true"
                                ></i>
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={
                                paginationStyle.paginationButtons
                            }
                            previousClassName={paginationStyle.preButton}
                            nextClassName={paginationStyle.nextButton}
                            activeClassName={paginationStyle.paginationActive}
                        /> 
                    </div>
                    <div className={styles.excelcontainer}>
                           <ExportExcel excelData={array_taRoleUser} fileName={"TA_Role_User_Details_" + moment().format("DDMMYYhhmmss")} />
                        </div>
                </SideMenu>
            </div>
        );
    }
}
