const API_REWRITE_RULE = {"^/api": ""}
const PROXY_CONFIG = [
    {
        context: [ "/oauth2" ],
        target: "https://api.login.yahoo.com",
        changeOrigin: true,
        logLevel: "debug"
    },
    {
        context: [ "/api" ],
        target: "https://fantasysports.yahooapis.com/fantasy/v2",
        pathRewrite: API_REWRITE_RULE,
        changeOrigin: true,
        logLevel: "debug"
    }
]
module.exports = PROXY_CONFIG;