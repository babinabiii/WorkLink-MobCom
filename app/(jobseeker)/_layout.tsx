import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const ACTIVE_COLOR = "#2563EB";
const INACTIVE_COLOR = "#6B7280";

export default function JobseekerTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                    height: 72,
                    paddingTop: 8,
                    paddingBottom: 8,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginTop: 2,
                },
                tabBarIconStyle: {
                    marginBottom: -2,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "HOME",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size || 22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="jobs"
                options={{
                    title: "JOBS",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="briefcase-outline" size={size || 22} color={color} />
                    ),
                    href: {
                        pathname: "/(jobseeker)/jobs",
                    },
                }}
            />
            <Tabs.Screen
                name="training"
                options={{
                    title: "TRAINING",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="school-outline" size={size || 22} color={color} />
                    ),
                    href: {
                        pathname: "/(jobseeker)/training",
                    },
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: "COMMUNITY",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size || 22} color={color} />
                    ),
                    href: {
                        pathname: "/(jobseeker)/community",
                    },
                }}
            />
            <Tabs.Screen
                name="chatbot"
                options={{
                    title: "AI CHATBOT",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubble-ellipses-outline" size={size || 22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "PROFILE",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size || 22} color={color} />
                    ),
                    href: {
                        pathname: "/(jobseeker)/profile",
                    },
                }}
            />
        </Tabs>
    );
}
