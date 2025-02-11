import React from 'react';
import { Text } from 'react-native';

import { tabsStyles } from './styled';

export default function TabTitle({ tab, activeTab }) {
  return (
    <Text style={[tabsStyles['tab-text'], activeTab === tab.value && tabsStyles['active-tab-text']]}>{tab.title}</Text>
  );
}
