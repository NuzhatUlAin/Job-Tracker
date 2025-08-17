// ===== JobListPage.js =====
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../Components/ConfirmDialog";
import { DataGrid } from "@mui/x-data-grid";
import {
    Button,
    Chip,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Paper,
    IconButton,
    Tooltip,
    Stack,
    Avatar,
    ThemeProvider,
    createTheme,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import {
    Work as WorkIcon,
    Add as AddIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    Schedule as ScheduleIcon,
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    Search as SearchIcon
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
            light: '#A78BFA',
            dark: '#7C3AED',
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

export default function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    const fetchJobs = async () => {
        const res = await fetch("http://localhost:5064/api/JobApplications");
        const data = await res.json();
        setJobs(data);
        if (data.length > 0) {
            console.log("First row object:", data[0]);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Filter jobs based on search query
    const filteredJobs = jobs.filter((job) =>
        (`${job.companyName} ${job.role}`)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Sort filtered jobs by date
    const sortedAndFilteredJobs = [...filteredJobs].sort((a, b) => {
        const dateA = new Date(a.dateApplied || 0);
        const dateB = new Date(b.dateApplied || 0);

        if (sortOrder === "newest") {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    });

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5064/api/JobApplications/${id}`, {
            method: "DELETE",
        });
        setDeleteId(null);
        fetchJobs();
    };

    const statusColor = (status) => {
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

    const columns = [
        {
            field: "companyName",
            headerName: "Company",
            flex: 1.2,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem',
                            border: '2px solid rgba(59, 130, 246, 0.3)'
                        }}>
                            {params.value?.charAt(0)?.toUpperCase() || 'C'}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                            {params.value}
                        </Typography>
                    </Box>
                </Box>
            ),
        },
        {
            field: "role",
            headerName: "Position",
            flex: 1.3,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Chip
                        label={`${getStatusIcon(params.value)} ${params.value}`}
                        color={statusColor(params.value)}
                        variant="filled"
                        size="small"
                        sx={{
                            fontWeight: 600,
                            minWidth: 100,
                            '& .MuiChip-label': {
                                fontSize: '0.75rem'
                            }
                        }}
                    />
                </Box>
            ),
        },
        {
            field: "dateApplied",
            headerName: "Date Applied",
            flex: 1,
            renderCell: (params) => {
                const dateStr = params.value;
                if (!dateStr) {
                    return (
                        <Typography variant="body2" color="text.disabled">
                            No date
                        </Typography>
                    );
                }
                const date = new Date(dateStr);
                return (
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                        {date.toLocaleDateString()}
                    </Typography>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="View Details">
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => navigate(`/view/${params.row.id}`)}
                            >
                                <ViewIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Application">
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'secondary.main',
                                    '&:hover': {
                                        bgcolor: 'secondary.main',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => navigate(`/edit/${params.row.id}`)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Application">
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'error.main',
                                    '&:hover': {
                                        bgcolor: 'error.main',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setDeleteId(params.row.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>
            ),
        },
    ];

    const statusCounts = ["Applied", "Interview", "Offer", "Rejected"].map((status) => ({
        status,
        count: jobs.filter((j) => j.status === status).length,
    }));

    const pieColors = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];
    const totalApplications = jobs.length;
    const successRate = totalApplications > 0
        ? ((jobs.filter(j => j.status === 'Offer').length / totalApplications) * 100).toFixed(1)
        : 0;
    const pendingApplications = jobs.filter(j => j.status === 'Applied' || j.status === 'Interview').length;

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{
                minHeight: '100vH',
                bgcolor: 'background.default',
            }}>

                {/* Header */}
                <Box mb={4} px={4} pb={2} pt={4}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="primary.main"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <WorkIcon sx={{ fontSize: 40 }} />
                        Job Applications Dashboard
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>
                        Track and manage your career opportunities
                    </Typography>
                </Box>

                {/* Action Bar */}
                <Box px={4} mb={4}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        justifyContent="space-between"
                    >
                        {/* Add New Button */}
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/add")}
                            sx={{
                                borderRadius: 3,
                                py: 1.8,
                                fontWeight: 600,
                                textTransform: 'none',
                                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                                '&:hover': {
                                    boxShadow: '0 12px 35px rgba(59, 130, 246, 0.4)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease',
                                minWidth: 200
                            }}
                        >
                            Add New Application
                        </Button>

                        {/* Search and Sort Controls */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {/* Search Field */}
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                }}
                                sx={{
                                    width: 250,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            bgcolor: 'rgba(59, 130, 246, 0.05)'
                                        },
                                        '&.Mui-focused': {
                                            bgcolor: 'rgba(59, 130, 246, 0.1)'
                                        }
                                    },
                                }}
                            />

                            {/* Sort Dropdown */}
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel sx={{ color: 'text.secondary' }}>Sort by Date</InputLabel>
                                <Select
                                    value={sortOrder}
                                    label="Sort by Date"
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    sx={{
                                        borderRadius: 3,
                                        bgcolor: 'background.paper',
                                        '&:hover': {
                                            bgcolor: 'rgba(59, 130, 246, 0.05)'
                                        },
                                        '&.Mui-focused': {
                                            bgcolor: 'rgba(59, 130, 246, 0.1)'
                                        }
                                    }}
                                >
                                    <MenuItem value="newest">Newest First</MenuItem>
                                    <MenuItem value="oldest">Oldest First</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Box>

                <Grid container spacing={4} justifyContent="space-between" px={4} pb={6}>
                    {/* Left: Data Table */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                height: 300, // fixed height so DataGrid can fill it
                                width: 1000,
                                borderRadius: 3,
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: 'rgba(59, 130, 246, 0.2)',
                                bgcolor: 'background.paper',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <DataGrid
                                    rows={sortedAndFilteredJobs}
                                    columns={columns}
                                    getRowId={(row) => row.id}
                                    pageSize={8}
                                    rowsPerPageOptions={[8, 16, 24]}
                                    disableSelectionOnClick
                                    sx={{
                                        border: 0,
                                        color: 'text.primary',
                                        '& .MuiDataGrid-columnHeaders': {
                                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            color: 'text.primary',
                                            borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
                                        },
                                        '& .MuiDataGrid-row': {
                                            '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.05)' },
                                            borderBottom: '1px solid rgba(59, 130, 246, 0.1)'
                                        },
                                        '& .MuiDataGrid-cell': { border: 0, py: 2 },
                                        '& .MuiDataGrid-footerContainer': {
                                            borderTop: '1px solid rgba(59, 130, 246, 0.2)',
                                            color: 'text.primary'
                                        }
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right: Chart */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                height: 250, // same fixed height
                                p: 3,
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'rgba(59, 130, 246, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={3} color="primary.main">
                                📊 Application Status Overview
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statusCounts}>
                                        <XAxis dataKey="status" tick={{ fontSize: 12, fill: darkTheme.palette.text.secondary }} axisLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: darkTheme.palette.text.secondary }} axisLine={false} />
                                        <RechartsTooltip contentStyle={{
                                            backgroundColor: darkTheme.palette.background.paper,
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            borderRadius: 8,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                            color: darkTheme.palette.text.primary
                                        }} />
                                        <Bar dataKey="count" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6} />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Stats Cards */}
                <Grid container spacing={2} justifyContent="space-between" px={4} py={2}>
                    {/* Total Applications */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                            color: 'white',
                            borderRadius: 3,
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            px: 8
                        }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h4" fontWeight={700}>{totalApplications}</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Applications</Typography>
                                    </Box>
                                    <BusinessIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* In Progress */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                            color: 'white',
                            borderRadius: 3,
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            px: 8
                        }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h4" fontWeight={700}>{pendingApplications}</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>In Progress</Typography>
                                    </Box>
                                    <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Success Rate */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                            color: 'white',
                            borderRadius: 3,
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            px: 8
                        }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h4" fontWeight={700}>{successRate}%</Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>Success Rate</Typography>
                                    </Box>
                                    <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Offers Received */}
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                        <Card sx={{
                            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                            color: 'white',
                            borderRadius: 3,
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            px: 8
                        }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h4" fontWeight={700}>
                                            {jobs.filter(j => j.status === 'Offer').length}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>Offers Received</Typography>
                                    </Box>
                                    <AssessmentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Delete Confirmation Dialog */}
                {deleteId && (
                    <ConfirmDialog
                        title="Confirm Deletion"
                        message="Are you sure you want to delete this job application? This action cannot be undone."
                        onConfirm={() => handleDelete(deleteId)}
                        onCancel={() => setDeleteId(null)}
                    />
                )}
            </Box>
        </ThemeProvider>
    );
}