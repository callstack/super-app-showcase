import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {ASSETS, colors, ConnectionBanner, type Asset} from 'super-app-showcase-sdk';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AssetRow from '../components/AssetRow';
import type {TradingStackParamList} from '../navigation/MainNavigator';

type NavigationProp = NativeStackNavigationProp<TradingStackParamList, 'AssetList'>;

const AssetListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = React.useCallback(
    (asset: Asset) => {
      navigation.navigate('AssetDetails', {asset});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <ConnectionBanner />
      <LegendList
        data={ASSETS}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => <AssetRow asset={item} onPress={handlePress} />}
        estimatedItemSize={69}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
});

export default AssetListScreen;