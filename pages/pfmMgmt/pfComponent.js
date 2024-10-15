import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfComHelper from "../../helper/pfmMgmt/pfComponent";
import pfModuleHelper from "../../helper/pfmMgmt/pfModule";
import Component from "../../components/pfmMgmt/pfComponent"; 
import exportCSVFile from "../../utils/exportCSV";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import moment from "moment"; 
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants"; 
import Head from "../../components/head";

export default class pfComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfComponent: [],
            array_pfModule: [],
            id_selectedmodule: undefined,
            selectedData: undefined,
            componentEditVisibility: false,
            id_selectedcomponent: undefined,
            username:"",
            editable: false,
            pageNumber: 0,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
         if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getComponentDet();
            this.getModuleDet();
        }
    }
     getComponentDet() {
        pfComHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfComponent: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      getModuleDet() {
        pfModuleHelper.getForDropDown()
              .then((data) => {
                  this.setState({ array_pfModule: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      getComponentDet(type) {
        pfComHelper.getAllActive()
         .then((data) => {
            if (type == "export") {
                  const TABLE_HEADER = {
                         com_id: "Component ID",
                         com_name: "Component Name",
                         mod_name: "Module Name",
                         abbr: "Abbreviation",                            
                 };
                 const formattedData = [];
                 data.forEach((d, i) => {
                     formattedData.push({
                        com_id: d.com_id,
                        com_name: d.com_name,
                        mod_name: d.mod_name,
                        abbr: d.abbr,
                    });
                 });

                 exportCSVFile(
                     TABLE_HEADER,
                     formattedData,
                     "Component Details" + moment().format("DDMMYYhhmmss")
                 );
             } else {
             this.setState({ array_pfComponent: data });
             }
         })
         .catch((err) => console.log(err));
   }
   async getData() {
    try {
        const {
            id_selectedcomponent,
        } = this.state;
    
        const alertInitial = "";
        let alertText = alertInitial;

        if (id_selectedcomponent === undefined || id_selectedcomponent === "") {
            alertText += ". Component\n";
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
            };
            
            pfComHelper.getFilteredData(data)
                .then((data) => {
                    this.setState({ array_pfComponent: data });
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

            array_pfComponent,
            array_pfModule,
            id_selectedmodule,
            selectedData,
            componentEditVisibility, 
            id_selectedcomponent, 
            editable,
            pageNumber

          } = this.state;
          const pagesVisited = pageNumber * PAGINATE_COUNT;
          const pageCount = Math.ceil(array_pfComponent.length / PAGINATE_COUNT);
          const changePage = ({ selected }) => {
              this.setState({ pageNumber: selected });
          };

        return (
		<div>
                 {componentEditVisibility && (
                    <Component
                     visibility={componentEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ componentEditVisibility: v })
                        }
                        data={selectedData}
                        editable={editable}
                        getComponentDet={() => this.getComponentDet()}    
                    />
                )}
                <SideMenu tag="pfmMgmt" subtag="pfComponent" >
                    <Head title="Components Details" />
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
                                {array_pfComponent.map((p) => (
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
                         <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            selectedData: undefined,
                                            componentEditVisibility: true,
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
                                     <th>Module Name</th>
                                     <th>Component Name</th>
                                     <th>Abbreviation</th>
                                     <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfComponent
                                 .slice(
                                    pagesVisited,
                                    pagesVisited + PAGINATE_COUNT
                                    )
                                .map((t) => (
                                    <tr>
                                        <td>{t.com_id}</td>
                                        <td>{t.mod_name}</td>
                                        <td>{t.com_name}</td>
                                        <td>{t.abbr}</td>
                                        <td>
                                        <img
						    src={"/assets/write.png"}
						    className={styles.icon}
                                                    onClick={() =>
                                                        this.setState({
                                                            componentEditVisibility: true,
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
                           <button
                             onClick={() => this.getComponentDet("export")}
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
