import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Avatar, Button, Card, Header, Icon} from "react-native-elements";
import {UIConstants} from "../UIConstants";
import {PaymentMethodService} from "../services/PaymentMethodService";

export default class BillDetail extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("BillDetail.constructor");

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
        console.log("BillDetail.componentWillMount");

        let prefMethod = await PaymentMethodService.asyncGetPreferredPaymentMethod();
        this.setState({preferredPaymentMethod: prefMethod});
    }

    componentDidMount() {
        console.log("BillDetail.componentDidMount");
    }

    render() {
        console.log("BillDetail.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.BG_COLOR_1}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{text: 'BILL DETAIL', style: {color: '#fff'}}}
                />

                <View style={{paddingVertical: 20}}>

                    <Card containerStyle={{paddingRight: 0}}>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate("ProviderDetail", {provider: this.state.bill.provider})}>
                            <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                                <Avatar style={{flex: 0, height: 50}} medium rounded title=''/>
                                <View
                                    style={{flex: 1, marginLeft: 10}}>
                                    <Text style={{fontSize: 20}}>{this.state.bill.provider.name}</Text>
                                    <Text>{this.state.bill.provider.addressLine1}, {this.state.bill.provider.addressLine2}</Text>
                                    <Text>{this.state.bill.provider.city}</Text>
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Icon name='chevron-right' color={UIConstants.GREY_A} size={40}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Card>

                    <Card>
                        {
                            !this.state.bill.paidAt ||
                            (<View style={{backgroundColor: UIConstants.GREY_C, padding: 10, marginBottom: 20}}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>Paid {new Date(this.state.bill.paidAt).toLocaleDateString()} by {this.state.bill.paidBy.given_name}</Text>
                            </View>)
                        }

                        <Text style={{fontWeight: 'bold', marginTop: 5}}>Bill issued</Text>
                        <Text>{new Date(this.state.bill.issuedAt).toLocaleDateString()}</Text>

                        <Text style={{fontWeight: 'bold', marginTop: 10}}>Service provided</Text>
                        <Text>{new Date(this.state.bill.serviceProvidedAt).toLocaleDateString()}</Text>

                        <Text style={{fontWeight: 'bold', marginTop: 10}}>Patient</Text>
                        <Text>{this.state.bill.patient.given_name} {this.state.bill.patient.family_name}</Text>

                        <Text style={{fontWeight: 'bold', marginTop: 10}}>Bill type</Text>
                        <Text>{this.state.bill.type}</Text>

                        <Text style={{textAlign: 'center', fontSize: 28, marginTop: 20}}>
                            {this.state.bill.amount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: this.state.bill.currency
                            })}
                        </Text>


                        {
                            !this.state.bill.paidAt &&
                            (<View>

                                <Button
                                    buttonStyle={{
                                        marginTop: 20,
                                        borderColor: UIConstants.GREY_A,
                                        borderWidth: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}
                                    backgroundColor={UIConstants.GREY_E}
                                    color={UIConstants.GREY_A}
                                    title={this.state.preferredPaymentMethod && this.state.preferredPaymentMethod.last4digits}
                                    disabled={!this.state.preferredPaymentMethod}
                                    icon={{name: 'cc-visa', type: 'font-awesome', color: UIConstants.GREY_A}}
                                    onPress={() => this.props.navigation.navigate("PaymentOptions")}
                                />


                                <Button
                                    buttonStyle={{marginTop: 20}}
                                    backgroundColor={UIConstants.BG_COLOR_1}
                                    title="Proceed to payment"
                                    disabled={this.state.disabled}
                                    loading={this.state.disabled}
                                    iconRight={{name: 'lock', type: 'font-awesome'}}
                                    onPress={() => this.props.navigation.navigate("PayBill", {bill: this.state.bill})}/>

                            </View>)
                        }

                    </Card>

                </View>
            </View>
        );
    }

}