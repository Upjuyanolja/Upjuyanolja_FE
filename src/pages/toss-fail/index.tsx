import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { useEffect } from 'react';
import { currentUrlState } from '@stores/point-charge-modal';
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import { TextBox } from '@components/text-box';

export const TossFail = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const currentUrl = useRecoilValue(currentUrlState);

  useEffect(() => {
    message.error({
      content: (
        <TextBox typography="body3" fontWeight={'400'}>
          결제를 완료하지 못했습니다.
        </TextBox>
      ),
      duration: 2,
    });

    handleChangeUrl(currentUrl);
  }, []);

  return <div></div>;
};
