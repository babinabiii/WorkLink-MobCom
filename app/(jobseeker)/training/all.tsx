import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseListingCard from "../../../src/components/cards/CourseListingCard";
import ChipButton from "../../../src/components/ui/ChipButton";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import SearchInput from "../../../src/components/ui/SearchInput";
import { CATEGORIES, Course, filterCourses, getCourses } from "../../../src/data/coursesData";
import COLORS from "../../../src/utils/colors";

export default function AllCoursesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses] = useState<Course[]>(getCourses());

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, searchQuery, selectedCategory);
  }, [courses, searchQuery, selectedCategory]);

  const handleCoursePress = (courseId: string) => {
    router.push({
      pathname: "/(jobseeker)/training/course/[id]",
      params: { id: courseId },
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Courses</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search courses..."
          />
        </View>

        {/* Category Chips */}
        <View style={styles.chipsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          >
            {CATEGORIES.map((category) => (
              <ChipButton
                key={category}
                label={category}
                active={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <Text style={styles.resultsText}>
          {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
        </Text>

        {/* Course List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <Animated.View
                key={course.id}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <CourseListingCard
                  course={course}
                  onPress={() => handleCoursePress(course.id)}
                />
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color={COLORS.mutedText} />
              <Text style={styles.emptyTitle}>No courses found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search or filters
              </Text>
              <View style={styles.resetButton}>
                <PrimaryButton label="Reset Filters" onPress={handleResetFilters} />
              </View>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  chipsWrapper: {
    marginBottom: 16,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingRight: 16,
  },
  resultsText: {
    fontSize: 13,
    color: COLORS.mutedText,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.mutedText,
    textAlign: "center",
    marginBottom: 24,
  },
  resetButton: {
    width: "100%",
    maxWidth: 200,
  },
});
