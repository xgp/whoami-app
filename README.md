# whoami test app

SPA that acts as an OpenID Connect public client and displays the token information on login.

The sample makes use of a pure [Javascript OpenId Connect Client](https://github.com/IdentityModel/oidc-client-js). We have included a minified version of this client in `public/js/oidc-client.min.js` or you can fetch the [latest version here](https://github.com/IdentityModel/oidc-client-js/tree/dev/dist).

We have kept this sample to minimum functionality. However the UserManager in OIDC Client library has many useful features for authenticating via popups, logging out, and getting user info. Check out the [wiki](https://github.com/IdentityModel/oidc-client-js/wiki) and [samples](https://github.com/IdentityModel/oidc-client-js/tree/dev/sample/public) in the Github repo.

## How does it work?

This sample uses the same OIDC client library as the Implicit example with the main difference being that the `response_type` is set to `code`. By switching to `code` the library will take care of the `code_challenge` and `code_verifier` exchange that is necessary for the PKCE flow.

```js

var settings = {
    authority: ISSUER,
    client_id: CLIENT_ID,
    redirect_uri: window.location.origin,
    response_type: 'code',
    scope: 'openid profile email',
    filterProtocolClaims: true,
    loadUserInfo: true
};
var mgr = new Oidc.UserManager(settings);

```

The PKCE flow contains 2 steps. The first step redirects the browser to the auth server for user authentication. On success a `code` value will be returned to this application in the querystring. 

Your application should look out for this response and then complete the sign in. 

For example, a simple approach is to do this.
```js
if (window.location.href.indexOf("?") >= 0) {
  processLoginResponse();
}
```

You then hand back control to the OIDC client which will take care of the 2nd step in the flow where the `code` is exchanged for a set of Access, Refresh, and ID Tokens. 

```js

function processLoginResponse() {
  mgr.signinRedirectCallback().then(function(user, bb) {
      console.log("signed in", user);

      // Tokens are stored in User Manager.
      // You can access them elsewhere in code using mgr.getUser() to fetch the user object

      document.getElementById("loginResult").innerHTML = '<h3>Success</h3><pre><code>' + JSON.stringify(user, null, 2) + '</code></pre>'

  }).catch(function(err) {
      console.log('Error completing auth code + pkce flow', err);
  });
}

```

## Run
This sample uses node to serve up the single home page.

From the command line run
```
> npm install
> npm start
```

### Local testing
By default these samples will run on `http://localhost:3000`.

You will need to add your callback url to the list of approved **Redirect URIs** for your auth server. e.g. `http://localhost:3000` or `http://localhost:3000/*`
