import React, { useState } from "react";
import { Bot, Send, Sparkles, BookOpen, HelpCircle, Calendar, Zap, User } from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function AIAssistant() {
  const { notes, courses, exams } = useStudy();

  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "ai",
      text: "Hello! I am your **StudyFlow AI Assistant**. I can analyze your enrolled courses, summarize your notes, generate practice exam quizzes, and create personalized study schedules. How can I assist your study session today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: "Summarize My CS 201 Notes", icon: BookOpen },
    { label: "Generate 3 Quiz Questions for Calculus", icon: HelpCircle },
    { label: "Create 7-Day Exam Prep Schedule", icon: Calendar },
    { label: "Explain AVL Tree Rotations Simply", icon: Zap },
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { id: "msg_" + Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response generation
    setTimeout(() => {
      let aiText = "";
      const lower = text.toLowerCase();

      if (lower.includes("summarize") || lower.includes("notes")) {
        const topNote = notes[0];
        aiText = `Here is a summary of your top note **${topNote?.title || "Data Structures"}**:\n\n1. **Key Concept**: ${topNote?.category || "Core Lecture"} topic covering efficiency and structure.\n2. **Complexity**: Operation bounds strictly guaranteed at $O(\\log n)$.\n3. **Exam Tip**: Focus on rotation cases (LL, RR, LR, RL) before your upcoming midterm on ${exams[0]?.title || "next week"}.`;
      } else if (lower.includes("quiz") || lower.includes("questions")) {
        aiText = `Here are 3 Practice Quiz Questions based on your course scope:\n\n**Q1**: What is the maximum balance factor allowed in an AVL Tree?\n- *A)* 0\n- *B)* 1\n- *C)* 2\n\n**Q2**: Which vector theorem connects a surface integral of curl to a line integral around its boundary?\n- *A)* Divergence Theorem\n- *B)* Green's Theorem\n- *C)* Stokes' Theorem\n\n**Q3**: In IEEE format, what is the recommended word limit for an Abstract?\n- *A)* 50-100\n- *B)* 150-250\n- *C)* 500+`;
      } else if (lower.includes("schedule") || lower.includes("plan")) {
        aiText = `### 📅 7-Day Targeted Study Plan\n\n- **Days 1-2**: Deep review of AVL & Red-Black trees for CS 201 (2 hrs/day).\n- **Days 3-4**: Solve Stokes' theorem vector problems for MATH 202 (1.5 hrs/day).\n- **Days 5-6**: Complete Kirchhoff's lab calculations & review practice quizzes.\n- **Day 7**: Full mock exam run & flashcard review!`;
      } else {
        aiText = `Great question! Based on your active courses (${courses.map((c) => c.code).join(", ")}):\n\nKey recommendation: Focus first on high-weight assignments like **${exams[0]?.title || "Upcoming Midterm"}** (${exams[0]?.weight || 25}% of course grade). Would you like me to generate practice problems or review flashcards for this topic?`;
      }

      setMessages((prev) => [
        ...prev,
        { id: "ai_" + Date.now(), sender: "ai", text: aiText },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            StudyFlow AI Assistant
            <span className="rounded-full bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 text-xs font-bold">
              AI Powered
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Smart tutor integrated with your courses, notes, and exam schedules.
          </p>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {quickPrompts.map((qp, idx) => {
          const Icon = qp.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(qp.label)}
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition"
            >
              <Icon className="h-3.5 w-3.5 text-indigo-500" />
              <span>{qp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Container */}
      <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-[520px]">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs flex-shrink-0 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-indigo-500"
                }`}
              >
                {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-indigo-500 font-semibold py-2">
              <Sparkles className="h-4 w-4 animate-spin" />
              StudyFlow AI is thinking & analyzing notes...
            </div>
          )}
        </div>

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800"
        >
          <input
            type="text"
            placeholder="Ask AI anything about your courses, notes, or study tips..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
