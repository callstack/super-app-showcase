import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MD3Colors, Searchbar} from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        iconColor={MD3Colors.primary50}
        style={styles.searchbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    margin: 16,
  },
});

export default SearchScreen;
