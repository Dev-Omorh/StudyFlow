import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import ExamCard from "../components/ExamCard";
import TaskCard from "../components/TaskCard";
import NoteCard from "../components/NoteCard";
import Header from "../components/Header";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="summary-cards">
        <SummaryCard title="Due Today" />
        <SummaryCard title="Pending Assignment" value={4} />
        <SummaryCard title="Upcoming Exams" value={3} />
        <SummaryCard title="Enrolled Courses" value={4} />
      </div>

      <TaskCard />

      <ExamCard />

      <NoteCard />
    </>
  );
}

export default Dashboard;
