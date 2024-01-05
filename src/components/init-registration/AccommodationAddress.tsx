import { ItemTypography } from './ItemTypography';
import { Controller, Control } from 'react-hook-form';
import { styled } from 'styled-components';
import { Input, Button } from 'antd';
import { FormInput } from './type';

export const AccommodationAddress = ({
  control,
}: {
  control: Control<FormInput>;
}) => {
  return (
    <StyledInputWrapper>
      <ItemTypography text="숙소 위치" labelName="accommodationAddress" />
      <StyledAddressContainer>
        <Controller
          name="accommodationPost"
          rules={{ required: true }}
          control={control}
          render={({ field: { value } }) => (
            <StyledInput
              id="accommodationPost"
              placeholder="우편번호"
              value={value}
            />
          )}
        />
        <StyledAddressWrapper>
          <Controller
            name="accommodationAddress"
            rules={{ required: true }}
            control={control}
            render={({ field: { value } }) => (
              <StyledInput
                id="accommodationAddress"
                placeholder="주소"
                value={value}
              />
            )}
          />
          <StyledAddressButton type="primary">
            우편번호 검색
          </StyledAddressButton>
        </StyledAddressWrapper>
        <Controller
          name="accommodationDetailAddress"
          rules={{ required: true }}
          control={control}
          render={({ field: { value } }) => (
            <StyledInput
              id="accommodationDetailAddress"
              placeholder="상세주소"
              value={value}
            />
          )}
        />
      </StyledAddressContainer>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledAddressWrapper = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  gap: 5px;
`;

const StyledAddressButton = styled(Button)`
  height: 40px;
  font-size: 18px;
`;
