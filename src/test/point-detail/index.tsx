import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const TestPointDetail = () => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(10);
  const pageRange = 5;
  const [status, setStatus] = useState('all');
  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation();

  useEffect(() => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&status=${status}&pageNumber=${pageNumber}`,
    );
  }, [location.pathname]);

  const handleClickButton = (sign: '+' | '-') => {
    if (sign === '+') {
      const addCurrentMonth =
        currentMonth > 11 ? currentMonth - 11 : currentMonth + 1;
      const addCurrentYear = currentMonth > 11 ? currentYear + 1 : currentYear;
      //   setCurrentMonth(addCurrentMonth);
      setCurrentYear(addCurrentYear);
      setCurrentMonth(addCurrentMonth);
      handleChangeUrl(
        `${location.pathname}?year=${addCurrentYear}&month=${addCurrentMonth}&status=${status}&pageNumber=${pageNumber}`,
      );

      //   if (addCurrentMonth > 12) {
      //     setCurrentYear(currentYear + 1);
      //     setCurrentMonth(addCurrentMonth - 12);
      //   }
    } else {
      const subCurrentYear = currentMonth < 2 ? currentYear - 1 : currentYear;
      const subCurrentMonth =
        currentMonth < 2 ? currentMonth + 11 : currentMonth - 1;

      setCurrentYear(subCurrentYear);
      setCurrentMonth(subCurrentMonth);
      handleChangeUrl(
        `${location.pathname}?year=${subCurrentYear}&month=${subCurrentMonth}&status=${status}&pageNumber=${pageNumber}`,
      );
      //   if (subCurrentMonth < 1) {
      //     setCurrentYear(currentYear - 1);
      //     setCurrentMonth(subCurrentMonth + 12);
      //   }
    }
  };
  const handleClickPageButton = (pageNumber: number) => {
    handleChangeUrl(
      `${location.pathname}?year=${currentYear}&month=${currentMonth}&status=${status}&pageNumber=${pageNumber}`,
    );
    setPageNumber(pageNumber);
  };
  const handleClickPageStepButton = (sign: '+' | '-') => {
    if (sign === '+') {
      const currentPageNumber =
        pageNumber + pageRange > page ? page : pageNumber + pageRange;
      setPageNumber(currentPageNumber);
      handleChangeUrl(
        `${location.pathname}?year=${currentYear}&month=${currentMonth}&status=${status}&pageNumber=${currentPageNumber}`,
      );
    } else {
      const currentPageNumber =
        pageNumber - pageRange < 1 ? 1 : pageNumber - pageRange;
      setPageNumber(currentPageNumber);
      handleChangeUrl(
        `${location.pathname}?year=${currentYear}&month=${currentMonth}&status=${status}&pageNumber=${currentPageNumber}`,
      );
    }
  };
  return (
    <>
      <button data-testid="prev-btn" onClick={() => handleClickButton('-')}>
        prev
      </button>
      <button data-testid="next-btn" onClick={() => handleClickButton('+')}>
        next
      </button>
      <span data-testid="year">{currentYear}</span>
      <span data-testid="month">{currentMonth}월</span>
    </>
  );
};
