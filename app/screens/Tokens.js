import React from "react";
import {ActivityIndicator, View} from "react-native";
import {Header, Card, Text, Button, List, ListItem, FormLabel} from "react-native-elements";
import {AccountService} from "../services/AccountService";
import {UIConstants} from "../UIConstants";
import jwt_decode from "jwt-decode";

export default class Tokens extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: "Welcome"
        }
    };

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("Tokens.constructor");
        this.state = {};
    }

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("Tokens.componentWillMount");

        AccountService.getSession()
        // Set state
            .then(session => {
                this.setState({session: session})
            })
            // Catch errors
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Tokens.componentDidMount");
    }

    render() {
        console.log("Tokens.render");
        return this.state.session ? this._renderLoaded() : this._renderLoading();
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.BG_COLOR_1}
            leftComponent={{
                icon: 'close',
                color: '#fff',
                onPress: () => this.props.navigation.goBack()
            }}
            centerComponent={{text: 'TOKENS', style: {color: '#fff'}}}
        />);
    }

    _renderLoading() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                { this._renderHeader() }

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={UIConstants.BG_COLOR_1}/>
                </View>
            </View>
        );
    }

    _renderLoaded() {
        return (
            <View>
                {this._renderHeader()}

                <View style={{paddingVertical: 20}}>
                    {!this.state.session ?
                        <Card title="AWS Cognito ID Token">
                            <Text>Loading...</Text>
                        </Card>
                        :
                        <Card title="AWS Cognito ID Token">
                            <Text>Subscriber:</Text>
                            <Text>{this.state.session.idToken.payload.sub}</Text>
                            <Text>Issued at:</Text>
                            <Text>{new Date(this.state.session.idToken.payload.iat * 1000).toString()}</Text>
                            <Text>Expires:</Text>
                            <Text>{new Date(this.state.session.idToken.payload.exp * 1000).toString()}</Text>
                            <Text>Time to expiry:</Text>
                            <Text>{Math.floor(this.state.session.idToken.payload.exp - (Date.now() / 1000))} seconds</Text>
                        </Card>
                    }

                    {!this.state.session ?
                        <Card title="AWS Cognito Access Token">
                            <Text>Loading...</Text>
                        </Card>
                        :
                        < Card title="AWS Cognito Access Token">
                            <Text>Subscriber:</Text>
                            <Text>{this.state.session.accessToken.payload.sub}</Text>
                            <Text>Scope:</Text>
                            <Text>{this.state.session.accessToken.payload.scope}</Text>
                            <Text>Issued at:</Text>
                            <Text>{new Date(this.state.session.accessToken.payload.iat * 1000).toString()}</Text>
                            <Text>Expires:</Text>
                            <Text>{new Date(this.state.session.accessToken.payload.exp * 1000).toString()}</Text>
                            <Text>Time to expiry:</Text>
                            <Text>{Math.floor(this.state.session.accessToken.payload.exp - (Date.now() / 1000))} seconds</Text>
                        </Card>
                    }
                </View>
            </View>
        );
    }

}
