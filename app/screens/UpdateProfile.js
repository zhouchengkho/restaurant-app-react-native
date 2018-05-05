import React from "react";
import {View} from "react-native";
import {Card, Button, Header, FormInput, FormValidationMessage} from "react-native-elements";
import {UIConstants} from "../UIConstants";
import {StackNavigator, TabNavigator} from "react-navigation";
import {AccountService} from "../services/AccountService";
import {UserProfileService} from "../services/UserProfileService";
import {normalize} from "react-native-elements/src/index";

export default class UpdateProfile extends React.Component {

    constructor(props, context) {
        super(props, context);
        console.log("UpdateProfile.constructor");

        this.state = {};

        this.state.title = props.navigation.state.params.title;
        this.state.name = props.navigation.state.params.name;
        this.state.type = props.navigation.state.params.type;
        //this.state.title = props.navigation.state.params.title;

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
                color: '#fff',
                onPress: () => this.props.navigation.goBack(),
            }}
            centerComponent={{text: this.state.title, style: {color: '#fff'}}}
        />);
    }

    _update(){
        let params;
        if(this.state.type === "given_name"){
            params = {given_name: this.state.name, family_name: "Thomas"};
        }else if(this.state.type === "family_name"){
            params = {given_name: "Bob", family_name: this.state.name};
        }
        UserProfileService._updateUserProfile(params)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        UserProfileService.getMe()
            .then(profile => this.props.navigation.navigate("Profile", {profile: profile}))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View>
                {this._renderHeader()}
                <View style={{paddingVertical:20}}>
                    <Card>
                        <FormInput
                            style={{fontSize: normalize(14), color: UIConstants.BLACK}}
                            onChangeText = {name => this.setState({name})}
                            value={this.state.name}
                        />
                    </Card>
                </View>
                <Button
                    buttonStyle={{marginTop: 20}}
                    backgroundColor="blue"
                    textStyle={{color: "white"}}
                    title="Update"
                    onPress={() => {
                        this._update()
                    }}
                />
            </View>
        );
    }
}