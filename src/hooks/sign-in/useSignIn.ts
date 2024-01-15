export const setCookie = (name: string, value: string) => {
  try {
    if (name === 'accessToken') {
      document.cookie = `${name}=${value};max-age:7200;path=/;secure`;
    } else if (name === 'accomodationId' || name === 'refreshToken') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      const expirationDateString = expirationDate.toUTCString();
      document.cookie = `${name}=${value};expires=${expirationDateString};path=/;secure;`;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue;
};

export const removeCookie = (name: string) => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  } catch (e) {
    console.error(e);
  }
};
