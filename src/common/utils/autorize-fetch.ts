import {getAccessTokenAsync} from '../authorization/identity-server/auth-state-manager';

export const authorizeFetch = async (
  url: string,
  options: object | null = null,
) => {
  const token = await getAccessTokenAsync();
  const defaultOptions = {
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
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
