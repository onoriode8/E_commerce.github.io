import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class MyOrderError extends Component {
    redirectHandler = (props) => {
        this.props.history.push("/");   
    };

    render() {

    return (
        <div>
    {this.props.error ? <div onClick={this.redirectHandler}
        style={{
            position:"fixed",
            zIndex: "180",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            top: "0",
            right: "0",
            width: "100%",
            height: "100vh",
            cursor: "pointer"
        }}
    >
        {this.props.spinningError}
        <div 
            style={{
            fontFamily: "cursive", 
            textAlign:"center",
            color: "#fff"
        }}
        >{this.props.error}</div>
       <div 
        style={{
            textAlign: "center", 
            marginTop: "5%",  
            color: "white"
        }}>Go Back</div>
    </div> : null }
    </div>
);
  };
}
export default withRouter(MyOrderError);