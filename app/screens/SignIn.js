import React, {Component} from 'react';
import {View} from "react-native";
import {Card, Button, FormInput, FormValidationMessage, Header} from "react-native-elements";
import {
    AccountService, F_USERNAME, F_PASSWORD, F_U, AWS_USER_NOT_CONFIRMED, F_PIN,
    ERR_USER_NOT_CONFIRMED
} from "../services/AccountService";
import {UIConstants} from "../UIConstants";

export default class SignIn extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("SignIn.constructor");

        this.state = {};
        this.state.disabled = false;
        if (props.navigation.state.params) {
            this.state[F_USERNAME] = props.navigation.state.params[F_USERNAME];
            this.state[F_PASSWORD] = props.navigation.state.params[F_PASSWORD];
            this.state[F_U] = props.navigation.state.params[F_U];
        }
    }

    //==================================================================================================================
    // Other functions
    _onPressSignIn() {
        this.setState({disabled: true});
        this._doSignIn();
    }

    _doSignIn() {
        // sign in
        AccountService.signIn(this.state[F_USERNAME], this.state[F_PASSWORD])//
        // Success - we only get here if user successfully logged in
            .then(res => this.props.navigation.navigate("SignedIn"))
            // Errors
            .catch(errors => {
                // if user not verified, let's go to verification
                if (errors[F_PIN] === ERR_USER_NOT_CONFIRMED) {
                    this.props.navigation.navigate("Verification", {
                        [F_USERNAME]: this.state[F_USERNAME],
                        [F_PASSWORD]: this.state[F_PASSWORD],
                        [F_U]: this.state[F_U]
                    });
                }
                // if other error assume it's input error
                else {
                    this.setState({disabled: false});
                    this.setState({errors: errors});
                }
            });
    }

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("SignIn.componentWillMount");
    }

    componentDidMount() {
        console.log("SignIn.componentDidMount");
    }

    render() {
        console.log("SignIn.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    centerComponent={{text: 'RESTAURANT', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>
                    <Card>
                        <FormInput
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Email address or username"
                            value={this.state[F_U]}
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_USERNAME]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_USERNAME] : ""}</FormValidationMessage>

                        <FormInput
                            secureTextEntry
                            placeholder="Password"
                            value={this.state[F_PASSWORD]}
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_PASSWORD]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_PASSWORD] : ""}</FormValidationMessage>
                        <Button
                            buttonStyle={{marginTop: 10}}
                            backgroundColor="transparent"
                            textStyle={{color: "#bcbec1"}}
                            title="Forgot Password"
                            onPress={() => this.props.navigation.navigate("ForgotPassword")}
                        />
                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#03A9F4"
                            title="SIGN IN"
                            disabled={this.state.disabled}
                            loading={this.state.disabled}
                            onPress={() => {
                                this._onPressSignIn()
                            }}
                        />

                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="transparent"
                            disabled={this.state.disabled}
                            textStyle={{color: "#bcbec1"}}
                            title="Sign Up"
                            onPress={() => this.props.navigation.navigate("SignUp", {
                                //[F_USERNAME]: this.state[F_USERNAME],
                                //[F_PASSWORD]: this.state[F_PASSWORD],
                                //[F_U]: this.state[F_U]
                            })}
                        />
                    </Card>
                </View>
            </View>
        );

    }
}