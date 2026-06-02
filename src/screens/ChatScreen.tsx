import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

const API_URL = 'http://localhost:3000/api/chat';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export const ChatScreen: React.FC = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const updatedMessages: ChatMessage[] = [
            ...messages,
            { role: 'user', content: trimmedInput },
        ];

        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await response.json();
            const assistantMessage = data.message?.content || "Sorry, I couldn't get a response.";

            setMessages([
                ...updatedMessages,
                { role: 'assistant', content: assistantMessage },
            ]);
        } catch (error) {
            console.error(error);
            setMessages([
                ...updatedMessages,
                {
                    role: 'assistant',
                    content: 'Something went wrong while sending your message. Please try again.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.intro}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitial}>D</Text>
                </View>
                <Text style={styles.doctorName}>Dr. Diane</Text>
                <Text style={styles.doctorSubtitle}>Women's Wellness Advisor</Text>
            </View>

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                showsVerticalScrollIndicator={false}
            >
                {messages.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>
                            Ask about hormones, mood, nutrition, or care plans.
                        </Text>
                    </View>
                ) : (
                    messages.map((msg, index) => (
                        <View
                            key={index}
                            style={msg.role === 'user' ? styles.userRow : styles.assistantRow}
                        >
                            <View
                                style={
                                    msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                                }
                            >
                                <Text
                                    style={
                                        msg.role === 'user'
                                            ? styles.userBubbleText
                                            : styles.assistantBubbleText
                                    }
                                >
                                    {msg.content}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
                {loading && (
                    <View style={styles.assistantRow}>
                        <View style={[styles.assistantBubble, styles.typingBubble]}>
                            <ActivityIndicator size="small" color={theme.primary} />
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputRow}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask Dr. Diane..."
                    placeholderTextColor={theme.textSecondary}
                    style={styles.input}
                    editable={!loading}
                    returnKeyType="send"
                    onSubmitEditing={sendMessage}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled]}
                    onPress={sendMessage}
                    disabled={!input.trim() || loading}
                    activeOpacity={0.8}
                >
                    <Icon name="arrow-upward" size={20} color={theme.surface} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        intro: {
            backgroundColor: theme.surface,
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 24,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        avatarCircle: {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: theme.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
        },
        avatarInitial: {
            fontSize: 22,
            fontWeight: '700',
            color: theme.primary,
        },
        doctorName: {
            fontSize: 17,
            fontWeight: '700',
            color: theme.text,
            letterSpacing: -0.2,
        },
        doctorSubtitle: {
            fontSize: 13,
            color: theme.textSecondary,
            marginTop: 2,
        },
        messages: {
            flex: 1,
        },
        messagesContent: {
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
        },
        emptyState: {
            paddingTop: 32,
            alignItems: 'center',
        },
        emptyText: {
            color: theme.textSecondary,
            fontSize: 15,
            textAlign: 'center',
            lineHeight: 22,
            maxWidth: 240,
        },
        userRow: {
            alignItems: 'flex-end',
            marginBottom: 10,
        },
        assistantRow: {
            alignItems: 'flex-start',
            marginBottom: 10,
        },
        userBubble: {
            backgroundColor: theme.primary,
            paddingHorizontal: 16,
            paddingVertical: 11,
            borderRadius: 20,
            borderBottomRightRadius: 6,
            maxWidth: '80%',
        },
        assistantBubble: {
            backgroundColor: theme.surface,
            paddingHorizontal: 16,
            paddingVertical: 11,
            borderRadius: 20,
            borderBottomLeftRadius: 6,
            maxWidth: '80%',
        },
        typingBubble: {
            paddingVertical: 14,
            paddingHorizontal: 20,
        },
        userBubbleText: {
            fontSize: 15,
            color: theme.surface,
            lineHeight: 22,
        },
        assistantBubbleText: {
            fontSize: 15,
            color: theme.text,
            lineHeight: 22,
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 12,
            paddingBottom: Platform.select({ ios: 28, default: 12 }),
            borderTopWidth: 1,
            borderTopColor: theme.border,
            backgroundColor: theme.surface,
            gap: 10,
        },
        input: {
            flex: 1,
            backgroundColor: theme.background,
            color: theme.text,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontSize: 15,
            maxHeight: 120,
        },
        sendButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        sendButtonDisabled: {
            opacity: 0.4,
        },
    });
