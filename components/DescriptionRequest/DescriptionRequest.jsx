import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Modal } from 'react-native';
import { getAssetUrl } from '../../lib/lib';
import styles from './styled';
import { Icon } from 'react-native-elements';
import { Colors } from '../../shared/tokens';
import { Ionicons } from '@expo/vector-icons';

export default function DescriptionRequest({
  title = 'Описание заказа',
  description,
  address,
  photos,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
                onPress={() => {
                  setSelectedPhoto(photo);
                  setModalVisible(true);
                }}
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

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          {selectedPhoto && (
            <Image
              source={{ uri: `${getAssetUrl()}/${selectedPhoto}` }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </View>
  );
}
