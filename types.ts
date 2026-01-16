
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
