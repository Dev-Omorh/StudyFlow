import Tasks from "./Tasks";
import Logo from "../components/Logo";

function App() {
  return (
    <div>
      <div>
        <Logo />
      </div>

      <div className="content p-4 bg-gray-100 w-full ">
        <div className="Header">
          <h1 className="text-3xl font-bold">Good Evening, Alex!</h1>
          <p className="text-gray-600">Friday, July 3, 2026.</p>
        </div>

        <div className="card w-full flex justify-between  pt-4 gap-4">
          <div className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <img src="logo.png" alt="logo" />
            <p className="text-2xl font-bold">1</p>
            <p className="text-gray-700 text-sm">Due Today</p>
          </div>
          <div className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <img src="logo.png" alt="logo" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-gray-700 text-sm">Pending Assignments</p>
          </div>
          <div className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <img src="logo.png" alt="logo" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-gray-700 text-sm">Upcoming Exams</p>
          </div>
          <div className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <img src="logo.png" alt="logo" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-gray-700 text-sm">Enrolled Courses</p>
          </div>
        </div>

        <div className=" w-full flex justify-between pt-4">
          <div className="Tasks bg-white rounded-lg shadow-md w-3xl p-4 flex flex-col items-left">
            <div className="heading flex justify-between pb-4">
              <h2 className="text-black-700 font-bold">Upcoming Tasks</h2>
              <p className="text-blue-500">
                <a href="/task"> View all </a>
              </p>
            </div>

            <div className="p-4">
              <div className="flex justify-between pb-4">
                <label htmlFor="task" className="flex flex-row gap-4">
                  <input type="radio" myRadio="" id="task" />
                  <div>
                    <p>Complete Problem Set 5</p>
                    <p> MATH 202</p>
                  </div>
                </label>

                <div className="flex flex-col justify-items-end">
                  <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center items-end">
                    High
                  </p>
                  <p className="text-gray-400">Today</p>
                </div>
              </div>

              <div className="flex justify-between pb-4">
                <label htmlFor="task" className="flex flex-row gap-4">
                  <input type="radio" myRadio="" id="task" />
                  <div>
                    <p>Read Chapter 7 - Memory & Cognition</p>
                    <p> MATH 202</p>
                  </div>
                </label>

                <div className="flex flex-col justify-items-end">
                  <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center">
                    High
                  </p>
                  <p className="text-gray-400">Tomorrow</p>
                </div>
              </div>

              <div className="flex justify-between pb-4">
                <label htmlFor="task" className="flex flex-row gap-4">
                  <input type="radio" myRadio="" id="task" />
                  <div>
                    <p>Outline essay on the French Revolution</p>
                    <p> HiST 215</p>
                  </div>
                </label>

                <div className="flex flex-col justify-items-end">
                  <p className="bg-red-100 text-yellow-500 border-2 border-yellow-400 rounded-2xl w-18 text-center ">
                    Medium
                  </p>
                  <p className="text-gray-400 flex justify-items-end">3d</p>
                </div>
              </div>

              <div className="flex justify-between pb-4">
                <label htmlFor="task" className="flex flex-row gap-4">
                  <input type="radio" myRadio="" id="task" />
                  <div>
                    <p>Submit thesis draft professor</p>
                    <p> ENG 101</p>
                  </div>
                </label>

                <div className="flex flex-col justify-items-end">
                  <p className="bg-red-100 text-red-500 border-2 border-red-400 rounded-2xl w-14 text-center">
                    High
                  </p>
                  <p className="text-gray-400">4d</p>
                </div>
              </div>

              <div className="flex justify-between pb-4">
                <label htmlFor="task" className="flex flex-row gap-4">
                  <input type="radio" myRadio="" id="task" />
                  <div>
                    <p>Practice integration by parts</p>
                    <p> MATH 202</p>
                  </div>
                </label>

                <div className="flex flex-col justify-items-end">
                  <p className="bg-yellow-100 text-yellow-500 border-2 border-yellow-400 rounded-2xl w-18 text-center">
                    Medium
                  </p>
                  <p className="text-gray-400">5d</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md w-3xl p-4 flex flex-col items-left">
            <div className="heading flex justify-between">
              <h2 className="text-black-700 font-bold">Exam Countdown</h2>
              <p className="text-blue-500">
                <a href="/exam">View all </a>
              </p>
            </div>

            <div>
              <div className="counting">
                <div className="flex justify-space gap-4">
                  <div>
                    <p>12</p>
                    <p>DAYS</p>
                  </div>
                  <div>
                    <p>PSY101 Midterm Exam</p>
                    <p className="text-gray-400">Jul 15</p>
                  </div>
                </div>
                <div className="text-black-800 ">.</div>
              </div>

              <div className="counting">
                <div className="flex justify-space gap-4">
                  <div>
                    <p>15</p>
                    <p>DAYS</p>
                  </div>
                  <div>
                    <p>HIST215 Exam</p>
                    <p className="text-gray-400">Jul 18</p>
                  </div>
                </div>
                <div className="text-black-800 ">.</div>
              </div>

              <div className="counting">
                <div className="flex justify-space gap-4">
                  <div>
                    <p>19</p>
                    <p>DAYS</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Calculus II Final</p>
                    <p className="text-gray-400">Jul 22</p>
                  </div>
                </div>
                <div className="text-black-800 ">.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md w-3xl p-4 flex flex-col items-left">
          <div className="heading flex justify-between">
            <h2 className="text-black-700 font-bold">Recent Notes</h2>
            <p className="text-blue-500">
              <a href="/exam">View all </a>
            </p>
          </div>

          <div>
            <div>
              <div>
                <span>.</span>
                <p>PSY 101</p>
              </div>
              <div>
                <h2>Classical vs. Operant Conditioning</h2>
                <p>
                  Classical: stimulus-response (Pavlov's dogs). Operant:
                  behaviour-consequence (Skinner's box). Key difference:
                  classical is involuntary, operant is voluntary. Reinforce
                  schedules: fix...
                </p>
              </div>
            </div>

            <div>
              <div>
                <span>.</span>
                <p>MATH 202</p>
              </div>
              <div>
                <h2>Integration by Parts Formula</h2>
                <p>
                  u dv = uv - v du LIATE rule for choosing u: . Logarithmic
                  .Inversine trig .Algebraic .Trigonometric .Exponential
                  Example: x.e^x dx - u=x, dv=e^dx - xe^x - e^x + C.
                </p>
              </div>
            </div>

            <div>
              <div>
                <span>.</span>
                <p>HIST 215</p>
              </div>
              <div>
                <h2>Classical vs. Operant Conditioning</h2>
                <p>
                  Classical: stimulus-response (Pavlov's dogs). Operant:
                  behaviour-consequence (Skinner's box). Key difference:
                  classical is involuntary, operant is voluntary. Reinforce
                  schedules: fix...
                </p>
              </div>
            </div>

            <div>
              <div>
                <span>.</span>
                <p>ENG 101</p>
              </div>
              <div>
                <h2>Classical vs. Operant Conditioning</h2>
                <p>
                  {" "}
                  Classical: stimulus-response (Pavlov's dogs). Operant:
                  behaviour-consequence (Skinner's box). Key difference:
                  classical is involuntary, operant is voluntary. Reinforce
                  schedules: fix...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tasks />
      </div>

      <div></div>
    </div>
  );
}

export default App;
