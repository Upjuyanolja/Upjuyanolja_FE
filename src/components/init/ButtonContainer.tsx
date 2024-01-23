import { Button, Modal, message } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainerProps,
  ButtonContainerStyledWrapperProps,
} from './type';
import { TextBox } from '@components/text-box';
import { ROUTES } from '@/constants/routes';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isUpdatedAccommodationState,
  roomPrevButtonState,
  userInputValueState,
} from '@stores/init/atoms';
import { useAccommodationInfo } from '@queries/init';
import { AxiosError } from 'axios';
import { PostAccommodationParams } from '@api/init/type';
import { RESPONSE_CODE } from '@/constants/api';
import { getCookie, setCookie } from '@hooks/sign-in/useSignIn';

export const ButtonContainer = ({
  buttonStyle,
  isValid,
}: ButtonContainerProps) => {
  const navigate = useNavigate();
  const setIsClickPrev = useSetRecoilState(roomPrevButtonState);

  const handlePreviousClick = () => {
    if (window.location.pathname === ROUTES.INIT_ACCOMMODATION_REGISTRATION)
      navigate(-1);
    else if (window.location.pathname === ROUTES.INIT_ROOM_REGISTRATION) {
      setIsClickPrev(true);
      navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
    }
  };

  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);
  let accommodationId = -1;
  const setIsUpdatedAccommodation = useSetRecoilState(
    isUpdatedAccommodationState,
  );

  const imageUrls: { url: string }[] = userInputValue[0].images.map(
    (image) => ({ url: image.url }),
  );
  const thumbnailImage = imageUrls[0].url;

  const postAccommodationParams: PostAccommodationParams = {
    name: userInputValue[0].name,
    address: userInputValue[0].address,
    detailAddress: userInputValue[0].detailAddress,
    zipCode: userInputValue[0].zipCode,
    description: userInputValue[0].description,
    category: userInputValue[0].type,
    thumbnail: thumbnailImage,
    images: imageUrls,
    options: [userInputValue[0].options],
    rooms: userInputValue[0].rooms.map((room) => ({
      name: room.name,
      price: room.price as number,
      defaultCapacity: room.defaultCapacity as number,
      maxCapacity: room.maxCapacity as number,
      checkInTime: room.checkInTime,
      checkOutTime: room.checkOutTime,
      count: room.count as number,
      images: room.images.map((image) => ({ url: image.url })),
      options: room.options,
    })),
  };

  const { mutate: accommodationInfo } = useAccommodationInfo({
    onSuccess(data) {
      accommodationId = data.data.data.accommodationId;
      setIsUpdatedAccommodation(false);

      const cookieAccommodationId = getCookie('accommodationId');
      if (!cookieAccommodationId) setCookie('accommodationId', accommodationId);

      message.success(`${data.data.data.name} 숙소가 등록되었습니다.`);
      navigate(`/${accommodationId}${ROUTES.MAIN}`);

      setUserInputValue([
        {
          name: '',
          address: '',
          detailAddress: '',
          zipCode: '',
          description: '',
          type: '',
          images: [],
          options: {
            cooking: false,
            parking: false,
            pickup: false,
            barbecue: false,
            fitness: false,
            karaoke: false,
            sauna: false,
            sports: false,
            seminar: false,
          },
          rooms: [],
          editRoomIndex: -1,
          isAccommodationEdit: false,
        },
      ]);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        message.error({
          content: '요청에 실패했습니다. 잠시 후 다시 시도해주세요',
          style: { marginTop: '210px' },
        });
      }
      if (
        error.response?.data.code === RESPONSE_CODE.INVALID_CATEGORY ||
        error.response?.data.code ===
          RESPONSE_CODE.EMPTY_ACCOMMODATION_IMAGES ||
        error.response?.data.code === RESPONSE_CODE.EMPTY_ROOM_INFO ||
        error.response?.data.code === RESPONSE_CODE.REQUEST_BODY_ERROR ||
        error.response?.data.code === RESPONSE_CODE.EMPTY_ROOM_IMAGES
      ) {
        message.error({
          content: '요청을 실패했습니다. 관리자에게 문의해주세요',
          style: { marginTop: '210px' },
        });
      }
      if (error.response?.data.code === RESPONSE_CODE.NOT_FOUND_MEMBER) {
        navigate(ROUTES.SIGNIN);
      }
    },
  });

  const handleConfirmModalOk = () => {
    accommodationInfo(postAccommodationParams);
  };

  const confirm = () => {
    Modal.confirm({
      title: (
        <StyledConfirmHead>
          <TextBox typography="h1" fontWeight={700} color="primary">
            사장님!
          </TextBox>
          <StyledMiddleTextContainer>
            <TextBox typography="h4" fontWeight={700}>
              쿠폰센터에서는 숙소 등록만 가능하며,
            </TextBox>
            <br />
            <TextBox typography="h4" fontWeight={400}>
              등록 완료 후
            </TextBox>
            <br />
            <TextBox typography="h4" fontWeight={700} color="error">
              수정 /삭제는 비즈니스 센터에서 처리 가능합니다.
            </TextBox>
          </StyledMiddleTextContainer>
        </StyledConfirmHead>
      ),
      content: (
        <StyledNextText>
          <TextBox typography="h5" fontWeight={700}>
            다음으로 넘어갈까요?
          </TextBox>
        </StyledNextText>
      ),
      okText: '등록완료',
      cancelText: '머무르기',
      icon: '',
      width: '576px',
      bodyStyle: { height: '621px' },
      centered: true,
      onOk: handleConfirmModalOk,
    });
  };

  return (
    <StyledWrapper $buttonStyle={buttonStyle}>
      {buttonStyle === 'navigate' && (
        <>
          <StyledButton type="primary" ghost onClick={handlePreviousClick}>
            이전
          </StyledButton>
          <StyledButton
            type="primary"
            disabled={!isValid}
            data-testid="accommodation-next-button"
            htmlType="submit"
          >
            다음
          </StyledButton>
        </>
      )}
      {buttonStyle === 'request' && (
        <StyledButton
          type="primary"
          size="large"
          onClick={confirm}
          data-testid="request-button"
          disabled={!isValid}
        >
          등록 요청
        </StyledButton>
      )}
      {buttonStyle === 'edit' && (
        <StyledButton
          type="primary"
          size="large"
          disabled={!isValid}
          htmlType="submit"
        >
          수정하기
        </StyledButton>
      )}
      {buttonStyle === 'addRoom' && (
        <StyledButton
          type="primary"
          size="large"
          disabled={!isValid}
          htmlType="submit"
        >
          추가하기
        </StyledButton>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<ButtonContainerStyledWrapperProps>`
  width: 100%;

  display: ${(props) =>
    props.$buttonStyle === 'navigate' || props.$buttonStyle === 'edit'
      ? 'grid'
      : 'block'};
  grid-template-columns: ${(props) =>
    props.$buttonStyle === 'navigate'
      ? '1fr 2.5fr'
      : props.$buttonStyle === 'edit'
        ? 'auto'
        : 'none'};
  gap: ${(props) => (props.$buttonStyle === 'navigate' ? '10px' : '0')};
`;

const StyledButton = styled(Button)`
  height: 62px;
  font-size: 20px;
`;

const StyledConfirmHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  margin-top: 80px;
`;

const StyledNextText = styled.div`
  margin: 130px 0 3px;
`;

const StyledMiddleTextContainer = styled.div`
  text-align: center;
`;
