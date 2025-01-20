interface ImportMetaEnv {
  readonly API_END_POINT: string;
  readonly RECAPTCHA_SITE_KEY: string;
  readonly REACT_APP_ENCRYPTION_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
