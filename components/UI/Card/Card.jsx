import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styled';
import SvgBaloon from './svg/SVGBaloon';
import SvgCardPicker from '../SvgCardPicker/SvgCardPicker';
import RightArrow from '../../../assets/icons/right-arrow.svg';

const Card = ({ cardData, onPress, state }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, state === 'target' && styles.target]}>
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <SvgCardPicker title={cardData.title} />
          <Text style={styles.title}>{cardData.title}</Text>
        </View>
        <Text style={styles.description}>{cardData.description}</Text>
        <View style={styles.tableWrapper}>
          <View style={styles.fixedRow}>
            <Text style={styles.textCursive}>Где проблема?</Text>
          </View>
          <Text style={styles.row}>{cardData.where}</Text>
        </View>
        <View style={styles.tableWrapper}>
          <View style={styles.fixedRow}>
            <Text style={styles.textCursive}>Цена:</Text>
          </View>

          {cardData && cardData.price ? (
            <Text style={styles.row}>от {cardData.price}</Text>
          ) : (
            <Text style={styles.row}>Аукцион</Text>
          )}
        </View>
        <View style={styles.adress}>
          <SvgBaloon />
          <Text style={styles.row}>{cardData.adress}</Text>
        </View>
      </View>
      {state === 'target' && (
        <View style={styles.navigate}>
          <RightArrow />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Card;
