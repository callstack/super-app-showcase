/**
 * @format
 */

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import getContainersURL from '../catalog-server/utils/getContainersURL';
import {name as appName} from './app.json';
import {version as appVersion} from './package.json';

// use this instead of Script.getFilesystemURL
const getFileSystemURL = (scriptId, caller) => _webpackContext => {
  const isContainerBundle = caller === undefined;
  const extension = isContainerBundle
    ? '.container.bundle'
    : `.${caller}.chunk.bundle`;

  return `file:///${scriptId}${extension}`;
};

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  const containersURL = getContainersURL({
    hostname: process.env.SAS_CATALOG_SERVER_URL,
    version: appVersion,
    platform: Platform.OS,
    appName,
  });

  const containersResponse = await fetch(containersURL);

  const containers = await containersResponse.json();

  const resolveURL = Federated.createURLResolver({
    containers,
  });

  let url;
  if (__DEV__ && caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else if (scriptId === 'news' || caller === 'news') {
    url = resolveURL(scriptId, caller);
  } else {
    url = getFileSystemURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: !__DEV__,
    query: {
      platform: Platform.OS, // only needed in development
    },
    verifyScriptSignature: __DEV__ ? 'off' : 'strict',
  };
});

AppRegistry.registerComponent(appName, () => App);
