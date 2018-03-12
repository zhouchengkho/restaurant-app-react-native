import React from "react";
import {UIConstants} from "../UIConstants";
import {View} from "react-native";
import {Card, Button, FormLabel, FormInput, FormValidationMessage, Header} from "react-native-elements";
import {F_USERNAME, F_PIN, F_PASSWORD, AccountService, ERR_INVALID_CODE, ERR_INVALID_PASSWORD} from "../services/AccountService";

export default class VerifyPasswordReset extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {};
        this.state[F_USERNAME] = props.navigation.state.params[F_USERNAME];

    }

    _onPressVerification(){
        this.setState({disabled: true});
        this.setState({verificationLoading: true});
        AccountService.confirmResetPassword(this.state[F_USERNAME], this.state[F_PIN], this.state[F_PASSWORD])
            .then(response => {
                console.log(response);
                if(response.code === ERR_INVALID_CODE){
                    this.setState({disabled: false});
                    this.setState({verificationLoading: false});
                    this.setState({errorCode: response.message});
                }else if(response.code === ERR_INVALID_PASSWORD){
                    this.setState({disabled: false});
                    this.setState({verificationLoading: false});
                    this.setState({errorPassword: response.message});
                }else if(response.code === "ERR_SYSTEM_ERROR"){
                    this.setState({disabled: false});
                    this.setState({verificationLoading: false});
                    this.setState({error: response.code});
                }else{
                    this.props.navigation.navigate("SignIn", {[F_USERNAME]: this.state[F_USERNAME],
                    [F_PASSWORD]: this.state[F_PASSWORD]});
                }
            })
            .catch(err =>{
                console.log(err);
                this.setState({disabled: false});
                this.setState({verificationLoading: false});
                this.setState({error: err});
            });
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    centerComponent={{text: 'PAYENT', style: {color: '#fff'}}}
                    leftComponent={{
                        icon: 'close',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack(),
                    }}
                />

                <View style={{paddingVertical: 20}}>
                    <Card>
                        <FormLabel>Please enter Password Reset PIN for {this.state[F_USERNAME]}:</FormLabel>

                        <FormInput
                            placeholder="PIN code"
                            disabled={this.state.disabled}
                            value={this.state[F_PIN]}
                            onChangeText={(val) => {
                                this.setState({[F_PIN]: val});
                            }}
                        />
                        <FormValidationMessage>{this.state.errorCode ? this.state.errorCode : ""}</FormValidationMessage>
                        <FormInput
                            secureTextEntry
                            placeholder="New Password"
                            disabled={this.state.disabled}
                            value={this.state[F_PASSWORD]}
                            onChangeText={(val) => {
                                this.setState({[F_PASSWORD]: val})
                            }}
                        />
                        <FormValidationMessage>{this.state.errorPassword ? this.state.errorPassword : ""}</FormValidationMessage>
                        <FormValidationMessage>{this.state.error ? this.state.error : ""}</FormValidationMessage>
                        <Button
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#03A9F4"
                            disabled={this.state.disabled}
                            loading={this.state.verificationLoading}
                            onPress={() => {
                                this._onPressVerification()
                            }}
                            title="VERIFY PASSWORD RESET"
                        />

                    </Card>
                </View>
            </View>
        );

    }
}