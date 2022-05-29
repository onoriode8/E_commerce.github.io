import React from 'react';
import { connect } from 'react-redux';
import shopChair from '../../assets/shop_chair.jpg';
import classes from './ShopModel.module.css';
import BackDrop from '../BackDrop/BackDrop';
import { withRouter } from 'react-router-dom';

class ShopModel extends React.Component {

    pushToInputform = () => {
        this.props.history.push('/inputForm');
    };

    render() {
       return (
            <React.Fragment>
                <BackDrop purchase={this.props.purchase} cancel={this.props.cancelPurchaseHandler} />
                <div className={classes.shopModel} style={{cursor: "pointer",
                    transform: this.props.purchase ? "translateY(0)" : "translateY(-400vh)"
                }}>
                    <img src={shopChair} alt=''  className={classes.image}/>
                    <h1 className={classes.hTag}>Happy purchasing</h1>
                    <label style={{cursor: "pointer", fontFamily: "fantasy"}} className={classes.chairPrice}>Chair Price: $<strong>{this.props.shopPrice}</strong></label>
                   
                    <button className={classes.Button} onClick={this.props.cancelPurchaseHandler}>Cancel</button>
                    <button className={classes.Button} onClick={this.pushToInputform}>Continue</button>
                </div> 
            </React.Fragment>
    );
  };
}

const mapStateToProps = state => {
    return {
        shopPrice: state.price
    }
}

export default connect(mapStateToProps)(withRouter(ShopModel));