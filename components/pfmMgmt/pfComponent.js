import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfComHelper from "../../helper/pfmMgmt/pfComponent";
import pfModHelper from "../../helper/pfmMgmt/pfModule";

export default class pfComponent extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
             id_component: undefined,
             txt_component_name:"",
             txt_abbr:"",
             array_pfModule: [],
             id_SelectedModule: undefined,
             username: "", 
             tnnt_id: global.config.tnnt_id,
             editable: false,
             is_loading: false
           
        };
        if (props.data !== undefined) {
            stateData.id_component = props.data.com_id;
            stateData.txt_component_name = props.data.com_name;
            stateData.id_SelectedModule = props.data.mod_id; 
            stateData.txt_abbr = props.data.abbr;   
            stateData.editable = true;     
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
                tnnt_id: global.localStorage.tnnt_id,
            });
      
            this.getModuleDet();
        }
    }
    getModuleDet() {

        pfModHelper.getForDropDown()
        .then((data) => {
            this.setState({array_pfModule: data });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    async insertRecord() {
        const { 
                  txt_component_name,
                  id_SelectedModule,
                  txt_abbr,
                  username,
                  tnnt_id
                  
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (id_SelectedModule === undefined) {
                alertText += "* Module Name\n";
            }
            if (txt_component_name === "") {
                alertText += "* Component Name\n";
            }
            if (txt_abbr === "") {
                alertText += "* Abbreviation\n";
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
                    com_name: txt_component_name.replace(/,/g, ""),               
                    mod_id: id_SelectedModule, 
                    abbr: txt_abbr.replace(/,/g, ""),
                    created_by: username,
                    tnnt_id: tnnt_id,
                };
                this.setState({ is_loading: true });
                pfComHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getComponentDet();
                        Swal.fire({
                            text: " PF Component is Successfully Created!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.props.setVisibility(false);
                        this.setState({ is_loading: false });
                    } else if (data.code === 101) {
                        Swal.fire({
                            text: "Error",
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                    } else {
                        Swal.fire({
                            text: data.msg,
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
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
            id_component,
            txt_component_name,
            id_SelectedModule,
            txt_abbr, 
         } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (txt_component_name === "") {
                alertText += "• Component Name\n";
            }
            if (id_SelectedModule === "") {
                alertText += "• Module Name\n";
            }
            if (txt_abbr === "") {
                alertText += "• Abbreviation\n";
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
                    com_id: id_component,
                    mod_name: id_SelectedModule, 
                    com_name: txt_component_name.replace(/,/g, ""), 
                    abbr: txt_abbr.replace(/,/g, ""),    
                };
                this.setState({ is_loading: true });
                pfComHelper.updateRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getComponentDet();
                        Swal.fire({
                            text: " PF Component is Successfully Updated!",
                            confirmButtonColor: Colors.primaryColor,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        
                        this.props.setVisibility(false);
                        this.setState({ is_loading: false });
                    } else if (data.code === 101) {
                        Swal.fire({
                            text: "Error",
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
                    } else {
                        Swal.fire({
                            text: data.msg,
                            confirmButtonColor: Colors.red,
                            width: Colors.width,
                            allowOutsideClick: false,
                        });
                        this.setState({ is_loading: false });
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

            txt_component_name,   
            id_SelectedModule,
            txt_abbr,
            array_pfModule,
            editable,
            is_loading

            } = this.state;
        return (

         <div className={styles.mainWrapper}>
            		{is_loading && (
	                    <div className={"loadingWrapper"}>
	                        <div className={"innerLoadingWrapper"}>
	                            <div class="bouncing-loader">
	                                <div></div>
	                                <div></div>
	                                <div></div>
	                            </div>
	                        </div>
	                    </div>
	                )}
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
                    <p className={styles.title}>{editable ? "Update Component" : "Create Component"}</p>

                    <div className={styles.inputAlignment}>                 
                       <p>Module Name:</p>
                        <select
                            value={id_SelectedModule}
                            onChange={(e) =>
                                this.setState({
                                    id_SelectedModule: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Module Name"}
                            </option>
                            {array_pfModule.map((p) => (
                                <option value={p.mod_id}>
                                    {p.mod_name}
                                </option>
                            ))}
                        </select>
                        </div>


                      <div className={styles.inputAlignment}>
                        <p>Component Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxLength={"100"}
                            value={txt_component_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_component_name: e.target.value,
                                })
                              }
                          />
                        
                        </div>
                    </div> 
                    <div className={styles.inputAlignment}>
                        <p>Abbreviation:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxLength={"100"}
                            value={txt_abbr}
                            onChange={(e) =>
                                       this.setState({
                                        txt_abbr: e.target.value,
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
