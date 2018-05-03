import React from 'react';
import {Config} from "../config";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const API_BASE = Config.API_BASE;

class MockServiceImpl {

    constructor() {

    }

    getMarkers() {
        return new Promise((resolve, reject) => {
            resolve(
                [
                    {
                        title: "test",
                        description: "test",
                        coordinate: {
                            latitude: 37.78825,
                            longitude: -122.4324
                        }
                    }
                ]
            )
        })
    }
}

export const MockService = new MockServiceImpl();