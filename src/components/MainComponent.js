import Menu from './Menu/Menu';
import Cart from './cart/Cart';
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from './authentications/privateRoute'
import { users } from "./authentications/users";
import AboutUs from './About Us/aboutus';
import Profile from './Profile/profile';
import TrackOrder from './tracking/tracking';
import Home from './LandingPage/Home/Home';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setConnection, addUser } from './redux/reduxActions';
import Pusher from 'pusher-js';
import React from 'react';
import axios from 'axios';
var count = 0;
const mapDispatchToProps = (dispatch) => ({
    setConnection: (data) => dispatch(setConnection(data)),
    addUser: (id) => dispatch(addUser(id))
});

const mapStateToProps = state => {
    return {
        connection: state.connection.connection,
        userId: state.auth.userId
    }
}
class MainComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          

        }
    }
    componentDidMount() {

        if (localStorage.getItem('login') != null) {
            this.props.addUser(JSON.parse(localStorage.getItem('login')).userId);
        }


    }
    
    
    render() {



        if (this.props.userId != null) {

            if (this.props.connection === null) {
                count++;
                //var pusher, channel;
                const pusher = new Pusher('153cf7f4abf2fc074dfb', {
                    authEndpoint: `https://majorproject-server.onrender.com/pusher/customer/auth`,
                    cluster: 'ap2'
                });
                var myId = JSON.parse(localStorage.getItem('login')).userId;
                const channel = pusher.subscribe(`presence-channel-customer-${myId}`);

                this.props.setConnection({ pusher: pusher, channel: channel });

                

                
            }
        }
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/menu/:restId" component={({ match }) => <Menu restId={match.params.restId} />} />
                <PrivateRoute exact path="/cart" component={() => <Cart />} />
                <Route exact path="/about-us" component={AboutUs} />
                <PrivateRoute exact path="/profile" component={() => <Profile />} />
                <PrivateRoute exact path="/users" component={users} />
                <PrivateRoute exact path="/tracking" component={() => <TrackOrder />} />
            </Switch>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComp));
