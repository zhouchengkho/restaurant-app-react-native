import React from 'react';
import {Config} from "../config";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const API_BASE = Config.API_BASE;

class MapServiceImpl {

    constructor() {

    }

    /**
     *
     * @param that
     * @param region
     * @param markers {Array}
     * [
     *  {
     *      "latlng": {},
     *      "title": "",
     *      "description": ""
     *  }
     * ]
     * @returns {*}
     */
    renderMapViewWithMarkers(that, region, markers) {
        return (
            <MapView
                region={region}
            >
                {markers.map(marker => (
                    <Marker
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
        );
    }
}

export const MapService = new MapServiceImpl();