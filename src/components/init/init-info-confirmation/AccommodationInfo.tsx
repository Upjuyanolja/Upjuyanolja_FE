import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { List } from 'antd';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { CustomButton } from './CustomButton';
import { ImageCarousel } from './ImageCarousel';
import {
  Options,
  UserInputValue,
} from '../init-accommodation-registration/type';

export const AccommodationInfo = ({
  accommodationData,
}: {
  accommodationData: UserInputValue;
}) => {
  /*
  const mockImages = [
    {
      url: 'data:image/jpeg;base64,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',
    },
    {
      url: 'data:image/png;base64,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',
    },
  ];
*/
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
              <CustomButton text="수정" icon={<EditOutlined />} />
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
  height: 360px;

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
