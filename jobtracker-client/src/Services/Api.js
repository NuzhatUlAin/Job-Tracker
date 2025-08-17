import axios from 'axios';

const API_BASE = "https://localhost:5064/api/JobApplications"; // your backend URL

export const getJobs = () => axios.get(API_BASE);
export const getJob = (id) => axios.get(`${API_BASE}/${id}`);
export const createJob = (job) => axios.post(API_BASE, job);
export const updateJob = (id, job) => axios.put(`${API_BASE}/${id}`, job);
export const deleteJob = (id) => axios.delete(`${API_BASE}/${id}`);
