import {AccountService} from "./AccountService";
import {Config} from "../config";

const API_BASE = Config.API_BASE;

class TinderServiceImpl {

    constructor() {

    }

    getRestaurants() {
        return new Promise((resolve, reject) => {
            // TODO: fetch result from lambda
            // AccountService.getSession()
            //     .then(session => {
            //         console.log("ID token: " + session.idToken.jwtToken);
            //
            //         // Fetch profile
            //         fetch(API_BASE + "/me", {
            //             headers: {Authorization: session.idToken.jwtToken}
            //         }).then(response => {
            //             if (response.status === 200) {
            //                 response.json().then(data => {
            //                     resolve(data.data);
            //                 });
            //             } else {
            //                 reject("ERR_GET_ME");
            //             }
            //         });
            //     })
            //     // Catch errors
            //     .catch(err => {
            //         console.log(err);
            //         reject(err);
            //     });
            resolve([
                {
                    "id": "i6RhqnCJ_oUfTu5LikGXUg",
                    "alias": "dun-huang-new-york-2",
                    "name": "Dun Huang",
                    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/qD2Ddn8XH7I71lAax6gp7A/o.jpg",
                    "is_closed": false,
                    "url": "https://www.yelp.com/biz/dun-huang-new-york-2?adjust_creative=maGTQTvTubtMTJft4geE9A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=maGTQTvTubtMTJft4geE9A",
                    "review_count": 13,
                    "categories": [
                        {
                            "alias": "chinese",
                            "title": "Chinese"
                        },
                        {
                            "alias": "bbq",
                            "title": "Barbeque"
                        },
                        {
                            "alias": "noodles",
                            "title": "Noodles"
                        }
                    ],
                    "rating": 4.5,
                    "coordinates": {
                        "latitude": 40.73081,
                        "longitude": -73.98568
                    },
                    "transactions": [],
                    "location": {
                        "address1": "300 E 12th St",
                        "address2": "",
                        "address3": null,
                        "city": "New York",
                        "zip_code": "10003",
                        "country": "US",
                        "state": "NY",
                        "display_address": [
                            "300 E 12th St",
                            "New York, NY 10003"
                        ]
                    },
                    "phone": "+12122543817",
                    "display_phone": "(212) 254-3817",
                    "distance": 3330.0491606980504
                },
                {
                    "id": "0CjK3esfpFcxIopebzjFxA",
                    "alias": "joes-shanghai-new-york-2",
                    "name": "Joe's Shanghai",
                    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ekUo5egd4dlE7zJyb4-Leg/o.jpg",
                    "is_closed": false,
                    "url": "https://www.yelp.com/biz/joes-shanghai-new-york-2?adjust_creative=maGTQTvTubtMTJft4geE9A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=maGTQTvTubtMTJft4geE9A",
                    "review_count": 5067,
                    "categories": [
                        {
                            "alias": "shanghainese",
                            "title": "Shanghainese"
                        },
                        {
                            "alias": "seafood",
                            "title": "Seafood"
                        },
                        {
                            "alias": "venues",
                            "title": "Venues & Event Spaces"
                        }
                    ],
                    "rating": 4,
                    "coordinates": {
                        "latitude": 40.7146691442891,
                        "longitude": -73.9977602206654
                    },
                    "transactions": [],
                    "price": "$$",
                    "location": {
                        "address1": "9 Pell St",
                        "address2": "",
                        "address3": "",
                        "city": "New York",
                        "zip_code": "10013",
                        "country": "US",
                        "state": "NY",
                        "display_address": [
                            "9 Pell St",
                            "New York, NY 10013"
                        ]
                    },
                    "phone": "+12122338888",
                    "display_phone": "(212) 233-8888",
                    "distance": 5318.068106761176
                },
                {
                    "id": "nI1UYDCYUTt23TpGxqnLKg",
                    "alias": "buddakan-new-york",
                    "name": "Buddakan",
                    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/Avw19VU35-FZLen3nl9gYw/o.jpg",
                    "is_closed": false,
                    "url": "https://www.yelp.com/biz/buddakan-new-york?adjust_creative=maGTQTvTubtMTJft4geE9A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=maGTQTvTubtMTJft4geE9A",
                    "review_count": 3384,
                    "categories": [
                        {
                            "alias": "chinese",
                            "title": "Chinese"
                        },
                        {
                            "alias": "bars",
                            "title": "Bars"
                        },
                        {
                            "alias": "asianfusion",
                            "title": "Asian Fusion"
                        }
                    ],
                    "rating": 4,
                    "coordinates": {
                        "latitude": 40.7422762672197,
                        "longitude": -74.0048000961542
                    },
                    "transactions": [
                        "pickup",
                        "delivery"
                    ],
                    "price": "$$$",
                    "location": {
                        "address1": "75 9th Ave",
                        "address2": null,
                        "address3": "",
                        "city": "New York",
                        "zip_code": "10011",
                        "country": "US",
                        "state": "NY",
                        "display_address": [
                            "75 9th Ave",
                            "New York, NY 10011"
                        ]
                    },
                    "phone": "+12129896699",
                    "display_phone": "(212) 989-6699",
                    "distance": 2981.0496048609193
                },
                {
                    "id": "xq0cX_DgxiJMXwhmEl9kUA",
                    "alias": "café-china-new-york-2",
                    "name": "Café China",
                    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/tkk29bB07xUdPFqZIlUC3g/o.jpg",
                    "is_closed": false,
                    "url": "https://www.yelp.com/biz/caf%C3%A9-china-new-york-2?adjust_creative=maGTQTvTubtMTJft4geE9A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=maGTQTvTubtMTJft4geE9A",
                    "review_count": 1048,
                    "categories": [
                        {
                            "alias": "szechuan",
                            "title": "Szechuan"
                        }
                    ],
                    "rating": 4,
                    "coordinates": {
                        "latitude": 40.7499225208569,
                        "longitude": -73.9819464127197
                    },
                    "transactions": [
                        "pickup",
                        "delivery",
                        "restaurant_reservation"
                    ],
                    "price": "$$",
                    "location": {
                        "address1": "13 E 37th St",
                        "address2": null,
                        "address3": "",
                        "city": "New York",
                        "zip_code": "10016",
                        "country": "US",
                        "state": "NY",
                        "display_address": [
                            "13 E 37th St",
                            "New York, NY 10016"
                        ]
                    },
                    "phone": "+12122132810",
                    "display_phone": "(212) 213-2810",
                    "distance": 1180.6956479004084
                },
                {
                    "id": "oowNI_aUmGEFa_VW8BFgRg",
                    "alias": "tri-dim-shanghai-new-york-2",
                    "name": "Tri Dim Shanghai",
                    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/HhoIIfosOovQoBy-2m3Djg/o.jpg",
                    "is_closed": false,
                    "url": "https://www.yelp.com/biz/tri-dim-shanghai-new-york-2?adjust_creative=maGTQTvTubtMTJft4geE9A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=maGTQTvTubtMTJft4geE9A",
                    "review_count": 150,
                    "categories": [
                        {
                            "alias": "shanghainese",
                            "title": "Shanghainese"
                        },
                        {
                            "alias": "dimsum",
                            "title": "Dim Sum"
                        },
                        {
                            "alias": "szechuan",
                            "title": "Szechuan"
                        }
                    ],
                    "rating": 4,
                    "coordinates": {
                        "latitude": 40.77395,
                        "longitude": -73.95793
                    },
                    "transactions": [
                        "pickup",
                        "delivery",
                        "restaurant_reservation"
                    ],
                    "price": "$$",
                    "location": {
                        "address1": "1378 3rd Ave",
                        "address2": "",
                        "address3": null,
                        "city": "New York",
                        "zip_code": "10075",
                        "country": "US",
                        "state": "NY",
                        "display_address": [
                            "1378 3rd Ave",
                            "New York, NY 10075"
                        ]
                    },
                    "phone": "+12125853388",
                    "display_phone": "(212) 585-3388",
                    "distance": 2311.082272703459
                }
            ])
        })
    }

    like(restaurantId) {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }

    dislike(restaurantId) {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }
}

export const TinderService = new TinderServiceImpl();