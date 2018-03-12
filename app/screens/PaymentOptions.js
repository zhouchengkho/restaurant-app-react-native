import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, Header, Icon} from "react-native-elements";
import {UIConstants} from "../UIConstants";

export default class PaymentOptions extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("PaymentOptions.constructor");

        this.state = {};
    }

    //==================================================================================================================
    // Internal functions
    _onPressPayBill() {
        alert("Pay bill");
    }

    //==================================================================================================================
    // Lifecycle functions
    async componentWillMount() {
        console.log("PaymentOptions.componentWillMount");
    }

    componentDidMount() {
        console.log("PaymentOptions.componentDidMount");
    }

    render() {
        console.log("PaymentOptions.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    leftComponent={{
                        icon: 'close',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{text: 'PAYMENT OPTIONS', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>

                </View>
            </View>
        );
    }

}