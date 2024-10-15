import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfClassHelper from "../../helper/pfmMgmt/pfClass";
import pfClassifHelper from "../../helper/pfmMgmt/pfClassif";

export default class pfClass extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {

            array_pfClassif: [],
            id_SelectedClassif: undefined,
            txt_class_name:"",
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
        pfClassifHelper.getForDropDown()
        .then((data) => {
            this.setState({array_pfClassif: data });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    async insertRecord() {
        const { 
                txt_class_name,
                id_SelectedClassif,
                username,
                  
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (id_SelectedClassif === undefined) {
                alertText += "* ClassIF Name\n";
            }
            if (txt_class_name === "") {
                alertText += "* Class Name\n";
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
                    class_name: txt_class_name,               
                    classif_id: id_SelectedClassif, 
                    created_by: username,
                };
                this.setState({ is_loading: true });
                pfClassHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getClassDet();
                        Swal.fire({
                            text: " PF Class is Successfully Created!",
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

            txt_class_name,   
            id_SelectedClassif,
            array_pfClassif,
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
                    <p className={styles.title}>{"Create Class"}</p>

                    <div className={styles.inputAlignment}>                 
                       <p>ClassIF Name:</p>
                        <select
                            value={id_SelectedClassif}
                            onChange={(e) =>
                                this.setState({
                                    id_SelectedClassif: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"ClassIF Name"}
                            </option>
                            {array_pfClassif.map((p) => (
                                <option value={p.classif_id}>
                                    {p.classif_name}
                                </option>
                            ))}
                        </select>
                        </div>


                      <div className={styles.inputAlignment}>
                        <p>Class Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxlenght={"100"}
                            value={txt_class_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_class_name: e.target.value,
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
