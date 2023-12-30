export const environment = {
    production: true,
    apiUrlRoot: '',
    apiUrl: {
        userprofile: '', organization: '', role: '', common: '', authentication: '', product: '',
        currency: '', holiday: '', branch: '', productCategory: '', exchangeRate: '', rateSource: '', rate: '',
        depositProduct: ''
    },
    apiPrefix: {
        userLogin: '/login',
        refreshToken: '/refresh-token'
    },
    frontEndUrl: {
        login: "login",
        organizations: "organizations",
        curencies: "curencies",
        settings: "settings",
        organizationDetails: "organization-details",
        holidays: "holidays",
        branches: "Branches",
        depositProducts: "deposit-products",
        productCategories: "product-categories",
        loanProducts: "loan-products",
        glProducts: "gl-products",
        cryptoProducts: "crypto-products",
        exchangeRates: "exchange-rates",
        rates: "rates",
        rateSources: "rate-sources"
    },
    appVersion: "1.0.0-SNAPSHOT",
    appClientId: "corefinance-ADMIN-WEB",
    pageSize: 25,
    pageSizeOptions: [25, 50, 100],
    loginRefreshInterval: 15 * 60 * 1000,
};

export function rebuildEnvironment() {
    // Userprofile
    environment.apiUrl.authentication = environment.apiUrl.userprofile + "/authentication";
    // Product
    environment.apiUrl.organization = environment.apiUrl.product + "/organizations";
    environment.apiUrl.currency = environment.apiUrl.product + "/currencies";
    environment.apiUrl.holiday = environment.apiUrl.product + "/holidays";
    environment.apiUrl.branch = environment.apiUrl.product + "/branches";
    environment.apiUrl.branch = environment.apiUrl.product + "/branches";
    environment.apiUrl.productCategory = environment.apiUrl.product + "/product-categories"
    environment.apiUrl.exchangeRate = environment.apiUrl.product + "/exchange-rates"
    environment.apiUrl.rateSource = environment.apiUrl.product + "/rate-sources"
    environment.apiUrl.rate = environment.apiUrl.product + "/rates"
    environment.apiUrl.depositProduct = environment.apiUrl.product + "/deposit-products"
}
