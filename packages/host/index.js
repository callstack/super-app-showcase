import {ScriptManager} from '@callstack/repack/client';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

ScriptManager.shared.setStorage(AsyncStorage);

AppRegistry.registerComponent(appName, () => App);
