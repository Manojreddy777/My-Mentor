import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import RoleUserClmHelper from "../../helper/tnntAdmin/taRoleUserClm";
import RoleUserHelper from "../../helper/tnntAdmin/taRoleUser";
import Components from "../../components/tnntAdmin/taRoleUserClm";
import ExportExcel from "../../utils/exportExcel";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import moment from "moment"; 
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants";  
import Head from "../../components/head";

export default class taRoleUserClm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
            array_taRoleUserClm: [],
            array_taRoleUser:[],
            id_selectedRoleUser:undefined,
            roleUserEditVisibility: false,
            pageNumber: 0,
            editable: false,
            username:"",
            tnnt_id: global.config.tnnt_id,
            };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        const tnnt_id = global.localStorage.tnnt_id;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
            this.getDet();  
            this.getRoleUserClm();
             
        }
    }
    getRoleUserClm() {

        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };

        RoleUserHelper.getForDropDown(filter)
              .then((data) => {
                  this.setState({ array_taRoleUserClm: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

    getDet() {

        const {
            tnnt_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
        };
        
        RoleUserClmHelper.getAllActive(filter)
              .then((data) => {
                  this.setState({ array_taRoleUserClm: data });
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
        RoleUserClmHelper.getAllActive(filter)
         .then((data) => {
            
             this.setState({ array_taRoleUserClm: data });
            
         })
         .catch((err) => console.log(err));
   }

   async getData() {
    try {
        const {
            id_selectedRoleUser,
            tnnt_id,
        } = this.state;
    
        const alertInitial = "";
        let alertText = alertInitial;

        if (id_selectedRoleUser === undefined || id_selectedRoleUser === "") {
            alertText += "* Select Role User\n";
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
                role_id: id_selectedRoleUser,
                tnnt_id: tnnt_id
            };
            
            RoleUserClmHelper.getFilteredData(data)
                .then((data) => {
                    this.setState({ array_taRoleUserClm: data });
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
                array_taRoleUserClm,
                array_taRoleUser,
                id_selectedRoleUser,
                roleUserEditVisibility,
                editable,
                selectedData,
                pageNumber

              } = this.state;
       
              const pagesVisited = pageNumber * PAGINATE_COUNT;
              const pageCount = Math.ceil(array_taRoleUserClm.length / PAGINATE_COUNT);
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
                        
                        getDet={() => this.getDet()}    
                    />
                )}
                <SideMenu tag="tnntAdmin" subtag="taRoleUserClm">
                    <Head title="Role User Claim" />
                <div className={styles.wrapper}>                        
                        <div className={styles.inputAlignment}>
                            <p>Role User Name:</p>
                            <select
                                value={id_selectedRoleUser}
                                onChange={(e) =>
                                    this.setState({
                                        id_selectedRoleUser: e.target.value,
                                    })
                                }
                            >
                                <option value={0} disabled selected>
                                    {"Select Role User Name"}
                                </option>
                                {array_taRoleUser.map((p) => (
                                    <option value={p.role_id}>
                                       {p.role_name}
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
                                    
                                    <th>Component Name</th>
                                    <th>Role Name</th>
                                    <th>Claim View</th>
                                    <th>Claim Create</th>
                                    <th>Claim Update</th>
                                    <th>Claim Export</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_taRoleUserClm.
                                 slice(
                                    pagesVisited,
                                    pagesVisited + PAGINATE_COUNT
                                    )
                                .map((t) => (
                                    <tr>
                                        
                                        <td>{t.com_name}</td>
                                        <td>{t.role_name}</td>
                                        <td>{t.clm_view_name}</td>
                                        <td>{t.clm_create_name}</td>
                                        <td>{t.clm_update_name}</td>
                                        <td>{t.clm_export_name}</td>
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
                           <ExportExcel excelData={array_taRoleUserClm} fileName={"TA_RUser_Claim_Details_" + moment().format("DDMMYYhhmmss")} />
                        </div>
                </SideMenu>
            </div>
        );
    }
}

