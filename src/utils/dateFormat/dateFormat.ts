export const formatDate = (dateString: string) => {
  const parsedDate = new Date(dateString);

  // 날짜의 연도, 월, 일을 추출
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');

  // 결과 포맷1: "YYYY.MM.DD"
  const format1 = `${year}.${month}.${day}`;

  // 결과 포맷2: "YY.MM.DD"
  const format2 = `${year.toString().slice(-2)}.${month}.${day}`;

  return { format1, format2 };
};

export const getChartDate = (index: number) => {
  const today = new Date();
  const targetLength = 2;
  const fillChar = '0';
  const pastDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - index,
  );
  const formattedDate = `${String(pastDate.getMonth() + 1).padStart(
    targetLength,
    fillChar,
  )}/${String(pastDate.getDate()).padStart(targetLength, fillChar)}`;
  return formattedDate;
};
