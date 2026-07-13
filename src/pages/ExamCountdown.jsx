import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ExamCard from "../components/ExamCard";
// import ExamModal from "../components/ExamModal";

function Exam() {
  return (
    <>
      <Sidebar />
      <Header />

      <ExamCard />
      <ExamCard />
      <ExamCard />

      {/* <ExamModal /> */}

      {/* <div className="content p-4 bg-gray-100 w-full">
        <div className="Header flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Exam Countdown</h1>
            <p className="text-gray-600">5 upcoming</p>
          </div>
        </div>

        <div className="card w-full flex p-4 gap-4">
          <div className="card w-full flex p-4">
            <div>
              <p>6</p>
              <p>DAYS</p>
            </div>

            <div>
              <p>
                <span>.</span>PSY 101
              </p>
              <h2>PSY101 Midterm Exam</h2>
              <p>Jul 15 . Hall B, Room 201</p>
            </div>

            <div>
              <p>Chapters 1-7, bring pencil and student ID</p>
            </div>
          </div>

          <div className="card w-full flex p-4">
            <div>
              <p>9</p>
              <p>DAYS</p>
            </div>

            <div>
              <p>
                <span>.</span>HSLT 215
              </p>
              <h2>HIST 215 Essay Exam</h2>
              <p>Jul 18 .Humanities Hall B, Room 305</p>
            </div>

            <div>
              <p>Open book, focus on 19th-20th century</p>
            </div>
          </div>

          <div className="card w-full flex p-4">
            <div>
              <p className="font-size-8">13</p>
              <p>DAYS</p>
            </div>

            <div>
              <p>
                <span className="size-3 color-green">.</span>MATH 202
              </p>
              <h2>Calculus II Final</h2>
              <p>Jul 22 . Main Building, Room 104</p>
            </div>

            <div>
              <p>All topics covered, graphing calculator allowed</p>
            </div>
          </div>

          <div></div>
        </div>
      </div> */}
    </>
  );
}

export default Exam;
