import {AsyncStorage} from "react-native";
import validator from "validator";
import jwt_decode from "jwt-decode";

import {BillService} from "./BillService";
// AWS
import {
    AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool
} from "amazon-cognito-identity-js";


//======================================================================================================================
// Constants

const AWS_COGNITO_SETTINGS = {
    UserPoolId: '',
    ClientId: '',
    IdentityPoolId: ''
};

const API_BASE = '';

// Store keys
export const SK_ID_TOKEN = "id_token";
export const SK_ACCESS_TOKEN = "access_token";
export const SK_REFRESH_TOKEN = "refresh_token";

export const AWS_USERNAME_EXISTS = "UsernameExistsException";
export const AWS_USER_NOT_FOUND = "UserNotFoundException";
export const AWS_USER_NOT_CONFIRMED = "UserNotConfirmedException";
export const AWS_INVALID_PASSWORD = "InvalidPasswordException";
export const AWS_INVALID_PARAMETER_EXCEPTION = "InvalidParameterException";
export const AWS_CODE_MISMATCH_EXCEPTION = "CodeMismatchException";
export const AWS_NOT_AUTHORIZED_EXCEPTION = "NotAuthorizedException";
export const AWS_MISSING_REQUIRED_PARAMETER = "MissingRequiredParameter";

export const ERR_INVALID_USERNAME = "ERR_INVALID_USERNAME";
export const ERR_INVALID_PASSWORD = "ERR_INVALID_PASSWORD";
export const ERR_INVALID_CODE = "ERR_INVALID_CODE";
export const ERR_NO_USERNAME = "ERR_NO_USERNAME";
export const ERR_NO_PASSWORD = "ERR_NO_PASSWORD";
export const ERR_USERNAME_ALREADY_EXISTS = "ERR_USERNAME_ALREADY_EXISTS";
export const ERR_USER_NOT_FOUND = "ERR_USER_NOT_FOUND";
export const ERR_USER_NOT_CONFIRMED = "ERR_USER_NOT_CONFIRMED";
export const ERR_CODE_MISMATCH = "ERR_CODE_MISMATCH";
export const ERR_NOT_AUTHORIZED = "ERR_NOT_AUTHORIZED";

export const F_USERNAME = "username";
export const F_PASSWORD = "password";
export const F_GIVEN_NAME = "given_name";
export const F_FAMILY_NAME = "family_name";
export const F_PIN = "pin";


//======================================================================================================================
// Validation
const _VALIDATE_EMAIL = (email) => {
    return email && validator.isEmail(email) ? null : ERR_INVALID_USERNAME;
};

const _VALIDATE_PASSWORD = (password) => {
    return password && validator.isLength(password, 8) ? null : ERR_INVALID_PASSWORD;
}

const VALIDATE_NEW_ACCOUNT_DICT = (given_name, family_name, username, password) => {
    let errors = {};
    let usernameError = _VALIDATE_EMAIL(username);
    if (usernameError) {
        errors[F_USERNAME] = usernameError;
    }
    let passwordError = _VALIDATE_PASSWORD(password);
    if (passwordError) {
        errors[F_PASSWORD] = passwordError;
    }

    return Object.keys(errors).length > 0 ? errors : null;
};

const VALIDATE_LOGIN = (username, password) => {
    let errors = {};

    let usernameError = _VALIDATE_EMAIL(username);
    if (usernameError) {
        errors[F_USERNAME] = usernameError;
    }
    let passwordError = _VALIDATE_PASSWORD(password);
    if (passwordError) {
        errors[F_PASSWORD] = passwordError;
    }

    return Object.keys(errors).length > 0 ? errors : null;
};

//======================================================================================================================
// Class

class AccountServiceImpl {

    constructor() {
        // this._userPool = new CognitoUserPool(AWS_COGNITO_SETTINGS);
        this._userPool = {};
        this._session = {
            registered: false,
            confirmed: false,
            user: null
        };
    }

