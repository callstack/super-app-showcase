import React from 'react';
import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import AccountNavigator from './AccountNavigator';

export type TabsParamList = {
  AccountNavigator: undefined;
};

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator translucent={false}>
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{title: 'Account'}}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;