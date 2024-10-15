import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/index.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import Footer from "../components/footer/footer";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }


  componentWillUnmount() {

  }

   render() {
    return (
      <GlobalWrapper page={"home"}>
        <h1>I'm in mentor.finari.co.in SIT instance</h1>

      </GlobalWrapper>
    );
  }
}
