import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfModuleHelper from "../../helper/pfmMgmt/pfModule";
import Module from "../../components/pfmMgmt/pfModule";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import exportCSVFile from "../../utils/exportCSV";
import moment from "moment";
import ReactPaginate from "react-paginate";
import paginationStyle from "../../styles/pagination.module.css";
import { PAGINATE_COUNT } from "../../constants/constants"; 
import Head from "../../components/head";

export default class pfModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfModule: [],
            selectedData: undefined,
            id_selectedModule: undefined,
            moduleEditVisibility: false,
            pageNumber: 0,
            username:"",
            editable: false,

            };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getModuleDet();   
            this.getModuleDet_det();     
        }
    }
    getModuleDet_det() {
        pfModuleHelper.getForDropDown()
              .then((data) => {
                  this.setState({ array_pfModule: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    getModuleDet() {
        pfModuleHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfModule: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      getModuleDet(type) {
		pfModuleHelper.getAllActive()
			.then((data) => {
			   if (type == "export") {
		             const TABLE_HEADER = {
						mod_id: "id",
						mod_name: "Mod Name",
                        abbr: "Abbreviation",        
					};
					const formattedData = [];
					data.forEach((d, i) => {
						formattedData.push({
						    mod_id: d.mod_id,
                            mod_name: d.mod_name,
                            abbr: d.abbr,
                       });
					});

					exportCSVFile(
						TABLE_HEADER,
						formattedData,
						"Module Details" + moment().format("DDMMYYhhmmss")
					);
				} else {
				this.setState({ array_pfModule: data });
				}
			})
			.catch((err) => console.log(err));
	} 
    async getData() {
		try {
			const {
				id_selectedModule,
			} = this.state;
		
            const alertInitial = "";
            let alertText = alertInitial;

            if (id_selectedModule === undefined || id_selectedModule === "") {
                alertText += "• Module\n";
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
                    mod_id: id_selectedModule,
                };
                
                pfModuleHelper.getFilteredData(data)
					.then((data) => {
						this.setState({ array_pfModule: data });
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
                array_pfModule,
                id_selectedModule,
                pageNumber,
                moduleEditVisibility,
                selectedData,
                editable
         
              } = this.state;
              const pagesVisited = pageNumber * PAGINATE_COUNT;
              const pageCount = Math.ceil(array_pfModule.length / PAGINATE_COUNT);
              const changePage = ({ selected }) => {
                  this.setState({ pageNumber: selected });
              };

        return (
		<div>
             {moduleEditVisibility && (
                 <Module
                    visibility={moduleEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ moduleEditVisibility : v })
                        }
                        data={selectedData}
                        editable={editable}
                        getModuleDet={() => this.getModuleDet()}    
                    />
                )}
            
                <SideMenu tag="pfmMgmt" subtag="pfModule">
                    <Head title="Module Details" />

                <div className={styles.wrapper}>                        
                        <div className={styles.inputAlignment}>
                            <p>Module Name:</p>
                            <select
                                value={id_selectedModule}
                                onChange={(e) =>
                                    this.setState({
                                        id_selectedModule: e.target.value,
                                    })
                                }
                            >
                                <option value={0} disabled selected>
                                    {"Select Module Name"}
                                </option>
                                {array_pfModule.map((p) => (
                                    <option value={p.mod_id}>
                                       {p.mod_name}
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
                                            moduleEditVisibility: true,
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
                                    <th>Abbreviation</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfModule
                                 .slice(
                                    pagesVisited,
                                    pagesVisited + PAGINATE_COUNT
                                    )
                                .map((t) => (
                                    <tr>
                                        <td>{t.mod_id}</td>
                                        <td>{t.mod_name}</td>
                                        <td>{t.abbr}</td>
                                        <td>
                                        <img
						    src={"/assets/write.png"}
						    className={styles.icon}
                                                    onClick={() =>
                                                        this.setState({
                                                            moduleEditVisibility: true,
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
                             onClick={() => this.getModuleDet("export")}
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
