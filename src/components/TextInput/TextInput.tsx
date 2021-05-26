import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import styles, { theme } from './TextInput.styles';

type PaperTextInputProps = React.ComponentProps<typeof PaperTextInput>;
type TextInputProps = PaperTextInputProps & {
    active?: boolean;
    leftIcon?: Element;
    rightIcon?: Element;
    mode?: 'flat' | 'outlined' | undefined;
    style?: StyleProp<ViewStyle>;
    showUnderline: boolean;
};

const TextInput = React.forwardRef(
    (
        {
            active,
            leftIcon,
            rightIcon,
            mode,
            style,
            showUnderline = true,
            ...props
        }: TextInputProps,
        _,
    ) => {
        return (
            <PaperTextInput
                {...props}
                mode={mode}
                theme={theme}
                editable={active}
                {...(leftIcon
                    ? { left: <PaperTextInput.Icon name={() => leftIcon} /> }
                    : {})}
                {...(rightIcon
                    ? {
                          right: (
                              <PaperTextInput.Icon
                                  name={() => rightIcon}
                                  style={styles.rightIcon}
                              />
                          ),
                      }
                    : {})}
                style={[
                    styles.input,
                    active ? styles.activeInput : styles.inactiveInput,
                    style,
                ]}
                underlineColor={showUnderline ? '' : 'transparent'}
            />
        );
    },
);

TextInput.defaultProps = {
    active: true,
    onChangeText: () => undefined,
};

export default TextInput;
