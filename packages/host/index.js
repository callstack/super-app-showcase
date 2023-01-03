/**
 * @format
 */

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {Alert, AppRegistry, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './src/App';
import {name as appName} from './app.json';
import {version as appVersion} from './package.json';

const getContainersURL = (version, platform) => {
  return `http://localhost:3000/${appName}?platform=${platform}&appVersion=${version}`;
};

const alertAsync = async (title, message) => {
  return new Promise(resolve => {
    Alert.alert(title, message, [
      {
        text: 'Load',
        onPress: () => resolve(true),
      },
      {
        text: 'Cancel',
        onPress: () => resolve(false),
      },
    ]);
  });
};

const callers = {};

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  console.log('RESOLVING ->', scriptId, caller);
  const containersURL = getContainersURL(appVersion, Platform.OS);
  const response = await fetch(containersURL);

  const containers = await response.json();

  const resolveURL = Federated.createURLResolver({
    containers,
  });

  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: true, // For development
    query: {
      platform: Platform.OS,
    },
    shouldUpdateScript: async (_, __, isOutdated) => {
      if (caller && callers[caller] !== undefined) {
        return callers[caller];
      }

      if (!isOutdated) {
        return true;
      }

      const shouldUpdate = await alertAsync(
        'Update available',
        'A new version of the app is available. Do you want to update?',
      );

      if (!caller) {
        callers[scriptId] = shouldUpdate;
      }

      return shouldUpdate;
    },
  };
});

AppRegistry.registerComponent(appName, () => App);
