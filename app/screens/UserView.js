import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, Card, Header, Icon, List, ListItem} from "react-native-elements";
import {StackNavigator, TabNavigator} from "react-navigation"
import {UIConstants} from "../UIConstants";
import BillList from "../components/BillList";
import {BillService} from "../services/BillService";

export default class ProviderDetail extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("UserView.constructor");

        this.state = {};

        this.state.user = props.navigation.state.params.user;
        this.state.bills = [];
        this.state.users = {};
    }

    //==================================================================================================================
    // Lifecycle functions
    async componentWillMount() {
        console.log("UserView.componentWillMount");

        // Get bills
        BillService.getAllBills((bill) => bill.patient === this.state.user)
            .then(bills => this.setState({bills: bills}));
    }

    componentDidMount() {
        console.log("UserView.componentDidMount");
    }

    render() {
        console.log("UserView.render");
        return (
            <View style={{flex: 1}}>
                <Header
                    style={{flex: 0}}
                    backgroundColor={UIConstants.BG_COLOR_1}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{text: 'USER', style: {color: '#fff'}}}
                />

                <View style={{flex: 1}}>
                    <Card>
                        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                            <Avatar style={{flex: 0, height: 50}} medium rounded title=''/>
                            <View>
                                <Text
                                    style={{fontSize: 20}}>{this.state.user.given_name} {this.state.user.family_name}</Text>
                            </View>
                        </View>
                    </Card>

                    <View style={{flex: 1, paddingTop: 20}}>
                        <BillTabNavigator
                            screenProps={{
                                bills: this.state.bills,
                                navigation: this.props.navigation
                            }}
                        />
                    </View>
                </View>


            </View>
        );
    }

}

class UnpaidBillsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Outstanding',
        tabBarIcon: ({tintColor}) => (
            <Icon name='square-o' color={tintColor} type='font-awesome'/>
        ),
    };

    constructor(props, context) {
        super(props, context);
        console.log("UnpaidBillsScreen.constructor");
        this.state = {};
    }

    render() {
        return (
            <View>
                <BillList
                    navigation={this.props.screenProps.navigation}
                    bills={this.props.screenProps.bills}
                    filter={(bill) => bill.paidAt <= 0}
                />
            </View>
        );
    }
}

class PaidBillsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Paid',
        tabBarIcon: ({tintColor}) => (
            <Icon name='check-square-o' color={tintColor} type='font-awesome'/>
        ),
    };

    constructor(props, context) {
        super(props, context);
        console.log("PaidBillsScreen.constructor");
        this.state = {};
    }

    render() {
        return (
            <BillList
                navigation={this.props.screenProps.navigation}
                bills={this.props.screenProps.bills}
                filter={(bill) => bill.paidAt > 0}
            />
        );
    }
}

const BillTabNavigator = TabNavigator({
    Outstanding: {screen: UnpaidBillsScreen},
    Paid: {screen: PaidBillsScreen}
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeBackgroundColor: UIConstants.BG_COLOR_1,
        activeTintColor: '#fff',
        style: {
            backgroundColor: UIConstants.GREY_E
        },
        labelStyle: {
            fontSize: 16
        }
    }
});