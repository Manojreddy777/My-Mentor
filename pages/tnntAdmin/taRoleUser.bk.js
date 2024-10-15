import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import taRoleUserHelper from "../../helper/tnntAdmin/taRoleUser";
 

export default class taRoleUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
            array_taRoleUser: [],
            username:"",
            tnnt_id:"",
            };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        const tnnt_id = global.localStorage.tnnt_id;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id:tnnt_id,
            });
            this.getDet(tnnt_id);        
        }
    }

    getDet(tnnt_id) {
        taRoleUserHelper.getAllActive(tnnt_id)
              .then((data) => {
                  this.setState({ array_taRoleUser: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

    render() {
        const {
                array_taRoleUser,
              } = this.state;
       

        return (
		<div>
                <SideMenu tag="tnntAdmin" subtag="taRoleUser">
				    <div className={styles.wrapper}>
                       <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Role User Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_taRoleUser.map((t) => (
                                    <tr>
                                        <td>{t.role_id}</td>
                                        <td>{t.role_name}</td>
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
