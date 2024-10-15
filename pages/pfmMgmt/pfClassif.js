import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfClassifHelper from "../../helper/pfmMgmt/pfClassif";
import Classif from "../../components/pfmMgmt/pfClassif"; 
import Head from "../../components/head";

export default class pfClassif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfClassif: [],
            classifEditVisibility: false,
            id_selectedclassif: undefined,
            username:"",
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
         if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getClassifDet();
        }
    }

    getClassifDet() {
        pfClassifHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfClassif: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    
    render() {
        const { 

            array_pfClassif,
            classifEditVisibility, 
            id_selectedclassif, 

          } = this.state;
       

        return (
		<div>
                 {classifEditVisibility && (
                    <Classif
                    data={id_selectedclassif}
                    
                     visibility={classifEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ classifEditVisibility: v })
                        }
                        getClassifDet={() => this.getClassifDet()}    
                    />
                )}
                <SideMenu tag="pfmMgmt" subtag="pfClassif" >
                    <Head title="Pf Class" />
                 
                    <div className={styles.wrapper}>                        
                         <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            classifEditVisibility: true,
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
                                     <th>Component Name</th>
                                     <th>Classif Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfClassif.map((t) => (
                                    <tr>
                                        <td>{t.id}</td>
                                        <td>{t.com_name}</td>
                                        <td>{t.classif_name}</td>
                                     
                                    </tr>
                                ))}
                            </tbody>
                        </table>  
                       
                    </div>
                   
                </SideMenu>
            </div>
        );
    }
}
