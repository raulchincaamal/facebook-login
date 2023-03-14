export {}

declare global {
  interface Window {
    fbAsyncInit: () => void
    FB: {
      init: (opts: IFacebookInit) => void
      getLoginStatus: (_: (response: unknown) => unknown) => void
      login: (
        fn: (response: IFacebookLoginResponse) => void,
        opts: IFacebookLoginOptions
      ) => void
      api: (
        route: string,
        { fields: string },
        fn: (response: IFacebookData) => unknown
      ) => void
      AppEvents: {
        logPageView: () => void
      }
    }
  }

  interface IFacebookData {
    id: string
    name: string
    email: string
  }

  interface IFacebookLoginResponse {
    status: "connected" | "not_authorized" | "unknown"
    authResponse: {
      accessToken: string
      expiresIn: string
      signedRequest: string
      userID: string
    }
  }

  interface IFacebookLoginOptions {
    /**
     * Optional key, supports 3 values: rerequest, reauthenticate, reauthorize.
     * Use rerequest when re-requesting a {@link https://developers.facebook.com/docs/facebook-login/web/permissions/#re-asking-declined-permissions|link declined permission.}.
     */
    auth_type?: "rerequest" | "reauthenticate" | "reauthorize"
    /**
     * Comma separated list of {@link https://developers.facebook.com/docs/reference/login/extended-permissions|link extended permissions}
     */
    scope: string
    /**
     * When true, the granted scopes will be returned in a comma-separated list in the grantedScopes field
     * of the {@link https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus|link authResponse}
     */
    return_scopes?: boolean
    /**
     * When true, prompt the user to grant permission for one or more Pages
     */
    enable_profile_selector?: boolean
    /**
     * Comma separated list of IDs to display in the profile selector
     */
    profile_selector_ids?: string
  }

  interface IFacebookInit {
    /**
     * Your application ID. If you don't have one find it in the {@link https://developers.facebook.com/apps|link App dashboard} or go there to create a new app.
     * Defaults to null.
     */
    appId?: string
    /**
     * Determines which versions of the Graph API and any API dialogs or plugins are invoked when using the .api() and .ui() functions.
     * Valid values are determined by {@link https://developers.facebook.com/docs/graph-api/changelog|link currently available versions},
     * such as 'v2.0'. This is a required parameter.
     */
    version: string
    /**
     * Determines whether a cookie is created for the session or not.
     * If enabled, it can be accessed by server-side code.
     * Defaults to `false`.
     */
    cookie?: boolean
    /**
     * Determines whether a long-lived access token for the session can be saved in localStorage.
     * This enables maintaining a user's logged in status when 3rd party cookies are blocked from being sent to Facebook domains.
     * Defaults to `true`.
     */
    localStorage?: boolean
    /**
     * Determines whether the current login status of the user is freshly retrieved on every page load.
     * If this is disabled, that status will have to be manually retrieved using {@link https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/|link .getLoginStatus()}.
     * Defaults to `false`.
     */
    status?: boolean
    /**
     * Determines whether XFBML tags used by social plugins are parsed,
     * and therefore whether the plugins are rendered or not.
     * Defaults to `false`.
     */
    xfbml?: boolean
    /**
     * {@link https://developers.facebook.com/docs/games/build/legacy-web-games/gaming-services/gamerequests#frictionless_requests|link Frictionless Requests} are available to games on Facebook.com or on mobile web using the JavaScript SDK.
     * This parameter determines whether they are enabled.
     * Defaults to `false`.
     */
    frictionlessRequests?: boolean
    /**
     * This specifies a function that is called whenever it is necessary to hide Adobe Flash objects on a page.
     * This is used when .api() requests are made, as Flash objects will always have a higher z-index than any other DOM element.
     * See our {@link https://developers.facebook.com/docs/games/gamesonfacebook/optimizing#handlingpopups|link Custom Flash Hide Callback} for more details on what to put in this function.
     * Defaults to `null`.
     */
    hideFlashCallback?: () => void
  }
}
