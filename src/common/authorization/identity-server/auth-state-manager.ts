import {
  authorize,
  AuthorizeResult,
  refresh,
  RefreshResult,
  revoke,
} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from './config';

const USER_STATE_KEY = 'USER_STATE';

export async function getAuthStateAsync(): Promise<AuthorizeResult | null> {
  const jsonAuthState = await AsyncStorage.getItem(USER_STATE_KEY);
  console.log(jsonAuthState);
  if (!jsonAuthState) {
    return null;
  }
  return JSON.parse(jsonAuthState);
}

export async function setAuthStateAsync(authState: AuthorizeResult) {
  const jsonUserState = JSON.stringify(authState);
  await AsyncStorage.setItem(USER_STATE_KEY, jsonUserState);
}

export async function authorizeAsync(): Promise<AuthorizeResult> {
  return await authorize(Config);
}

//Refresh token
export async function refreshAuthStateAsync(
  authState: AuthorizeResult,
): Promise<RefreshResult> {
  return await refresh(Config, {
    refreshToken: authState.refreshToken,
  });
}

export async function populateAuthStateAsync(): Promise<AuthorizeResult> {
  const authState = await authorizeAsync();
  await setAuthStateAsync(authState);
  return authState;
}

export async function getOrPopulateAuthStateAsync(): Promise<AuthorizeResult> {
  let authState =
    (await getAuthStateAsync()) ?? (await populateAuthStateAsync());
  if (Date.parse(authState.accessTokenExpirationDate) >= Date.now()) {
    const refreshState = await refreshAuthStateAsync(authState);
    authState = Object.assign(authState, refreshState);
  }
  console.log(authState);
  return authState;
}

export async function getIdTokenAsync() {
  const userState = await getOrPopulateAuthStateAsync();
  return userState.idToken;
}

// Revoke token, note that Identity Server expects a client id on revoke
export async function revokeAsync() {
  const authState = await getOrPopulateAuthStateAsync();
  await revoke(Config, {
    tokenToRevoke: authState.refreshToken,
    sendClientId: true,
  });
}
