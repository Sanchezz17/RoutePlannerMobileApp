import { Appearance } from 'react-native';

interface IPalette {
    readonly Primary: string;
    readonly PrimaryTransparent: string;
    readonly SystemUI: string;
    readonly SystemUISecondary: string;
    readonly SystemUIStroke: string;
    readonly Background: string;
}

class LightPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly PrimaryTransparent: string = '#6200EE44';
    readonly SystemUI: string = '#606060';
    readonly SystemUISecondary: string = '#808080';
    readonly SystemUIStroke: string = '#E0E0E0';
    readonly Background: string = '#FFFFFF';
}

class DarkPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly SystemUI: string = '#606060';
    readonly SystemUISecondary: string = '#808080';
    readonly SystemUIStroke: string = '#E0E0E0';
    readonly Background: string = '#FFFFFF';
}

export class PaletteStorage {
    private static lightPalette = new LightPalette();
    private static darkPalette = new DarkPalette();

    public static getPalette(): IPalette {
        if (this.lightPalette === undefined) {
            this.lightPalette = new LightPalette();
        }
        if (this.darkPalette === undefined) {
            this.darkPalette = new DarkPalette();
        }
        return Appearance.getColorScheme() === 'dark'
            ? PaletteStorage.darkPalette
            : PaletteStorage.lightPalette;
    }
}
