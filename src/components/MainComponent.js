import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from './authentications/privateRoute'
import { users } from "./authentications/users";

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setConnection, addUser } from './redux/reduxActions';
import Pusher from 'pusher-js';
import React from 'react';
import { Backdrop, CircularProgress } from "@material-ui/core";

const Profile = React.lazy(() => import('./Profile/profile'));
const TrackOrder = React.lazy(() => import('./tracking/tracking'));
const Home = React.lazy(() => import('./LandingPage/Home/Home'));
const Cart = React.lazy(() => import('./cart/Cart'));
const Menu = React.lazy(() => import('./Menu/Menu'));

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
    
    wrapWithSuspence(cmp) {
        return (
            <React.Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}>
                {cmp}
            </React.Suspense>
        );
    }

    render() {
        if (this.props.userId != null) {

            if (this.props.connection === null) {
                //var pusher, channel;
                const pusher = new Pusher('153cf7f4abf2fc074dfb', {
                    authEndpoint: `${process.env.REACT_APP_BASE_API_URL}/pusher/customer/auth`,
                    cluster: 'ap2'
                });
                var myId = JSON.parse(localStorage.getItem('login')).userId;
                const channel = pusher.subscribe(`presence-channel-customer-${myId}`);
                this.props.setConnection({ pusher: pusher, channel: channel });
            }
        }
        return (
            <Switch>
                <Route exact path="/" render={(props) => this.wrapWithSuspence(<Home setOpenSignup={this.props.setOpenSignup} {...props} />)} />
                <PrivateRoute setOpenLogin={this.props.setOpenLogin} exact path="/menu/:restId" component={({ match }) => this.wrapWithSuspence(<Menu restId={match.params.restId} />)} />
                <PrivateRoute setOpenLogin={this.props.setOpenLogin} exact path="/cart" component={() => this.wrapWithSuspence(<Cart />)} />
                {/* <Route exact path="/about-us" component={AboutUs} /> */}
                <PrivateRoute setOpenLogin={this.props.setOpenLogin} exact path="/profile" component={() => this.wrapWithSuspence(<Profile />)} />
                <PrivateRoute setOpenLogin={this.props.setOpenLogin} exact path="/users" component={this.wrapWithSuspence(users)} />
                <PrivateRoute  setOpenLogin={this.props.setOpenLogin} exact path="/tracking" component={() => this.wrapWithSuspence(<TrackOrder />)} />
            </Switch>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComp));
