import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Header, List, ListItem} from "react-native-elements";
import {UIConstants} from "../UIConstants";

export default class BillList extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("BillList.constructor");

        this.state = {};
        this.state.bills = [];

        console.log(JSON.stringify(this.props));
    }

    //==================================================================================================================
    // Lifecycle functions
    componentWillMount() {
        console.log("BillList.componentWillMount");
    }

    componentDidMount() {
        console.log("BillList.componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        console.log("BillList.render");
        return (
            <ScrollView>
                <List containerStyle={{marginTop: 0, marginBottom: 20}}>
                    {
                        this.props.bills &&
                        this.props.bills.map((bill, i) => (
                            (!this.props.filter || this.props.filter(bill)) &&
                            <ListItem
                                key={i}
                                title={bill.provider ? bill.provider.name : "Unknown"}
                                subtitle={bill.patient ? bill.patient.given_name : "Unknown"}
                                rightTitle={bill.amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: bill.currency
                                })}
                                rightIcon={{name: 'chevron-right', color: UIConstants.GREY_A}}
                                rightTitleStyle={{color: '#000000', fontSize: 18}}
                                onPress={() => this.props.navigation.navigate("BillDetail", {bill: bill})}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }

}