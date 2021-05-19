import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const AddressIcon = (props: IconProps) => (
    <Svg width={17} height={17} viewBox="0 0 25 25" fill="none" {...props}>
        <Path
            d="M15.573 16.262l1.401-7.116c.947-.515 1.594-1.498 1.594-2.636a2.995 2.995 0 00-5.99 0c0 1.138.647 2.12 1.593 2.636l1.402 7.116zm0-11.548c.994 0 1.797.802 1.797 1.796 0 .995-.803 1.797-1.797 1.797a1.794 1.794 0 01-1.797-1.797c0-.994.803-1.796 1.797-1.796zm2.06 5.75l3.93-1.594v10.782l-5.846 2.431-7.332-2.431-5.99 2.395v-10.78l5.99-2.397 5.116 1.69 2.072 8.744 2.06-8.84z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default AddressIcon;
