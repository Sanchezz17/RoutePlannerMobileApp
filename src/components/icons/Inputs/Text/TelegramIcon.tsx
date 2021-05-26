import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { PaletteStorage } from '../../../palette/PaletteStorage';

interface IconProps {
    style?: StyleProp<ViewStyle>;
}

const palette = PaletteStorage.getPalette();

const TelegramIcon = ({ style }: IconProps) => (
    <Svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path
            d="M20.665 3.71682L2.93497 10.5538C1.72497 11.0398 1.73197 11.7148 2.71297 12.0158L7.26497 13.4358L17.797 6.79082C18.295 6.48782 18.75 6.65082 18.376 6.98282L9.84297 14.6838H9.84097L9.84297 14.6848L9.52897 19.3768C9.98897 19.3768 10.192 19.1658 10.45 18.9168L12.661 16.7668L17.26 20.1638C18.108 20.6308 18.717 20.3908 18.928 19.3788L21.947 5.15082C22.256 3.91182 21.474 3.35082 20.665 3.71682Z"
            fill={palette.Secondary}
        />
    </Svg>
);

export default TelegramIcon;
