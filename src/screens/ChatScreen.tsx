import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '../theme/ThemeContext';
import { Theme } from '../theme/themes';

// Set to true to use a fake response instead of calling the API (saves money during UI development)
const MOCK_MODE = true;

const MOCK_RESPONSE = `Great question! Here's a quick overview of **hormonal balance** and what you can do:

## Key Hormones to Know
- **Estrogen** – regulates the menstrual cycle and bone density
- **Progesterone** – supports sleep and mood stability
- **Cortisol** – your primary stress hormone; elevated levels disrupt everything else

## Practical Tips
1. **Prioritize sleep** – aim for 7–9 hours; cortisol spikes with poor sleep
2. **Limit processed sugar** – causes insulin spikes that cascade into hormonal disruption
3. **Move daily** – even a 20-minute walk lowers cortisol meaningfully
4. **Track your cycle** – apps like Clue help you spot patterns in mood and energy

> Always consult a healthcare provider before making major changes, especially if you suspect a thyroid or adrenal issue.

Is there a specific hormone or symptom you'd like to dig into?`;

const API_BACKEND_URL = 'https://womenswellnessfeedd-production.up.railway.app/api/chat';

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
            let assistantMessage: string;

            if (MOCK_MODE) {
                await new Promise(resolve => setTimeout(resolve, 800));
                assistantMessage = MOCK_RESPONSE;
            } else {
                const systemPrompt = `You are Dr. Diane, a compassionate and evidence-based women's wellness advisor. Answer user questions clearly, cite general best practices when appropriate, and suggest seeing a healthcare professional when needed. Format your responses using markdown: use **bold** for key terms, bullet points or numbered lists for steps, ## headings for sections, and > blockquotes for important caveats.`;

                const openaiKey = (global as any).__OPENAI_API_KEY__ || (typeof process !== 'undefined' && (process.env as any)?.OPENAI_API_KEY) || '';

                const requestMessages = [
                    { role: 'system', content: systemPrompt },
                    ...updatedMessages.map(m => ({ role: m.role, content: m.content })),
                ];

                if (openaiKey) {
                    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${openaiKey}`,
                        },
                        body: JSON.stringify({
                            model: 'gpt-4o-mini',
                            messages: requestMessages,
                            max_tokens: 1000,
                            temperature: 0.7,
                        }),
                    });
                    const json = await resp.json();
                    assistantMessage = json?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
                } else {
                    const response = await fetch(API_BACKEND_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages: requestMessages }),
                    });
                    const data = await response.json();
                    assistantMessage = data?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
                }
            }

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

    const markdownStyles = {
        body: { color: theme.text, fontSize: 15, lineHeight: 22 },
        heading2: { color: theme.text, fontSize: 16, fontWeight: '700' as const, marginTop: 10, marginBottom: 4 },
        strong: { color: theme.text, fontWeight: '700' as const },
        bullet_list: { marginVertical: 4 },
        ordered_list: { marginVertical: 4 },
        list_item: { marginBottom: 4 },
        blockquote: {
            backgroundColor: theme.background,
            borderLeftColor: theme.primary,
            borderLeftWidth: 3,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 4,
            marginVertical: 6,
        },
        code_inline: {
            backgroundColor: theme.background,
            color: theme.primary,
            borderRadius: 4,
            paddingHorizontal: 4,
        },
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                {MOCK_MODE && (
                    <View style={styles.mockBadge}>
                        <Text style={styles.mockBadgeText}>MOCK</Text>
                    </View>
                )}
                <Text style={styles.name}>Dr. Diane</Text>
                <TouchableOpacity
                    onPress={() => setMessages([])}
                    style={styles.clearButton}
                    accessibilityLabel="Clear conversation"
                >
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
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
                            <Text style={styles.bubbleRole}>{msg.role === 'user' ? 'You' : 'Dr. Diane'}</Text>
                            {msg.role === 'assistant' ? (
                                <Markdown style={markdownStyles}>{msg.content}</Markdown>
                            ) : (
                                <Text style={styles.userBubbleText}>{msg.content}</Text>
                            )}
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

const createStyles = (theme: Theme) =>
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
        mockBadge: {
            position: 'absolute',
            left: 16,
            top: 28,
            backgroundColor: '#f59e0b',
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 3,
        },
        mockBadgeText: {
            color: '#fff',
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.5,
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
            paddingTop: 16,
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
        },
        userBubbleText: {
            fontSize: 15,
            color: '#fff',
            lineHeight: 22,
        },
        clearButton: {
            position: 'absolute',
            right: 16,
            top: 28,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            backgroundColor: theme.background,
        },
        clearText: {
            color: theme.textSecondary,
            fontWeight: '700',
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
