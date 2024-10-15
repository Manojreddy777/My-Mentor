import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfComHelper from "../../helper/pfmMgmt/pfComponent";
import Component from "../../components/pfmMgmt/pfComponent"; 

export default class pfComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfComponent: [],
            componentEditVisibility: false,
            id_selectedcomponent: undefined,
            username:"",
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
         if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getComponentDet();
        }
    }

    getComponentDet() {
        pfComHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfComponent: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    
    render() {
        const { 

            array_pfComponent,
            componentEditVisibility, 
            id_selectedcomponent, 

          } = this.state;
       

        return (
		<div>
                 {componentEditVisibility && (
                    <Component
                    data={id_selectedcomponent}
                    
                     visibility={componentEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ componentEditVisibility: v })
                        }
                        getComponentDet={() => this.getComponentDet()}    
                    />
                )}
                <SideMenu tag="pfmMgmt" subtag="pfComponent" >
                 
                    <div className={styles.wrapper}>                        
                         <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            componentEditVisibility: true,
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
                                     <th>Component Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfComponent.map((t) => (
                                    <tr>
                                        <td>{t.com_id}</td>
                                        <td>{t.mod_name}</td>
                                        <td>{t.com_name}</td>
                                     
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
