import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

type Props = {
    onNavigateToSignUp: () => void;
};

export const LoginScreen: React.FC<Props> = ({ onNavigateToSignUp }) => {
    const { login } = useAuth();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) return;
        setIsSubmitting(true);
        await login(email.trim());
        setIsSubmitting(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.brand}>Wellness</Text>
                    <Text style={styles.tagline}>Welcome back</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Log in to your account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        placeholderTextColor={theme.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={theme.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoComplete="current-password"
                    />

                    <TouchableOpacity
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isSubmitting}
                        activeOpacity={0.8}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Log In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onNavigateToSignUp} style={styles.signUpLink}>
                        <Text style={styles.signUpLinkText}>
                            Don't have an account?{' '}
                            <Text style={styles.signUpLinkBold}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        flex: {
            flex: 1,
            backgroundColor: theme.primary,
        },
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 48,
        },
        header: {
            alignItems: 'center',
            marginBottom: 36,
        },
        brand: {
            fontSize: 36,
            fontWeight: '800',
            color: '#fff',
            letterSpacing: 1,
        },
        tagline: {
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            marginTop: 6,
            textAlign: 'center',
        },
        card: {
            backgroundColor: theme.surface,
            borderRadius: 20,
            padding: 28,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6,
        },
        title: {
            fontSize: 22,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 24,
        },
        input: {
            backgroundColor: theme.background,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 13,
            fontSize: 15,
            color: theme.text,
            marginBottom: 14,
        },
        button: {
            backgroundColor: theme.primary,
            borderRadius: 10,
            paddingVertical: 15,
            alignItems: 'center',
            marginTop: 6,
        },
        buttonDisabled: {
            opacity: 0.6,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '700',
        },
        signUpLink: {
            marginTop: 20,
            alignItems: 'center',
        },
        signUpLinkText: {
            fontSize: 13,
            color: theme.textSecondary,
        },
        signUpLinkBold: {
            color: theme.primary,
            fontWeight: '600',
        },
    });
