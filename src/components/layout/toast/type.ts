import { Typography } from '@components/text-box/type';
import { ToastPosition } from 'react-toastify';

export type toastTheme = 'success' | 'error' | 'info';

export type toastOptionI = {
  autoClose: number;
  hideProgressBar: boolean;
  closeButton: boolean;
  position: ToastPosition;
  style: {
    display: string;
    backgroundColor: string;
    color: string;
    gap: string;
    padding: string;
    borderRadius: string;
    font: Typography;
    fontWeight: string;
    width: string;
    height: string;
    filter: string;
  };
};

export type toastPropI = {
  theme: toastTheme;
  message: string;
  width: string;
  height: string;
};
