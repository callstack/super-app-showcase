import React, {useCallback} from 'react';
import {Alert, FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigator';
import {List, Divider} from 'react-native-paper';
import services from '../data/services.json';
import {ServicesStackParamList} from '../navigation/ServicesNavigator';

type ServiceScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ServicesStackParamList, 'Services'>,
  NativeStackScreenProps<MainStackParamList>
>;

type ServiceMenuItem = {
  id: string;
  title: string;
};

const renderSeparator = () => <Divider bold />;

const ServicesScreen = ({navigation}: ServiceScreenProps) => {
  const openBooking = useCallback(
    () => navigation.navigate('Booking'),
    [navigation],
  );

  const openNews = useCallback(() => navigation.navigate('News'), [navigation]);

  const openShopping = useCallback(
    () => navigation.navigate('Shopping'),
    [navigation],
  );

  const openDashboard = useCallback(
    () => navigation.navigate('Dashboard'),
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<ServiceMenuItem>) => {
      const map = new Map([
        ['booking', openBooking],
        ['news', openNews],
        ['shopping', openShopping],
        ['dashboard', openDashboard],
      ]);

      const onPress =
        map.get(item.id) ?? (() => Alert.alert('Not implemented yet'));

      return <List.Item title={item.title} onPress={onPress} />;
    },
    [openBooking, openDashboard, openNews, openShopping],
  );

  return (
    <FlatList
      style={styles.container}
      data={services.data}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ServicesScreen;
