import React, { Component } from 'react';
import Axios from '../.././component/Axios';
import Navigation from '../../component/Navigation/Navigations/Navigation';
import classes from './Orders.module.css';
import Orders from './Orders';
import MyOrderError from '../../component/Hoc/MyOrderError';

class MyOrder extends Component {
    state = {
        fetchedData: null,
        orderError: null
    };

    componentDidMount() {
        Axios.get("/shopping.json")
        .then(response => this.setState({ fetchedData: response.data }))
        .catch(() => this.setState({ orderError: "Bad connection, please check your internet connection and try again!" }));
    }

    render() {
        let mapOrders = <p style={{fontFamily: "fantasy", textAlign: "center",
         color: "green", marginTop: "60px", position: "relative", zIndex: "150"}}>Your orders will appear here!</p>;
        if(this.state.fetchedData !== null) {
             mapOrders = Object.values(this.state.fetchedData).map(item => {
                return <Orders key={item.datePosted} date={item.posted} price={item.Price} name={item.Name} />
            });
    }

        let errorSpinner = null;
        if(this.state.orderError) {
            errorSpinner = <div className={classes.loader}>Loading...</div>
        };

        return (
            <React.Fragment>
                <Navigation />
                {mapOrders}
                <MyOrderError spinningError={errorSpinner} error={this.state.orderError}/>
            </React.Fragment>
        );
    }
}

export default MyOrder;