import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import styles, { theme } from './TextInput.styles';

type PaperTextInputProps = React.ComponentProps<typeof PaperTextInput>;
type TextInputProps = PaperTextInputProps & {
    active?: boolean;
    leftIcon?: Element;
    mode?: 'flat' | 'outlined' | undefined;
    style?: StyleProp<ViewStyle>;
};

const TextInput = React.forwardRef(
    ({ active, leftIcon, mode, style, ...props }: TextInputProps, _) => {
        return (
            <PaperTextInput
                {...props}
                mode={mode}
                theme={theme}
                editable={active}
                {...(leftIcon
                    ? { left: <PaperTextInput.Icon name={() => leftIcon} /> }
                    : {})}
                style={[
                    styles.input,
                    active ? styles.activeInput : styles.inactiveInput,
                    style,
                ]}
            />
        );
    },
);

TextInput.defaultProps = {
    active: true,
    onChangeText: () => undefined,
};

export default TextInput;
