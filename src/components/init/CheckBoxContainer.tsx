import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox, Form } from 'antd';
import styled from 'styled-components';
import { CheckBoxContainerProps } from './type';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useRecoilState } from 'recoil';
import {
  checkedAccommodationOptions,
  checkedRoomOptions,
} from '@stores/init/atoms';
import {
  AccommodationOptions,
  RoomOptions,
} from './init-accommodation-registration/type';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';

export const CheckBoxContainer = ({
  options,
  header,
  defaultValue,
}: CheckBoxContainerProps) => {
  const [selectedAccommodationOptions, setSelectedAccommodationOptions] =
    useRecoilState(checkedAccommodationOptions);

  const [selectedInitRoomOptions, setSelectedInitRoomOptions] =
    useRecoilState(checkedRoomOptions);

  useEffect(() => {
    if (defaultValue) {
      if (
        window.location.pathname === ROUTES.INIT_ROOM_REGISTRATION ||
        window.location.pathname === ROUTES.ROOM_UPDATE
      ) {
        setSelectedInitRoomOptions(defaultValue as RoomOptions);
      } else if (
        window.location.pathname === ROUTES.INIT_ACCOMMODATION_REGISTRATION
      ) {
        setSelectedAccommodationOptions(defaultValue as AccommodationOptions);
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      setSelectedInitRoomOptions({
        airCondition: false,
        tv: false,
        internet: false,
      });
      setSelectedAccommodationOptions({
        cooking: false,
        parking: false,
        pickup: false,
        barbecue: false,
        fitness: false,
        karaoke: false,
        sauna: false,
        sports: false,
        seminar: false,
      });
    };
  }, []);

  const handleCheckboxChange = (event: CheckboxChangeEvent) => {
    const checkedOption = event.target.value;

    if (header === '숙소') {
      setSelectedAccommodationOptions((prev) => ({
        ...prev,
        [checkedOption]: event.target.checked,
      }));
    } else if (header === '객실') {
      setSelectedInitRoomOptions((prev) => ({
        ...prev,
        [checkedOption]: event.target.checked,
      }));
    }
  };

  return (
    <StyledWrapper color={colors.white}>
      <TextBox typography="h4" fontWeight={700}>
        {header} 옵션
      </TextBox>
      <Form.Item
        name={header === '숙소' ? 'accommodation-options' : 'room-options'}
        valuePropName="checked"
      >
        <StyledCheckboxContainer>
          {Object.entries(options).map(([english, korean]) => (
            <Checkbox
              value={english}
              key={english}
              onChange={handleCheckboxChange}
              checked={
                header === '숙소'
                  ? selectedAccommodationOptions[
                      english as keyof AccommodationOptions
                    ]
                  : selectedInitRoomOptions[english as keyof RoomOptions]
              }
            >
              {korean}
            </Checkbox>
          ))}
        </StyledCheckboxContainer>
      </Form.Item>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 48px;

  background-color: ${(props) => props.color};

  padding: 0;

  .ant-form-item-control {
    width: 100%;
  }

  .ant-checkbox-wrapper-in-form-item {
    font-size: 16px;
  }

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`;

const StyledCheckboxContainer = styled.div`
  line-height: 24px;
  font-weight: 700;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
  grid-auto-flow: row;
  grid-row-gap: 20px;
`;
