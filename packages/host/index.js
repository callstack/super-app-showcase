/**
 * @format
 */

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const resolveURL = Federated.createURLResolver({
  containers: {
    booking: 'http://localhost:9000/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
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
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);
