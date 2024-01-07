import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { toastPropI, toastOptionI } from './type';
import { colors } from '@/constants/colors';
import 'react-toastify/dist/ReactToastify.css';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
export const Toast = () => {
  const [isVisible, setIsVisible] = useState(false);
  let backgroundColor = '';

  const showToast = ({ theme, message, width, height }: toastPropI) => {
    setIsVisible(true);
    backgroundColor =
      theme === 'success'
        ? `${colors.green}`
        : theme === 'error'
          ? `${colors.red}`
          : `${colors.black600}`;

    const toastOptions: toastOptionI = {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      position: toast.POSITION.TOP_CENTER,
      style: {
        display: 'flex',
        backgroundColor,
        color: 'white',
        gap: '8px',
        padding: '10px 16px 10px 16px',
        borderRadius: '8px',
        font: 'h3',
        fontWeight: '400',
        width: width,
        height: height,
        filter: '0px 2px 8px 0px #00000026',
      },
    };
    let iconElement = null;
    switch (theme) {
      case 'info':
        iconElement = <CustomInfoIcon />;
        toast.info(message, { ...toastOptions, icon: iconElement });
        break;
      case 'error':
        iconElement = <CustomErrorIcon />;
        toast.error(message, { ...toastOptions, icon: iconElement });
        break;
      case 'success':
        iconElement = <CustomSuccessIcon />;
        toast.success(message, { ...toastOptions, icon: iconElement });
        break;
      default:
        break;
    }
  };

  return {
    showToast,
    ToastContainer: isVisible && <ToastContainer />,
  };
};

const CustomInfoIcon = styled(InfoCircleOutlined)`
  font-size: 16px;
  color: ${colors.black600};
  background-color: ${colors.white};
  border-radius: 50%;
`;

const CustomErrorIcon = styled(CloseCircleOutlined)`
  font-size: 16px;
  color: ${colors.red};
  background-color: ${colors.white};
  border-radius: 50%;
`;

const CustomSuccessIcon = styled(CheckCircleOutlined)`
  font-size: 16px;
  color: ${colors.green};
  background-color: ${colors.white};
  border-radius: 50%;
`;

export default Toast;
