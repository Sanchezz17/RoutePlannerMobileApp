import { Appearance } from 'react-native';

interface IPalette {
    readonly Primary: string;
    readonly SystemUI: string;
}

class LightPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly SystemUI: string = '#606060';
}

class DarkPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly SystemUI: string = '#606060';
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
