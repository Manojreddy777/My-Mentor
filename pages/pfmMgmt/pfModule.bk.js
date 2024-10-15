import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfModuleHelper from "../../helper/pfmMgmt/pfModule";
import Module from "../../components/pfmMgmt/pfModule";

export default class pfModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            array_pfModule: [],
            id_selectedModule: undefined,
            moduleEditVisibility: false,
            username:"",

            };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getModuleDet();        
        }
    }

    getModuleDet() {
        pfModuleHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfModule: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

    render() {
        const {
                array_pfModule,
               moduleEditVisibility
         
              } = this.state;
       

        return (
		<div>
             {moduleEditVisibility && (
                 <Module
                    data={array_pfModule}

                      visibility={moduleEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ moduleEditVisibility : v })
                        }
                        getModuleDet={() => this.getModuleDet()}    
                    />
                )}
            
                <SideMenu tag="pfmMgmt" subtag="pfModule">
				    <div className={styles.wrapper}>
                    <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            moduleEditVisibility: true,
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
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfModule.map((t) => (
                                    <tr>
                                        <td>{t.mod_id}</td>
                                        <td>{t.mod_name}</td>
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
