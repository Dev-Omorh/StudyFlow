import { useCallback, useEffect, useState } from "react";
import { StudyContext } from "./studyContext";
import {
  initialUserProfile,
} from "../utils/seedData";
import { getStoredItem, setStoredItem, STORAGE_KEYS } from "../utils/storage";
import { api } from "../services/api";

export const StudyProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [notes, setNotes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [userProfile] = useState(() =>
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
  const [isStudyDataLoading, setIsStudyDataLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const refreshStudyData = useCallback(async () => {
    setIsStudyDataLoading(true);
    setApiError("");
    try {
      const [courseData, taskData, assignmentData, examData, noteData, notificationData] =
        await Promise.all([
          api.get("/courses"),
          api.get("/tasks"),
          api.get("/assignments"),
          api.get("/exams"),
          api.get("/notes"),
          api.get("/notifications"),
        ]);
      const collections = [
        ["courses", courseData],
        ["tasks", taskData],
        ["assignments", assignmentData],
        ["exams", examData],
        ["notes", noteData],
        ["notifications", notificationData],
      ];
      for (const [name, value] of collections) {
        if (!Array.isArray(value)) {
          throw new Error(`The API returned an invalid ${name} collection.`);
        }
      }
      setCourses(courseData);
      setTasks(taskData);
      setAssignments(assignmentData);
      setExams(examData);
      setNotes(noteData);
      setNotifications(notificationData);
    } catch (error) {
      console.error("Unable to load study data:", error);
      setApiError(error.message || "Unable to load study data.");
    } finally {
      setIsStudyDataLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = window.setTimeout(() => {
      if (isMounted) refreshStudyData();
    }, 0);
    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [refreshStudyData]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.THEME, isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const runApiRequest = async (request) => {
    setApiError("");
    try {
      return await request();
    } catch (error) {
      console.error("Study data request failed:", error);
      setApiError(error.message || "The request could not be completed.");
      return null;
    }
  };

  const withoutServerManagedId = (value) =>
    Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "id"),
    );

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
  const addTask = async (taskData) => {
    const newTask = await runApiRequest(() => api.post("/tasks", taskData));
    if (!newTask) return;
    if (!newTask.id) {
      setApiError("The API did not return an ID for the new task.");
      return;
    }
    setTasks((prev) => [newTask, ...prev]);
    closeModal();
  };

  const updateTask = async (id, updatedFields) => {
    const updatedTask = await runApiRequest(() =>
      api.put(`/tasks/${id}`, updatedFields),
    );
    if (!updatedTask) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task)),
    );
    closeModal();
  };

  const deleteTask = async (id) => {
    const deleted = await runApiRequest(() => api.delete(`/tasks/${id}`));
    if (deleted === null) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;
    const status =
      task.status === "todo"
        ? "in_progress"
        : task.status === "in_progress"
          ? "completed"
          : "todo";
    const updatedTask = await runApiRequest(() =>
      api.patch(`/tasks/${id}`, { status }),
    );
    if (!updatedTask) return;
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? updatedTask : item)),
    );
  };

  // --- CRUD: Courses ---
  const addCourse = async (courseData) => {
    const newCourse = await runApiRequest(() =>
      api.post("/courses", courseData),
    );
    if (!newCourse) return;
    if (!newCourse.id) {
      setApiError("The API did not return an ID for the new course.");
      return;
    }
    setCourses((prev) => [...prev, newCourse]);
    closeModal();
  };

  const updateCourse = async (id, updatedFields) => {
    const updatedCourse = await runApiRequest(() =>
      api.put(`/courses/${id}`, updatedFields),
    );
    if (!updatedCourse) return;
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? updatedCourse : course)),
    );
    closeModal();
  };

  const deleteCourse = async (id) => {
    const deleted = await runApiRequest(() => api.delete(`/courses/${id}`));
    if (deleted === null) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // --- CRUD: Assignments ---
  const addAssignment = async (assignData) => {
    const newAssign = await runApiRequest(() =>
      api.post("/assignments", assignData),
    );
    if (!newAssign) return;
    if (!newAssign.id) {
      setApiError("The API did not return an ID for the new assignment.");
      return;
    }
    setAssignments((prev) => [newAssign, ...prev]);
    closeModal();
  };

  const updateAssignment = async (id, updatedFields) => {
    const updatedAssignment = await runApiRequest(() =>
      api.put(`/assignments/${id}`, updatedFields),
    );
    if (!updatedAssignment) return;
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? updatedAssignment : assignment,
      ),
    );
    closeModal();
  };

  const deleteAssignment = async (id) => {
    const deleted = await runApiRequest(() =>
      api.delete(`/assignments/${id}`),
    );
    if (deleted === null) return;
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const cycleAssignmentStatus = async (id) => {
    const assignment = assignments.find((item) => item.id === id);
    if (!assignment) return;
    const stages = ["not_started", "in_progress", "submitted", "graded"];
    const nextStatus =
      stages[(stages.indexOf(assignment.status) + 1) % stages.length];
    const updatedAssignment = await runApiRequest(() =>
      api.patch(`/assignments/${id}`, { status: nextStatus }),
    );
    if (!updatedAssignment) return;
    setAssignments((prev) =>
      prev.map((item) => (item.id === id ? updatedAssignment : item)),
    );
  };

  // --- CRUD: Exams ---
  const addExam = async (examData) => {
    const payload = {
      ...examData,
      checklist: examData.checklist?.map(withoutServerManagedId) || [],
    };
    const newExam = await runApiRequest(() => api.post("/exams", payload));
    if (!newExam) return;
    if (!newExam.id) {
      setApiError("The API did not return an ID for the new exam.");
      return;
    }
    setExams((prev) => [...prev, newExam]);
    closeModal();
  };

  const updateExam = async (id, updatedFields) => {
    const payload = {
      ...updatedFields,
      checklist: updatedFields.checklist?.map(withoutServerManagedId),
    };
    const updatedExam = await runApiRequest(() =>
      api.put(`/exams/${id}`, payload),
    );
    if (!updatedExam) return;
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? updatedExam : exam)),
    );
    closeModal();
  };

  const deleteExam = async (id) => {
    const deleted = await runApiRequest(() => api.delete(`/exams/${id}`));
    if (deleted === null) return;
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleExamTopic = async (examId, topicId) => {
    const exam = exams.find((item) => item.id === examId);
    const topic = exam?.checklist?.find((item) => item.id === topicId);
    if (!exam || !topic) return;
    const updatedExam = await runApiRequest(() =>
      api.patch(`/exams/${examId}`, {
        checklist: exam.checklist.map((item) =>
          item.id === topicId
            ? { ...item, completed: !item.completed }
            : item,
        ),
      }),
    );
    if (!updatedExam) return;
    setExams((prev) =>
      prev.map((item) => (item.id === examId ? updatedExam : item)),
    );
  };

  // --- CRUD: Notes ---
  const addNote = async (noteData) => {
    const newNote = await runApiRequest(() => api.post("/notes", noteData));
    if (!newNote) return;
    if (!newNote.id) {
      setApiError("The API did not return an ID for the new note.");
      return;
    }
    setNotes((prev) => [newNote, ...prev]);
    closeModal();
  };

  const updateNote = async (id, updatedFields) => {
    const updatedNote = await runApiRequest(() =>
      api.put(`/notes/${id}`, updatedFields),
    );
    if (!updatedNote) return;
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? updatedNote : note)),
    );
    closeModal();
  };

  const deleteNote = async (id) => {
    const deleted = await runApiRequest(() => api.delete(`/notes/${id}`));
    if (deleted === null) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleFavoriteNote = async (id) => {
    const note = notes.find((item) => item.id === id);
    if (!note) return;
    const updatedNote = await runApiRequest(() =>
      api.patch(`/notes/${id}`, { favorite: !note.favorite }),
    );
    if (!updatedNote) return;
    setNotes((prev) =>
      prev.map((item) => (item.id === id ? updatedNote : item)),
    );
  };

  // --- Notifications ---
  const markNotificationAsRead = async (id) => {
    const notification = notifications.find((item) => item.id === id);
    if (!notification) return;
    const updatedNotification = await runApiRequest(() =>
      api.patch(`/notifications/${id}`, { read: true }),
    );
    if (!updatedNotification) return;
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? updatedNotification : item)),
    );
  };

  const clearAllNotifications = async () => {
    const unread = notifications.filter((notification) => !notification.read);
    const updatedNotifications = await Promise.all(
      unread.map((notification) =>
        runApiRequest(() =>
          api.patch(`/notifications/${notification.id}`, { read: true }),
        ),
      ),
    );
    if (updatedNotifications.some((notification) => notification === null)) {
      return;
    }
    const updatesById = new Map(
      updatedNotifications.map((notification) => [
        notification.id,
        notification,
      ]),
    );
    setNotifications((prev) =>
      prev.map((notification) =>
        updatesById.get(notification.id) || notification,
      ),
    );
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
        isStudyDataLoading,
        apiError,
        clearApiError: () => setApiError(""),
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
        refreshStudyData,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};
