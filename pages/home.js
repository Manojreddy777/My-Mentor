import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import Head from "../components/head";
 
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            tnnt_id: global.config.tnnt_id,
        };
    }
 
    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
        }
    }
 
    render() {
        return (
            <div>
                <SideMenu tag="">
                    
                     
                </SideMenu>
            </div>
        );
    }
}