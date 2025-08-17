// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./Pages/JobListPage";
import JobDetailsPage from "./Pages/JobDetailsPage";
import JobFormPage from "./Pages/JobFormPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JobListPage />} />
                <Route path="/view/:id" element={<JobDetailsPage />} />
                <Route path="/add" element={<JobFormPage />} />
                <Route path="/edit/:id" element={<JobFormPage />} />
            </Routes>
        </Router>
    );
}
