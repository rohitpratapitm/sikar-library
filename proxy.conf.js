const API_REWRITE_RULE = {"^/api": ""}
const PROXY_CONFIG = [
    {
        context: [ "/api" ],
        target: "https://api.login.yahoo.com/oauth2",
        pathRewrite: API_REWRITE_RULE,
        changeOrigin: true,
        logLevel: "debug"
    }
]
module.exports = PROXY_CONFIG;