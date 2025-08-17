// ===== JobFormPage.js =====
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../Components/JobForm";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    ThemeProvider,
    createTheme,
    Container,
    Breadcrumbs,
    Link
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Home as HomeIcon
} from '@mui/icons-material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3B82F6',
            light: '#60A5FA',
            dark: '#1E40AF',
        },
        secondary: {
            main: '#8B5CF6',
        },
        background: {
            default: '#0F172A',
            paper: '#1E293B',
        },
        text: {
            primary: '#F8FAFC',
            secondary: '#CBD5E1',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default function JobFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState(null);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:5064/api/JobApplications/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched data for editing:", data);

                    // Format date properly for input field
                    let formattedDate = "";
                    if (data.dateApplied) {
                        const date = new Date(data.dateApplied);
                        // Format as YYYY-MM-DD for HTML date input
                        formattedDate = date.toISOString().split('T')[0];
                    }

                    setDefaultValues({
                        companyName: data.companyName || "",
                        role: data.role || "",
                        status: data.status || "Applied",
                        dateApplied: formattedDate,
                        notes: data.notes || "",
                        resumeLink: data.resumeLink || "",
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching job data:", error);
                    setLoading(false);
                });
        } else {
            // For new job, set default values immediately
            setDefaultValues({
                companyName: "",
                role: "",
                status: "Applied",
                dateApplied: "",
                notes: "",
                resumeLink: "",
            });
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        const url = id
            ? `http://localhost:5064/api/JobApplications/${id}`
            : "http://localhost:5064/api/JobApplications";

        const method = id ? "PUT" : "POST";

        // Prepare payload
        const payload = {
            id: id,
            companyName: formData.companyName || "",
            role: formData.role || "",
            status: formData.status || "Applied",
            dateApplied: formData.dateApplied ? new Date(formData.dateApplied).toISOString() : null,
            notes: formData.notes || null,
            resumeLink: formData.resumeLink || null,
        };

        console.log("payload", payload);

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Backend error:", errorText);
                return;
            }

            navigate("/"); // go back after success
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    if (loading) {
        return (
            <ThemeProvider theme={darkTheme}>
                <Box sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h6" color="text.secondary">
                        Loading...
                    </Typography>
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 4
            }}>
                <Container maxWidth="md">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator="›"
                        sx={{ mb: 3, color: 'text.secondary' }}
                    >
                        <Link
                            color="inherit"
                            href="#"
                            onClick={() => navigate('/')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
                            Dashboard
                        </Link>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                            {id ? <EditIcon sx={{ mr: 0.5, fontSize: 16 }} /> : <AddIcon sx={{ mr: 0.5, fontSize: 16 }} />}
                            {id ? "Edit Application" : "New Application"}
                        </Typography>
                    </Breadcrumbs>

                    {/* Main Card */}
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            bgcolor: 'background.paper',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <Box sx={{
                            background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                            color: 'white',
                            p: 3
                        }}>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                {id ? <EditIcon sx={{ fontSize: 32 }} /> : <AddIcon sx={{ fontSize: 32 }} />}
                                {id ? "Edit Job Application" : "Add New Job Application"}
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                                {id ? "Update your application details" : "Fill in the details for your new job application"}
                            </Typography>
                        </Box>

                        {/* Form Content */}
                        <CardContent sx={{ p: 4 }}>
                            {defaultValues && (
                                <JobForm
                                    defaultValues={defaultValues}
                                    onSubmit={handleSubmit}
                                    key={id || 'new'} // Force re-render when switching between edit/new
                                />
                            )}
                        </CardContent>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}