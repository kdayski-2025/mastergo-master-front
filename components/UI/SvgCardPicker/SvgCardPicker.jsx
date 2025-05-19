import React from 'react';
import SvgCarpenter from './svg/SvgCarpenter';
import SvgElectrician from './svg/SvgElectrician';
import SvgPlumber from './svg/SvgPlumber';

const SvgCardPicker = ({ title }) => {
  try {
    switch (title) {
      case 'Сантехник':
        return <SvgPlumber />;
      case 'Электрик':
        return <SvgElectrician />;
      case 'Плотник':
        return <SvgCarpenter />;
      default:
        throw new Error('Неизвестный тип профессии');
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default SvgCardPicker;
