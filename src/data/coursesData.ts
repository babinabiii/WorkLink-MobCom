export type CourseModule = {
    id: string;
    number: number;
    title: string;
    lessonCount: number;
    duration: string;
    lessons?: string[];
};

export type Course = {
    id: string;
    title: string;
    description: string;
    duration: string;
    students: string;
    rating: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: "Development" | "Design" | "Business" | "Data";
    image?: string;
    thumbnail?: string;
    instructor?: string;
    lastUpdated?: string;
    language?: string;
    learningOutcomes?: string[];
    modules?: CourseModule[];
};

export const MOCK_COURSES: Course[] = [
    {
        id: "c1",
        title: "Advanced React Patterns",
        description: "Master modern React hooks and performance optimization techniques.",
        duration: "4h 30m",
        students: "12,500",
        rating: 4.8,
        level: "Advanced",
        category: "Development",
        thumbnail: "https://via.placeholder.com/400x200/0F766E/FFFFFF?text=React+Patterns",
        instructor: "Sarah Johnson",
        lastUpdated: "February 2026",
        language: "English",
        learningOutcomes: [
            "Build complex React applications with advanced patterns",
            "Optimize performance using memoization and lazy loading",
            "Create reusable custom hooks for common functionality",
            "Implement compound components and render props",
            "Integrate React Context and state management",
            "Debug and profile React applications efficiently",
        ],
        modules: [
            {
                id: "m1",
                number: 1,
                title: "Introduction to Advanced Patterns",
                lessonCount: 8,
                duration: "15 mins",
                lessons: ["What are React patterns?", "When to use advanced patterns", "Course overview"],
            },
            {
                id: "m2",
                number: 2,
                title: "Performance Optimization",
                lessonCount: 12,
                duration: "45 mins",
                lessons: ["React.memo deep dive", "useMemo and useCallback", "Code splitting strategies"],
            },
            {
                id: "m3",
                number: 3,
                title: "Custom Hooks Mastery",
                lessonCount: 10,
                duration: "38 mins",
                lessons: ["Building custom hooks", "Hook composition", "Testing custom hooks"],
            },
            {
                id: "m4",
                number: 4,
                title: "Advanced Component Patterns",
                lessonCount: 15,
                duration: "52 mins",
                lessons: ["Compound components", "Render props pattern", "Higher-order components"],
            },
        ],
    },
    {
        id: "c2",
        title: "UI/UX Design Fundamentals",
        description: "Learn the basics of user interface and user experience design.",
        duration: "6h 15m",
        students: "18,200",
        rating: 4.9,
        level: "Beginner",
        category: "Design",
        thumbnail: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=UI/UX+Design",
        instructor: "Michael Chen",
        lastUpdated: "January 2026",
        language: "English",
        learningOutcomes: [
            "Understand core UI/UX design principles",
            "Create user-centered design solutions",
            "Conduct user research and testing",
            "Design effective wireframes and prototypes",
            "Apply color theory and typography",
            "Build accessible and inclusive designs",
        ],
        modules: [
            {
                id: "m1",
                number: 1,
                title: "Introduction to UI/UX",
                lessonCount: 6,
                duration: "20 mins",
                lessons: ["What is UI/UX?", "Design thinking process", "Tools overview"],
            },
            {
                id: "m2",
                number: 2,
                title: "User Research Methods",
                lessonCount: 8,
                duration: "35 mins",
                lessons: ["User interviews", "Surveys and questionnaires", "Persona creation"],
            },
            {
                id: "m3",
                number: 3,
                title: "Wireframing and Prototyping",
                lessonCount: 10,
                duration: "42 mins",
                lessons: ["Low-fidelity wireframes", "High-fidelity mockups", "Interactive prototypes"],
            },
            {
                id: "m4",
                number: 4,
                title: "Visual Design Principles",
                lessonCount: 12,
                duration: "48 mins",
                lessons: ["Color theory", "Typography basics", "Layout and composition"],
            },
        ],
    },
    {
        id: "c3",
        title: "Figma for Beginners",
        description: "Get started with Figma and create stunning designs from scratch.",
        duration: "3h 20m",
        students: "15,800",
        rating: 4.7,
        level: "Beginner",
        category: "Design",
        thumbnail: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Figma+Basics",
        instructor: "Emma Davis",
        lastUpdated: "March 2026",
        language: "English",
    },
    {
        id: "c4",
        title: "Product Thinking 101",
        description: "Think like a product manager and prioritize user value.",
        duration: "5h 5m",
        students: "9,400",
        rating: 4.6,
        level: "Intermediate",
        category: "Business",
        thumbnail: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Product+Thinking",
        instructor: "James Wilson",
        lastUpdated: "February 2026",
        language: "English",
    },
    {
        id: "c5",
        title: "Business Communication Basics",
        description: "Improve your professional communication skills for the workplace.",
        duration: "2h 45m",
        students: "11,200",
        rating: 4.5,
        level: "Beginner",
        category: "Business",
        thumbnail: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Communication",
        instructor: "Lisa Anderson",
        lastUpdated: "January 2026",
        language: "English",
    },
    {
        id: "c6",
        title: "Intro to Data Analytics",
        description: "Learn data analysis fundamentals and visualization techniques.",
        duration: "7h 30m",
        students: "14,600",
        rating: 4.8,
        level: "Beginner",
        category: "Data",
        thumbnail: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Data+Analytics",
        instructor: "David Martinez",
        lastUpdated: "February 2026",
        language: "English",
    },
    {
        id: "c7",
        title: "Accessibility Design Systems",
        description: "Build inclusive design systems that work for everyone.",
        duration: "4h 15m",
        students: "8,900",
        rating: 4.9,
        level: "Intermediate",
        category: "Design",
        thumbnail: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Accessibility",
        instructor: "Rachel Kim",
        lastUpdated: "March 2026",
        language: "English",
    },
    {
        id: "c8",
        title: "Frontend Architecture Essentials",
        description: "Learn scalable frontend architecture patterns and best practices.",
        duration: "6h 50m",
        students: "10,300",
        rating: 4.7,
        level: "Advanced",
        category: "Development",
        thumbnail: "https://via.placeholder.com/400x200/0F766E/FFFFFF?text=Frontend+Arch",
        instructor: "Alex Thompson",
        lastUpdated: "January 2026",
        language: "English",
    },
];

export const CATEGORIES = ["All", "Development", "Design", "Business", "Data"];

export function getCourses(): Course[] {
    return MOCK_COURSES;
}

export function getCourseById(id: string): Course | undefined {
    return MOCK_COURSES.find((course) => course.id === id);
}

export function filterCourses(
    courses: Course[],
    searchQuery: string,
    category: string
): Course[] {
    let filtered = courses;

    // Filter by category
    if (category !== "All") {
        filtered = filtered.filter((course) => course.category === category);
    }

    // Filter by search query
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
            (course) =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query)
        );
    }

    return filtered;
}
