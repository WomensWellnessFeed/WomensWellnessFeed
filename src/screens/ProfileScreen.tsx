import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

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
          onPress={() => {}}
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

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  isLast?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && styles.menuItemLast]}
    onPress={onPress}
  >
    <View style={styles.menuItemLeft}>
      <Icon name={icon} size={24} color={colors.primary} />
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
  </TouchableOpacity>
);

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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
});
