/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AWS_REGION: string,
    readonly VITE_COGNITO_USERPOOL_ID: string,
    readonly VITE_COGNITO_WEBCLIENT_ID: string,
    readonly VITE_COGNITO_DOMAIN: string,
    readonly VITE_OAUTH_REDIRECT_SIGNIN: string,
    readonly VITE_OAUTH_REDIRECT_SIGNOUT: string,
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }