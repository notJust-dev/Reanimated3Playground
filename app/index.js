import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import cities from '../data/cities';
import Animated, { useSharedValue } from 'react-native-reanimated';
import React from 'react';
import SkeletonItem from '../components/SkeletonItem';

const CityItem = ({ item }) => (
  <Link href={`/${item.id}`} asChild>
    <Pressable style={styles.city}>
      <Animated.Image
        sharedTransitionTag={`image-${item.id}`}
        style={styles.image}
        source={{ uri: item.image }}
      />
      <Animated.Text
        sharedTransitionTag={`title-${item.id}`}
        style={styles.name}
      >
        {item.name}
      </Animated.Text>
    </Pressable>
  </Link>
);

const CityGrid = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <FlatList
        data={Array(10)}
        renderItem={() => <SkeletonItem />}
        numColumns={2}
      />
    );
  }

  return (
    <FlatList
      data={cities}
      renderItem={({ item }) => <CityItem item={item} />}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  city: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    backgroundColor: 'gainsboro',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default CityGrid;
