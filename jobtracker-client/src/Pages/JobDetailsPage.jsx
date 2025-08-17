import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Paper,
    Grid,
    Chip,
    Avatar,
    Divider,
    ThemeProvider,
    createTheme,
    Container,
    Breadcrumbs,
    Link,
    Stack
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Business as BusinessIcon,
    Work as WorkIcon,
    Event as EventIcon,
    Notes as NotesIcon,
    Link as LinkIcon,
    Edit as EditIcon,
    Home as HomeIcon,
    Assessment as AssessmentIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon
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

export default function JobDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5064/api/JobApplications/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setJob(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching job details:", error);
                setLoading(false);
            });
    }, [id]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Applied":
                return "info";
            case "Interview":
                return "warning";
            case "Offer":
                return "success";
            case "Rejected":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Applied":
                return "📤";
            case "Interview":
                return "💬";
            case "Offer":
                return "🎉";
            case "Rejected":
                return "❌";
            default:
                return "📋";
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
                    <Box textAlign="center">
                        <Typography variant="h6" color="text.secondary" mb={2}>
                            Loading application details...
                        </Typography>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            border: '3px solid rgba(59, 130, 246, 0.3)',
                            borderTop: '3px solid #3B82F6',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto',
                            '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' }
                            }
                        }} />
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }

    if (!job) {
        return (
            <ThemeProvider theme={darkTheme}>
                <Box sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box textAlign="center">
                        <Typography variant="h6" color="error" mb={2}>
                            Application not found
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/')}
                            startIcon={<ArrowBackIcon />}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }

    const daysSinceApplied = job.dateApplied ?
        Math.floor((new Date() - new Date(job.dateApplied)) / (1000 * 60 * 60 * 24)) : 0;

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 4
            }}>
                <Container maxWidth="lg">
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
                            <AssessmentIcon sx={{ mr: 0.5, fontSize: 16 }} />
                            Application Details
                        </Typography>
                    </Breadcrumbs>

                    <Grid container spacing={3}>
                        {/* Main Details Card */}
                        <Grid item xs={12} md={8}>
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
                                    p: 4
                                }}>
                                    <Box display="flex" alignItems="center" gap={3} mb={3}>
                                        <Avatar sx={{
                                            width: 70,
                                            height: 70,
                                            bgcolor: 'rgba(255,255,255,0.2)',
                                            fontSize: '1.75rem',
                                            border: '3px solid rgba(255,255,255,0.3)',
                                            fontWeight: 'bold'
                                        }}>
                                            {job.companyName?.charAt(0)?.toUpperCase() || 'C'}
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="h3" fontWeight={700} mb={1}>
                                                {job.companyName}
                                            </Typography>
                                            <Typography variant="h5" sx={{ opacity: 0.9, mb: 2 }}>
                                                {job.role}
                                            </Typography>
                                            <Chip
                                                label={`${getStatusIcon(job.status)} ${job.status}`}
                                                color={getStatusColor(job.status)}
                                                size="medium"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    px: 2,
                                                    py: 1
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Content */}
                                <CardContent sx={{ p: 4 }}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" alignItems="center" gap={2} p={2}
                                                sx={{
                                                    bgcolor: 'rgba(59, 130, 246, 0.05)',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(59, 130, 246, 0.1)'
                                                }}>
                                                <BusinessIcon color="primary" sx={{ fontSize: 30 }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                                        COMPANY
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={600} color="text.primary">
                                                        {job.companyName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" alignItems="center" gap={2} p={2}
                                                sx={{
                                                    bgcolor: 'rgba(139, 92, 246, 0.05)',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(139, 92, 246, 0.1)'
                                                }}>
                                                <WorkIcon color="secondary" sx={{ fontSize: 30 }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                                        POSITION
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={600} color="text.primary">
                                                        {job.role}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" alignItems="center" gap={2} p={2}
                                                sx={{
                                                    bgcolor: 'rgba(16, 185, 129, 0.05)',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(16, 185, 129, 0.1)'
                                                }}>
                                                <EventIcon sx={{ color: '#10B981', fontSize: 30 }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                                        DATE APPLIED
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={600} color="text.primary">
                                                        {job.dateApplied ? new Date(job.dateApplied).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }) : "—"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" alignItems="center" gap={2} p={2}
                                                sx={{
                                                    bgcolor: 'rgba(245, 158, 11, 0.05)',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(245, 158, 11, 0.1)'
                                                }}>
                                                <LinkIcon sx={{ color: '#F59E0B', fontSize: 30 }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                                        RESUME
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {job.resumeLink ? (
                                                            <Link
                                                                href={job.resumeLink}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                sx={{
                                                                    color: 'primary.main',
                                                                    textDecoration: 'none',
                                                                    '&:hover': {
                                                                        textDecoration: 'underline',
                                                                        color: 'primary.light'
                                                                    }
                                                                }}
                                                            >
                                                                View Resume →
                                                            </Link>
                                                        ) : (
                                                            <Typography color="text.secondary">
                                                                No resume attached
                                                            </Typography>
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        {job.notes && (
                                            <Grid item xs={12}>
                                                <Box>
                                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                                        <NotesIcon color="primary" sx={{ fontSize: 24 }} />
                                                        <Typography variant="h6" fontWeight={600} color="text.primary">
                                                            Notes
                                                        </Typography>
                                                    </Box>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 3,
                                                            bgcolor: 'rgba(59, 130, 246, 0.05)',
                                                            borderRadius: 2,
                                                            border: '1px solid rgba(59, 130, 246, 0.1)'
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body1"
                                                            color="text.primary"
                                                            sx={{ lineHeight: 1.7 }}
                                                        >
                                                            {job.notes}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            {/* Application Statistics */}
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'rgba(59, 130, 246, 0.2)',
                                    bgcolor: 'background.paper',
                                    p: 3
                                }}
                            >
                                <Typography variant="h6" fontWeight={600} mb={3} color="primary.main">
                                    📊 Application Stats
                                </Typography>

                                <Stack spacing={3}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{
                                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: '50%',
                                            p: 1
                                        }}>
                                            <ScheduleIcon color="primary" />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Days since applied
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} color="text.primary">
                                                {daysSinceApplied} days
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box sx={{
                                            bgcolor: 'rgba(139, 92, 246, 0.1)',
                                            borderRadius: '50%',
                                            p: 1
                                        }}>
                                            <TrendingUpIcon color="secondary" />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Current status
                                            </Typography>
                                            <Typography variant="h6" fontWeight={600} color="text.primary">
                                                {job.status}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.2)' }} />

                                    {/* Status Timeline Suggestion */}
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            💡 Quick Tip
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{
                                            bgcolor: 'rgba(59, 130, 246, 0.05)',
                                            p: 2,
                                            borderRadius: 1,
                                            border: '1px solid rgba(59, 130, 246, 0.1)'
                                        }}>
                                            {job.status === 'Applied' && daysSinceApplied > 7 &&
                                                "Consider following up on your application."}
                                            {job.status === 'Interview' &&
                                                "Good luck with your interview process!"}
                                            {job.status === 'Offer' &&
                                                "Congratulations on your offer! 🎉"}
                                            {job.status === 'Rejected' &&
                                                "Keep going! Every rejection is a step closer to the right opportunity."}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                        {/* Actions & Stats Sidebar */}
                        <Grid item xs={12} md={4}>
                            {/* Quick Actions */}
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'rgba(59, 130, 246, 0.2)',
                                    bgcolor: 'background.paper',
                                    p: 3,
                                    mb: 3
                                }}
                            >
                                <Typography variant="h6" fontWeight={600} mb={3} color="primary.main">
                                    ⚡ Quick Actions
                                </Typography>

                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<EditIcon />}
                                        onClick={() => navigate(`/edit/${id}`)}
                                        sx={{
                                            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                            py: 2,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        Edit Application
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        startIcon={<ArrowBackIcon />}
                                        onClick={() => navigate('/')}
                                        sx={{
                                            py: 2,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            borderColor: 'rgba(59, 130, 246, 0.3)',
                                            color: 'primary.main',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'rgba(59, 130, 246, 0.05)',
                                                transform: 'translateY(-1px)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}