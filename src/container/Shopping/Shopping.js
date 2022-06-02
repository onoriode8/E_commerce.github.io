import React, { Component } from 'react';
import shopChair from '../../assets/shop_chair.jpg';
import classes from './Shopping.module.css';
import { connect } from 'react-redux';
import ShopModel from '../../component/ShopModel/ShopModel';
import  Navigation from '../../component/Navigation/Navigations/Navigation';
import axios from 'axios';

class Shopping extends Component {
    state = {
        purchase: false,
        greetUser: false,
        User: null
    }

    // component for greeting users when they check in
     componentDidMount() {
        axios.get("/newUser.json")
        .then(res => {
            this.setState({ greetUser: true, User: res.data });
            setTimeout(() => {
                this.setState({ greetUser: false });
            }, 10000);
        })
        .catch(() => {});
    }


    showPurchaseHandler = () => {
        this.setState({ purchase: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchase: false });
    }
 
    render(){
        let user = null;
        if(this.state.greetUser) {
            user = <label className={classes.greet} style={{
                transform: this.state.greetUser ? "translateY(0vh)" : "translateY(-100vh)"
            }}>Thanks for checking out our page!</label>
        };

        return(
            <React.Fragment>
                <Navigation purchase={this.state.purchase}/>
                {user}
                <ShopModel purchase={this.state.purchase} cancelPurchaseHandler={this.cancelPurchaseHandler}/>
                <div className={classes.wrapShopping}>
                <header className={classes.shopping}>
                    <img className={classes.image} src={shopChair} alt='' />     
                </header>
                   <p className={classes.price}><strong><i>price : </i> ${this.props.shopPrice}</strong></p>
                    <button className={classes.Button} style={{cursor: "pointer"}} onClick={this.showPurchaseHandler}>Purchase</button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        shopPrice: state.price
    }
}

export default connect(mapStateToProps)(Shopping);