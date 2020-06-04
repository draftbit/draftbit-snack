export const EXPO_VERSION = "37.0.0";

/* A loading indicator screen while we sync rest of dependencies & modules */
export const INITIAL_LOADING_CODE = `
import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5a45ff'}}>
      <ActivityIndicator size='large' color='#FFF' />
    </View>
  )
}
`;

export function filesToSnackFileStructure(files) {
  return files.reduce((structure, file) => {
    structure[file.path] = {
      name: file.name,
      type: file.type,
      contents: file.contents,
    };

    return structure;
  }, {});
}

export function importsToDependencies(imports) {
  return imports.reduce((prev, cur) => {
    prev[cur.package] = module;
    return prev;
  }, {});
}

/* Draftbit Specific Modules for Snack */
export const DRAFTBIT_MODULES = {
  /* draftbit ui specific */
  "@draftbit/ui": "37.0.0-dev.11",
  "react-native-typography": "1.4.1",
  "react-request": "^3.1.2",
  "react-native-maps": "0.27.1",
  "react-native-svg": "12.1.0",
  "react-native-webview": "10.2.3",
  "@react-native-community/datetimepicker": "^2.4.0",
  "@react-native-community/masked-view": "0.1.6",

  /* navigation specific */
  "@react-navigation/native": "^5.5.0",
  "@react-navigation/stack": "^5.4.1",
  "@react-navigation/bottom-tabs": "^5.5.1",
  "react-native-safe-area-context": "0.7.3",
  "react-native-screens": "2.8.0",

  /* wtf but its needed */
  // "prop-types": "15.7.2",
};
