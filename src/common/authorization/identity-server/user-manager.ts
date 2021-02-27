import {authorize, refresh, revoke} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from './config';

const USER_KEY = 'USER';

export async function getCurrentUserAsync() {
  let jsonUserState = await AsyncStorage.getItem(USER_KEY);
  console.log(jsonUserState);
  if (!jsonUserState) {
    const userState = await authorizeAsync();
    jsonUserState = JSON.stringify(userState);
    await AsyncStorage.setItem(USER_KEY, jsonUserState);
    return userState;
  }
  return JSON.parse(jsonUserState);
}

export async function authorizeAsync() {
  const authState = await authorize(Config);
  return authState;
}

//Refresh token
export async function refreshStateAsync() {
  const userState = await getCurrentUserAsync();
  await refresh(Config, {
    refreshToken: userState.refreshToken,
  });
}

// Revoke token, note that Identity Server expects a client id on revoke
export async function revokeAsync() {
  const userState = await getCurrentUserAsync();
  await revoke(Config, {
    tokenToRevoke: userState.refreshToken,
    sendClientId: true,
  });
}
