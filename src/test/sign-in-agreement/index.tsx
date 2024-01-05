import { useCustomNavigate } from '../../hooks/sign-up/useSignUp';
import React, { useState } from 'react';

export const SignInAgreement = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [isChecked, setIsChecked] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const data = [
    { id: 0, condition: '[필수]', title: '만 14세 이상입니다' },
    {
      id: 1,
      condition: '[선택]',
      title: '빨리잡아! 쿠폰센터 서비스 이용 약관',
    },
    {
      id: 2,
      condition: '[선택]',
      title: '빨리잡아! 쿠폰센터 개인정보 수집 및 이용 동의',
    },
    {
      id: 3,
      condition: '[선택]',
      title: '빨리잡아! 쿠폰센터 놀자 제 3자 정보 제공 동의',
    },
  ];

  // 체크 박스 개별 선택
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setIsChecked((prev) => [...prev, id]);
      if (id === 0) {
        setIsDisabled(false);
      }
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
      if (id === 0) {
        setIsDisabled(true);
      }
    }
  };

  // 체크 박스 모두 선택
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const idArray: React.SetStateAction<number[]> = [];
      data.forEach((el) => idArray.push(el.id));
      setIsChecked(idArray);
      setIsDisabled(false);
    } else {
      setIsChecked([]);
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <label htmlFor="all">모두 동의</label>
        <input type="checkbox" onChange={handleAllCheck} id="all" />
      </div>
      <div>
        {data.map((data) => (
          <React.Fragment key={data.id}>
            <label htmlFor={`${data.id}`}>{data.id}</label>
            <input
              type="checkbox"
              onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
              checked={isChecked.includes(data.id)}
              id={`${data.id}`}
            />
          </React.Fragment>
        ))}
      </div>
      <div>
        <button
          data-testid="prevBtn"
          onClick={() => handleChangeUrl('/signin')}
        >
          이전
        </button>
        <button
          data-testid="nextBtn"
          onClick={() => handleChangeUrl('/signup')}
          disabled={isDisabled}
        >
          다음
        </button>
      </div>
    </div>
  );
};
