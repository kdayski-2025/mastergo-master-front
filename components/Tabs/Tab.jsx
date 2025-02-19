import React from 'react';
import { View } from 'react-native';

import { tabsStyles } from './styled';

export default function Tab({ children, value, activeTab }) {
  return (
    <>
      {value === activeTab && (
        <View style={tabsStyles['tab-item']}>{children}</View>
      )}
    </>
  );
}
