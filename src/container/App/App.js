import React, { Component } from 'react';
import Fragment from '../../component/Hoc/Fragment';
import Shopping from '../Shopping/Shopping';
import InputForm from '../InputForm/InputForm';
import { Route, Switch } from 'react-router-dom';
import MyOrder from '../MyOrders/MyOrder';

class App extends Component {
    render() {
        return (
            <div style={{height: "100vh"}}>
                <Fragment>    
                    <Switch>
                        <Route path="/" exact component={Shopping} />
                        <Route path="/inputForm" component={InputForm} />
                        <Route path="/My_Order" component={MyOrder} />
                    </Switch>
                </Fragment>
            </div>
        );
    }
}

export default App;