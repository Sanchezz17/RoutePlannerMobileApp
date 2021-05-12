import { ConfigureParams } from '@react-native-google-signin/google-signin';
import { GoogleWebClientId } from '../../secrets';

export const Config: ConfigureParams = {
    webClientId: GoogleWebClientId, // client ID of type WEB for your server (needed to verify users ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the users FROM YOUR SERVER
};
