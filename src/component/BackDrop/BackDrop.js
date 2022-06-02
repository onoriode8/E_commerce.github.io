import classes from './BackDrop.module.css';
//import { connect } from 'react-redux';
//import * as actionType from '../../store/actions';

const backDrop = props => (
    <header>
         { props.purchase ? <div onClick={props.cancel} className={classes.backDrop}></div> : null }
    </header>
);

// const mapStateToProps = state => {
//     return {
//         purchase: state.purchase
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         cancel: () => dispatch({ type: actionType.PURCHASE_FALSE })
//     }
// }

export default backDrop;