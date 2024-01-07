import React, { useState } from 'react';

function PointModalTestComp() {
  const MINIMUM_PRICE = 10000;
  const MAXIMUM_PRICE = 10000000;

  const [formattedValue, setFormattedValue] = useState<string>('');
  const [pointErrorMessage, setPointErrorMessage] = useState<string>('');
  const [isPointState, setIsPointState] = useState<boolean>(true);
  const [isAgreementPoint, setIsAgreementPoint] = useState(false);

  const numberFormat = (input: string): string => {
    if (input) {
      const numericValue = parseInt(input.replace(/[^\d]/g, ''));
      return numericValue.toLocaleString();
    } else {
      return '';
    }
  };

  const removeNumberFormat = (input: string): string => {
    const numericValue = input.replace(/[^\d]/g, '');
    return numericValue;
  };

  const handleChangePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/[0-9]/.test(removeNumberFormat(inputValue))) {
      setFormattedValue(numberFormat(inputValue));
    } else {
      setFormattedValue('');
    }

    priceComparator(inputValue);
  };

  const priceComparator = (inputValue: string) => {
    if (
      parseInt(removeNumberFormat(inputValue)) < MINIMUM_PRICE ||
      inputValue === ''
    ) {
      setPointErrorMessage('1회 최소 충전가능한 포인트는 10,000 포인트입니다.');
      setIsPointState(true);
    } else if (parseInt(removeNumberFormat(inputValue)) > MAXIMUM_PRICE) {
      setFormattedValue(numberFormat(`${MAXIMUM_PRICE}`));
      setIsPointState(false);
    } else {
      setPointErrorMessage('');
      setIsPointState(false);
    }
  };

  const handleClickAddPoint = (price: number) => {
    const result = parseInt(removeNumberFormat(formattedValue || '0')) + price;
    if (result > MAXIMUM_PRICE) {
      setFormattedValue(numberFormat(`${MAXIMUM_PRICE}`));
    } else {
      setFormattedValue(numberFormat(result.toString()));
      setPointErrorMessage('');
      setIsPointState(false);
    }
  };
  return (
    <>
      <div>
        <input
          data-testid="input"
          onChange={handleChangePoint}
          value={formattedValue}
        ></input>
        <button data-testid="10000" onClick={() => handleClickAddPoint(10000)}>
          10000
        </button>
        <button data-testid="50000" onClick={() => handleClickAddPoint(50000)}>
          50000
        </button>
        <button
          data-testid="100000"
          onClick={() => handleClickAddPoint(100000)}
        >
          100000
        </button>
        <span data-testid="formattedValue">{formattedValue}</span>
        <span data-testid="errorMessage">{pointErrorMessage}</span>
        <input
          type="checkbox"
          data-testid="checkbox"
          onChange={() => {
            setIsAgreementPoint(!isAgreementPoint);
          }}
        ></input>
        <button
          data-testid="disabled"
          disabled={isPointState || !isAgreementPoint}
        ></button>
      </div>
    </>
  );
}

export default PointModalTestComp;
