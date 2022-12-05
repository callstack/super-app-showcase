import React from 'react';
import {Alert, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Card,
  Button,
  Divider,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import bookings from '../data/bookings.json';
import products from '../data/products.json';
import news from '../data/news.json';
import articles from '../data/articles.json';

const showNotImplementedAlert = () => Alert.alert('Not implemented yet');

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
      <Button mode="text" onPress={showNotImplementedAlert}>
        Cancel
      </Button>
      <Button mode="contained" onPress={showNotImplementedAlert}>
        Edit
      </Button>
    </Card.Actions>
  </Card>
);

const renderProduct = ({item}: any) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: item.image}} />
    <Card.Content>
      <Title>{`${item.name} • $${item.price}`}</Title>
      <Paragraph numberOfLines={1}>{item.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={showNotImplementedAlert}>Delete</Button>
      <Button onPress={showNotImplementedAlert}>Edit</Button>
    </Card.Actions>
  </Card>
);

const renderArticle = ({item}: any) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: item.image}} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph numberOfLines={3}>{item.content}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={showNotImplementedAlert}>Delete</Button>
      <Button onPress={showNotImplementedAlert}>Edit</Button>
    </Card.Actions>
  </Card>
);

const renderDivider = () => <Divider style={styles.divider} />;

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          My Appointments
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          Manage
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={bookings.data}
        renderItem={renderUpcoming}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          My Products
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          Manage
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products.data}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          My News
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          Manage
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={news.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          My Articles
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          Manage
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={articles.data}
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
