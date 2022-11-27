import React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Card,
  Button,
  Divider,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import products from '../data/products.json';

const showNotImplementedAlert = () => Alert.alert('Not implemented yet');

const renderProduct = ({item}: any) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: item.image}} />
    <Card.Content>
      <Title>{`${item.name} • $${item.price}`}</Title>
      <Paragraph numberOfLines={1}>{item.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={showNotImplementedAlert}>To Wishlist</Button>
      <Button onPress={showNotImplementedAlert}>Buy</Button>
    </Card.Actions>
  </Card>
);

const renderSliderItem = () => {
  return (
    <Image
      source={{uri: 'https://picsum.photos/700'}}
      style={styles.sliderItem}
    />
  );
};

const renderDivider = () => <Divider style={styles.divider} />;

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products.data}
        renderItem={renderSliderItem}
        pagingEnabled
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Featured Products
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          See All
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
          New Products
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          See All
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
          You may also like
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          See All
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
    </ScrollView>
  );
};

const {width: sliderItemWidth} = Dimensions.get('screen');

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
  sliderItem: {
    width: sliderItemWidth,
    height: (sliderItemWidth / 3) * 2,
  },
});

export default HomeScreen;
