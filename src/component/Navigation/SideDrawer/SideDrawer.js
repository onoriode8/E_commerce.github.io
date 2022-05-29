import classes from '../SideDrawer.module.css';
//import { connect } from 'react-redux';

const sideDrawer = props => {
    let side = [classes.sideDrawer, classes.close];

    if(props.purchase) {
        side = [classes.sideDrawer, classes.open];
    }

    return(
        <div className={side.join(" ")}></div>
    );
 };

//  const mapStateToProps = state => {
//      return {
//          purchase: state.purchase
//      }
//  };

//  const mapDispatchToProps = dispatch => {
//      return {

//      }
//  }

export default sideDrawer;