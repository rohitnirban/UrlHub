export const checkUrlId = (urlID: string): boolean => {
    const regex = /^[a-zA-Z0-9]{6,12}$/;
    return regex.test(urlID);
  };
  