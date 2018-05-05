import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card, Divider, Header, List, ListItem} from "react-native-elements";
import {UIConstants} from "../UIConstants";

export default class ProviderDetail extends React.Component {

    //==================================================================================================================
    // Constructor
    constructor(props, context) {
        super(props, context);
        console.log("ProviderDetail.constructor");

        this.state = {};

        this.state.provider = props.navigation.state.params.provider;
    }

    //==================================================================================================================
    // Lifecycle functions
    async componentWillMount() {
        console.log("ProviderDetail.componentWillMount");
    }

    componentDidMount() {
        console.log("ProviderDetail.componentDidMount");
    }

    render() {
        console.log("ProviderDetail.render");
        return (
            <View>
                <Header
                    backgroundColor={UIConstants.WHITE}
                    leftComponent={{
                        icon: 'chevron-left',
                        color: '#fff',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{text: 'PROVIDER DETAIL', style: {color: '#fff'}}}
                />

                <View>
                    <Card title={this.state.provider.name}>

                        <Text>{this.state.provider.addressLine1}, {this.state.provider.addressLine2}</Text>
                        <Text>{this.state.provider.city}</Text>
                        <Text>{this.state.provider.state} {this.state.provider.postcode}</Text>
                        <Text>{this.state.provider.country}</Text>

                        <Divider style={{ backgroundColor: UIConstants.GREY_E, marginVertical: 10 }} />

                        <Text>{this.state.provider.phone}</Text>

                        <Text>{this.state.provider.email}</Text>

                        <Text>{this.state.provider.website}</Text>

                        <Divider style={{ backgroundColor: UIConstants.GREY_E, marginVertical: 10 }} />

                        <Button
                            style={{marginTop:10}}
                            backgroundColor={UIConstants.WHITE}
                            icon={{name:'phone', type:'font-awesome'}}
                            title='Call'
                        />

                        <Button
                            style={{marginTop:10}}
                            backgroundColor={UIConstants.WHITE}
                            icon={{name:'envelope', type:'font-awesome'}}
                            title='Email'
                        />

                        <Button
                            style={{marginTop:10}}
                            backgroundColor={UIConstants.WHITE}
                            icon={{name:'globe', type:'font-awesome'}}
                            title='Website'
                        />
                    </Card>


                </View>
            </View>
        );
    }

}