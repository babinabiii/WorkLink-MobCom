import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../utils/colors";
import { getJobPosts } from "../firebase/jobService";

const WORK_SETUP_LABELS = {
  remote: "Remote",
  onsite: "On-site",
  hybrid: "Hybrid",
};

export default function JobListingsScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [workFilter, setWorkFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      const data = await getJobPosts();
      const withMatch = (data || []).map((job) => ({
        ...job,
        match: Math.round(75 + Math.random() * 20),
      }));
      setJobs(withMatch);
    };
    load();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.companyName.toLowerCase().includes(query.toLowerCase());

      const matchesWork =
        workFilter === "all" ? true : job.workSetup === workFilter;

      return matchesQuery && matchesWork;
    });
  }, [jobs, query, workFilter]);

  const handleOpenJob = (job) => {
    router.push({
      pathname: "/(jobseeker)/jobs/[jobId]",
      params: { jobId: job.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Job Listings</Text>
          <TouchableOpacity
            style={styles.filterIconWrapper}
            onPress={() => {
              setWorkFilter((prev) => {
                if (prev === "all") return "remote";
                if (prev === "remote") return "onsite";
                if (prev === "onsite") return "hybrid";
                return "all";
              });
            }}
          >
            <Text style={styles.filterIcon}>⏳</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search job title or company"
            placeholderTextColor={COLORS.textSecondary}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              activeOpacity={0.9}
              style={styles.jobCard}
              onPress={() => handleOpenJob(job)}
            >
              <View style={styles.rowTop}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle} numberOfLines={1}>
                    {job.title}
                  </Text>
                  <Text style={styles.companyName} numberOfLines={1}>
                    {job.companyName}
                  </Text>
                </View>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>{job.match}% Match</Text>
                </View>
              </View>

              <View style={styles.rowMiddle}>
                <Text style={styles.metaText}>{job.locationText}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>
                  {WORK_SETUP_LABELS[job.workSetup] || "Flexible"}
                </Text>
              </View>

              <View style={styles.rowBottom}>
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{job.badgeText}</Text>
                </View>
                <Text style={styles.viewDetails}>View details ›</Text>
              </View>
            </TouchableOpacity>
          ))}

          {filteredJobs.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No jobs found</Text>
              <Text style={styles.emptyBody}>
                Try a different keyword or clear your filters.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  filterIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    fontSize: 18,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  listContent: {
    paddingBottom: 24,
  },
  jobCard: {
    borderRadius: 18,
    backgroundColor: COLORS.background,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  jobInfo: {
    flex: 1,
    paddingRight: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  companyName: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  matchBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#DCFCE7",
  },
  matchText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#15803D",
  },
  rowMiddle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  metaDot: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginHorizontal: 4,
  },
  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#E0EAFF",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.primary,
  },
  viewDetails: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary,
  },
  emptyState: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});

