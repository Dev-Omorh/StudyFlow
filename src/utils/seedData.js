export const initialCourses = [
  {
    id: "c1",
    code: "CS 201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Elena Vance",
    room: "Science Hall 304",
    creditHours: 4,
    gradeGoal: "A",
    currentGrade: 92.5,
    color: "#6366f1", // Indigo
    schedule: "Mon, Wed, Fri • 10:00 AM - 11:30 AM",
  },
  {
    id: "c2",
    code: "MATH 202",
    title: "Multivariable Calculus",
    instructor: "Prof. Marcus Brody",
    room: "Newton Building 108",
    creditHours: 3,
    gradeGoal: "A-",
    currentGrade: 88.0,
    color: "#ec4899", // Pink
    schedule: "Tue, Thu • 1:00 PM - 2:30 PM",
  },
  {
    id: "c3",
    code: "PHYS 150",
    title: "University Physics II (Electromagnetism)",
    instructor: "Dr. Sarah Lin",
    room: "Physics Lab B12",
    creditHours: 4,
    gradeGoal: "B+",
    currentGrade: 84.2,
    color: "#10b981", // Emerald
    schedule: "Mon, Wed • 2:00 PM - 4:00 PM",
  },
  {
    id: "c4",
    code: "ENG 105",
    title: "Technical Writing & Communication",
    instructor: "Prof. Arthur Pendelton",
    room: "Humanities Hall 210",
    creditHours: 3,
    gradeGoal: "A",
    currentGrade: 95.0,
    color: "#f59e0b", // Amber
    schedule: "Tue, Thu • 9:30 AM - 11:00 AM",
  },
];

export const initialTasks = [
  {
    id: "t1",
    title: "Implement Binary Search Tree balancing method",
    courseId: "c1",
    dueDate: "2026-07-26",
    priority: "high",
    status: "in_progress",
    estimatedTime: "2 hrs",
    tags: ["Programming", "Assignment"],
  },
  {
    id: "t2",
    title: "Review Stokes Theorem and Green's Theorem proofs",
    courseId: "c2",
    dueDate: "2026-07-28",
    priority: "medium",
    status: "todo",
    estimatedTime: "1.5 hrs",
    tags: ["Exam Prep", "Calculus"],
  },
  {
    id: "t3",
    title: "Draft introduction section for IEEE technical paper",
    courseId: "c4",
    dueDate: "2026-07-25",
    priority: "high",
    status: "completed",
    estimatedTime: "1 hr",
    tags: ["Writing"],
  },
  {
    id: "t4",
    title: "Complete Kirchhoff's Laws lab calculation worksheet",
    courseId: "c3",
    dueDate: "2026-07-27",
    priority: "low",
    status: "todo",
    estimatedTime: "45 mins",
    tags: ["Lab"],
  },
  {
    id: "t5",
    title: "Practice graph traversal problems (BFS & DFS)",
    courseId: "c1",
    dueDate: "2026-07-30",
    priority: "medium",
    status: "todo",
    estimatedTime: "3 hrs",
    tags: ["LeetCode", "Algorithms"],
  },
];

export const initialAssignments = [
  {
    id: "a1",
    title: "Problem Set 4: AVL Trees & Red-Black Trees",
    courseId: "c1",
    dueDate: "2026-07-29",
    status: "in_progress",
    priority: "high",
    score: null,
    maxScore: 100,
    weight: 15,
    description: "Implement AVL rotation logic and answer theoretical efficiency questions.",
  },
  {
    id: "a2",
    title: "Multivariable Integration Problem Set",
    courseId: "c2",
    dueDate: "2026-07-25",
    status: "submitted",
    priority: "high",
    score: null,
    maxScore: 50,
    weight: 10,
    description: "Evaluated double and triple integrals over cylindrical coordinate bounds.",
  },
  {
    id: "a3",
    title: "Magnetic Field Simulation Lab Report",
    courseId: "c3",
    dueDate: "2026-07-20",
    status: "graded",
    priority: "medium",
    score: 94,
    maxScore: 100,
    weight: 20,
    description: "Simulated Biot-Savart Law in Python and submitted report.",
  },
  {
    id: "a4",
    title: "Research Proposal: Technical Documentation standard",
    courseId: "c4",
    dueDate: "2026-08-05",
    status: "not_started",
    priority: "medium",
    score: null,
    maxScore: 100,
    weight: 25,
    description: "Formulate problem statement, outline, and preliminary references.",
  },
];

