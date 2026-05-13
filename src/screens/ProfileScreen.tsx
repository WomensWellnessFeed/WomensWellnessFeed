import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { MenuItem } from '../components/MenuItem/MenuItem';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>jane.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <MenuItem
          icon="bookmark"
          title="Saved Articles"
          onPress={() => {
            console.log("print saved articles")
          }}
        />
        <MenuItem
          icon="favorite"
          title="Liked Posts"
          onPress={() => {}}
        />
        <MenuItem
          icon="notifications"
          title="Notifications"
          onPress={() => {}}
        />
        <MenuItem
          icon="settings"
          title="Settings"
          onPress={() => {}}
        />
        <MenuItem
          icon="help"
          title="Help & Support"
          onPress={() => {}}
        />
        <MenuItem
          icon="logout"
          title="Logout"
          onPress={() => {}}
          isLast
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    padding: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.surface,
    marginTop: 16,
  },

});
