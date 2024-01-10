import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox, Form } from 'antd';
import styled from 'styled-components';
import { CheckBoxContainerProps } from './type';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useRecoilState } from 'recoil';
import { checkedAccommodationOptions } from '@stores/init/atoms';
import { Options } from './init-accommodation-registration/type';

export const CheckBoxContainer = ({
  options,
  header,
}: CheckBoxContainerProps) => {
  const [selectedAccommodationOptions, setSelectedAccommodationOptions] =
    useRecoilState(checkedAccommodationOptions);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const checkedOption = e.target.value;

    setSelectedAccommodationOptions((prev) => ({
      ...prev,
      [checkedOption]: e.target.checked,
    }));
  };

  return (
    <StyledWrapper color={colors.white}>
      <TextBox typography="h4" fontWeight={700}>
        {header}
      </TextBox>
      <Form.Item name="accommodation-options" valuePropName="checked">
        <StyledCheckboxContainer>
          {Object.entries(options).map(([english, korean]) => (
            <Checkbox
              value={english}
              key={english}
              onChange={handleCheckboxChange}
              checked={selectedAccommodationOptions[english as keyof Options]}
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
