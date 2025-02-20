import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { getAssetUrl } from '../../lib/lib';
import styles from './styled';
import { Icon } from 'react-native-elements';
import { Colors } from '../../shared/tokens';

export default function DescriptionRequest({
  title = 'Описание заказа',
  description,
  address,
  photos,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.addressContainer}>
          <Icon name="location-on" size={20} color={Colors.gray600} />
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>

      {photos?.length > 0 && (
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Фотографии</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoScroll}
          >
            {photos.map((photo, index) => (
              <Pressable
                key={index}
                style={styles.photoWrapper}
                onPress={() => console.log('Open photo')}
              >
                <Image
                  source={{ uri: `${getAssetUrl()}/${photo}` }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
