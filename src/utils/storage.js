const STORAGE_KEYS = {
  COURSES: "studyflow_courses_v1",
  TASKS: "studyflow_tasks_v1",
  ASSIGNMENTS: "studyflow_assignments_v1",
  EXAMS: "studyflow_exams_v1",
  NOTES: "studyflow_notes_v1",
  NOTIFICATIONS: "studyflow_notifications_v1",
  USER: "studyflow_user_v1",
  THEME: "studyflow_theme_v1",
};

export const getStoredItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading key ${key} from storage:`, err);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key} to storage:`, err);
  }
};

export { STORAGE_KEYS };
