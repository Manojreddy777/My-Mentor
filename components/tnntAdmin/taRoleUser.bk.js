import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import RoleUserHelper from "../../helper/tnntAdmin/taRoleUser";


export default class RoleUser extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            id_role:undefined,
            txt_role_name:"",
            username: "",
            id_tnnt_id:1,
         };
         if (props.data !== undefined) {
            stateData.txt_role_name = props.data.role_name;
            stateData.id_role = props.data.role_id;
            stateData.editable = props.editable;     
         }
          this.state = {
           ...stateData,
      };
    }
    componentDidMount() {
        const username = global.localStorage.username;
        
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id:global.localStorage.tnnt_id,     
            });
  
        }
    }
 async insertRecord() {
        const {   
                  txt_role_name,
                  username,
                  id_tnnt_id
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

           
            if (txt_role_name === "") {
                alertText += "* Role User Name\n";
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
                    role_name: txt_role_name.replace(/,/g, ""),             
                    created_by: username,
                    tnnt_id:id_tnnt_id,
                    
                };
                RoleUserHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                         Swal.fire({
                            text: " Role User Name is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getRoleUser(tnnt_id);
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
    async updateRecord() {
        const { 

            txt_role_name,
            id_role

               } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_role_name === undefined) {
                alertText += "* Role User Name\n";
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
                    role_id: id_role,
                    role_name: txt_role_name.replace(/,/g, ""),
                   
                };
                RoleUserHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                       
                        Swal.fire({
                            text: "Role User Name is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getRoleUser(tnnt_id);
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

              txt_role_name,  
              editable
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
                    <p className={styles.title}>{editable ? "Update Role User" :"Create Role User"}</p>
                                  
                      
                      <div className={styles.inputAlignment}>
                        <p>Role User Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxlenght={"100"}
                            value={txt_role_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_role_name: e.target.value,
                                })
                              }
                          />
                        
                        </div>
                    </div> 
                   
                    <div className={styles.button}>
                    {editable ? (
                            <button
                                className={`button`}
                                onClick={() => {
                                    this.updateRecord();
                                }}
                            >
                                {"Update"}
                            </button>
                        ) : (
                            <button
                            className={`button`}
                            onClick={() =>
                                editable ? this.updateRecord() : this.insertRecord()
                            }
                        >
                            {editable ? "Update" : "Create"}
                        </button>
                        )}
                        
                     </div>
                 </div>
             </div>
          </div>
        );
    }
}
