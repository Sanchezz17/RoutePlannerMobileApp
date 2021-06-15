import { Appearance } from 'react-native';

interface IPalette {
    readonly Primary: string;
    readonly PrimaryTransparent: string;
    readonly PrimaryFaint: string;
    readonly Secondary: string;
    readonly SecondaryTransparent: string;
    readonly SecondaryFaint: string;
    readonly SystemUI: string;
    readonly SystemUITransparent: string;
    readonly SystemUISecondary: string;
    readonly SystemUIStroke: string;
    readonly Background: string;
}

class LightPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly PrimaryTransparent: string = '#6200EE44';
    readonly Secondary: string = '#883EF1';
    readonly SecondaryTransparent: string = '#883EF155';
    readonly SystemUI: string = '#606060';
    readonly SystemUITransparent: string = '#60606022';
    readonly SystemUISecondary: string = '#808080';
    readonly SystemUIStroke: string = '#E0E0E0';
    readonly Background: string = '#FFFFFF';
    readonly PrimaryFaint: string = '#DEC8FF';
    readonly SecondaryFaint: string = '#EBE1F9';
}

class DarkPalette implements IPalette {
    readonly Primary: string = '#6200EE';
    readonly PrimaryTransparent: string = '#6200EE44';
    readonly Secondary: string = '#883EF1';
    readonly SecondaryTransparent: string = '#883EF1';
    readonly SystemUI: string = '#606060';
    readonly SystemUITransparent: string = '#60606022';
    readonly SystemUISecondary: string = '#808080';
    readonly SystemUIStroke: string = '#E0E0E0';
    readonly Background: string = '#FFFFFF';
    readonly PrimaryFaint: string = '#DEC8FF';
    readonly SecondaryFaint: string = '#EBE1F9';
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
