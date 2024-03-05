/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORE_API_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
