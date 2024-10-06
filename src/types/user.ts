export type User = {
  id: string;
  email: string;
  themeMode: User.ThemeMode;
  isPremium: boolean;
  isBusiness: boolean;
  isBanned: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export namespace User {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system',
  }
}
