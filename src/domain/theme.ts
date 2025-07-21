

export interface Theme {
    theme: string;
    word: string;
    mismatch: string;
}


export interface ValidatedTheme {
    theme: Theme;
    validation: string;
}
