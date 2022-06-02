import React from 'react';
import classes from './Orders.module.css';
import shopChair from '../../assets/shop_chair.jpg';

const orders = props => {
    return (
            <header className={classes.Orders}>
                <img style={{ width: "50px" }} src={shopChair} alt="" />
                <div>name: {props.name}</div>
                <br />
                <div>price: ${props.price}</div>
                <br />
                <div>posted: {props.date}</div>
            </header>
    );
} 

export default orders;