import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AssignmentItem from "../components/AssignmentItem";
import AssignmentModal from "../components/AsignmentModal";

function Assignments() {
  return (
    <>
      <Sidebar />
      <Header />

      <AssignmentItem />
      <AssignmentItem />
      <AssignmentItem />

      <AssignmentModal />

      <div className="content p-4 bg-gray-100 w-full">
        <div className="Header flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-gray-600">5 active</p>
          </div>
        </div>

        <div className="card w-full flex justify-between  pt-4 gap-4">
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            All
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            Not Started
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            In Progress
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            Submitted
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            Graded
          </button>
        </div>

        <div className=" w-full flex justify-between pt-4">
          <div className="bg-white rounded-lg shadow-md w-3xl p-4 pr-35 flex flex-col items-left">
            <div className="flex justify-between pb-4">
              <div>
                <span></span>
                <div>
                  <p>Midterm Exam Review Sheet</p>
                  <div className="text-gray-400">
                    <p> MATH 202</p>
                    <p>Complete</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-items-end">
                <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center items-end">
                  Graded
                </p>
              </div>
            </div>

            <div className="flex justify-between pb-4">
              <div>
                <span></span>
                <div>
                  <p>Integration Technique Quiz</p>
                  <div className="text-gray-400">
                    <p> MATH 202</p>
                    <p>5d overdue</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-items-end">
                <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center">
                  Submitted
                </p>
              </div>
            </div>

            <div className="flex justify-between pb-4">
              <div>
                <span></span>
                <div>
                  <p>Reflection Paper - Pavlov's Conditioning</p>
                  <div>
                    <p>PSY 101</p>
                    <p>3d overdue </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-items-end">
              <p className="bg-red-100 text-yellow-500 border-2 border-yellow-400 rounded-2xl w-18 text-center ">
                In progress
              </p>
            </div>
          </div>

          <div className="flex justify-between pb-4">
            <div>
              <span></span>
              <div>
                <p>Argumentative Essay Draft</p>
                <div className="text-gray-400">
                  <p> ENG 101</p>
                  <p>1d overdue</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-items-end">
              <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center">
                In Progress
              </p>
            </div>
          </div>

          <div className="flex justify-between pb-4">
            <div>
              <span></span>
              <div>
                <p>Primary Source Analysis</p>
                <div className="text-gray-400">
                  <p> HIST 215</p>
                  <p>Due Jul 10</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-items-end">
              <p className="bg-yellow-100 text-yellow-500 border-2 border-yellow-400 rounded-2xl w-18 text-center">
                Not Started
              </p>
            </div>
          </div>

          <div className="flex justify-between pb-4">
            <div>
              <span></span>
              <div>
                <p>Group Presentation Slides</p>
                <div className="text-gray-400">
                  <p>PSY 101</p>
                  <p>Due Jul 12</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-items-end">
              <p className="bg-yellow-100 text-yellow-500 border-2 border-yellow-400 rounded-2xl w-18 text-center">
                Not Started
              </p>
            </div>
          </div>
        </div>
      </div>

      <p> Tip: clicka status badge to advance it to next stage </p>
    </>
  );
}

export default Assignments;
