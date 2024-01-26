import { FormInstance } from 'antd';

export const getTypeValue = (form: FormInstance) => {
  let type;
  switch (form.getFieldValue('accommodation-category')) {
    case 'HOTEL/RESORT':
      type = form.getFieldValue('accommodation-hotel-category');
      break;
    case 'GUEST_HOUSE':
      type = form.getFieldValue('accommodation-guest-category');
      break;
    default:
      type = form.getFieldValue('accommodation-category');
  }
  return type;
};
