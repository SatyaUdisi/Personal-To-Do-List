# Personal-To-Do-List

A simple, beautiful, responsive, and fully functional **Personal To-Do List Management System** designed for college student mini-project evaluations and lab demonstrations.

---

## 1. Project Overview

The **Personal To-Do List Management System** is a lightweight client-side web application designed to help individuals organize daily activities, assign task categories, track priority levels, monitor progress, and persist data across browser sessions.

### Key Highlights:
- **Zero Dependencies**: Pure HTML5, CSS3, and Vanilla JavaScript (ES6).
- **100% Offline Capability**: Runs directly in any web browser without an internet connection, Node.js, external CDNs, or web servers.
- **Persistent Data**: Automatically retains all tasks across page refreshes and browser restarts using browser `localStorage`.
- **Dashboard UI**: A warm sage-and-cream dashboard with task-entry panel, clickable date-summary cards, and a searchable task table.

---

## 2. Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure for task inputs, dashboard cards, filters, and tables. |
| **CSS3** | Modern styling, responsive flexbox/grid layout, and custom color-coded badges. |
| **JavaScript (ES6)** | DOM manipulation, task CRUD logic, real-time search, multi-criteria filtering, and validation. |
| **Browser LocalStorage** | Client-side persistent data storage (JSON format). |

> **Important**: This project uses **no external libraries or frameworks** (No React, Angular, Vue, Node.js, jQuery, Bootstrap, MySQL, or external APIs).

---

## 3. Project Folder Structure

```text
Personal-ToDo-List/
│
├── index.html       # Application layout and markup structure
├── style.css        # Visual styles, color scheme, typography, and responsive design
├── script.js        # Core logic, CRUD operations, search/filters, and LocalStorage
└── README.md        # Comprehensive documentation and project guide
```

### Purpose of Every File:

1. **`index.html`**:
   - Defines the structural elements of the application.
   - Contains the dark blue header with the checklist icon, the task creation/edit form, search and filter controls, the task data table, and the bottom feature dashboard.
   - Embeds lightweight inline SVG icons so the application works completely offline.

2. **`style.css`**:
   - Implements the complete visual design inspired by modern dashboard aesthetics.
   - Styles the header, rounded input controls, hover states, action buttons, table borders, and responsive breakpoints for desktop, tablet, and mobile displays.
   - Configures the custom badge colors:
     - **High Priority**: Soft red pill.
     - **Medium / Low Priority**: Soft green pills.
     - **Pending Status**: Soft yellow pill.
     - **Completed Status**: Soft green pill.

3. **`script.js`**:
   - Implements the interactive logic for the entire system:
     - **Create**: Adds new tasks with validation (prevents empty submissions).
     - **Read / View**: Renders tasks dynamically into the table.
     - **Update / Edit**: Loads existing task details into the form and allows updating.
     - **Delete**: Prompts the user with a confirmation modal before deleting.
     - **Search & Filter**: Real-time filtering by task title, category, priority, and completion status.
     - **LocalStorage Integration**: Automatically loads and persists tasks in JSON format.
     - **Default Seeding**: Pre-loads sample tasks matching the demonstration blueprint upon first load.

4. **`README.md`**:
   - Project documentation covering setup, features, code explanation, and college evaluation questions.

---

## 4. Features & Functionalities

1. **Task Entry Form**:
   - **Task Name**: Text input with real-time validation.
   - **Category**: Dropdown (`Study`, `Personal`, `Work`, `Health`, `Other`).
   - **Priority**: Dropdown (`Low`, `Medium`, `High`) with `Medium` as the default.
   - **Status**: Dropdown (`Pending`, `Completed`) with `Pending` as the default.
   - **Action**: Add Task button switches to "Update Task" with a "Cancel" button when editing.

2. **Dynamic Task Table**:
   - Displays all tasks organized by `Task`, `Category`, `Priority`, `Status`, and `Actions`.
   - Formats priority and status indicators into color-coded pill badges.
   - Provides quick **Edit** and **Delete** buttons for each row.

3. **Date-Based Task Views**:
   - **Today's Tasks** shows tasks due today and highlights pending rows while retaining completed tasks.
   - **This Week's Tasks** covers Monday through Sunday, shows due dates in ascending order, and reports pending and completed counts.
   - **Backlog** shows tasks without due dates and overdue pending tasks. Edit any task and set a due date to schedule it.
   - Existing tasks without a saved date remain in the backlog; missing priority values continue to default to `Medium`.

4. **Real-Time Search & Multi-Filter**:
   - Instant search filtering as you type in the search bar.
   - Independent dropdown filters for Category, Priority, and Status.
   - One-click **Reset** button to restore full view.

5. **Empty State Feedback**:
   - Displays an informative, friendly message when no tasks exist or when search filters return zero results.

6. **Data Persistence**:
   - Automatically synchronizes with browser `localStorage`.
   - Retains all changes even when closing or refreshing the browser.

7. **Dashboard Summary Cards**:
   - Clickable cards open Backlog, Today, Tomorrow, or This Week views and show matching task counts.
   - Today, tomorrow, and weekly cards also show pending/completed counts and completion progress.

---

## 5. How to Run the Project

No compilation, terminal configuration, or web server installation is required.

### Quick Start:
1. Open the folder:
   ```text
   Personal-ToDo-List/
   ```
2. Double-click **`index.html`** or right-click **`index.html`** &rarr; **Open with** &rarr; Select your preferred browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, or Brave).
3. The application will immediately load with default sample tasks ready for demonstration.
