# Cognitive Classroom Frontend Blueprint

## Overview

This document outlines the plan for building the complete React frontend for "Cognitive Classroom." The application will be a single-page application (SPA) built with React and Vite, using Supabase for authentication and a separate backend API for data management.

## Core Technologies

*   **Framework:** React (with Vite)
*   **Routing:** React Router DOM
*   **Authentication:** Supabase (client-side)
*   **API Client:** Axios with JWT interceptor
*   **Styling:** Tailwind CSS with Shadcn/UI for components
*   **State Management:** React Context API for auth, component state for local UI state.

## Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── (ui)/                 # Shadcn/UI components
│   │   ├── CourseCard.tsx
│   │   ├── ModuleNavigation.tsx
│   │   ├── ModuleViewer.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── supabase/
│   │       └── client.ts
│   ├── pages/
│   │   ├── (auth)/
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── (main)/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CourseLearn.tsx
│   │   │   └── instructor/
│   │   │       └── CourseEdit.tsx
│   │   └── 404.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env
├── .eslintrc.cjs
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.ts
```

## Implementation Plan

1.  **Setup & Configuration:**
    *   Install all necessary dependencies (`react-router-dom`, `axios`, `supabase`, `tailwindcss`, `shadcn-ui`).
    *   Create the `.env` file with the provided Supabase and API credentials.
    *   Configure Tailwind CSS.

2.  **Authentication:**
    *   Create the Supabase client in `src/lib/supabase/client.ts`.
    *   Create the `AuthContext` in `src/context/AuthContext.tsx` to manage the user session.
    *   Create a `useAuth` hook for easy access to the auth context.
    *   Wrap the application in the `AuthProvider` in `src/main.tsx`.

3.  **API Client:**
    *   Create an Axios instance in `src/lib/api.ts`.
    *   Implement an interceptor to automatically add the Supabase JWT to every request.

4.  **Routing & Layout:**
    *   Set up all application routes in `src/App.tsx` using `react-router-dom`.
    *   Create a protected route component that checks for an active session and redirects to `/login` if the user is not authenticated.
    *   Implement the main application layout with a sidebar and navbar.

5.  **Page Development:**
    *   **Login/Signup:** Build the authentication forms and logic.
    *   **Dashboard:** Fetch and display user-specific courses.
    *   **Course Learn:** Build the student-facing learning interface.
    *   **Course Edit:** Build the instructor-facing course editor with AI features.

6.  **Component Development:**
    *   Create all reusable components as outlined in the project structure.
    *   Use Shadcn/UI as the base for UI elements.

7.  **Final Touches:**
    *   Implement error handling and loading states.
    *   Ensure the application is responsive and accessible.
    *   Write tests for critical components and logic.

## Progress Update

*   **Authentication:** A complete authentication system with login and signup has been implemented using Supabase. The UI of the login and signup pages has been updated with a more modern design.
*   **Layout:** A consistent and modern application layout has been established, featuring a main content area and a sidebar for navigation. A new `MainLayout` component has been created to enforce this structure.
*   **Routing:** Protected routes have been implemented to ensure that only authenticated users can access the main application.
*   **Pages:** The foundational pages for the student-facing dashboard and the instructor-facing area have been created.
*   **Styling:** The application has been styled with Tailwind CSS for a clean and modern look and feel. The `tailwind.config.js` file has been updated to include the Shadcn/UI theme.
*   **Code Structure:** The project has been organized into a clear and maintainable structure.
*   **Student Dashboard:** The student dashboard now displays a list of courses using mock data. This includes a `CourseCard` component and a `courses` data file. The dashboard now uses the new `MainLayout`.
*   **Instructor Dashboard:** The instructor dashboard has been updated to display a list of courses and a "Create Course" button. This provides a more intuitive and functional interface for instructors to manage their educational content.

## API Improvement Suggestions

*   **Endpoint for Enrolled Courses:** To avoid the N+1 query problem when fetching a user's enrolled courses, it is recommended to create a new backend endpoint: `GET /users/{user_id}/enrolled-courses`. This endpoint should return a list of course objects with full details that the user is enrolled in. This will improve performance and reduce the number of requests from the frontend.