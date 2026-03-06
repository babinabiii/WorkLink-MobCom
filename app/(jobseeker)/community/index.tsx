import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../../src/utils/colors";
import ScreenContainer from "../../../src/components/ui/ScreenContainer";
import IconButton from "../../../src/components/ui/IconButton";
import SectionHeader from "../../../src/components/ui/SectionHeader";
import SuccessStoryCard from "../../../src/components/cards/SuccessStoryCard";
import DiscussionPostCard from "../../../src/components/cards/DiscussionPostCard";
import MentorCTA from "../../../src/components/cards/MentorCTA";

type Post = {
  id: string;
  name: string;
  role: string;
  timeAgo: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  followed: boolean;
};

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Product Design",
    timeAgo: "2h ago",
    text:
      "Just landed my first role after completing the Advanced React Course! The mentorship program here really helped me refine my portfolio",
    likes: 151,
    comments: 60,
    liked: false,
    followed: false,
  },
  {
    id: "2",
    name: "Michael Ross",
    role: "Front Dev",
    timeAgo: "5h ago",
    text:
      "Anyone interested in a study group for the System Design interview prep? Planning to start next week.",
    likes: 28,
    comments: 8,
    liked: false,
    followed: false,
  },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const storyOpacity = useRef(new Animated.Value(0)).current;
  const feedOpacity = useRef(new Animated.Value(0)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(80, [
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(storyOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(feedOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(ctaOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, storyOpacity, feedOpacity, ctaOpacity]);

  const handleToggleFollow = (id: string) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, followed: !post.followed } : post,
      ),
    );
  };

  const handleToggleLike = (id: string) => {
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== id) return post;
        const liked = !post.liked;
        const likes = liked ? post.likes + 1 : Math.max(post.likes - 1, 0);
        return { ...post, liked, likes };
      }),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <Animated.View style={[styles.headerRow, { opacity: headerOpacity }]}>
          <Text style={styles.title}>Community</Text>
          <IconButton
            name="person-add-outline"
            onPress={() =>
              Alert.alert("Coming soon", "Invite or connect feature coming soon.")
            }
          />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={{ opacity: storyOpacity }}>
            <SectionHeader title="Success Stories" />
            <SuccessStoryCard
              title="From Junior to Lead in 2 Years"
              quote="The mentorship i received through WorkLink was pivotal..."
              onReadMore={() => router.push("/(jobseeker)/community/story/1")}
            />
          </Animated.View>

          <Animated.View style={{ opacity: feedOpacity }}>
            <SectionHeader
              title="Discussion Feed"
              actionLabel="See all"
              onPressAction={() => router.push("/(jobseeker)/community/all")}
            />

            {posts.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No posts yet</Text>
                <Text style={styles.emptyBody}>
                  When the community starts sharing, updates will appear here.
                </Text>
              </View>
            ) : (
              posts.map((post) => (
                <DiscussionPostCard
                  key={post.id}
                  name={post.name}
                  role={post.role}
                  timeAgo={post.timeAgo}
                  text={post.text}
                  likes={post.likes}
                  comments={post.comments}
                  liked={post.liked}
                  followed={post.followed}
                  onToggleFollow={() => handleToggleFollow(post.id)}
                  onToggleLike={() => handleToggleLike(post.id)}
                  onPressComment={() =>
                    Alert.alert("Comments", "Comments coming soon.")
                  }
                  onPressShare={() =>
                    Alert.alert("Share", "Share options coming soon.")
                  }
                  onPressMore={() =>
                    Alert.alert("Post options", "Report • Save • Cancel")
                  }
                />
              ))
            )}
          </Animated.View>

          <Animated.View style={{ opacity: ctaOpacity }}>
            <MentorCTA
              onConnect={() =>
                Alert.alert("Coming soon", "Mentor matching coming soon.")
              }
            />
          </Animated.View>
        </ScrollView>
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  emptyCard: {
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginTop: 4,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  emptyBody: {
    fontSize: 13,
    color: COLORS.mutedText,
  },
});

