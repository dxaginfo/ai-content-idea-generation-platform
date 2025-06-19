import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Edit,
  Delete,
  ViewDay,
  ViewWeek,
  ViewModule,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns';

// Mock content types
const contentTypes = [
  'Blog Post',
  'Social Media Post',
  'Video Script',
  'Email Newsletter',
  'Podcast Episode',
  'Infographic',
  'Case Study',
];

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  contentType: string;
  date: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

// Mock calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Weekly Blog Post',
    description: 'Write and publish weekly blog post on AI trends',
    contentType: 'Blog Post',
    date: new Date(2025, 5, 20), // June 20, 2025
    status: 'Not Started',
  },
  {
    id: 'event-2',
    title: 'Monthly Newsletter',
    description: 'Prepare and send monthly newsletter to subscribers',
    contentType: 'Email Newsletter',
    date: new Date(2025, 5, 25), // June 25, 2025
    status: 'In Progress',
  },
  {
    id: 'event-3',
    title: 'Product Feature Video',
    description: 'Create video showcasing new product features',
    contentType: 'Video Script',
    date: new Date(2025, 5, 18), // June 18, 2025
    status: 'In Progress',
  },
  {
    id: 'event-4',
    title: 'Social Media Campaign',
    description: 'Launch new social media campaign for summer promotion',
    contentType: 'Social Media Post',
    date: new Date(2025, 5, 15), // June 15, 2025
    status: 'Completed',
  },
];

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  
  // New event form state
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    contentType: string;
    date: Date | null;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }>({
    title: '',
    description: '',
    contentType: contentTypes[0],
    date: new Date(),
    status: 'Not Started',
  });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleAddEvent = () => {
    setEditMode(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      description: '',
      contentType: contentTypes[0],
      date: new Date(),
      status: 'Not Started',
    });
    setDialogOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditMode(true);
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description || '',
      contentType: event.contentType,
      date: event.date,
      status: event.status,
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
    }
    setDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    if (editMode && selectedEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: newEvent.title,
                description: newEvent.description,
                contentType: newEvent.contentType,
                date: newEvent.date || new Date(),
                status: newEvent.status,
              }
            : event
        )
      );
    } else {
      // Add new event
      const newId = `event-${Date.now()}`;
      setEvents([
        ...events,
        {
          id: newId,
          title: newEvent.title,
          description: newEvent.description,
          contentType: newEvent.contentType,
          date: newEvent.date || new Date(),
          status: newEvent.status,
        },
      ]);
    }

    setDialogOpen(false);
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return days.map((day) => {
      const dayEvents = events.filter((event) => isSameDay(event.date, day));
      
      return (
        <Box
          key={day.toString()}
          sx={{
            p: 1,
            border: '1px solid #e0e0e0',
            height: 120,
            backgroundColor: isToday(day) ? 'rgba(63, 81, 181, 0.08)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: isToday(day) ? 'bold' : 'normal',
              color: isToday(day) ? 'primary.main' : 'text.primary',
              mb: 1,
            }}
          >
            {format(day, 'd')}
          </Typography>
          
          <Box sx={{ maxHeight: 80, overflowY: 'auto' }}>
            {dayEvents.map((event) => (
              <Paper
                key={event.id}
                sx={{
                  p: 0.5,
                  mb: 0.5,
                  backgroundColor:
                    event.status === 'Completed'
                      ? 'success.light'
                      : event.status === 'In Progress'
                      ? 'warning.light'
                      : 'info.light',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 1,
                  },
                }}
                onClick={() => handleEditEvent(event)}
              >
                <Typography variant="caption" noWrap>
                  {event.title}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Content Calendar
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddEvent}
        >
          Add Content
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handlePrevMonth}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h5" sx={{ mx: 2 }}>
              {format(currentDate, 'MMMM yyyy')}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ChevronRight />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              color={viewMode === 'day' ? 'primary' : 'default'}
              onClick={() => setViewMode('day')}
              title="Day view"
            >
              <ViewDay />
            </IconButton>
            <IconButton
              color={viewMode === 'week' ? 'primary' : 'default'}
              onClick={() => setViewMode('week')}
              title="Week view"
            >
              <ViewWeek />
            </IconButton>
            <IconButton
              color={viewMode === 'month' ? 'primary' : 'default'}
              onClick={() => setViewMode('month')}
              title="Month view"
            >
              <ViewModule />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Grid container columns={7}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Grid item xs={1} key={day} sx={{ textAlign: 'center', py: 1, fontWeight: 'bold' }}>
                <Typography variant="subtitle2">{day}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container columns={7}>
          {renderCalendarDays()}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upcoming Content
        </Typography>
        <Grid container spacing={2}>
          {events
            .filter((event) => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Paper
                  sx={{
                    p: 2,
                    position: 'relative',
                    borderLeft: `4px solid ${event.status === 'Completed' ? 'success.main' : event.status === 'In Progress' ? 'warning.main' : 'info.main'}`,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {event.contentType} • {event.status}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <IconButton size="small" onClick={() => handleEditEvent(event)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(event)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Add/Edit Event Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Content' : 'Add New Content'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={newEvent.title}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={newEvent.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="content-type-label">Content Type</InputLabel>
                  <Select
                    labelId="content-type-label"
                    name="contentType"
                    value={newEvent.contentType}
                    label="Content Type"
                    onChange={handleSelectChange}
                  >
                    {contentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={newEvent.status}
                    label="Status"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={newEvent.date}
                  onChange={handleDateChange}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Content Item</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
