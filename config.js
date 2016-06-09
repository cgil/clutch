var ToteConfig = {
    // @if ENVIRONMENT == 'production'
    toteApiURL: 'www.totestore.com',
    // stripePublishableKey: 'pk_live_InorHF5F9AWzp1UuBM8Xz41b',
    stripePublishableKey: 'pk_test_SSTmhE8aocfnGsmEZrN9SEAM',
    isProduction: true
    // @endif

    // @if ENVIRONMENT == 'development'
    toteApiURL: '127.0.0.1:5000',
    stripePublishableKey: 'pk_test_SSTmhE8aocfnGsmEZrN9SEAM',
    isProduction: false
    // @endif
};
