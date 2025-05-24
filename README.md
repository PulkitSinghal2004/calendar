# React Calendar Component with Tailwind CSS

A compact, user-friendly monthly calendar component built with React and Tailwind CSS.  
It displays a monthly grid with navigation, highlights the current date, supports selecting dates,  
and visually shows static events loaded from a JSON file. Sundays and Saturdays are color-coded  
for better readability. Overlapping events are highlighted to indicate conflicts.

---

## Features

- Displays current month and year by default
- Navigate to previous and next months
- Highlights today's date
- Sundays are shown in red; Saturdays in indigo
- Displays static events loaded from a JSON file
- Shows event details (title, time, duration) on the calendar dates
- Handles overlapping/conflicting events with color coding
- Select dates to view their events above the calendar
- Compact and clean UI with a light theme using Tailwind CSS
- Responsive and accessible buttons

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- React 17+ or 18+
- Tailwind CSS configured in your React project
- `dayjs` installed (`npm install dayjs`)
- `classnames` installed (`npm install classnames`)

# file struture
src/
 ├─ components/
 │   └─ Calendar.jsx
 ├─ data/
 │   └─ events.json
 ├─ App.jsx
 └─ index.jsx
