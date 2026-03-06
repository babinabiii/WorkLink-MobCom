import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../../src/components/cards/CourseCard";
import InsightCard from "../../../src/components/cards/InsightCard";
import ProgressCard from "../../../src/components/cards/ProgressCard";
import ScreenContainer from "../../../src/components/ui/ScreenContainer";
import SectionHeader from "../../../src/components/ui/SectionHeader";
import COLORS from "../../../src/utils/colors";

type RecommendedCourse = {
  id: string;
  title: string;
  description: string;
  duration: string;
  rating: string;
  image?: string;
  category?: string;
  started?: boolean;
};

type InProgressCourse = {
  id: string;
  title: string;
  completedModules: number;
  totalModules: number;
  progressPercent: number;
};

const INITIAL_RECOMMENDED: RecommendedCourse[] = [
  {
    id: "c1",
    title: "Advanced React Patterns",
    description: "Master modern React hooks and performance optimization techniques.",
    duration: "4h 30m",
    rating: "4.8",
  },
  {
    id: "c2",
    title: "UI/UX Design Fundamentals",
    description: "Learn the basics of user interface and user experience design.",
    duration: "6h 15m",
    rating: "4.9",
  },
  {
    id: "c3",
    title: "Accessibility for Designers",
    description: "Design products that are inclusive and accessible by default.",
    duration: "3h 20m",
    rating: "4.7",
  },
  {
    id: "c4",
    title: "Product Thinking Basics",
    description: "Think like a product manager and prioritize user value.",
    duration: "5h 5m",
    rating: "4.6",
  },
];

const INITIAL_IN_PROGRESS: InProgressCourse[] = [
  {
    id: "p1",
    title: "TypeScript for Beginners",
    completedModules: 9,
    totalModules: 12,
    progressPercent: 75,
  },
  {
    id: "p2",
    title: "Accessibility Standards",
    completedModules: 2,
    totalModules: 8,
    progressPercent: 25,
  },
];

export default function TrainingScreen() {
  const router = useRouter();
  const [recommended, setRecommended] = useState<RecommendedCourse[]>(INITIAL_RECOMMENDED);
  const [inProgress, setInProgress] = useState<InProgressCourse[]>(INITIAL_IN_PROGRESS);
  const [highlightCourseId, setHighlightCourseId] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const coursesOffsetY = useRef(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleImproveSkills = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: coursesOffsetY.current - 40, animated: true });
    }
    if (recommended.length > 0) {
      const firstId = recommended[0].id;
      setHighlightCourseId(firstId);
      setTimeout(() => {
        setHighlightCourseId((current) => (current === firstId ? null : current));
      }, 1200);
    }
  };

  const handlePressCourse = (course: RecommendedCourse) => {
    Alert.alert(course.title, course.description);
  };

  const ensureInProgressFromCourse = (course: RecommendedCourse) => {
    setInProgress((current) => {
      const exists = current.find((c) => c.id === course.id);
      if (exists) return current;
      return [
        {
          id: course.id,
          title: course.title,
          completedModules: 0,
          totalModules: 10,
          progressPercent: 5,
        },
        ...current,
      ];
    });
  };

  const handlePlayCourse = (course: RecommendedCourse) => {
    setRecommended((current) =>
      current.map((c) => (c.id === course.id ? { ...c, started: true } : c)),
    );
    ensureInProgressFromCourse(course);
    Alert.alert("Course added", "Course added to In Progress.");
  };

  const handleContinue = (course: InProgressCourse) => {
    setInProgress((current) =>
      current.map((c) => {
        if (c.id !== course.id) return c;
        const nextPercent = Math.min(c.progressPercent + 5, 100);
        const nextCompleted = Math.min(
          c.totalModules,
          Math.round((nextPercent / 100) * c.totalModules),
        );
        return { ...c, progressPercent: nextPercent, completedModules: nextCompleted };
      }),
    );
    Alert.alert("Keep going", "Resuming your lesson progress.");
  };

  const onScroll = (_event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // reserved for future scroll-based effects
  };

  const matchPercent = 85;

  const recommendedList = useMemo(() => recommended, [recommended]);
  const inProgressList = useMemo(() => inProgress, [inProgress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
          <Text style={styles.screenTitle}>Training</Text>
        </Animated.View>

        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <InsightCard matchPercent={matchPercent} onImproveSkills={handleImproveSkills} />
          </Animated.View>

          <View
            onLayout={(event) => {
              coursesOffsetY.current = event.nativeEvent.layout.y;
            }}
          >
            <SectionHeader
              title="Recommended Courses"
              actionLabel="See all"
              onPressAction={() => router.push("/(jobseeker)/training/all")}
            />

            {recommendedList.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                duration={course.duration}
                rating={course.rating}
                started={course.started}
                highlighted={highlightCourseId === course.id}
                onPress={() => handlePressCourse(course)}
                onPressPlay={() => handlePlayCourse(course)}
              />
            ))}
          </View>

          <View style={styles.sectionSpacing} />

          <SectionHeader title="In Progress" />

          {inProgressList.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No courses in progress yet</Text>
              <Text style={styles.emptyBody}>
                Start a recommended course above to see your progress here.
              </Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {inProgressList.map((course) => (
                <ProgressCard
                  key={course.id}
                  title={course.title}
                  completedModules={course.completedModules}
                  totalModules={course.totalModules}
                  progressPercent={course.progressPercent}
                  onContinue={() => handleContinue(course)}
                />
              ))}
            </ScrollView>
          )}
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
  headerContainer: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionSpacing: {
    height: 24,
  },
  horizontalList: {
    paddingVertical: 8,
  },
  emptyCard: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginTop: 8,
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

