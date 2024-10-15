import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import RoleUserClmHelper from "../../helper/tnntAdmin/taRoleUserClm";
import pfComponentHelper from "../../helper/pfmMgmt/pfComponent";

export default class taRoleUserClm extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            array_Component: [],
            array_RoleUserClm:[],
            id_selectedComponent: undefined,
            id_selectedRoleUserClm:undefined,
            id_selectedView:undefined,
            id_selectedCreate:undefined,
            id_selectedUpdate:undefined,
            id_selectedExport:undefined,
            txt_role_name:"",
            username: "",
            id_tnnt_id:1,
         };
         if (props.data !== undefined) {
            stateData.id_selectedComponent = props.data.com_id;
            stateData.id_selectedRoleUserClm = props.data.user_id;
            stateData.id_selectedView = props.data.mod_name;
            stateData.txt_module_description = props.data.mod_descr;
            stateData.id_SelectedImpStatus = props.data.imp_status_id;
            stateData.editable = true;     
         }
          this.state = {
           ...stateData,
      };
    }
    componentDidMount() {
        const username = global.localStorage.username;
        const tnnt_id =  global.localStorage.tnnt_id;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id:tnnt_id,     
            });
      
            this.getForDropDown();
            this.getDet(tnnt_id);
            
            
        }
    }
    getForDropDown() {
        pfComponentHelper.getAllActive()
        .then((data) => {
            this.setState({array_Component: data });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getDet(tnnt_id) {
        RoleUserClmHelper.getAllActive(tnnt_id)
        .then((data) => {
            this.setState({array_RoleUserClm: data });
        })
        .catch((err) => {
            console.log(err);
        })
    }
 async insertRecord() {
        const {   id_selectedComponent, 
                  id_selectedRoleUserClm,
                  id_selectedView,
                  id_selectedCreate,
                  id_selectedUpdate,
                  id_selectedExport,
                  username,
                  id_tnnt_id
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (id_selectedComponent === undefined) {
                alertText += "* Component Name\n";
            }
            if (id_selectedRoleUserClm === "") {
                alertText += "* Role Name\n";
            }
            if (id_selectedView === undefined) {
                alertText += "* Claim View\n";
            }
            if (id_selectedCreate === undefined) {
                alertText += "* Claim Create\n";
            }
            if (id_selectedUpdate === undefined) {
                alertText += "* Claim Update\n";
            }
            if (id_selectedExport === undefined) {
                alertText += "* Claim Export\n";
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
            }
                const data = {
                    role_name: id_selectedRoleUserClm, 
                    com_id:id_selectedComponent,
                    clm_view_name:id_selectedView, 
                    clm_create_name:id_selectedCreate,
                    clm_update_name:id_selectedUpdate,
                    clm_export_name:id_selectedExport,             
                    created_by: username,
                    tnnt_id:id_tnnt_id,
                };
                RoleUserClmHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getDet();
                        Swal.fire({
                            text: " Role User Name is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.setVisibility(false);
                    } else if (data.code === 101) {
                        Swal.fire({
                            text: "Error",
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                    } else {
                        Swal.fire({
                            text: data.msg,
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        text: err,
                        confirmButtonColor: Colors.red,
                        width: Colors.width,
                        allowOutsideClick: false,
                    });
                    console.log(err);
                });
            
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const { setVisibility } = this.props;
        const {
            id_selectedComponent,
            id_selectedRoleUserClm,
            array_Component,
            array_RoleUserClm,
            id_selectedView,
            id_selectedCreate,
            id_selectedUpdate,
            id_selectedExport,
               
           
            } = this.state;
        return (

         <div className={styles.mainWrapper}>
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src="/assets/close-red.png"
                        className={styles.closeButton}
                        onClick={() => setVisibility(false)}
                    />
                    <div>
                    <p className={styles.title}>{"Create Role"}</p>
                    <div className={styles.inputAlignment}>                 
                       <p>Component Name:</p>
                        <select
                            value={id_selectedComponent}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedComponent: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Component Name"}
                            </option>
                            {array_Component.map((p) => (
                                <option value={p.com_id}>
                                    {p.com_name}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className={styles.inputAlignment}>                 
                       <p>Role User Name:</p>
                        <select
                            value={id_selectedRoleUserClm}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedRoleUserClm: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Role User Name"}
                            </option>
                            {array_RoleUserClm.map((p) => (
                                <option value={p.role_id}>
                                    {p.role_name}
                                </option>
                            ))}
                        </select>
                        </div>
                    <div className={styles.inputAlignment}>                 
                       <p>Claim View:</p>
                        <select
                            value={id_selectedView}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedView: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Claim View"}
                            </option>
                            {array_RoleUserClm.map((p) => (
                                <option value={p.clm_view_name}>
                                    {p.clm_view_name}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className={styles.inputAlignment}>                 
                       <p>Claim Create:</p>
                        <select
                            value={id_selectedCreate}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedCreate: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Claim create"}
                            </option>
                            {array_RoleUserClm.map((p) => (
                                <option value={p.clm_create_name}>
                                    {p.clm_create_name}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className={styles.inputAlignment}>                 
                       <p>Claim Update:</p>
                        <select
                            value={id_selectedUpdate}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedUpdate: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Claim Update"}
                            </option>
                            {array_RoleUserClm.map((p) => (
                                <option value={p.clm_update_name}>
                                    {p.clm_update_name}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className={styles.inputAlignment}>                 
                       <p>Claim Export:</p>
                        <select
                            value={id_selectedExport}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedExport: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Claim View"}
                            </option>
                            {array_RoleUserClm.map((p) => (
                                <option value={p.clm_export_name}>
                                    {p.clm_export_name}
                                </option>
                            ))}
                        </select>
                        </div>
                    <div className={styles.button}>
                    <button
                            className={`button`}
                            onClick={() =>
                                 this.insertRecord()
                            }
                        >
                            {"Create"}
                        </button> 
                     </div>
                 </div>
             </div>
          </div>
        );
    }
}
