import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { List } from 'antd';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { CustomButton } from './CustomButton';

export const AccommodationInfo = () => {
  return (
    <StyledWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 정보
      </TextBox>
      <StyledAccommodationInfoContainer>
        <StyledDetailWrapper>
          <div
            style={{
              width: '224px',
              height: '144px',
              backgroundColor: 'skyblue',
              borderRadius: '8px',
            }}
          >
            이미지
          </div>
          <StyledTextWrapper>
            <StyledTextHeadWrapper>
              <TextBox typography="h4" fontWeight={700} color="primary">
                숙소명: 레스케이프 호텔
              </TextBox>
              <CustomButton text="수정" icon={<EditOutlined />} />
            </StyledTextHeadWrapper>
            <List itemLayout="vertical">
              <List.Item>
                <List.Item.Meta title="숙소 유형 :" description="호텔/리조트" />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="숙소 위치 :"
                  description="[04529] 서울 특별시 중구 퇴계로 67, 레스케이프 호텔"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="숙소 대표 이미지 :"
                  description="파일명 외 2장"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="숙소 옵션 :"
                  description=" 객실취사 / 주차시설 / 휘트니스 센터 / 세미나실"
                />
              </List.Item>
            </List>
          </StyledTextWrapper>
        </StyledDetailWrapper>
        <StyledDescWrapper>
          숙소 소개: 조선호텔앤리조트에서 선보이는 부티크 호텔, 레스케이프
          호텔은 명동과 남대문 시장, 그리고 남산 등 서울의 상징적인 장소와
          인접하며 도심 속에서 유럽의 감성을 느낄 수 있는 감각적인 호텔이다.
          2020년부터 포브스 트래블 가이드에 추천 호텔로 3년 연속 선정된 것은
          물론, 미쉐린 가이드 1스타에 선정된 컨템포러리 레스토랑 라망 , 모던
          차이니즈 레스토랑 팔레드 신까지 문화와 트렌드, 미식을 아우르는
          라이프스타일 콘텐츠 플랫폼이기도 하다. 세계적인 인테리어 디자이너
          Jacques Garcia의 손길이 닿은 아름다운 204개의 객실, 한 도시를 대표하는
          레스토랑과 바의 철학을 담은 다이닝 공간을 갖추고 있다. 또한
          프라이빗하게 즐기는 피트니스와 스파, 소규모 연회장이 있고, 2분 거리에
          위치한 신세계 백화점과 면세점에서 쇼핑을 즐길 수 있다. 이너 Jacques
          Garcia의 손길이 닿은 아름다운 204개의 객실, 한 도시를 대표하는
          레스토랑과 바의 철학을 담은 다이닝 공간을 갖추고 있다
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
  }

  .ant-list-item-meta-content {
    display: flex;
    flex-direction: row;
    gap: 5px;
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
  height: 340px;

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

  border-bottom: 1px solid ${colors.black600};
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const StyledTextHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const StyledDescWrapper = styled.div`
  font-size: 14px;
`;