    getSession() {
        return new Promise((resolve, reject) => {
            console.log("AccountService.getSession");

            // this._userPool.getCurrentUser().getSession((err, session) => {
            //     if (err) {
            //         reject(err);
            //         return;
            //     }
            //
            //     resolve(session);
            // });
            resolve({
                idToken: {
                    jwtToken: ''
                }
            })
        });
    }

    getUserAttributes() {
        return new Promise((resolve, reject) => {
            console.log("AccountService.getUserAttributes");

            // let cognitoUser = this._userPool.getCurrentUser();
            //
            // cognitoUser.getSession(function (err, session) {
            //     if (err) {
            //         console.log(err);
            //         reject(err);
            //     } else {
            //         cognitoUser.getUserAttributes((err, result) => {
            //             if (err) {
            //                 console.log(err);
            //                 reject(err);
            //             } else {
            //                 let resObj = {};
            //                 for (let i = 0; i < result.length; i++) {
            //                     resObj[result[i].getName()] = result[i].getValue();
            //                     //console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
            //                 }
            //                 resolve(resObj);
            //             }
            //         });
            //     }
            // });
            resolve({
                family_name: 'foo',
                given_name: 'bar',
                email: 'bar.foo@gmail.com'
            })
        });
    }

    resumeSession() {
        return new Promise((resolve, reject) => {
            console.log("AccountService.resumeSession");

            // this._userPool.storage.sync((err, result) => {
            //     if (err) {
            //         reject(err);
            //         return;
            //     }
            //
            //     let cognitoUser = this._userPool.getCurrentUser();
            //
            //     if (cognitoUser == null) {
            //         this.signOut().then(res => resolve(res)).catch(err => reject(err));
            //         return;
            //     }
            //
            //     this._getSession(cognitoUser).then(session => resolve(session)).catch(err => reject(err));
            // });
            resolve({

            })
        });
    }

    signUp(given_name, family_name, username, password) {
        return new Promise((resolve, reject) => {
            // // Validate
            // let errors = VALIDATE_NEW_ACCOUNT_DICT(given_name, family_name, username, password);
            //
            // // if not created, reject
            // if (errors) {
            //     reject(errors);
            //     return;
            // }
            //
            // // Connect
            // const attributeList = [
            //     new CognitoUserAttribute({Name: 'given_name', Value: given_name}),
            //     new CognitoUserAttribute({Name: 'family_name', Value: family_name})
            // ];
            //
            // console.log("AccountService.asyncSignUp - calling service...");
            //
            // this._userPool.signUp(username, password, attributeList, null, (err, result) => {
            //         if (err) {
            //             if (err.code === AWS_USERNAME_EXISTS) {
            //                 reject({[F_USERNAME]: ERR_USERNAME_ALREADY_EXISTS});
            //             } else if (err.code === AWS_INVALID_PASSWORD) {
            //                 reject({[F_PASSWORD]: ERR_INVALID_PASSWORD});
            //             } else {
            //                 alert(err.code + ": " + err.message);
            //                 reject(err);
            //             }
            //             return;
            //         }
            //
            //
            //         this._session.registered = true;
            //         // Move to validation screen
            //         resolve(result);
            //     }
            // );
            resolve({

            });
        });
    }

    signIn(username, password) {
        return new Promise((resolve, reject) => {
            // console.log("AccountService.signIn");
            //
            // // Validate
            // let errors = VALIDATE_LOGIN(username, password);
            //
            // if (errors) {
            //     reject(errors);
            //     return;
            // }
            //
            // // No errors - proceed
            // const authDetails = new AuthenticationDetails({
            //     Username: username,
            //     Password: password
            // });
            //
            // const cognitoUser = new CognitoUser({
            //     Username: username,
            //     Pool: this._userPool
            // });
            //
            //
            // cognitoUser.authenticateUser(authDetails, {
            //     onSuccess: (result) => {
            //         console.log("AccountService.signIn authenticated user");
            //
            //         // Update session
            //         this._session.user = cognitoUser;
            //         this._getSession(cognitoUser)//
            //             .then(session => resolve(session))//
            //             .catch(err => reject(err));
            //     },
            //     onFailure: (err) => {
            //         if (err.code === AWS_USER_NOT_FOUND) {
            //             reject({[F_USERNAME]: ERR_USER_NOT_FOUND});
            //         } else if (err.code === AWS_USER_NOT_CONFIRMED) {
            //             reject({[F_PIN]: ERR_USER_NOT_CONFIRMED});
            //         } else if (err.code === AWS_NOT_AUTHORIZED_EXCEPTION) {
            //             reject({[F_PASSWORD]: ERR_NOT_AUTHORIZED});
            //         } else {
            //             alert(err.code + ": " + err.message);
            //             reject(err);
            //         }
            //     }
            // });
            resolve({});
        });
    }

