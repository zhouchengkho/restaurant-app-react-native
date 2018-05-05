import React from "react";
import {View} from "react-native";
import {Card, Button, FormLabel, FormInput, FormValidationMessage, Header} from "react-native-elements";
import {AccountService, F_PIN, F_USERNAME, F_PASSWORD, F_U} from "../services/AccountService";
import {UIConstants} from "../UIConstants";

export default class Verification extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.state.disabled = false;
        this.state.resendLoading = false;
        this.state.verificationLoading = false;
        this.state[F_USERNAME] = props.navigation.state.params[F_USERNAME];
        this.state[F_PASSWORD] = props.navigation.state.params[F_PASSWORD];
        this.state[F_U] = props.navigation.state.params[F_U];
    }

    //==================================================================================================================
    // Functions
    _onPressVerification() {
        this.setState({disabled: true});
        this.setState({verificationLoading: true});
        this._doVerification();
    }

    _doVerification() {
        AccountService.confirmRegistration(this.state[F_U], this.state[F_PIN])
        //
            .then(res => {
                alert("Verification successful");
                this.props.navigation.navigate("SignIn", {
                    [F_USERNAME]: this.state[F_USERNAME],
                    [F_PASSWORD]: this.state[F_PASSWORD],
                    [F_U]: this.state[F_U]
                });
            })
            //
            .catch(err => {
                this.setState({disabled: false});
                this.setState({verificationLoading: false});
                this.setState({errors: err});
            });
    }

    _onPressResend() {
        this.setState({disabled: true});
        this.setState({resendLoading: true});
        this._doResend();
    }

    _doResend() {
        AccountService.resendConfirmationCode(this.state[F_USERNAME])
        //
            .then(res => {
                this.setState({disabled: false});
                this.setState({resendLoading: false});
                alert("Verification re-sent to " + this.state[F_USERNAME]);
            })
            //
            .catch(err => {
                this.setState({disabled: false});
                this.setState({resendLoading: false});
                alert("Error: " + JSON.stringify(err));
            });
    }

//==================================================================================================================
// Lifecycle functions
    render() {
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.WHITE}
                    centerComponent={{text: 'RESTAURANT', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>
                    <Card>
                        <FormLabel>Please enter PIN for {this.state[F_USERNAME]}:</FormLabel>

                        <FormInput
                            placeholder="PIN code"
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_PIN]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_PIN] : ""}</FormValidationMessage>

                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#03A9F4"
                            disabled={this.state.disabled}
                            loading={this.state.verificationLoading}
                            onPress={() => {
                                this._onPressVerification()
                            }}
                            title="VERIFY CODE"
                        />

                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="transparent"
                            disabled={this.state.disabled}
                            loading={this.state.resendLoading}
                            onPress={() => {
                                this._onPressResend()
                            }}
                            textStyle={{color: "#bcbec1"}}
                            title="Resend PIN"
                        />

                    </Card>
                </View>
            </View>
        );

    }
}