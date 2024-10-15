import React from "react";
import Swal from "sweetalert2";
import styles from "../../styles/createcom.module.css";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import pfComHelper from "../../helper/pfmMgmt/pfComponent";
import pfClassifHelper from "../../helper/pfmMgmt/pfClassif";

export default class pfClassif extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {

            array_pfComponent: [],
            id_SelectedComponent: undefined,
            txt_classif_name:"",
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
        pfComHelper.getForDropDown()
        .then((data) => {
            this.setState({array_pfComponent: data });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    async insertRecord() {
        const { 
                txt_classif_name,
                id_SelectedComponent,
                username,
                  
             } = this.state;
        try {
            const alertInitial = "";
            let alertText = alertInitial;
            if (id_SelectedComponent === undefined) {
                alertText += "* Component Name\n";
            }
            if (txt_classif_name === "") {
                alertText += "* Classif Name\n";
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
                    classif_name: txt_classif_name,               
                    com_id: id_SelectedComponent, 
                    created_by: username,
                };
                this.setState({ is_loading: true });
                pfClassifHelper.insertRecord(data)
                .then((data) => {
                    if (data.code == 200) {
                        this.props.getClassifDet();
                        Swal.fire({
                            text: " PF ClassIF is Successfully Created!",
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

            txt_classif_name,   
            id_SelectedComponent,
            array_pfComponent,
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
                    <p className={styles.title}>{"Create ClassIF"}</p>

                    <div className={styles.inputAlignment}>                 
                       <p>Component Name:</p>
                        <select
                            value={id_SelectedComponent}
                            onChange={(e) =>
                                this.setState({
                                    id_SelectedComponent: e.target.value,
                                })
                            }
                        >
                            <option value={0} selected>
                                {"Component Name"}
                            </option>
                            {array_pfComponent.map((p) => (
                                <option value={p.com_id}>
                                    {p.com_name}
                                </option>
                            ))}
                        </select>
                        </div>


                      <div className={styles.inputAlignment}>
                        <p>ClassIF Name:</p>
                        <div className={styles.inputCustom}>
                        <CustomInput
                            inputType={"text"}
                            maxlenght={"100"}
                            value={txt_classif_name}
                            onChange={(e) =>
                                       this.setState({
                                        txt_classif_name: e.target.value,
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
