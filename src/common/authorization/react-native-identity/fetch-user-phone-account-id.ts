// @ts-ignore
import RNUserIdentity, {ICLOUD_ACCESS_ERROR} from 'react-native-user-identity';

export const fetchUserPhoneAccountId = async () => {
  try {
    const result = await RNUserIdentity.getUserId({
      iosUserConfirmation: {
        title: 'Войти через iCloud',
        message: 'Ваш аккаунт iCloud будет использован для входа',
        signInButtonText: 'Войти',
        cancelButtonText: 'Отмена',
      },
      androidAccountSelectionMessage: 'Выберите аккаунт',
    });
    if (result === null) {
      console.log('User canceled UI flow');
    }
    return result;
  } catch (error) {
    if (error === ICLOUD_ACCESS_ERROR) {
      console.log('Please set up an iCloud account in settings');
    }
    return null;
  }
};
