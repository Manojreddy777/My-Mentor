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
            
             txt_component_name:"",
             array_pfModule: [],
             id_SelectedModule: undefined,
             username: "", 
             is_loading: false
           
        };
             
          this.state = {
           ...stateData,
      };
    }
    componentDidMount() {
       
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,     
            });
      
            this.getForDropDown();
        }
    }
    getForDropDown() {
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
                  username,
                  
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
                    com_name: txt_component_name,               
                    mod_id: id_SelectedModule, 
                    created_by: username,
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
    render() {
        const { setVisibility } = this.props;
        const {

            txt_component_name,   
            id_SelectedModule,
            array_pfModule,
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
                    <p className={styles.title}>{"Create Component"}</p>

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
                            maxlenght={"100"}
                            value={txt_component_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_component_name: e.target.value,
                                })
                              }
                          />
                        
                        </div>
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
