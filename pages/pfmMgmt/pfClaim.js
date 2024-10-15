import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import pfClaimHelper from "../../helper/pfmMgmt/pfClaim";
import exportCSVFile from "../../utils/exportCSV";
import moment from "moment";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import Head from "../../components/head";

export default class pfClaim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfClaim: [],
            pageNumber: 0,
            username: "",
        };
    }
    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getClaimDet();
        }
    }
    getClaimDet() {
        pfClaimHelper.getAllActive()
            .then((data) => {
                this.setState({ array_pfClaim: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getClaimDet(type) {
        pfClaimHelper.getAllActive()
            .then((data) => {
                if (type == "export") {
                    const TABLE_HEADER = {
                        id: "ID",
                        claim_group: "Claim Group",
                        claim_name: "Claim Name",
                    };
                    const formattedData = [];
                    data.forEach((d, i) => {
                        formattedData.push({
                            id: d.claim_id,
                            claim_group: d.claim_group,
                            claim_name: d.claim_name,
                        });
                    });
                    exportCSVFile(
                        TABLE_HEADER,
                        formattedData,
                        "Claim Details" + moment().format("DDMMYYhhmmss")
                    );
                } else {
                    this.setState({ array_pfClaim: data });
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        const {
            array_pfClaim,
            pageNumber,

        } = this.state;
        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(array_pfClaim.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };
        return (
            <div>

                <SideMenu tag="pfmMgmt" subtag="pfClaim">
                    <Head title="Claim" />

                    <div className={styles.wrapper}>
                        <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Claim Name</th>
                                    <th>Claim Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfClaim
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + PAGINATE_COUNT
                                    )
                                    .map((t) => (
                                        <tr>
                                            <td>{t.id}</td>
                                            <td>{t.claim_name}</td>
                                            <td>{t.claim_group}</td>
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
                        <button
                            onClick={() => this.getClaimDet("export")}
                            className={"button"}
                        >
                            Export
                        </button>
                    </div>
                </SideMenu>
            </div>
        );
    }
}
