import { useEffect } from 'react';
import { message } from 'antd';
import { TextBox } from '@components/text-box';
import { useNavigate } from 'react-router-dom';

export const TossFail = () => {
  const navigation = useNavigate();
  useEffect(() => {
    message.error({
      content: (
        <TextBox typography="body3" fontWeight={'400'}>
          결제를 완료하지 못했습니다.
        </TextBox>
      ),
      duration: 2,
    });

    navigation(-1);
  }, []);

  return <div></div>;
};
