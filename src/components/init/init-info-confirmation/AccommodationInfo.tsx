import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { List } from 'antd';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { CustomButton } from './CustomButton';
import { ImageCarousel } from './ImageCarousel';
import { Options } from '../init-accommodation-registration/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accommodationEditState,
  userInputValueState,
} from '@stores/init/atoms';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const AccommodationInfo = () => {
  const accommodationCategory = {
    HOTEL: '호텔',
    RESORT: '리조트',
    TOURIST_HOTEL: '관광호텔',
    CONDO: '콘도',
    RESIDENCE: '레지던스',
    MOTEL: '모텔',
    PENSION_POOL_VILLA: '펜션/풀빌라',
    GUEST_HOUSE: '게스트하우스',
    HANOK: '한옥',
  };

  const accommodationOptions = {
    cooking: '객실취사',
    parking: '주차시설',
    pickup: '픽업 서비스',
    barbecue: '바베큐장',
    fitness: '휘트니스센터',
    karaoke: '노래방',
    sports: '스포츠 시설',
    sauna: '사우나실',
    seminar: '세미나실',
  };

  const userInputValue = useRecoilValue(userInputValueState);
  const accommodationData = userInputValue[0];
  const setIsEdit = useSetRecoilState(accommodationEditState);
  const navigate = useNavigate();

  const getAccommodationOptionsKorean = (accommodationData: {
    options: Options;
  }): string[] => {
    const selectedOptions = Object.keys(accommodationData.options)
      .filter(
        (option) => accommodationData.options[option as keyof Options] === true,
      )
      .map(
        (selectedOption) =>
          accommodationOptions[
            selectedOption as keyof typeof accommodationOptions
          ],
      );

    return selectedOptions;
  };

  const handleEditButton = () => {
    setIsEdit(true);
    navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
  };

  return (
    <StyledWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 정보
      </TextBox>
      <StyledAccommodationInfoContainer>
        <StyledDetailWrapper>
          <ImageCarousel images={accommodationData.images} />
          <StyledTextWrapper>
            <StyledTextHeadWrapper>
              <TextBox typography="h4" fontWeight={700} color="primary">
                숙소명: {accommodationData.name}
              </TextBox>
              <CustomButton
                text="수정"
                icon={<EditOutlined />}
                onClick={handleEditButton}
              />
            </StyledTextHeadWrapper>
            <List itemLayout="vertical">
              <List.Item>
                <List.Item.Meta
                  title="숙소 유형 :"
                  description={
                    accommodationCategory[
                      accommodationData.type as keyof typeof accommodationCategory
                    ]
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="숙소 위치 :"
                  description={`[${accommodationData.zipCode}] ${accommodationData.address}`}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="숙소 옵션 :"
                  description={
                    getAccommodationOptionsKorean(accommodationData).length ===
                    0
                      ? '해당 없음'
                      : getAccommodationOptionsKorean(accommodationData).join(
                          ' / ',
                        )
                  }
                />
              </List.Item>
            </List>
          </StyledTextWrapper>
        </StyledDetailWrapper>
        <StyledDescWrapper>
          숙소 소개: {accommodationData.description}
        </StyledDescWrapper>
      </StyledAccommodationInfoContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-list-item {
    border-bottom: none;
    padding: 0;

    margin-bottom: 8px;
  }

  .ant-list-item-meta-content {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .ant-list-item-meta {
    margin-bottom: 0;
  }

  .ant-list-item-meta-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
  }

  .ant-list-item-meta-description {
    font-weight: 400;
    color: ${colors.black900};

    width: 470px;
  }

  .ant-btn {
    .anticon + span {
      margin-left: 0;
    }
    .span {
      display: block;
    }
  }
`;

const StyledAccommodationInfoContainer = styled.div`
  border-radius: 8px;
  border: 2px solid ${colors.primary};

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px;

  background-color: ${colors.white};
`;

const StyledDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 24px;

  padding-bottom: 16px;

  border-bottom: 1px dashed ${colors.black600};
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 8px;
`;

const StyledTextHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const StyledDescWrapper = styled.div`
  font-size: 14px;
`;
