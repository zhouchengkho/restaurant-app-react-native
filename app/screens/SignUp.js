import React from "react";
import {View} from "react-native";
import {Card, Button, Header, FormInput, FormValidationMessage} from "react-native-elements";
import {AccountService, F_USERNAME, F_PASSWORD, F_FAMILY_NAME, F_GIVEN_NAME, F_U} from "../services/AccountService";
import {UIConstants} from "../UIConstants";

export default class SignUp extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);

        this.state = {};
        if (props.navigation.state.params) {
            this.state[F_USERNAME] = props.navigation.state.params[F_USERNAME];
            this.state[F_PASSWORD] = props.navigation.state.params[F_PASSWORD];
            this.state[F_U] = props.navigation.state.params[F_U];
        }
    }

    //==================================================================================================================
    // Other functions
    _onPressSignUp() {
        this.setState({disabled: true});
        this._doSignUp();
    }

    _doSignUp() {
        // firstname, lastname, username, password
        AccountService.signUp(this.state[F_U], this.state[F_GIVEN_NAME], this.state[F_FAMILY_NAME], this.state[F_USERNAME], this.state[F_PASSWORD])//
        //
            .then(res => {
                this.props.navigation.navigate("Verification", {
                    [F_USERNAME]: this.state[F_USERNAME],
                    [F_PASSWORD]: this.state[F_PASSWORD],
                    [F_U]: this.state[F_U]
                });
            }) //
            //
            .catch(err => {
                this.setState({disabled: false});
                this.setState({errors: err});
            });
    }

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("SignUp.componentWillMount");
    }

    componentDidMount() {
        console.log("SignUp.componentDidMount");
    }

    render() {
        console.log("SignUp.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    centerComponent={{text: 'PAYENT', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>
                    <Card>
                        <FormInput
                            placeholder="Given name"
                            autoCorrect={false}
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_GIVEN_NAME]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_GIVEN_NAME] : ""}</FormValidationMessage>

                        <FormInput
                            placeholder="Family name"
                            autoCorrect={false}
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_FAMILY_NAME]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_FAMILY_NAME] : ""}</FormValidationMessage>

                        <FormInput
                            placeholder="username"
                            autoCorrect={false}
                            disabled={this.state.disabled}
                            onChangeText={(val) => {
                                this.setState({[F_U]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_U] : ""}</FormValidationMessage>

                        <FormInput
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            disabled={this.state.disabled}
                            placeholder="Email address or phone number"
                            value={this.state[F_USERNAME]}
                            onChangeText={(val) => {
                                this.setState({[F_USERNAME]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_USERNAME] : ""}</FormValidationMessage>

                        <FormInput
                            secureTextEntry
                            placeholder="New password"
                            disabled={this.state.disabled}
                            value={this.state[F_PASSWORD]}
                            onChangeText={(val) => {
                                this.setState({[F_PASSWORD]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errors ? this.state.errors[F_PASSWORD] : ""}</FormValidationMessage>

                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#03A9F4"
                            disabled={this.state.disabled}
                            loading={this.state.disabled}
                            title="SIGN UP"
                            onPress={() => {
                                this._onPressSignUp()
                            }}
                        />

                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="transparent"
                            disabled={this.state.disabled}
                            textStyle={{color: "#bcbec1"}}
                            title="Sign In"
                            onPress={() => this.props.navigation.navigate("SignIn", {
                                [F_USERNAME]: this.state[F_USERNAME],
                                [F_PASSWORD]: this.state[F_PASSWORD]
                            })}
                        />
                    </Card>
                </View>
            </View>);
    }
}