export const initialExams = [
  {
    id: "e1",
    title: "Midterm Exam 2: Graph Theory & Trees",
    courseId: "c1",
    examDate: "2026-07-31T10:00:00",
    location: "Science Hall 304",
    weight: 25,
    targetGrade: "A",
    checklist: [
      { id: "ek1", topic: "Binary Search Trees & Rotations", completed: true },
      { id: "ek2", topic: "Dijkstra's & A* Search", completed: true },
      { id: "ek3", topic: "Min Spanning Trees (Kruskal/Prim)", completed: false },
      { id: "ek4", topic: "Dynamic Programming Graph matrix", completed: false },
    ],
  },
  {
    id: "e2",
    title: "Calculus Exam III: Vector Analysis",
    courseId: "c2",
    examDate: "2026-08-04T13:00:00",
    location: "Newton Auditorium A",
    weight: 30,
    targetGrade: "A-",
    checklist: [
      { id: "ek5", topic: "Line Integrals & Surface Integrals", completed: false },
      { id: "ek6", topic: "Divergence Theorem", completed: false },
      { id: "ek7", topic: "Stokes' Theorem Applications", completed: false },
    ],
  },
  {
    id: "e3",
    title: "Electromagnetism Final Lab Assessment",
    courseId: "c3",
    examDate: "2026-08-10T14:00:00",
    location: "Physics Lab B12",
    weight: 20,
    targetGrade: "A",
    checklist: [
      { id: "ek8", topic: "Oscilloscope calibration", completed: true },
      { id: "ek9", topic: "Inductance calculation", completed: false },
    ],
  },
];

export const initialNotes = [
  {
    id: "n1",
    title: "Self-Balancing Trees Overview (AVL & Red-Black)",
    courseId: "c1",
    tags: ["Trees", "Algorithms", "Exams"],
    updatedAt: "2026-07-22T16:30:00",
    favorite: true,
    category: "Lecture Notes",
    content: `## Self-Balancing Trees

### AVL Trees
- **Balance Factor**: \`BF = Height(Right) - Height(Left)\`
- Must strictly lie in range \`[-1, 0, 1]\`.
- *Rotations*: Single Left (RR), Single Right (LL), Left-Right (LR), Right-Left (RL).
- **Time Complexity**: Search, Insert, Delete are all $O(\\log n)$.

### Red-Black Trees
- Every node is either Red or Black.
- Root is always Black.
- No two consecutive Red nodes (Red node has black children).
- Every path from node to descendant leaf contains same number of Black nodes.
- Used in Java's \`TreeMap\` and C++ \`std::map\`.`,
  },
  {
    id: "n2",
    title: "Green's Theorem vs Stokes' Theorem Comparison",
    courseId: "c2",
    tags: ["Calculus", "Cheatsheet"],
    updatedAt: "2026-07-21T11:15:00",
    favorite: true,
    category: "Study Guide",
    content: `## Vector Calculus Theorems

### Green's Theorem
Formula:
$$\\oint_C (P \\, dx + Q \\, dy) = \\iint_D \\left( \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\right) dA$$
- Connects line integral around closed curve $C$ to double integral over enclosed region $D$.

### Stokes' Theorem
Formula:
$$\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}$$
- 3D generalization of Green's theorem for oriented surfaces.`,
  },
  {
    id: "n3",
    title: "Technical Writing Guidelines for IEEE Papers",
    courseId: "c4",
    tags: ["Writing", "Style Guide"],
    updatedAt: "2026-07-19T09:40:00",
    favorite: false,
    category: "Reference",
    content: `## Key Rules for IEEE Format

1. **Title**: Concise, reflective, avoiding uncommon acronyms.
2. **Abstract**: 150-250 words summarizing objective, methodology, key findings, and conclusion.
3. **Passive vs Active Voice**: Use clear active voice where appropriate, but objective passive voice in methodology.
4. **Citations**: Standard bracketed format \`[1]\`, ordered chronologically as referenced in text.`,
  },
];

export const initialNotifications = [
  {
    id: "notif1",
    title: "Exam Alert: CS 201 Midterm",
    message: "Midterm Exam 2 is in 7 days! 2 topics remaining on your study checklist.",
    type: "exam",
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: "notif2",
    title: "Assignment Due Soon",
    message: "'Multivariable Integration' is due tomorrow at 11:59 PM.",
    type: "assignment",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif3",
    title: "Study Streak Maintained! 🔥",
    message: "You have logged in for 5 consecutive days. Keep it up!",
    type: "system",
    timestamp: "3 hours ago",
    read: true,
  },
];

export const initialUserProfile = {
  name: "Alex Johnson",
  major: "Computer Science & Applied Math",
  university: "Tech Institute of Science",
  semester: "Fall 2026",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  targetGPA: 3.85,
  currentGPA: 3.76,
  streakDays: 5,
};
