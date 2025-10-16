import { useEffect, useMemo, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("taskflow:tasks");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setTasks(parsed);
      }
    } catch (_) {
      // ignore corrupt storage
    }
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("taskflow:tasks", JSON.stringify(tasks));
    } catch (_) {
      // ignore quota/storage errors
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, searchQuery]);

  function addTask() {
    const title = newTaskTitle.trim();
    if (!title) return;
    const task = { id: Date.now(), title };
    setTasks((prev) => [task, ...prev]);
    setNewTaskTitle("");
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  return (
    <>
      <header className="site-header">
        <h1 className="text-white text-center mt-5 font-bold text-3xl">
          Task Flow
        </h1>
      </header>
      <main className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl rounded-md border border-white/20 bg-white/90 text-gray-900 px-3 py-2 shadow-sm"
        />
        <div className="w-full mt-2">
          <ul className="w-full space-y-2">
            {filteredTasks.length === 0 && (
              <li className="p-3 rounded-lg bg-white/80 text-gray-600 text-sm text-center">
                No tasks found
              </li>
            )}
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/90 shadow-sm"
              >
                <p className="text-gray-900 truncate pr-3">{task.title}</p>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M9 3.75A2.25 2.25 0 0 1 11.25 1.5h1.5A2.25 2.25 0 0 1 15 3.75V4.5h3.75a.75.75 0 0 1 0 1.5h-.51l-1.02 12.24A3.75 3.75 0 0 1 13.5 21.75h-3A3.75 3.75 0 0 1 7.77 18.24L6.75 6H6a.75.75 0 0 1 0-1.5H9V3.75ZM8.25 6l.99 11.88a2.25 2.25 0 0 0 2.25 2.12h3a2.25 2.25 0 0 0 2.25-2.12L17.76 6H8.25ZM10.5 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10.5 9Zm4.5 0a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 15 9ZM12.75 3.75h-1.5a.75.75 0 0 0-.75.75V4.5h3v-.75a.75.75 0 0 0-.75-.75Z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-3 mt-5 px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-center sm:text-left mt-5 font-medium text-2xl">
            Add new task
          </h1>
          <div className="w-full max-w-xl sm:max-w-2xl flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              className="w-full rounded-md border border-white/20 bg-white/90 text-gray-900 px-3 py-2 shadow-sm"
            />
            <button
              type="button"
              onClick={addTask}
              className="w-full sm:w-auto bg-amber-50 text-gray-900 rounded px-4 py-2 text-sm font-bold shadow-sm"
            >
              Submit
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-center font-bold text-2xl">
            Features
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col items-center text-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-blue-600"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.28 3.22a.75.75 0 011.06 0l9.44 9.44a.75.75 0 010 1.06l-6.72 6.72a.75.75 0 01-1.06 0L3.56 10.94a.75.75 0 010-1.06l6.72-6.66zM6.72 10.5l5.78 5.78 4.61-4.61-5.78-5.78-4.61 4.61z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Fast Task Capture
              </h3>
              <p className="text-sm text-gray-600">
                Add tasks instantly and keep moving without friction.
              </p>
            </div>

            <div className="feature-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col items-center text-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-emerald-600"
                aria-hidden="true"
              >
                <path d="M12 2a.75.75 0 01.75.75V7.5h3.75a.75.75 0 010 1.5h-3.75v10.25a.75.75 0 01-1.5 0V9H7.5a.75.75 0 010-1.5h3.75V2.75A.75.75 0 0112 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Organize Effortlessly
              </h3>
              <p className="text-sm text-gray-600">
                Group, sort, and prioritize so nothing falls through the cracks.
              </p>
            </div>

            <div className="feature-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col items-center text-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-amber-600"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.48 3.5a.75.75 0 011.04.3l6.75 12a.75.75 0 01-.66 1.12H5.39a.75.75 0 01-.66-1.12l6.75-12a.75.75 0 01.99-.3zm-.98 9.5h2.99l-1.5-3-1.49 3z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Stay Focused
              </h3>
              <p className="text-sm text-gray-600">
                Clean, minimal UI to help you focus on what matters.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-center font-bold text-2xl">
            What users say
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="testimonial-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col gap-4">
              <blockquote className="text-gray-800 text-sm leading-6">
                “Task Flow helped me organize my day in minutes. Simple and
                fast.”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                  AM
                </span>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    Amira M.
                  </p>
                  <p className="text-gray-500 text-xs">Marketing Lead</p>
                </div>
              </figcaption>
            </figure>

            <figure className="testimonial-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col gap-4">
              <blockquote className="text-gray-800 text-sm leading-6">
                “The clean UI keeps me focused. My weekly reviews are so much
                easier.”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold">
                  KA
                </span>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">
                    Khaled A.
                  </p>
                  <p className="text-gray-500 text-xs">Software Engineer</p>
                </div>
              </figcaption>
            </figure>

            <figure className="testimonial-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col gap-4">
              <blockquote className="text-gray-800 text-sm leading-6">
                “I capture tasks on the go and never lose track. Highly
                recommended.”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white text-sm font-semibold">
                  MS
                </span>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">Mona S.</p>
                  <p className="text-gray-500 text-xs">Product Manager</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-center font-bold text-2xl">Pricing</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="pricing-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-sm text-gray-600">
                Get started with the basics.
              </p>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                $0<span className="text-sm font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Unlimited tasks</li>
                <li>Basic organization</li>
                <li>Single device</li>
              </ul>
              <button className="mt-6 w-full rounded bg-gray-900 text-white py-2 text-sm font-semibold hover:bg-gray-800">
                Start Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card rounded-lg bg-white p-5 shadow-md ring-2 ring-blue-600 flex flex-col">
              <div className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                Popular
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">Pro</h3>
              <p className="mt-1 text-sm text-gray-600">
                Advanced tools for power users.
              </p>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                $9<span className="text-sm font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>All Free features</li>
                <li>Reminders & priorities</li>
                <li>Sync across devices</li>
              </ul>
              <button className="mt-6 w-full rounded bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700">
                Go Pro
              </button>
            </div>

            {/* Team Plan */}
            <div className="pricing-card rounded-lg bg-white/90 p-5 shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">Team</h3>
              <p className="mt-1 text-sm text-gray-600">
                Collaborate and scale together.
              </p>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                $29
                <span className="text-sm font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>Shared workspaces</li>
                <li>Roles & permissions</li>
                <li>Priority support</li>
              </ul>
              <button className="mt-6 w-full rounded bg-emerald-600 text-white py-2 text-sm font-semibold hover:bg-emerald-700">
                Start Team
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer mt-20 w-full border-t border-white/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-4">
            <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
              <a href="#privacy" className="hover:text-white">
                Privacy
              </a>
              <a href="#terms" className="hover:text-white">
                Terms
              </a>
              <a href="mailto:marwanabdalrady13@gmail.com" className="hover:text-white">
                marwanabdalrady13@gmail.com
              </a>
            </nav>
            <div className="mt-2 flex items-center gap-5">
              {/* GitHub */}
              <a
                href="https://github.com/MarwanabdalR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white/80 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.59 2 12.253c0 4.528 2.865 8.364 6.839 9.722.5.095.683-.22.683-.486 0-.24-.01-1.04-.015-1.887-2.782.617-3.37-1.2-3.37-1.2-.455-1.175-1.112-1.488-1.112-1.488-.91-.637.069-.624.069-.624 1.005.072 1.534 1.05 1.534 1.05.894 1.565 2.346 1.113 2.918.851.091-.663.35-1.113.636-1.37-2.22-.259-4.555-1.138-4.555-5.064 0-1.118.387-2.03 1.022-2.746-.103-.259-.443-1.303.097-2.716 0 0 .837-.27 2.744 1.05a9.28 9.28 0 0 1 2.5-.344 9.28 9.28 0 0 1 2.5.344c1.906-1.32 2.742-1.05 2.742-1.05.542 1.413.202 2.457.1 2.716.636.716 1.021 1.628 1.021 2.746 0 3.936-2.338 4.803-4.566 5.058.36.319.679.946.679 1.905 0 1.373-.013 2.48-.013 2.818 0 .268.18.583.688.484C19.138 20.614 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/marwan-abdalrady-57b87b222/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/80 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M4.983 3.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM3.75 9h2.466v11.25H3.75V9Zm6.028 0h-2.47v11.25h2.47v-5.876c0-1.55.294-3.053 2.215-3.053 1.894 0 1.918 1.706 1.918 3.15v5.779h2.47V13.38c0-3.06-.66-5.418-4.241-5.418-1.72 0-2.879.944-3.332 1.84h.045V9Z" />
                </svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-white/60">
              © {new Date().getFullYear()} Task Flow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
