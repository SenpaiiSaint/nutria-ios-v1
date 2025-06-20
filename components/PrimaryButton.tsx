import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function PrimaryButton({ 
  children, 
  onPress, 
  style, 
  size = 'medium',
  icon,
  variant = 'primary'
}: PrimaryButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#f1f5f9',
          borderColor: '#e2e8f0',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: '#22c55e',
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: '#22c55e',
          borderColor: '#22c55e',
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return '#475569';
      case 'outline':
        return '#22c55e';
      default:
        return 'white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingVertical: 20,
          paddingHorizontal: 28,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 16,
          paddingHorizontal: 20,
          fontSize: 16,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const textColor = getTextColor();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variantStyles,
        sizeStyles,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && <Ionicons name={icon as any} size={18} color={textColor} />}
        <Text style={[styles.text, { color: textColor, fontSize: sizeStyles.fontSize }]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
}); 