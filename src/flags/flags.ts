export const FLAGS = {
    EMAIL_VERIFICATION: false,
    PASSWORD_RESET: false,
    NEW_PASSWORD: false,
    RECEIPT_EMAIL: false,
  } as const;
  

  

  export type FeatureFlag = keyof typeof FLAGS;
  