import {AccountService} from "./AccountService";
import {Config} from "../config";

const API_BASE = Config.API_BASE;

class TinderServiceImpl {

    constructor() {

    }

    getRestaurants() {
        return new Promise((resolve, reject) => {
            // TODO: fetch result from lambda
            AccountService.getSession()
                .then(session => {
                    console.log("ID token: " + session.idToken.jwtToken);
                    console.log(session);
                    fetch(API_BASE + "/recommend",
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                user_id: session.idToken.payload["cognito:username"]
                            }),
                            headers: {}
                        })
                        .then(response => {
                            response.json().then(data => {
                                console.log(data);
                                resolve(data.data);
                            })
                        }).catch(err => {
                        resolve([])
                    })
                })
                // Catch errors
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }

    sendLike(restaurantId, like) {
        return new Promise((resolve, reject) => {
            AccountService.getSession().then(session => {
                fetch(API_BASE + "/preference",
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: session.idToken.payload["cognito:username"],
                            restaurant_id: restaurantId,
                            like: like
                        }),
                        headers: {}
                    })
                    .then(response => {
                        console.log(response);
                        resolve({})
                    }).catch(err => {
                        resolve({})
                })
            })
        })
    }

    like(restaurantId) {
        return this.sendLike(restaurantId, 1);
    }

    dislike(restaurantId) {
        return this.sendLike(restaurantId, 0);
    }
}

export const TinderService = new TinderServiceImpl();