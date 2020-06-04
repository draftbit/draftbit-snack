import React from "react";
import SnackSession from "./SnackSession";

const snackFiles = [
  {
    name: "app.json",
    path: "app.json",
    type: "CODE",
    contents:
      '{\n  "expo": {\n    "name": "hihiexpo",\n    "description": "My app powered by Draftbit",\n    "slug": "hihiexpo",\n    "privacy": "unlisted",\n    "sdkVersion": "37.0.0",\n    "platforms": [\n      "ios",\n      "android",\n      "web"\n    ],\n    "version": "1.0.0",\n    "orientation": "portrait",\n    "icon": "./assets/images/icon.png",\n    "scheme": "hihiexpo",\n    "splash": {\n      "resizeMode": "cover",\n      "backgroundColor": "#5a45ff",\n      "image": "./assets/images/splash.png"\n    },\n    "assetBundlePatterns": [\n      "**/*"\n    ],\n    "ios": {\n      "bundleIdentifier": "com.draftbit.untitledapp",\n      "supportsTablet": false,\n      "buildNumber": "1.0.0"\n    },\n    "android": {\n      "versionCode": 1,\n      "package": "com.draftbit.untitledapp",\n      "permissions": []\n    },\n    "notification": {\n      "androidMode": "default"\n    },\n    "extra": {}\n  }\n}',
  },
  {
    name: "App.js",
    path: "App.js",
    type: "CODE",
    contents:
      "import * as React from 'react';\nimport { Provider as ThemeProvider } from '@draftbit/ui';\nimport FireTheme from './themes/FireTheme.js';\nimport AppNavigator from './AppNavigator'\nimport BlankScreen from './screens/BlankScreen'\nexport default function App() {\n  return <ThemeProvider theme={FireTheme}><AppNavigator /></ThemeProvider>;\n}",
  },
  {
    name: "Images.js",
    path: "config/Images.js",
    type: "CODE",
    contents:
      'export default {\n  "ThemesModalCancel": require("../assets/images/ThemesModalCancel.gif"),\n  "Themechanges": require("../assets/images/Themechanges.gif")\n}',
  },
  {
    name: "Fonts.js",
    path: "config/Fonts.js",
    type: "CODE",
    contents: "export default {}",
  },
  {
    name: "DraftbitTheme.js",
    path: "themes/DraftbitTheme.js",
    type: "CODE",
    contents:
      'import { systemWeights } from "react-native-typography";\n\nexport default {\n  disabledOpacity: 0.5,\n  spacing: {\n    gutters: 16,\n    text: 4,\n    small: 8,\n    medium: 12,\n    large: 16,\n  },\n  borderRadius: {\n    global: 6,\n    button: 24,\n  } ,\n  colors: {\n    primary: "rgba(90, 69, 255, 1)",\n    secondary: "rgba(59, 201, 234, 1)",\n    surface: "rgba(255, 255, 255, 1)",\n    background: "rgba(251, 252, 253, 1)",\n    error: "rgba(255, 69, 100, 1)",\n    divider: "rgba(234, 237, 242, 1)",\n    strong: "rgba(18, 20, 44, 1)",\n    medium: "rgba(70, 78, 88, 1)",\n    light: "rgba(165, 173, 183, 1)",\n    strongInverse: "rgba(255, 255, 255, 1)",\n    mediumInverse: "rgba(255, 255, 255, 0.87)",\n    lightInverse: "rgba(255, 255, 255, 0.68)",\n  },\n  elevation: {\n    "0": {\n      shadowColor: "rgba(18, 20, 44, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 0,\n      },\n      shadowRadius: 0,\n      shadowOpacity: 0,\n      borderWidth: 0,\n      borderColor: "rgba(18, 20, 44, 1)",\n      borderOpacity: 0,\n    },\n    "1": {\n      shadowColor: "rgba(18, 20, 44, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 2,\n      },\n      shadowRadius: 4,\n      shadowOpacity: 0.06,\n      borderWidth: 1,\n      borderColor: "rgba(18, 20, 44, 1)",\n      borderOpacity: 0.06,\n    },\n    "2": {\n      shadowColor: "rgba(18, 20, 44, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 2,\n      },\n      shadowRadius: 4,\n      shadowOpacity: 0.08,\n      borderWidth: 0,\n      borderColor: "rgba(18, 20, 44, 1)",\n      borderOpacity: 0,\n    },\n    "3": {\n      shadowColor: "rgba(18, 20, 44, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 6,\n      },\n      shadowRadius: 6,\n      shadowOpacity: 0.12,\n      borderWidth: 0,\n      borderColor: "rgba(18, 20, 44, 1)",\n      borderOpacity: 0,\n    },\n  },\n  typography: {\n    "overline": {\n      ...systemWeights.regular,\n      fontSize: 12,\n      letterSpacing: 2,\n      lineHeight: 16,\n    },\n    "caption": {\n      ...systemWeights.regular,\n      fontSize: 12,\n      letterSpacing: 0,\n      lineHeight: 16,\n    },\n    "button": {\n      ...systemWeights.bold,\n      fontSize: 14,\n      letterSpacing: 0,\n      lineHeight: 16,\n    },\n    "body2": {\n      ...systemWeights.regular,\n      fontSize: 14,\n      letterSpacing: 0,\n      lineHeight: 22,\n    },\n    "body1": {\n      ...systemWeights.regular,\n      fontSize: 16,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "subtitle2": {\n      ...systemWeights.regular,\n      fontSize: 14,\n      letterSpacing: 0,\n      lineHeight: 22,\n    },\n    "subtitle1": {\n      ...systemWeights.regular,\n      fontSize: 16,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "headline6": {\n      ...systemWeights.bold,\n      fontSize: 16,\n      letterSpacing: 0,\n      lineHeight: 24,\n    },\n    "headline5": {\n      ...systemWeights.bold,\n      fontSize: 20,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "headline4": {\n      ...systemWeights.bold,\n      fontSize: 24,\n      letterSpacing: 0,\n      lineHeight: 34,\n    },\n    "headline3": {\n      ...systemWeights.bold,\n      fontSize: 34,\n      letterSpacing: 0,\n      lineHeight: 40,\n    },\n    "headline2": {\n      ...systemWeights.bold,\n      fontSize: 48,\n      letterSpacing: 0,\n      lineHeight: 58,\n    },\n    "headline1": {\n      ...systemWeights.bold,\n      fontSize: 60,\n      letterSpacing: 0,\n      lineHeight: 71,\n    },\n  },\n};\n',
  },
  {
    name: "FireTheme.js",
    path: "themes/FireTheme.js",
    type: "CODE",
    contents:
      'import { systemWeights } from "react-native-typography";\n\nexport default {\n  disabledOpacity: 0.5,\n  spacing: {\n    gutters: 16,\n    text: 8,\n    small: 16,\n    medium: 16,\n    large: 24,\n  },\n  borderRadius: {\n    global: 8,\n    button: 8,\n  } ,\n  colors: {\n    primary: "rgba(252, 82, 115, 1)",\n    secondary: "rgba(122, 210, 206, 1)",\n    surface: "rgba(255, 255, 255, 1)",\n    background: "rgba(246, 248, 253, 1)",\n    error: "rgba(255, 107, 89, 1)",\n    divider: "rgba(157, 160, 189, 1)",\n    strong: "rgba(27, 33, 75, 1)",\n    medium: "rgba(102, 107, 149, 1)",\n    light: "rgba(155, 160, 195, 1)",\n    strongInverse: "rgba(255, 255, 255, 1)",\n    mediumInverse: "rgba(255, 255, 255, 0.87)",\n    lightInverse: "rgba(255, 255, 255, 0.68)",\n  },\n  elevation: {\n    "0": {\n      shadowColor: "rgba(27, 33, 75, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 0,\n      },\n      shadowRadius: 0,\n      shadowOpacity: 0,\n      borderWidth: 0,\n      borderColor: "rgba(27, 33, 75, 1)",\n      borderOpacity: 0,\n    },\n    "1": {\n      shadowColor: "rgba(27, 33, 75, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 4,\n      },\n      shadowRadius: 6,\n      shadowOpacity: 0.06,\n      borderWidth: 1,\n      borderColor: "rgba(27, 33, 75, 1)",\n      borderOpacity: 0.06,\n    },\n    "2": {\n      shadowColor: "rgba(27, 33, 75, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 4,\n      },\n      shadowRadius: 8,\n      shadowOpacity: 0.08,\n      borderWidth: 0,\n      borderColor: "rgba(27, 33, 75, 1)",\n      borderOpacity: 0,\n    },\n    "3": {\n      shadowColor: "rgba(27, 33, 75, 1)",\n      shadowOffset: {\n        width: 0,\n        height: 6,\n      },\n      shadowRadius: 8,\n      shadowOpacity: 0.1,\n      borderWidth: 0,\n      borderColor: "rgba(27, 33, 75, 1)",\n      borderOpacity: 0,\n    },\n  },\n  typography: {\n    "overline": {\n      fontFamily: "PoppinsMedium",\n      fontSize: 12,\n      letterSpacing: 2,\n      lineHeight: 16,\n    },\n    "caption": {\n      ...systemWeights.regular,\n      fontSize: 13,\n      letterSpacing: 0,\n      lineHeight: 16,\n    },\n    "button": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 15,\n      letterSpacing: 0,\n      lineHeight: 16,\n    },\n    "body2": {\n      fontFamily: "PoppinsRegular",\n      fontSize: 13,\n      letterSpacing: 0,\n      lineHeight: 22,\n    },\n    "body1": {\n      fontFamily: "PoppinsRegular",\n      fontSize: 15,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "subtitle2": {\n      ...systemWeights.regular,\n      fontSize: 13,\n      letterSpacing: 0,\n      lineHeight: 22,\n    },\n    "subtitle1": {\n      fontFamily: "PoppinsRegular",\n      fontSize: 15,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "headline6": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 14,\n      letterSpacing: 0,\n      lineHeight: 20,\n    },\n    "headline5": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 20,\n      letterSpacing: 0,\n      lineHeight: 26,\n    },\n    "headline4": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 24,\n      letterSpacing: 0,\n      lineHeight: 46,\n    },\n    "headline3": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 40,\n      letterSpacing: 0,\n      lineHeight: 46,\n    },\n    "headline2": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 48,\n      letterSpacing: 0,\n      lineHeight: 58,\n    },\n    "headline1": {\n      fontFamily: "PoppinsSemiBold",\n      fontSize: 60,\n      letterSpacing: 0,\n      lineHeight: 71,\n    },\n  },\n};\n',
  },
  {
    name: "BlankCopyScreen.js",
    path: "screens/BlankCopyScreen.js",
    type: "CODE",
    contents:
      "import React from 'react';\nimport { ScreenContainer } from '@draftbit/ui';\n\nclass BlankCopyScreen extends React.Component {\n  render() {\n    return <ScreenContainer hasSafeArea={true} scrollable={false} />;\n  }\n}\n\nexport default BlankCopyScreen;\n",
  },
  {
    name: "BlankScreen.js",
    path: "screens/BlankScreen.js",
    type: "CODE",
    contents:
      "import React from 'react';\nimport { withTheme, ScreenContainer, Image } from '@draftbit/ui';\nimport { Text, StyleSheet } from 'react-native';\nimport Images from '../config/Images';\n\nclass BlankScreen extends React.Component {\n  render() {\n    const { theme } = this.props;\n\n    return (\n      <ScreenContainer hasSafeArea={true} scrollable={false}>\n        <Text color={theme.colors.strong}>Hello World!</Text>\n        <Text color={theme.colors.strong}>Hello World!</Text>\n        <Text color={theme.colors.strong}>Hello World!</Text>\n        <Image\n          source={Images.ThemesModalCancel}\n          resizeMode=\"cover\"\n          style={styles.imageCb}\n        />\n        <Image\n          source={Images.ThemesModalCancel}\n          resizeMode=\"cover\"\n          style={styles.image8W}\n        />\n      </ScreenContainer>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  imageCb: {\n    width: 250,\n    height: 250,\n  },\n  image8W: {\n    height: 250,\n    width: 250,\n  },\n});\n\nexport default withTheme(BlankScreen);\n",
  },
  {
    name: "ThemesModalCancel.gif",
    path: "assets/images/ThemesModalCancel.gif",
    type: "ASSET",
    contents:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/6607982f3d520df901f508b615d7aa71",
  },
  {
    name: "Themechanges.gif",
    path: "assets/images/Themechanges.gif",
    type: "ASSET",
    contents:
      "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/55cbce25fe9d54631930742a7ddbf459",
  },
  {
    name: "AppNavigator.js",
    path: "AppNavigator.js",
    type: "CODE",
    contents:
      "import * as React from 'react';\n  import { NavigationContainer } from '@react-navigation/native';\n  import { createStackNavigator } from '@react-navigation/stack';\n  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\n  import theme from './themes/undefined';\n\n  const Stack = createStackNavigator();\n  const Tab = createBottomTabNavigator();\n\n  import { systemWeights } from 'react-native-typography';\n\n  import { Icon, Touchable } from '@draftbit/ui'\n\n  import BlankCopyScreen from './screens/BlankCopyScreen'\nimport BlankScreen from './screens/BlankScreen'\n\n  export default function AppNavigator() {\nreturn (\n  <NavigationContainer >\n    <Stack.Navigator initialRouteName=\"BlankScreen\">\n      <Stack.Screen name=\"BlankCopyScreen\"\ncomponent={BlankCopyScreen}\noptions={{title: 'Blank Copy'}} />\n<Stack.Screen name=\"BlankScreen\"\ncomponent={BlankScreen}\noptions={{title: 'Blank'}} />\n      \n    </Stack.Navigator>\n  </NavigationContainer>\n);\n}",
  },
];

function App() {
  const imports = [];
  const screen = snackFiles.find((s) => s.name == "BlankScreen.js");

  return (
    <div className="App">
      <SnackSession
        appUuid="ZfIMPDXM"
        screenUuid="2cwaFK5z"
        screenCode={screen.contents}
        screenName="BlankScreen"
        screenSlug="BlankScreen"
        deviceId="abcchangeme"
        imports={imports}
        snackFiles={snackFiles}
      />
    </div>
  );
}

export default App;
