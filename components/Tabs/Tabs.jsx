import React, { useState } from 'react';

import { tabsStyles } from './styled';
import TabTitle from './TabTitle';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function Tabs({ tabs, children, onTabChange, activeTab }) {
  return (
    <>
      <View style={tabsStyles.tabs}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              tabsStyles.tab,
              activeTab === tab.value && tabsStyles['tab-active'],
            ]}
            onPress={() => onTabChange(tab.value)}
          >
            <TabTitle tab={tab} activeTab={activeTab} />
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={tabsStyles['tab-content']}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { activeTab })
        )}
      </ScrollView>
    </>
  );
}
