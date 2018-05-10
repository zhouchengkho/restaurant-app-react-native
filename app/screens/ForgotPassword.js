import React from "react";
import {View} from "react-native";
import {Card, Button, Header, FormInput, FormValidationMessage} from "react-native-elements";
import {UIConstants} from "../UIConstants";
import {AccountService, F_PASSWORD, F_USERNAME, ERR_USER_NOT_FOUND, ERR_INVALID_USERNAME} from "../services/AccountService";
import {normalize} from "react-native-elements/src/index";

export default class ForgotPassword extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    componentWillMount(){

    }
    componentDidMount(){

    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.WHITE}
            leftComponent={{
                icon: 'close',
                color: UIConstants.TINDER_RED,
                onPress: () => this.props.navigation.goBack(),
            }}
            centerComponent={{text: "Forgotten Password", style: {color: UIConstants.TINDER_RED}}}
        />);
    }

    _forgotPassword(){
        this.setState({disabled: true});
        AccountService.forgotPassword(this.state[F_USERNAME])
            .then(res => {
                console.log(res);
                if(res.code === ERR_USER_NOT_FOUND){
                    this.setState({disabled: false});
                    this.setState({error: res.message});
                }else if(res.code === ERR_INVALID_USERNAME){
                    this.setState({disabled: false});
                    this.setState({error: res.code});
                }else {
                    this.props.navigation.navigate("VerifyPasswordReset", {[F_USERNAME]: this.state[F_USERNAME]});
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({disabled: false});
                this.setState({error: err});
            });
    }

    render(){
        return(
            <View>
                {this._renderHeader()}
                <Card>
                    <FormInput
                        placeholder="Email address"
                        style={{fontSize: normalize(14), color: UIConstants.BLACK}}
                        onChangeText = {val => this.setState({[F_USERNAME]: val})}
                        value={this.state[F_USERNAME]}
                        autoCapitalize="none"
                        disabled={this.state.disabled}
                    />
                    <FormValidationMessage>{this.state.error ? this.state.error : ""}</FormValidationMessage>
                </Card>
                <Button
                    buttonStyle={{marginTop: 20}}
                    backgroundColor={UIConstants.BLUE_1}
                    disabled={this.state.disabled}
                    loading={this.state.disabled}
                    textStyle={{color: "white"}}
                    title="Reset"
                    onPress={() => {
                        this._forgotPassword();
                    }}
                />
            </View>
        );
    }

}