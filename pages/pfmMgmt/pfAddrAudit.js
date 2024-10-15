import React from "react";
import SideMenu from "../../components/sideMenu/sideMenu";
import AuditHelper from "../../helper/pfmMgmt/pfAudit";
import UserClaim from "../../helper/tnntAdmin/taUserComClm";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import Head from "../../components/head";
import styles from "../../styles/pages.module.css";


export default class PfAddrAudit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr_audit_details: [],
            editable: false,
            pageNumber: 0,
            tnnt_id: "",
            username: "",
            com_id: 0,  // need to create usecase9_v2
            arr_com_claim: [],
            audit_rec_id: props.params,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        const tnnt_id = global.localStorage.tnnt_id;

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: tnnt_id,
            });
            this.getClaim();
        }
    }

    getClaim() {
        const { com_id } = this.state;

        const filter = {
            user_name: global.config.username,
            com_id: com_id,
            tnnt_id: global.config.tnnt_id,
        };

        UserClaim.getClaim(filter)
            .then((data) => {
                this.setState({ arr_com_claim: data });
                this.getAuditDet();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAuditDet() {
        const { arr_com_claim, username, tnnt_id, audit_rec_id } = this.state;

        const filter = {
            ref_id: audit_rec_id,
            tnnt_id: tnnt_id,
        };
        if (arr_com_claim[0]?.clm_view === 3 || arr_com_claim[0]?.clm_view === 2) {
            this.getAuditDetails(filter);
        } else if (arr_com_claim[0]?.clm_view === 1) {
            filter.user_name = username;
            this.getAuditDetails(filter);
        }
    }

    getAuditDetails(filter) {
        AuditHelper.getAddrDet(filter)
            .then((data) => {
                this.setState({ arr_audit_details: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { arr_audit_details, pageNumber } = this.state;

        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(arr_audit_details.length / PAGINATE_COUNT);

        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                <SideMenu tag="PfAudit">
                    <Head title="PF Address Audit Details" />
                    <div className={styles.wrapper}>
                        <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                   
                                    <th>ID</th>
                                    <th>Base Component ID</th>         
                                    <th>Base Component Record ID</th>  
                                    <th>Address Type ID Old</th>
                                    <th>Address Type ID New</th>
                                    <th>Address Line 1 Old</th>
                                    <th>Address Line 1 New</th>
                                    <th>Address Line 2 Old</th>
                                    <th>Address Line 2 New</th>
                                    <th>Address Line 3 Old</th>
                                    <th>Address Line 3 New</th>
                                    <th>City Old</th>
                                    <th>City New</th>
                                    <th>Postal Code Old</th>
                                    <th>Postal Code New</th>                                                                        
                                    <th>Country ID Old</th>
                                    <th>Country ID New</th>
                                    <th>Record Status ID Old</th>
                                    <th>Record Status ID New</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr_audit_details
                                    .slice(pagesVisited, pagesVisited + PAGINATE_COUNT)
                                    .map((t) => (
                                        <tr
                                            className={`${t.is_active === false && "isActive"}`}
                                            key={t.audit_rec_id}
                                        >
                                        
                                            <td>{t.id}</td>
                                            <td>{t.base_com_id}</td>     
                                            <td>{t.base_com_rec_id}</td>  
                                            <td>{t.addr_type_id_old }</td>
                                            <td>{t.addr_type_id_new}</td>
                                            <td>{t.addr_line_1_old}</td>
                                            <td>{t.addr_line_1_new}</td>
                                            <td>{t.addr_line_2_old}</td>
                                            <td>{t.addr_line_2_new}</td>
                                            <td>{t.addr_line_3_old}</td>
                                            <td>{t.addr_line_3_new}</td>
                                            <td>{t.city_old}</td>
                                            <td>{t.city_new}</td>
                                            <td>{t.postal_code_old}</td>
                                            <td>{t.postal_code_new}</td>
                                            <td>{t.country_id_old}</td>
                                            <td>{t.country_id_new}</td>
                                            <td>{t.lc_status_id_old}</td>
                                            <td>{t.lc_status_id_new}</td>
                                            
                                            <td>
                                                <div
                                                    className={
                                                        t.is_active_old
                                                            ? styles.active
                                                            : styles.inactive
                                                    }
                                                >
                                                    {t.is_active_old ? "Active" : "Inactive"}
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className={
                                                        t.is_active_new
                                                            ? styles.active
                                                            : styles.inactive
                                                    }
                                                >
                                                    {t.is_active_new ? "Active" : "Inactive"}
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
                </SideMenu>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
	return {
		props: {
			params: context.query.assetId,
		},
	};
}
