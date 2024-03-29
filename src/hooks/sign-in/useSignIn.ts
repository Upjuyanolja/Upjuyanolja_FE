export const setCookie = (name: string, value: string | number) => {
  try {
    if (name === 'accessToken') {
      document.cookie = `${name}=${value};max-age=3600;path=/;`;
    } else if (name === 'refreshToken') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      const expirationDateString = expirationDate.toUTCString();
      document.cookie = `${name}=${value};expires=${expirationDateString};path=/;secure;`;
    } else {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      const expirationDateString = expirationDate.toUTCString();
      const numValue = typeof value === 'number' ? value : value.toString();
      document.cookie = `${name}=${numValue};expires=${expirationDateString};path=/;secure;`;
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
