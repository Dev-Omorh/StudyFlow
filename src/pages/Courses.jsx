import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard";
import CourseModal from "../components/CourseModal";

function Courses() {
  return (
    <>
      <Sidebar />
      <Header />

      <CourseCard />
      <CourseCard />
      <CourseCard />

      <CourseModal />

      {/* <div className="content p-4 bg-gray-100 w-full">
        <div className="Header flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-gray-600">4 enrolled this semester</p>
          </div>
        </div>

        <div className="body">
          <div>
            <div>
              <p>PSY 101</p>
              <h2>Introduction to Psychology</h2>
              <p>Dr. Sarah Chen </p>
            </div>

            <div>
              <div>
                <p>3</p>
                <p>Credits</p>
              </div>

              <div>
                <p>2</p>
                <p>Pending</p>
              </div>

              <div>
                <p>1</p>
                <p>Tasks</p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>MATH 202</p>
              <h2>Calculus II</h2>
              <p>Prof. James Miller </p>
            </div>

            <div>
              <div>
                <p>4</p>
                <p>Credits</p>
              </div>

              <div>
                <p>0</p>
                <p>Pending</p>
              </div>

              <div>
                <p>2</p>
                <p>Tasks</p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>HIST 215</p>
              <h2>World History: 1500-2026</h2>
              <p>Dr. Amara Osei</p>
            </div>

            <div>
              <div>
                <p>3</p>
                <p>Credits</p>
              </div>

              <div>
                <p>1</p>
                <p>Pending</p>
              </div>

              <div>
                <p>1</p>
                <p>Tasks</p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>ENG 101</p>
              <h2>English Composition</h2>
              <p>Prof. Lisa Park </p>
            </div>

            <div>
              <div>
                <p>3</p>
                <p>Credits</p>
              </div>

              <div>
                <p>1</p>
                <p>Pending</p>
              </div>

              <div>
                <p>1</p>
                <p>Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div> */}
    </>
  );
}

export default Courses;
