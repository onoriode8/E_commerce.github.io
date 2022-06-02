import React, { Component } from 'react';
import classes from './InputForm.module.css';
import axiosInstance from '../../component/Axios';
import { BiArrowBack } from 'react-icons/bi';
import { RiWifiOffLine }  from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { connect } from 'react-redux';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef()
        this.state = {
        name: '',
        email: '',
        ordered: false,
        Posted: false,
        Attractive: false,
        userFeedBack: "",
        spinner: false,
        postFormError: null,
        refreshError: null,
        refreshSpinner: false,
        date: ""
      }  
    }

    componentDidMount() {
        this.inputElement.current.focus();
    }

    acceptAttractiveness = () => {
        this.setState({  Posted: false });
        this.setState({ ordered: false, Attractive: true });
        setTimeout(() => {
            const { Attractive } = this.state;
            const userResponses = {
            attract: Attractive,
            datePosted: new Date(),
            posted: new Date().toDateString()
          }
        axiosInstance.post("/AttractiveApp.json", userResponses)
         .then(() => {
                setTimeout(() => {
                    this.setState({  ordered: false, Posted: false, Attractive: false, spinner: false});
                    this.props.history.push('/');
                }, 2500);
            })
            .catch(() => {});
        }, 1000);
    }

    rejectAttractiveness = () => {
        this.setState({ ordered: false, Posted: false, Attractive: false, spinner: false });
        this.props.history.push("/");
    }

    inputHandlerFeedBack = () => {
        this.setState({  Posted: false });
        this.setState({ ordered: false, Attractive: true });
        const inputFeedBack = {
            feedBack: this.state.userFeedBack,
            datePosted: new Date()
        }
        axiosInstance.post("/FeedBack.json", inputFeedBack)
        .then(data => setTimeout(() => this.props.history.push("/"), 2000 ))
        .catch(() => {});
    }

    nameChangeHandler = (event) => this.setState({ name: event.target.value });

    emailChangeHandler = (event) => this.setState({ email: event.target.value });

    userFeedBackHandler = (event) => this.setState({ userFeedBack: event.target.value });
    
    dateChangeHandler = (event) => this.setState({ date: event.target.value });

    cancelFormHandler = (event) => {
        event.preventDefault()
        this.props.history.push('/');
    }

    postFormHandler = (e) => {
        e.preventDefault();
        this.setState({ spinner: true });
        const { name, email, date } = this.state;
        const shopForm = {
            Name: name,
            Email: email,
            datePosted: new Date(),
            posted: new Date().toDateString(),
            Price: this.props.shopPrice,
            userAge: date
        }
        axiosInstance.post("/shopping.json", shopForm)
        .then(res => {
            this.setState({ spinner: false }); 
            this.setState({ ordered: true });
            setTimeout(() => this.setState({ ordered: false }), 1500);
            setTimeout(() => this.setState({ Posted: true }), 3000);
        })
        .catch( error => this.setState({ postFormError: error }));
    }

    // back arrow for input from
    backArrowHandler = (props) => {
        this.props.history.goBack();
    }

    refreshHandler = (e) => {
        e.preventDefault();
        this.setState({ refreshSpinner: true });
        const { name, email, date } = this.state;
        const refreshShopForm = {
            Name: name,
            Email: email,
            userAge: date,
            Price: this.props.shopPrice,
            datePosted: new Date(),
            posted: new Date().toDateString(),
        }
        axiosInstance.post("/shopping.json", refreshShopForm)
        .then(res => {
            this.setState({ refreshSpinner: false }); 
            this.setState({ ordered: true });
            setTimeout(() => this.setState({ ordered: false }), 1500);
            setTimeout(() => this.setState({ Posted: true }), 3000);
            this.props.history.push("/");
        })
        .catch( error => {
            this.setState({ refreshError: error });
            setTimeout(() => this.props.history.push("/"), 5000);
        });
    }

    render () {
        const { ordered, Posted, Attractive, spinner, postFormError } = this.state;
        let Ordered = null;
        if(ordered) {
            Ordered = <div style={{textAlign: 'center', cursor: "pointer"}}>
                <AiOutlineCheckCircle style={{ color: "green", fontSize: "10em" }}/>
                <div style={{ fontFamily: "fantasy", 
                    color: "greenyellow"}}>Ordered successful.</div>
            </div>
        }

        let posted = null;
        if(Posted) {
            posted = <div style={{ 
                    textAlign: 'center', 
                    fontFamily: "fantasy", 
                    position: "fixed",
                    zIndex: "150",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    width: "100%",
                    height: "100vh",
                    color: "white",
                    top: "0",
                    cursor: "pointer"
                }} 
                    className={classes.postedCss}>
                <div>Do you find this attractive</div>
                <button className={classes.buttons} style={{margin: "2px 10px"}} onClick={this.acceptAttractiveness}>Yes </button>
                <button className={classes.buttons} style={{margin: "10px 1px"}} onClick={this.rejectAttractiveness}>No</button>
                <label className={classes.labels}>Or send us a message about your interest!</label>
                <input type='text' placeholder="Send FeedBack" onChange={this.userFeedBackHandler} />
                <button onClick={this.inputHandlerFeedBack} style={{cursor: "pointer"}}>Send FeedBack</button>
            </div>
        }
        let attr = null;
        if(Attractive) {
            attr = <div style={{
                        textAlign: "center", 
                        fontFamily: "fantasy",
                        position: "fixed",
                        zIndex: "170",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                        width: "100%",
                        height: "100vh",
                        top: "0",
                        left: "0",
                        cursor: "pointer"
                        }}>
                    <div>Thanks for giving us a feedBack</div>
                    <div>We appreciate your responses</div>
                </div>
        }

        let Spinner = null;
        if(spinner) {
            Spinner = <div style={{cursor: "pointer"}} className={classes.loader}>Loading...</div>
        }

        let RefreshSpinner = null;
        if(this.state.refreshSpinner) {
            RefreshSpinner = <div style={{textAlign: "center", marginTop: "180px", cursor: "pointer" }} >
                <div className={classes.Loader}>Loading...</div>
            </div>
        }

        let buttonCheck = <button disabled>Continue</button>
        if(this.state.name.trim().length > 2) {
            if(this.state.email.trim().length > 5) {
                buttonCheck = <button className={classes.Button} onClick={this.postFormHandler}>Continue</button>
            }
        }

        let postError =  <>
        <BiArrowBack style={{fontSize: "1.5em", position: "fixed", cursor: "pointer"}} onClick={this.backArrowHandler}/>
        {Spinner}
        {Ordered}
        {posted}
        { attr}
        <form className={classes.form}>
            <label style={{fontFamily: "fantasy", cursor: "pointer"}}>Fill out the form</label>
            <input ref={this.inputElement} className={classes.Input} type='text' onChange={this.nameChangeHandler} placeholder='Name' required/>
            <input className={classes.Input} type="email" onChange={this.emailChangeHandler} placeholder='Email' required/>
            <input className={classes.Input} type="date"  onChange={this.dateChangeHandler}/>
            <button className={classes.Button} onClick={this.cancelFormHandler}>Cancel</button>
            <input style={{cursor: "pointer"}} type="reset" />
            {buttonCheck}
            {/* <input type='checkBox' name='cars' value='benz'/> 
            <input type='checkBox' name='cars' value='camry'/> 
             
            <input type='radio' name='cars' value='goods'/>  */}
        </form>
        </>
        if(postFormError) {
            postError = <div style={{ textAlign: 'center', marginTop: '200px', cursor: "pointer" }}>
                    <RiWifiOffLine style={{ fontSize: "3.5em"}}/>
                    <p>{postFormError.message}</p>
                    <button style={{fontFamily: 'fantasy', marginTop: "50px"}} 
                    onClick={this.refreshHandler}>Refresh</button>
             </div>
        }
        // refreshError

        let refresh = null;
        if(this.state.refreshError) {
            refresh = <div style={{ textAlign: 'center', marginTop: " 200px", cursor: "pointer" }}>
                    <RiWifiOffLine style={{ fontSize: "3.5em"}}/>
                    <p>{this.state.refreshError.message}</p>
                    <p style={{fontFamily: 'fantasy'}}>we noticed your connection is bad,
                     we'll be navigating you back to the home page soon!</p>
             </div>
        };

        return (
            <React.Fragment>
               {RefreshSpinner}
               {refresh}
               {postError}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        shopPrice: state.price
    }
};

export default connect(mapStateToProps)(InputForm);