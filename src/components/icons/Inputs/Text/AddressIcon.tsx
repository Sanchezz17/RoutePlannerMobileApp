import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const AddressIcon = ({ style }: IconProps) => (
    <Svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path
            d="M15.6 15.768L17.004 8.64C17.952 8.124 18.6 7.14 18.6 6C18.6 5.20435 18.284 4.44129 17.7213 3.87868C17.1587 3.31607 16.3957 3 15.6 3C14.8044 3 14.0413 3.31607 13.4787 3.87868C12.9161 4.44129 12.6 5.20435 12.6 6C12.6 7.14 13.248 8.124 14.196 8.64L15.6 15.768ZM15.6 4.2C16.596 4.2 17.4 5.004 17.4 6C17.4 6.996 16.596 7.8 15.6 7.8C14.604 7.8 13.8 6.996 13.8 6C13.8 5.004 14.604 4.2 15.6 4.2ZM17.664 9.96L21.6 8.364V19.164L15.744 21.6L8.40002 19.164L2.40002 21.564V10.764L8.40002 8.364L13.524 10.056L15.6 18.816L17.664 9.96Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default AddressIcon;
