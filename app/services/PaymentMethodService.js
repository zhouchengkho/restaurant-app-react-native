const PAY_METHODS = {
    'f6e3983c-13a6-43de-8494-7149dfc9c220': {
        id: 'f6e3983c-13a6-43de-8494-7149dfc9c220',
        last4digits: '1234'
    },
    '5b2077c9-daa9-46d9-a40a-a3030da4d3a4': {
        id: '5b2077c9-daa9-46d9-a40a-a3030da4d3a4',
        last4digits: '5678'
    },
    'a50976ad-0e76-45cd-864d-15a2015b7286': {
        id: 'a50976ad-0e76-45cd-864d-15a2015b7286',
        last4digits: '9012'
    }
};

class PaymentMethodServiceImpl {

    constructor() {

    }

    async asyncGetPreferredPaymentMethod() {
        return new Promise((resolve, reject) => {
            let profile = PAY_METHODS['f6e3983c-13a6-43de-8494-7149dfc9c220'];
            profile ? resolve(profile) : reject();
        });
    }

}

export const PaymentMethodService = new PaymentMethodServiceImpl();