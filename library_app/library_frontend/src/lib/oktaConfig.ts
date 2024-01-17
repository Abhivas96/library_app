export const oktaConfig = {
    clientId: "0oae9o1fgdI7o9Wsd5d7",
    issuer: "https://dev-86586418.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
}