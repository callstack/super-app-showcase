import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CalendarList, CalendarUtils, DateData} from 'react-native-calendars';
import {FAB, List, MD3Colors} from 'react-native-paper';
import recentBookings from '../data/recentBookings.json';

const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

const renderAppointment = ({item}: any) => (
  <List.Item
    title={`${item.title} • ${item.provider}`}
    description={`${item.date} ${item.time}`}
    left={props => <List.Icon {...props} icon="calendar" />}
  />
);

const CalendarScreen = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
      },
      [INITIAL_DATE]: {
        selected: true,
        selectedColor: MD3Colors.primary50,
      },
    };
  }, [selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  return (
    <View style={styles.container}>
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        hideExtraDays={false}
        current={INITIAL_DATE}
        markedDates={marked}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: 'black',
          textSectionTitleColor: 'black',
          dayTextColor: 'black',
          monthTextColor: 'black',
          indicatorColor: 'black',
          selectedDayBackgroundColor: MD3Colors.secondary50,
        }}
      />
      <FlatList data={recentBookings.data} renderItem={renderAppointment} />
      <FAB
        icon="plus"
        color={MD3Colors.primary50}
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 0,
    margin: 16,
    bottom: 0,
  },
});

export default CalendarScreen;
