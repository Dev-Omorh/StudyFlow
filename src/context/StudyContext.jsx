import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialCourses,
  initialTasks,
  initialAssignments,
  initialExams,
  initialNotes,
  initialNotifications,
  initialUserProfile,
} from "../utils/seedData";
import { getStoredItem, setStoredItem, STORAGE_KEYS } from "../utils/storage";

const StudyContext = createContext(null);

export const StudyProvider = ({ children }) => {
  // Persistence state
  const [courses, setCourses] = useState(() =>
    getStoredItem(STORAGE_KEYS.COURSES, initialCourses)
  );
  const [tasks, setTasks] = useState(() =>
    getStoredItem(STORAGE_KEYS.TASKS, initialTasks)
  );
  const [assignments, setAssignments] = useState(() =>
    getStoredItem(STORAGE_KEYS.ASSIGNMENTS, initialAssignments)
  );
  const [exams, setExams] = useState(() =>
    getStoredItem(STORAGE_KEYS.EXAMS, initialExams)
  );
  const [notes, setNotes] = useState(() =>
    getStoredItem(STORAGE_KEYS.NOTES, initialNotes)
  );
  const [notifications, setNotifications] = useState(() =>
    getStoredItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  );
  const [userProfile, setUserProfile] = useState(() =>
    getStoredItem(STORAGE_KEYS.USER, initialUserProfile)
  );
  const [isDarkMode, setIsDarkMode] = useState(() =>
    getStoredItem(STORAGE_KEYS.THEME, true)
  );

  // Global UI modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'task' | 'course' | 'assignment' | 'exam' | 'note' | null
  const [editingItem, setEditingItem] = useState(null);

  // Sync effect to localStorage & html class
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.COURSES, courses);
  }, [courses]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.ASSIGNMENTS, assignments);
  }, [assignments]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.EXAMS, exams);
  }, [exams]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.NOTES, notes);
  }, [notes]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.THEME, isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Helper toggle dark mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Modal Open helpers
  const openModal = (type, item = null) => {
    setEditingItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingItem(null);
  };

  // --- CRUD: Tasks ---
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: "t_" + Date.now(),
      status: taskData.status || "todo",
      tags: taskData.tags || ["General"],
    };
    setTasks((prev) => [newTask, ...prev]);
    closeModal();
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    closeModal();
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus =
            t.status === "todo"
              ? "in_progress"
              : t.status === "in_progress"
              ? "completed"
              : "todo";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // --- CRUD: Courses ---
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: "c_" + Date.now(),
      currentGrade: Number(courseData.currentGrade) || 90.0,
      creditHours: Number(courseData.creditHours) || 3,
      color: courseData.color || "#6366f1",
    };
    setCourses((prev) => [...prev, newCourse]);
    closeModal();
  };

  const updateCourse = (id, updatedFields) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    closeModal();
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // --- CRUD: Assignments ---
  const addAssignment = (assignData) => {
    const newAssign = {
      ...assignData,
      id: "a_" + Date.now(),
      status: assignData.status || "not_started",
      score: assignData.score !== "" ? Number(assignData.score) : null,
      maxScore: Number(assignData.maxScore) || 100,
      weight: Number(assignData.weight) || 10,
    };
    setAssignments((prev) => [newAssign, ...prev]);
    closeModal();
  };

  const updateAssignment = (id, updatedFields) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
    closeModal();
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const cycleAssignmentStatus = (id) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const stages = ["not_started", "in_progress", "submitted", "graded"];
          const nextIdx = (stages.indexOf(a.status) + 1) % stages.length;
          return { ...a, status: stages[nextIdx] };
        }
        return a;
      })
    );
  };

  // --- CRUD: Exams ---
  const addExam = (examData) => {
    const newExam = {
      ...examData,
      id: "e_" + Date.now(),
      checklist: examData.checklist || [],
    };
    setExams((prev) => [...prev, newExam]);
    closeModal();
  };

  const updateExam = (id, updatedFields) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    );
    closeModal();
  };

  const deleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleExamTopic = (examId, topicId) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id === examId) {
          return {
            ...exam,
            checklist: exam.checklist.map((item) =>
              item.id === topicId
                ? { ...item, completed: !item.completed }
                : item
            ),
          };
        }
        return exam;
      })
    );
  };

  // --- CRUD: Notes ---
  const addNote = (noteData) => {
    const newNote = {
      ...noteData,
      id: "n_" + Date.now(),
      updatedAt: new Date().toISOString(),
      favorite: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    closeModal();
  };

  const updateNote = (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, ...updatedFields, updatedAt: new Date().toISOString() }
          : n
      )
    );
    closeModal();
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleFavoriteNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    );
  };

  // --- Notifications ---
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Reset to initial Seed Data
  const resetToSeedData = () => {
    setCourses(initialCourses);
    setTasks(initialTasks);
    setAssignments(initialAssignments);
    setExams(initialExams);
    setNotes(initialNotes);
    setNotifications(initialNotifications);
    setUserProfile(initialUserProfile);
  };

  return (
    <StudyContext.Provider
      value={{
        courses,
        tasks,
        assignments,
        exams,
        notes,
        notifications,
        userProfile,
        isDarkMode,
        toggleDarkMode,
        // modal state
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        activeModal,
        editingItem,
        openModal,
        closeModal,
        // task actions
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        // course actions
        addCourse,
        updateCourse,
        deleteCourse,
        // assignment actions
        addAssignment,
        updateAssignment,
        deleteAssignment,
        cycleAssignmentStatus,
        // exam actions
        addExam,
        updateExam,
        deleteExam,
        toggleExamTopic,
        // note actions
        addNote,
        updateNote,
        deleteNote,
        toggleFavoriteNote,
        // notifications & reset
        markNotificationAsRead,
        clearAllNotifications,
        resetToSeedData,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error("useStudy must be used within a StudyProvider");
  }
  return context;
};
