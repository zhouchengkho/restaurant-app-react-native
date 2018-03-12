import React from 'react';

import {createRootNavigator} from "./router";
import {AccountService} from "./services/AccountService";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        AccountService.resumeSession()//
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))//
            .catch(err => alert("An error occurred: " + err));
    }

    render() {
        const {checkedSignIn, signedIn} = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return <Layout/>;
    }

}