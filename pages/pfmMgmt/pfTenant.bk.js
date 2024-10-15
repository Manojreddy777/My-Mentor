import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/pages.module.css"; 
import SideMenu from "../../components/sideMenu/sideMenu";
import pfTenantHelper from "../../helper/pfmMgmt/pfTenant";

export default class pfTenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_pfTenant: [],
            username:"",

            };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
            this.getTenantDet();
        }
    }

    getTenantDet() {
        pfTenantHelper.getAllActive()
              .then((data) => {
                  this.setState({ array_pfTenant: data });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

    render() {
        const {
                array_pfTenant,
              } = this.state;

        return (
		<div>
                   <SideMenu tag="pfmMgmt" subtag="pfTenant">
				    <div className={styles.wrapper}>
                       <table className={`table ${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tenant Name</th>
                                    <th>Abbreviation</th>
                                    <th>Database Name</th>
                                    <th>Subscription Start Date</th>
                                    <th>Subscription End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {array_pfTenant.map((t) => (
                                    <tr>
                                        <td>{t.tnnt_id}</td>
                                        <td>{t.tnnt_name}</td>
                                        <td>{t.abbr}</td>
                                        <td>{t.database_name}</td>
                                        <td>{t.start_date}</td>
                                        <td>{t.end_date}</td>
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
