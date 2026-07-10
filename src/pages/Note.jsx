import Logo from "../components/Logo";
import Button from "../components/Button";

function Note() {
  return (
    <div>
      <Logo />

      <div className="content p-4 bg-gray-100 w-full">
        <div className="Header flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Exam Countdown</h1>
            <p className="text-gray-600">5 upcoming</p>
          </div>

          <Button />
        </div>

        <div className="card w-full flex justify-between  pt-4 gap-4">
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            All
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <span>.</span> PSY 101
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <span>.</span> MATH 202
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <span>.</span> HIST 215
          </button>
          <button className="bg-white rounded-lg shadow-md w-3/12 p-4 flex flex-col items-left ">
            <span>.</span> ENG 101
          </button>
        </div>

        <div className="flex flex-wrap ">
          <div className="card w-full flex p-4">
            <div>
              <p>
                <span>.</span> PSY 101
              </p>
            </div>

            <h2>Classical vs Operant...</h2>

            <p>
              Classical: stimulus-response (Pavlov's dogs). Operant:
              behaviour-consequence (Skinner's box).
              <br />
              Key difference: classical is involuntary, operant is
              involuntary...
            </p>

            <p>Jul 1</p>
          </div>

          <div className="card w-full flex p-4">
            <div>
              <p>
                <span>.</span> MATH 202
              </p>
            </div>

            <h2>Integration by Parts Formula</h2>

            <p>
              u dv = uv - v du
              <br />
              LIATE rule for choosing u: <br />. Logarithmic . Inverse trig .
              Algebraic . Trigonometric ....
            </p>

            <p>Jul 30</p>
          </div>

          <div className="card w-full flex p-4">
            <div>
              <p>
                <span>.</span> HIST 215
              </p>
            </div>

            <h2>French Revolution Key Dates</h2>

            <p>
              1789 - Tennis Court Oath
              <br />
              1791 - Constitutional Monarchy established
              <br />
              1793 - Reign of Terror begins under Robespierre
            </p>
          </div>

          <div className="card w-full flex p-4">
            <div>
              <p>
                <span>.</span> ENG 101
              </p>
            </div>

            <h2>Essay Structure & Argument</h2>

            <p>
              Thesis: clear, arguable, specific claim
              <br />
              Body paragraphs: topic sentence, eveidence, analysis, transition
              <br />
              COnclusion: synthesis, don't just summarize.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
