import React, { Component } from 'react';
import classes from './Navigation.module.css';
//import { SiReact } from 'react-icons/si';
import {AiOutlineMenu, AiOutlineBold } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import { Link } from 'react-router-dom';


class Navigation extends Component {
    state = {
        toggleButton: true,
        // redirect: false
    };

    showToggleButton = () => this.setState({ toggleButton: true });

    cancelToggleButton = () => this.setState({ toggleButton: false });

    redirectPageHandler = () => {
        this.props.history.replace('/')
    };
    render () {
    const { toggleButton } = this.state;
    let Toggle = null;
    if(toggleButton) {
        Toggle = <nav className={classes.head} 
        style={{ transform: toggleButton ? "translateX(0)" : "translateX(-100vh)" }}>
            <div className={classes.icons}><AiOutlineBold />
                {/* <SiReact /> */}
                </div>
            <ul className={classes.unorderList}>
                    <Link  to="/" className={classes.list}>Home</Link>
                    <Link  to="/My_Order" className={classes.list}>My Orders</Link>
            </ul>
    </nav>
    }
    return (
    <header>
        <div className={classes.Header}>
            { toggleButton ? null : <AiOutlineMenu onClick={this.showToggleButton} className={classes.Menu} /> }
            { toggleButton ? <MdClear className={classes.mdClear} onClick={this.cancelToggleButton} /> : null }
        </div>
            <div className={classes.toggles}>
               {Toggle}
            </div>
    </header>
);
 }
}

export default Navigation;