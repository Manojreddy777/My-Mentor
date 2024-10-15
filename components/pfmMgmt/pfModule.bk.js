import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfModuleHelper from "../../helper/pfmMgmt/pfModule";

export default class pfModule extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {

             txt_module_name:"",
             is_loading: false
           
         };
    if (props.data !== "") {
            stateData.txt_module_name = props.data.mod_name;       
       }
          this.state = {
           ...stateData,
      };
    }
    
    async insertRecord() {
        const { 
                  txt_module_name,
                  
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;

            if (txt_module_name === "") {
                alertText += "* Module Name\n";
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
                    mod_name: txt_module_name,               
                     
                };
                this.setState({ is_loading: true });
                pfModuleHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getModuleDet();
                        Swal.fire({
                            text: " PF Module is Successfully Created!",
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

            txt_module_name, 
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
                    <p className={styles.title}>{"Create Module"}</p>
                      <div className={styles.inputAlignment}>
                        <p>Module Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxlenght={"100"}
                            value={txt_module_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_module_name: e.target.value,
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
