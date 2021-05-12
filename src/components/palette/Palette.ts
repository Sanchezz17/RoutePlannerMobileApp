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

export class Palette implements IPalette {
    private readonly currentThemePalette: IPalette =
        Appearance.getColorScheme() === 'dark'
            ? new DarkPalette()
            : new LightPalette();

    readonly Primary: string = this.currentThemePalette.Primary;
    readonly SystemUI: string = this.currentThemePalette.SystemUI;
}
