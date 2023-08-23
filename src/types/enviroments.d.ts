export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_SERVER_HOST: string;
      EMAIL_SERVER_PORT: number;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_DEFAULT_FROM: string;
    }
  }
}
