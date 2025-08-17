import React from "react";

export default function JobTable({ jobs, onView, onEdit, onDelete }) {
    return (
        <table border={1} cellPadding={5} cellSpacing={0} style={{ marginTop: "10px" }}>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date Applied</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.companyName}</td>
                        <td>{job.role}</td>
                        <td>{job.status}</td>
                        <td>{new Date(job.dateApplied).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => onView(job.id)}>View</button>
                            <button onClick={() => onEdit(job.id)}>Edit</button>
                            <button onClick={() => onDelete(job.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
