import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, Header, Icon} from "react-native-elements";
import {UIConstants} from "../UIConstants";

export default class PayBill extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("PayBill.constructor");

        this.state = {};

        this.state.bill = props.navigation.state.params.bill;

    }

    //==================================================================================================================
    // Internal functions
    _onPressPayBill() {
        alert("Pay bill");
    }

    //==================================================================================================================
    // Lifecycle functions
    async componentWillMount() {
        console.log("PayBill.componentWillMount");
    }

    componentDidMount() {
        console.log("PayBill.componentDidMount");
    }

    render() {
        console.log("PayBill.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{text: 'PAY BILL', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>

                </View>
            </View>
        );
    }

}