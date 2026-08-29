import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "c726fe29-c408-434e-ab13-a0ec0d834640",
    authority: "https://login.microsoftonline.com/6c8b6ff5-1af8-4e66-925f-c6f76bc9eeea",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};