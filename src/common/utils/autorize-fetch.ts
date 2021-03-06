import {getAccessTokenAsync} from '../authorization/identity-server/auth-state-manager';

export const authorizeFetch = async (
  url: string,
  options: object | null = null,
) => {
  const token = await getAccessTokenAsync();
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
