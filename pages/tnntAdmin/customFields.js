import React from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";
import CustomFieldModal from "../../components/tnntAdmin/customFields";
import CustomFieldHelper from "../../helper/tnntAdmin/customFields";
import UserClaim from "../../helper/tnntAdmin/taUserComClm";
import ComponentHelper from "../../helper/pfmMgmt/pfComponent";
import ModuleHelper from "../../helper/pfmMgmt/pfModule";
import Head from "../../components/head";
import ExportExcel from "../../utils/exportExcel";
import moment from "moment";

export default class CustomField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customEditVisibility: false,
            selectedData: undefined,
            pageNumber: 0,
            tnnt_id: global.config.tnnt_id,
            arr_custom_fields: [],
            arr_com_claim: [],
            arr_components: [],
            array_field_type: [
                {
                    id: 1,
                    value: "Text",
                },
                {
                    id: 2,
                    value: "Number",
                },
                {
                    id: 3,
                    value: "Date",
                },
                {
                    id: 4,
                    value: "Dropdown",
                },
            ],
            arr_module: [],
            id_selectedComponent: undefined,
            id_selectedType: undefined,
            id_selectedModule: undefined,
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
        }

        this.getClaim();
        this.getComponent();
        this.getModule();
        document.addEventListener("click", this.onClickOutside);

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


    getClaim() {
        const { com_id } = this.state;

        const filter = {
            user_name: global.config.username,
            com_id: com_id,
            tnnt_id: global.config.tnnt_id,
        }

        UserClaim.getClaim(filter)
            .then((data) => {
                this.setState({ arr_com_claim: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getCutomFieldDetails() {
        const { tnnt_id } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };

        CustomFieldHelper.getAll(filter)
            .then((data) => {
                this.setState({ arr_custom_fields: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getComponent() {
        const { tnnt_id } = this.state;

        const filter = {
            is_active: 'active',
            tnnt_id: tnnt_id,
        }

        ComponentHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ arr_components: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getModule() {
        const { tnnt_id } = this.state;

        const filter = {
            is_active: 'active',
            tnnt_id: tnnt_id,
        }

        ModuleHelper.getForDropDown(filter)
            .then((data) => {
                this.setState({ arr_module: data });
            })
            .catch((err) => {
                console.log(err);
            });
    }



    async getData() {
        try {
            const {
                tnnt_id,
                id_selectedComponent,
                id_selectedType,
                id_selectedModule,
            } = this.state;

            if (id_selectedComponent == undefined && id_selectedType == undefined && id_selectedModule == undefined) {
                Swal.fire({
                    icon: 'warning',
                    text: "Select any field to continue!",
                    confirmButtonColor: Colors.primaryColor,
                    allowOutsideClick: false,
                });
                return;
            }

            const filter = {
                tnnt_id: tnnt_id,
                component_id: id_selectedComponent,
                field_type: id_selectedType,
                mod_id: id_selectedModule,
            };

            CustomFieldHelper.getAll(filter)
                .then((data) => {
                    this.setState({ arr_custom_fields: data });
                })
                .catch((err) => {
                    console.log(err);
                });
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
            id_selectedComponent: undefined,
            id_selectedType: undefined,
            id_selectedModule: undefined,
        }, () => {
            this.getCutomFieldDetails();
        });
    }

    render() {
        const {
            activeRow,
            arr_com_claim,
            arr_components,
            arr_custom_fields,
            array_field_type,
            arr_module,
            id_selectedComponent,
            id_selectedType,
            id_selectedModule,
            customEditVisibility,
            selectedData,
            pageNumber,
            editable,
        } = this.state;

        const pagesVisited = pageNumber * PAGINATE_COUNT;
        const pageCount = Math.ceil(arr_custom_fields.length / PAGINATE_COUNT);
        const changePage = ({ selected }) => {
            this.setState({ pageNumber: selected });
        };

        return (
            <div>
                {customEditVisibility && (
                    <CustomFieldModal
                        data={selectedData}
                        editable={editable}
                        visibility={customEditVisibility}
                        setVisibility={(v) => this.setState({ customEditVisibility: v })}
                        getCutomFieldDetails={() => this.getCutomFieldDetails()}
                    />
                )}
                <SideMenu tag="customFields">
                    <Head title="Custom Fields" />

                    <div className={styles.wrapper}>
                        {/* {arr_com_claim.map((c) =>
                            c.clm_create != 8 && */}
                        <div>
                            <p className={styles.title}>Selection Criteria:</p>
                            <div className={styles.rowAlignment}>
                                <div className={styles.inputAlignment}>
                                    <p>Module:</p>
                                    <select
                                        value={id_selectedModule === undefined ? 0 : id_selectedModule}
                                        onChange={(e) =>
                                            this.setState({
                                                id_selectedModule: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={0} disabled selected>
                                            {"Select Component "}
                                        </option>
                                        {arr_module.map((s) => (
                                            <option value={s.mod_id}>
                                                {s.mod_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.inputAlignment}>
                                    <p>Component:</p>
                                    <select
                                        value={id_selectedComponent === undefined ? 0 : id_selectedComponent}
                                        onChange={(e) =>
                                            this.setState({
                                                id_selectedComponent: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={0} disabled selected>
                                            {"Select Component "}
                                        </option>
                                        {arr_components.map((s) => (
                                            <option value={s.com_id}>
                                                {s.com_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.inputAlignment}>
                                    <p>Field Type:</p>
                                    <select
                                        value={id_selectedType === undefined ? 0 : id_selectedType}
                                        onChange={(e) =>
                                            this.setState({
                                                id_selectedType: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={0} disabled selected>
                                            {"Select Component "}
                                        </option>
                                        {array_field_type.map((s) => (
                                            <option value={s.value}>
                                                {s.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.filterbutton}>
                                <button
                                    className={`button`}
                                    onClick={() => this.getData()}
                                >
                                    {"Submit"}
                                </button>
                                <button className={`button`} onClick={() => this.handleClearFilter()}>
                                    {"Clear"}
                                </button>
                            </div>

                            <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            customEditVisibility: true,
                                            editable: false,
                                            selectedData: undefined,
                                        })
                                    }
                                >
                                    <i style={{ paddingRight: 10 }} class="fa fa-plus" />
                                    {"Create"}
                                </button>
                            </div>
                        </div>
                        {/* )} */}
                        {arr_custom_fields.length == 0 ?
                            <p className={styles.title}>No data found</p>
                            :
                            <div>
                                <table className={`table ${styles.table}`}>
                                    <thead>
                                        <tr>
                                            <th>Component Id</th>
                                            <th>Component Name</th>
                                            <th>Field Name</th>
                                            <th>Field Type</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arr_custom_fields.slice(pagesVisited, pagesVisited + PAGINATE_COUNT)
                                            .map((c) => (
                                                <tr key={c.id}>
                                                    <td>{c.comp_type_id}</td>
                                                    <td>{c.com_name}</td>
                                                    <td>{c.field_name}</td>
                                                    <td>{c.field_type}</td>
                                                    <td>
                                                <div className={`container`}>
                                                    <div className={`menuContainer`}>
                                                        <button
                                                            onClick={this.onClick(c.id)}
                                                            className={`menuTrigger`}
                                                        >
                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        {activeRow === c.id && (
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
                                                                                customEditVisibility: true,
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


                                {/* {arr_com_claim.map((c) => (
                            c.clm_export == 13 && */}
                                <div className={styles.excelcontainer}>
                                    <ExportExcel excelData={arr_custom_fields} fileName={"TA_Cust_Field_Details_" + moment().format("DDMMYYhhmmss")} />
                                </div>
                                {/* ))} */}
                            </div>
                        }
                    </div>
                </SideMenu>
            </div>
        );
    }
}
