// SwipeCards.js
'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header} from "react-native-elements";
import SwipeCards from 'react-native-swipe-cards';
import {UIConstants} from "../UIConstants";
import {TinderService} from "../services/TinderService";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
}

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.noMoreCardsText}>No more cards</Text>
            </View>
        )
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        TinderService.getRestaurants().then((cards) => {
            this.setState({
                cards: cards
            })

        }).catch(err => {
            this.setState({
                cards: []
            })
        })
    }

    _renderHeader() {
        return (<Header
            backgroundColor={UIConstants.BG_COLOR_1}
            leftComponent={{
                icon: 'close',
                color: '#fff',
                onPress: () => this.props.navigation.navigate("Home")
            }}
            centerComponent={{text: 'TINDER', style: {color: '#fff'}}}
        />);
    }

    handleYup (card) {
        console.log(`Yup for ${card.text}`)
    }
    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    }
    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
    }
    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
            <View style={{flex: 1}}>
                {this._renderHeader()}
                <SwipeCards
                    cards={this.state.cards}
                    renderCard={(cardData) => <Card {...cardData} />}
                    renderNoMoreCards={() => <NoMoreCards />}

                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleMaybe={this.handleMaybe}
                    hasMaybeAction
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    noMoreCardsText: {
        fontSize: 22,
    }
})