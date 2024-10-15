import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import EndUserClmHelper from "../../helper/tnntAdmin/taEndUserComClm";
import ComponentHelper from "../../helper/pfmMgmt/pfComponent";
import ExportExcel from "../../utils/exportExcel";
import moment from "moment";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import Head from "../../components/head";

export default class EndUserClm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_taEndUserClm: [],
            array_component: [],
            id_selectedcomponent: undefined,
            EndUserClmVisibility: undefined,
            username: "",
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
            this.getDet();
            this.getComponentDet();
        }
    }

    getDet() {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };
        EndUserClmHelper.getAllActive(filter)
            .then((data) => {
                this.setState({ array_taEndUserClm: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getComponentDet() {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };
        ComponentHelper.getForDropDown(filter)
              .then((data) => {
                  this.setState({ array_component: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

    getDet_det(type) {
        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };
        EndUserClmHelper.getAllActive(filter)
            .then((data) => {
                
                    this.setState({ array_taEndUserClm: data });
               
            })
            .catch((err) => console.log(err));
    }
    async getData() {
        try {
            const {
                id_selectedcomponent,
		tnnt_id,
            } = this.state;
        
            const alertInitial = "";
            let alertText = alertInitial;
    
            if (id_selectedcomponent === undefined || id_selectedcomponent === "") {
                alertText += "* Component Name\n";
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
                const data = {
                    com_id: id_selectedcomponent,
		    tnnt_id: tnnt_id,
                };
                
                EndUserClmHelper.getFilteredData(data)
                    .then((data) => {
                        this.setState({ array_taEndUserClm: data });
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
    render() {
        const {
            array_component,
            array_taEndUserClm,
            id_selectedcomponent,
            EndUserClmVisibility,
            pageNumber,
        } = this.state;
        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(array_taEndUserClm.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                {EndUserClmVisibility && (
                    <Components
                        visibility={EndUserClmVisibility}
                        setVisibility={(v) =>
                            this.setState({ EndUserClmVisibility: v })
                        }
                        
                        getEndUserClm={() => this.getEndUserClm()}
                    />
                )}
                <SideMenu tag="tnntAdmin" subtag="taEndUserComClm">
                    <Head title="User Claim Details" />
                <div className={styles.wrapper}>
                    <div className={styles.inputAlignment}>
                            <p>Component Name:</p>
                            <select
                                value={id_selectedcomponent}
                                onChange={(e) =>
                                    this.setState({
                                        id_selectedcomponent: e.target.value,
                                    })
                                }
                            >
                                <option value={0} disabled selected>
                                    {"Select Component Name"}
                                </option>
                                {array_component.map((p) => (
                                    <option value={p.com_id}>
                                       {p.com_name}
                                    </option>
                                ))}
                            </select>
                        </div> 
                        <div className={styles.filterbutton}>
                            <button
                                className={`button`}
                                onClick={() => this.getData() }
                            >
                                {"Submit"}
                            </button>
                        </div>

                     </div>
                    <div className={styles.wrapper}>
                      <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Component Name</th>
                                    <th>User Name</th>
                                    <th>Claim View</th>
                                    <th>Claim Create</th>
                                    <th>Claim Update</th>
                                    <th>Claim Export</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_taEndUserClm
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + PAGINATE_COUNT
                                    )
                                    .map((t) => (
                                        <tr>
                                            <td>{t.com_name}</td>
                                            <td>{t.user_name}</td>
                                            <td>{t.clm_view}</td>
                                            <td>{t.clm_create}</td>
                                            <td>{t.clm_update}</td>
                                            <td>{t.clm_export}</td>

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
                        <ExportExcel excelData={array_taEndUserClm} fileName={"TA_User_Claim_Details_" + moment().format("DDMMYYhhmmss")} />
                    </div>
                </SideMenu>
            </div>
        );
    }
}
