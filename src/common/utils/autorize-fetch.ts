import {getTokens} from '../authorization/google/auth-state-manager';

export const authorizeFetch = async (
  url: string,
  options: object | null = null,
) => {
  const tokens = await getTokens();
  const defaultOptions = {
    headers: {
      ...(tokens ? {Authorization: `Bearer ${tokens.idToken}`} : {}),
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json;
    } else {
      if (response.status === 403) {
      }
    }
  } catch (e) {
    console.error(e);
    console.error(e.message);
    console.error(e.stack);
    console.log(`Error in authorize fetch URL: ${url}`);
    //throw e;
  }
};