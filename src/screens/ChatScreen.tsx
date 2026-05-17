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
import { useTheme } from '../theme/ThemeContext';

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
                headers: {
                    'Content-Type': 'application/json',
                },
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
            <View style={styles.header}>
                <Text style={styles.name}>Dr. Diane</Text>
            </View>

            <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.length === 0 ? (
                    <Text style={styles.emptyText}>
                        Ask Dr. Diane anything about women's wellness.
                    </Text>
                ) : (
                    messages.map((msg, index) => (
                        <View
                            key={index}
                            style={msg.role === 'user' ? styles.userBubble : styles.assistantBubble}
                        >
                            <Text style={styles.bubbleRole}>{msg.role}</Text>
                            <Text style={styles.bubbleText}>{msg.content}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.inputRow}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask about hormones, mood, or care plans..."
                    placeholderTextColor={theme.textSecondary}
                    style={styles.input}
                    editable={!loading}
                    returnKeyType="send"
                    onSubmitEditing={sendMessage}
                />

                <TouchableOpacity
                    style={[styles.button, (!input.trim() || loading) && styles.buttonDisabled]}
                    onPress={sendMessage}
                    disabled={!input.trim() || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Send</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            backgroundColor: theme.surface,
            alignItems: 'center',
            padding: 32,
        },
        name: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 4,
        },
        messages: {
            flex: 1,
            paddingHorizontal: 16,
        },
        messagesContent: {
            paddingBottom: 24,
        },
        emptyText: {
            color: theme.textSecondary,
            fontSize: 16,
            marginTop: 24,
            textAlign: 'center',
        },
        userBubble: {
            alignSelf: 'flex-end',
            backgroundColor: theme.primary,
            padding: 12,
            borderRadius: 16,
            marginBottom: 12,
            maxWidth: '85%',
        },
        assistantBubble: {
            alignSelf: 'flex-start',
            backgroundColor: theme.surface,
            padding: 12,
            borderRadius: 16,
            marginBottom: 12,
            maxWidth: '85%',
        },
        bubbleRole: {
            fontSize: 12,
            fontWeight: '700',
            color: theme.textSecondary,
            marginBottom: 4,
            textTransform: 'capitalize',
        },
        bubbleText: {
            fontSize: 16,
            color: theme.text,
        },
        inputRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: theme.border,
            backgroundColor: theme.surface,
        },
        input: {
            flex: 1,
            backgroundColor: theme.background,
            color: theme.text,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: theme.border,
            marginRight: 12,
        },
        button: {
            backgroundColor: theme.primary,
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 12,
        },
        buttonDisabled: {
            opacity: 0.5,
        },
        buttonText: {
            color: 'white',
            fontWeight: '700',
        },
    });
