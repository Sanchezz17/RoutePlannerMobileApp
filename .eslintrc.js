module.exports = {
    root: true,
    extends: '@react-native-community',
    rules: {
        "prettier/prettier": ["error",{
            "endOfLine": "auto"}
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error"
    },
    plugins: ["simple-import-sort"]
};
