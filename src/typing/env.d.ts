/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TENANT: string;
  readonly VITE_API_URL: String;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
