import React from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Avatar,
  Card,
  Button,
  Divider,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import {TabsParamList} from '../navigation/TabsNavigator';
import {HomeStackParamList} from '../navigation/HomeNavigator';
import upcomingBookings from '../data/upcomingBookings.json';
import newProducts from '../data/newProducts.json';
import recentNews from '../data/recentNews.json';
import recentArticles from '../data/recentArticles.json';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  MaterialBottomTabScreenProps<TabsParamList, 'HomeNavigator'>
>;

const renderUpcoming = ({item}: any) => (
  <Card mode="contained">
    <Card.Title
      titleVariant="titleMedium"
      subtitleVariant="bodyMedium"
      title={`${item.title} • ${item.provider}`}
      subtitle={`${item.date} ${item.time}`}
      left={props => <Avatar.Icon {...props} icon="calendar" />}
    />
    <Card.Actions>
      <Button mode="text" onPress={() => {}}>
        Cancel
      </Button>
      <Button mode="contained" onPress={() => {}}>
        Reschedule
      </Button>
    </Card.Actions>
  </Card>
);

const renderProduct: ListRenderItem<any> = ({item, index}) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: `${item.image}?${index}`}} />
    <Card.Content>
      <Title>{`${item.name} • $${item.price}`}</Title>
      <Paragraph numberOfLines={1}>{item.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={() => {}}>To Wishlist</Button>
      <Button onPress={() => {}}>Buy</Button>
    </Card.Actions>
  </Card>
);

const renderArticle: ListRenderItem<any> = ({item, index}) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: `${item.image}?${index}`}} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph numberOfLines={3}>{item.content}</Paragraph>
    </Card.Content>
  </Card>
);

const renderDivider = () => <Divider style={styles.divider} />;

const HomeScreen = ({navigation}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Upcoming Appointments
        </Text>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('Upcoming')}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={upcomingBookings.data}
        renderItem={renderUpcoming}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          New Products
        </Text>
        <Button mode="contained-tonal" onPress={() => {}}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={newProducts.data}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent News
        </Text>
        <Button mode="contained-tonal" onPress={() => {}}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentNews.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent Articles
        </Text>
        <Button mode="contained-tonal" onPress={() => {}}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentArticles.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: 'transparent',
    width: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  cardWidth: {
    width: 270,
  },
});

export default HomeScreen;
