import {
  clearCachedToken,
  getTokens,
} from '../authorization/google/auth-state-manager';

export const authorizeFetch = async (
  url: string,
  options: object | null = null,
) => {
  const oldTokens = await getTokens();
  await clearCachedToken(oldTokens.accessToken);
  const tokens = await getTokens();
  const defaultOptions = {
    headers: {
      ...(tokens ? {Authorization: `Bearer ${tokens.idToken}`} : {}),
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });
    console.log(response);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json;
    } else {
      if (response.status === 401) {
        console.log('401 Unauthorized');
      }
    }
  } catch (e) {
    console.error(e);
    console.error(e.message);
    console.error(e.stack);
    console.log(`Error in authorize fetch URL: ${url}`);
    throw e;
  }
};
