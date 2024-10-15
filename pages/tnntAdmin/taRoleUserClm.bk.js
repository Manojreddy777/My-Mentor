import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfClassHelper from "../../helper/pfmMgmt/pfClass";
import Class from "../../components/pfmMgmt/pfClass"; 

export default class taClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfClass: [],
            classEditVisibility: false,
            id_selectedclass: undefined,
            username:"",
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
         if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getClassDet();
        }
    }

    getClassDet() {
        pfClassHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfClass: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    
    render() {
        const { 

            array_pfClass,
            classEditVisibility, 
            id_selectedclass, 

          } = this.state;
       

        return (
		<div>
                 {classEditVisibility && (
                    <Class
                    data={id_selectedclass}
                    
                     visibility={classEditVisibility}
                        setVisibility={(v) =>
                            this.setState({ classEditVisibility: v })
                        }
                        getClassDet={() => this.getClassDet()}    
                    />
                )}
                <SideMenu tag="pfmMgmt" subtag="pfClass" >
                 
                    <div className={styles.wrapper}>                        
                         <div className={`${styles.button}`}>
                                <button
                                    className={`button`}
                                    onClick={() =>
                                        this.setState({
                                            classEditVisibility: true,
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
                                     <th>Classif Name</th>
                                     <th>Class Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfClass.map((t) => (
                                    <tr>
                                        <td>{t.id}</td>
                                        <td>{t.classif_Name}</td>
                                        <td>{t.class_name}</td>
                                     
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
