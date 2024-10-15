import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import EndUserHelper from "../../helper/tnntAdmin/taEndUser";

export default class EndUser extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            array_roleList:[],
            id_selectedRole:undefined,
            id_selectedUser:undefined,
            txt_user_name:"",
            editable:false,
            username: "",
            id_tnnt_id:1,
         };
         if (props.data !== undefined) {
            stateData.txt_user_name = props.data.user_name;
            stateData.id_selectedRole = props.data.role_id;
            stateData.id_selectedUser = props.data.user_id;
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
                  txt_user_name,
                  id_selectedRole,
                  username,
                  id_tnnt_id
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_user_name === undefined) {
                alertText += "* User Name\n";
            }
            if (id_selectedRole === undefined) {
                alertText += "* Role Name\n";
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
                    user_name: txt_user_name.replace(/,/g, ""), 
                    role_id: id_selectedRole,            
                    created_by: username,
                    tnnt_id:id_tnnt_id,
                    
                };
                EndUserHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                         Swal.fire({
                            text: "End User is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getEndUserDet();
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

            txt_user_name,
            id_selectedRole,
            id_selectedUser,

               } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_user_name === undefined) {
                alertText += "* User Name\n";
            }
            if (id_selectedRole === undefined) {
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
                    user_id: id_selectedUser,
                    user_name: txt_user_name.replace(/,/g, ""),
                    role_id: id_selectedRole
                   
                };
                EndUserHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                       
                        Swal.fire({
                            text: "End User is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.getEndUserDet();
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
              array_roleList,
              txt_user_name,  
              id_selectedRole,
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
                    <p className={styles.title}>{editable ? "Update End User" :"Create End User"}</p>
                                  
                      
                      <div className={styles.inputAlignment}>
                        <p>End User Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxlenght={"100"}
                            value={txt_user_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_user_name: e.target.value,
                                })
                              }
                          />
                        
                        </div>
                    </div> 
                    <div className={styles.inputAlignment}>                 
                       <p>Role Name:</p>
                        <select
                            value={id_selectedRole}
                            onChange={(e) =>
                                this.setState({
                                    id_selectedRole: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Role List"}
                            </option>
                            {array_roleList.map((p) => (
                                <option value={p.role_id}>
                                    {p.role_id}
                                </option>
                            ))}
                        </select>
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
