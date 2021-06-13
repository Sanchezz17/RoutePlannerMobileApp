import * as React from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

import AlertIcon from '../icons/Cards/AlertIcon';
import styles from './Toast.styles';

const toastConfig = {
    success: ({ text1, text2, ...rest }: BaseToastProps) => (
        <BaseToast
            {...rest}
            style={styles.toast}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1={text1}
            text2={text2}
            trailingIconStyle={styles.trailingIconInvisible}
        />
    ),
    info: ({ text1, text2, ...rest }: BaseToastProps) => (
        <BaseToast
            {...rest}
            style={styles.toast}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1={text1}
            text2={text2}
            trailingIconStyle={styles.trailingIconInvisible}
        />
    ),
    error: ({ text1, text2, ...rest }: BaseToastProps) => (
        <BaseToast
            {...rest}
            style={styles.toast}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text1={text1}
            text2={text2}
            leadingIcon={require('../icons/error.png')}
            leadingIconStyle={styles.leadingIcon}
            trailingIconStyle={styles.trailingIconInvisible}
        />
    ),
};
const ToastMessage = ({ ...props }) => (
    <Toast
        ref={(ref: any) => Toast.setRef(ref)}
        {...props}
        config={toastConfig}
        position={'bottom'}
        visibilityTime={1000}
    />
);

export default ToastMessage;