    confirmRegistration(username, code) {
        return new Promise((resolve, reject) => {
            // console.log("AccountService.resendConfirmationCode");
            //
            // // Authenticate
            // const cognitoUser = new CognitoUser({
            //     Username: username,
            //     Pool: this._userPool
            // });
            //
            // // Confirm registration
            // cognitoUser.confirmRegistration(code, true, (err, result) => {
            //     if (err) {
            //         if (err.code === AWS_CODE_MISMATCH_EXCEPTION) {
            //             reject({[F_PIN]: ERR_CODE_MISMATCH});
            //         } else if (err.code === AWS_INVALID_PARAMETER_EXCEPTION) {
            //             reject({[F_PIN]: ERR_INVALID_CODE});
            //         } else if (err.code === AWS_MISSING_REQUIRED_PARAMETER) {
            //             reject({[F_PIN]: ERR_INVALID_CODE});
            //         } else {
            //             alert(err.code + ": " + err.message);
            //             reject(err);
            //         }
            //         return;
            //     }
            //
            //     // Update session
            //     this._session.confirmed = true;
            //     // Callback
            //     resolve(result);
            //});
            resolve({});
        });
    };

    resendConfirmationCode(username) {
        return new Promise((resolve, reject) => {
            // console.log("AccountService.resendConfirmationCode");
            //
            // // Authenticate
            // const cognitoUser = new CognitoUser({
            //     Username: username,
            //     Pool: this._userPool
            // });
            //
            // // Confirm registration
            // cognitoUser.resendConfirmationCode((err, res) => {
            //     err ? reject(err) : resolve(res);
            // });
            resolve({});
        });
    };

    forgotPassword(username){
        return new Promise((resolve, reject) => {
            fetch(API_BASE + "/auth/forgotPassword", {
                method: "POST",
                body: JSON.stringify({"username": username}),
                headers: {"Content-Type": "application/json"},
            }).then(response => {
                resolve(response.json());
            }).catch(err=> {
                reject(err);
            });
        });
    }

    confirmResetPassword(username, pin, newPassword){
        return new Promise((resolve, reject) => {
           fetch(API_BASE + "/auth/confirmPassword", {
               method: "POST",
               body: JSON.stringify({"username": username, "code": pin, "password": newPassword}),
               headers: {"Content-Type": "application/json"},
           }).then(response => {
               resolve(response.json());
           }).catch(err=> {
               reject(err);
           });
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            // console.log("AccountService.signOut");
            //
            // let cognitoUser = this._userPool.getCurrentUser();
            //
            // this._session.confirmed = false;
            // this._session.registered = false;
            // this._session.user = null;
            //
            // if (cognitoUser != null) cognitoUser.signOut();
            //
            // // Reset other services
            // BillService.reset();

            resolve();
        });
    }

    //==================================================================================================================
    // Private
    _getSession(cognitoUser) {

        console.log("AccountService._getSession for " + cognitoUser.username);

        return new Promise((resolve, reject) => {
            // cognitoUser.getSession((err, session) => {
            //     if (err) {
            //         console.log('session validity: ' + err);
            //         this.signOut().then(res => resolve(res)).catch(err => reject(err));
            //         return;
            //     }
            //
            //     console.log('session validity: ' + session.isValid());
            //     this._session.user = cognitoUser;
            //
            //     resolve(session);
            // });
            resolve({});
        });
    }

}

export const AccountService = new AccountServiceImpl();
