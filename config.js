var ToteConfig = {
    // @if ENVIRONMENT == 'production'
    toteApiURL: '',
    stripePublishableKey: '',
    isProduction: true
    // @endif

    // @if ENVIRONMENT == 'development'
    toteApiURL: '127.0.0.1:5000',
    stripePublishableKey: '',
    isProduction: false
    // @endif
};
