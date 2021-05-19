import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';

import styles, { theme } from './TextInput.styles';

type PaperTextInputProps = React.ComponentProps<typeof PaperTextInput>;
type TextInputProps = PaperTextInputProps & {
    active?: boolean;
    leftIcon?: Element;
};

const TextInput = React.forwardRef(
    ({ active, leftIcon, ...props }: TextInputProps, _) => {
        return (
            <PaperTextInput
                {...props}
                mode={'outlined'}
                theme={theme}
                editable={active}
                {...(leftIcon
                    ? { left: <PaperTextInput.Icon name={() => leftIcon} /> }
                    : {})}
                style={[
                    styles.input,
                    active ? styles.activeInput : styles.inactiveInput,
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
