import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import pfTenantHelper from "../../helper/pfmMgmt/pfTenant";
import Component from "../../components/pfmMgmt/pfTenant";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import ExportExcel from "../../utils/exportExcel";
import moment from "moment";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import Head from "../../components/head";

export default class pfTenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfTenant: [],
            array_pfTenant_dropdown: [],
            selectedData: undefined,
            id_selectedtenant: undefined,
            tenantEditVisibility: false,
            pageNumber: 0,
            username: "",
            editable: false,

        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getTenantDet();
            this.getTenantDropdown();
        }
    }

    getTenantDropdown() {
        pfTenantHelper.getForDropDown()
            .then((data) => {
                this.setState({ array_pfTenant_dropdown: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getTenantDet(type) {
        const { array_pfTenant, id_selectedtenant } = this.state;


            const filter = {
                tnnt_id: id_selectedtenant,
            };

            pfTenantHelper.getFilteredData(filter)
                .then((data) => {
                    this.setState({ array_pfTenant: data });
                })
                .catch((err) => console.log(err));
        
    }

    async getData() {
        try {
            const {
                id_selectedtenant,
            } = this.state;

            const alertInitial = "";
            let alertText = alertInitial;

            if (id_selectedtenant === undefined || id_selectedtenant === "") {
                alertText += "• Tenant\n";
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
            } else {
                const filter = {
                    tnnt_id: id_selectedtenant,
                };

                pfTenantHelper.getFilteredData(filter)
                    .then((data) => {
                        this.setState({ array_pfTenant: data });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            text: "Error",
                            confirmButtonColor: Colors.primaryColor,
                            allowOutsideClick: false,
                        });
                        console.log(err);
                    });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                text: "Error!",
                confirmButtonColor: Colors.primaryColor,
                allowOutsideClick: false,
            });
            console.log(err);
        }
    }

    handleClearFilter = () => {
        this.setState({
            id_selectedtenant: undefined
        }, () => {
            this.getTenantDet();
        });
    }

    render() {
        const {
            array_pfTenant,
            array_pfTenant_dropdown,
            id_selectedtenant,
            pageNumber,
            tenantEditVisibility,
            selectedData,
            editable
        } = this.state;
        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(array_pfTenant.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                {tenantEditVisibility && (
                    <Component
                        visibility={tenantEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ tenantEditVisibility: v })
                        }
                        data={selectedData}
                        editable={editable}
                        getTenantDet={() => this.getTenantDet()}
                        getTenantDropdown={() => this.getTenantDropdown()}
                    />
                )}
                <SideMenu tag="pfTenant">
                    <Head title="Tenant Details" />
                    <div className={styles.wrapper}>
                        <div className={styles.inputAlignment}>
                            <p>Tenant Name:</p>
                            <select
                                value={id_selectedtenant === undefined ? 0 : id_selectedtenant}
                                onChange={(e) =>
                                    this.setState({
                                        id_selectedtenant: e.target.value,
                                    })
                                }
                            >
                                <option value={0} disabled selected>
                                    {"Select Tenant Name"}
                                </option>
                                {array_pfTenant_dropdown.map((p) => (
                                    <option value={p.tnnt_id}>
                                        {p.tnnt_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.filterbutton}>
                            <button className={`button`} onClick={() => this.getData()}>
                                {"Submit"}
                            </button>
                            <button className={`button`} onClick={() => this.handleClearFilter()}>
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
                                        selectedData: undefined,
                                        tenantEditVisibility: true,
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
                    </div>

                    <div className={styles.wrapper}>
                        <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tenant Name</th>
                                    <th>Abbreviation</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfTenant
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + PAGINATE_COUNT
                                    )
                                    .map((t) => (
                                        <tr>
                                            <td>{t.tnnt_id}</td>
                                            <td>{t.tnnt_name}</td>
                                            <td>{t.abbr}</td>
                                            <td>
                                                <img
                                                    src={"/assets/write.png"}
                                                    className={styles.icon}
                                                    onClick={() =>
                                                        this.setState({
                                                            tenantEditVisibility: true,
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
                       <ExportExcel excelData={array_pfTenant} fileName={"PF_Tenant_Details_" + moment().format("DDMMYYhhmmss")} />
                    </div>
                </SideMenu>
            </div>
        );
    }
}
