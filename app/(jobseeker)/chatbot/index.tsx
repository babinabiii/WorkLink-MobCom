import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import COLORS from "../../../src/utils/colors";
import ChatHeaderCard from "../../../src/components/cards/ChatHeaderCard";
import ChatBubble from "../../../src/components/cards/ChatBubble";
import ChipButton from "../../../src/components/ui/ChipButton";
import MessageComposer from "../../../src/components/ui/MessageComposer";

type Message = {
  id: string;
  from: "bot" | "user" | "typing";
  text?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    from: "bot",
    text:
      "Hello! I’m your WorkLink AI assistant. How can I help you advance your career today?",
  },
  {
    id: "2",
    from: "user",
    text: "Find jobs for me",
  },
  {
    id: "3",
    from: "bot",
    text:
      "I can definitely help with that! Could you tell me a bit more about your specific goals?",
  },
];

const QUICK_REPLIES = [
  "Find jobs for me",
  "Improve my resume",
  "Interview prep",
  "Career tips",
  "Build my portfolio",
];

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<Message> | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  const generateResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("job")) {
      return "Great, I can help you find roles that match your skills and interests. What kind of roles or locations are you most interested in?";
    }
    if (lower.includes("resume")) {
      return "Happy to help with your resume. Do you want to improve your summary, your experience bullets, or overall layout first?";
    }
    if (lower.includes("interview")) {
      return "Interview prep is a smart move. Are you focusing on behavioral questions, system design, or coding interviews?";
    }
    return "Got it. Tell me a bit more, and I’ll walk you through some next steps tailored to your situation.";
  };

  const addUserMessageAndRespond = (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      from: "user",
      text: text.trim(),
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateResponse(text);
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        from: "bot",
        text: replyText,
      };
      setMessages((current) => [...current, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    addUserMessageAndRespond(input);
  };

  const handleQuickReply = (label: string) => {
    addUserMessageAndRespond(label);
  };

  const renderItem = ({ item }: { item: Message }) => {
    return <ChatBubble from={item.from} text={item.text} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatHeaderCard />
      <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        {isTyping && (
          <View style={styles.typingWrapper}>
            <ChatBubble from="typing" />
          </View>
        )}

        <View style={styles.chipsContainer}>
          <FlatList
            data={QUICK_REPLIES}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ChipButton label={item} onPress={() => handleQuickReply(item)} />
            )}
          />
        </View>
      </Animated.View>

      <MessageComposer
        value={input}
        onChangeText={setInput}
        onSend={handleSend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  body: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typingWrapper: {
    paddingHorizontal: 16,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

