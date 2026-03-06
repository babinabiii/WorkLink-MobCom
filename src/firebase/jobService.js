export async function getJobPosts() {
  // Mock job posts for now; replace with Firestore query later.
  const jobs = [
    {
      id: "job1",
      title: "UI/UX Designer",
      companyName: "Inclusive Design Co.",
      locationText: "Remote",
      salaryRange: "$80k - $120k",
      badgeText: "Remote Friendly",
      workSetup: "remote",
      targetRoles: ["PWD", "Student/Youth"],
      isActive: true,
      description: "We are looking for a talented UI/UX Designer to join our team and help create inclusive digital experiences. You will work on designing user interfaces that are accessible and delightful for all users.",
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Collaborate with developers and product managers",
        "Ensure designs meet accessibility standards (WCAG 2.1)"
      ],
      requirements: [
        "3+ years of experience in UI/UX design",
        "Strong portfolio showcasing web and mobile projects",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Understanding of accessibility best practices",
        "Excellent communication and collaboration skills"
      ],
      accommodations: [
        "Screen reader compatible tools",
        "Flexible work hours",
        "Closed captioning for meetings",
        "Ergonomic equipment allowance"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 85
    },
    {
      id: "job2",
      title: "Accessibility Tester",
      companyName: "AccessAble Labs",
      locationText: "Quezon City, PH",
      salaryRange: "₱45k - ₱65k",
      badgeText: "Accessibility Focused",
      workSetup: "onsite",
      targetRoles: ["PWD"],
      isActive: true,
      description: "Join our mission to make the web accessible to everyone. As an Accessibility Tester, you will evaluate digital products and ensure they meet international accessibility standards.",
      responsibilities: [
        "Conduct accessibility audits on websites and mobile apps",
        "Test with assistive technologies (screen readers, voice control)",
        "Document accessibility issues and provide remediation guidance",
        "Collaborate with development teams to implement fixes",
        "Stay updated on WCAG guidelines and best practices"
      ],
      requirements: [
        "2+ years of experience in accessibility testing",
        "Familiarity with WCAG 2.1 AA/AAA standards",
        "Experience using JAWS, NVDA, or VoiceOver",
        "Strong attention to detail",
        "Ability to communicate technical issues clearly"
      ],
      accommodations: [
        "Assistive technology provided",
        "Flexible break schedules",
        "Transportation assistance",
        "Accessible workspace"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 92
    },
    {
      id: "job3",
      title: "Junior Frontend Developer",
      companyName: "TechLaunch",
      locationText: "Makati, PH",
      salaryRange: "₱35k - ₱50k",
      badgeText: "Entry Level",
      workSetup: "hybrid",
      targetRoles: ["Student/Youth"],
      isActive: true,
      description: "Start your career in tech with TechLaunch. We're looking for a motivated Junior Frontend Developer to join our growing team and work on exciting web projects.",
      responsibilities: [
        "Build responsive web applications using React",
        "Implement designs from Figma mockups",
        "Write clean, maintainable code",
        "Participate in code reviews and team meetings",
        "Learn and grow with mentorship from senior developers"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Familiarity with React or similar frameworks",
        "Understanding of responsive design principles",
        "Eagerness to learn and improve",
        "Good problem-solving skills"
      ],
      accommodations: [
        "Mentorship program",
        "Learning and development budget",
        "Flexible hybrid schedule",
        "Modern development tools"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 78
    },
    {
      id: "job4",
      title: "Intern – Marketing Assistant",
      companyName: "BrightFuture Media",
      locationText: "Remote",
      salaryRange: "₱15k - ₱20k",
      badgeText: "Internship",
      workSetup: "remote",
      targetRoles: ["Student/Youth"],
      isActive: true,
      description: "Gain hands-on marketing experience with BrightFuture Media. This internship offers real-world projects and mentorship to help you build your marketing career.",
      responsibilities: [
        "Assist in creating social media content",
        "Help manage email marketing campaigns",
        "Conduct market research and competitor analysis",
        "Support the team with administrative tasks",
        "Learn digital marketing tools and strategies"
      ],
      requirements: [
        "Currently pursuing a degree in Marketing or related field",
        "Basic understanding of social media platforms",
        "Good written and verbal communication skills",
        "Organized and detail-oriented",
        "Enthusiastic about learning"
      ],
      accommodations: [
        "Flexible internship hours",
        "Remote work setup",
        "Training and mentorship",
        "Certificate upon completion"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 70
    },
    {
      id: "job5",
      title: "Community Liaison",
      companyName: "Golden Years Foundation",
      locationText: "Cebu City, PH",
      salaryRange: "₱30k - ₱45k",
      badgeText: "Senior Friendly",
      workSetup: "onsite",
      targetRoles: ["Senior Citizen"],
      isActive: true,
      description: "Use your life experience to make a difference. As a Community Liaison, you'll connect seniors with resources and build meaningful relationships in the community.",
      responsibilities: [
        "Build relationships with community members and organizations",
        "Organize events and activities for seniors",
        "Connect individuals with appropriate resources and services",
        "Maintain records and prepare reports",
        "Advocate for senior citizens' needs"
      ],
      requirements: [
        "Strong interpersonal and communication skills",
        "Experience working with seniors or in community service",
        "Empathy and patience",
        "Basic computer skills",
        "Ability to work independently"
      ],
      accommodations: [
        "Flexible schedule",
        "Comfortable office environment",
        "Transportation reimbursement",
        "Health and wellness benefits"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 88
    },
    {
      id: "job6",
      title: "Part-time Consultant",
      companyName: "Experience Matters Inc.",
      locationText: "Hybrid – Manila, PH",
      salaryRange: "₱40k - ₱60k",
      badgeText: "Flexible Hours",
      workSetup: "hybrid",
      targetRoles: ["Senior Citizen"],
      isActive: true,
      description: "Share your expertise and continue making an impact. We're seeking experienced professionals to provide consulting services on a flexible, part-time basis.",
      responsibilities: [
        "Provide expert advice to clients in your field",
        "Review and analyze business processes",
        "Mentor junior team members",
        "Prepare reports and recommendations",
        "Attend client meetings as needed"
      ],
      requirements: [
        "10+ years of professional experience in your field",
        "Strong analytical and problem-solving skills",
        "Excellent communication abilities",
        "Ability to work independently",
        "Willingness to share knowledge"
      ],
      accommodations: [
        "Flexible part-time hours",
        "Hybrid work arrangement",
        "Project-based assignments",
        "Competitive hourly rate"
      ],
      image: "https://via.placeholder.com/150",
      matchPercent: 82
    },
  ];

  return jobs;
}

export async function getJobById(jobId) {
  const jobs = await getJobPosts();
  return jobs.find(job => job.id === jobId) || null;
}

export default {
  getJobPosts,
  getJobById,
};

