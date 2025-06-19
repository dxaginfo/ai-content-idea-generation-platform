import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  LightbulbOutlined,
  TrendingUp,
  BookmarkBorder,
  CalendarMonth,
  ChevronRight,
  Lightbulb,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// In a real app, these would come from API calls
const recentIdeas = [
  {
    id: 'idea-1',
    title: '10 AI Tools for Content Creation in 2025',
    date: '2025-06-19',
    type: 'Blog Post',
  },
  {
    id: 'idea-2',
    title: 'How to Leverage Social Media for B2B Marketing',
    date: '2025-06-18',
    type: 'Social Media Post',
  },
  {
    id: 'idea-3',
    title: 'The Future of Remote Work: Post-Pandemic Trends',
    date: '2025-06-17',
    type: 'Video Script',
  },
];

const upcomingContent = [
  {
    id: 'content-1',
    title: 'Weekly Newsletter: Industry Updates',
    dueDate: '2025-06-21',
    status: 'In Progress',
    progress: 60,
  },
  {
    id: 'content-2',
    title: 'Product Launch Announcement',
    dueDate: '2025-06-25',
    status: 'Not Started',
    progress: 0,
  },
  {
    id: 'content-3',
    title: 'Interview with Industry Expert',
    dueDate: '2025-06-30',
    status: 'In Progress',
    progress: 30,
  },
];

const trendingTopics = [
  'Artificial Intelligence',
  'Sustainable Business Practices',
  'Remote Work Tools',
  'Mental Health in the Workplace',
  'Blockchain Applications',
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your content ideas and upcoming schedule.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            elevation={2}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LightbulbOutlined />}
                component={RouterLink}
                to="/idea-generator"
                sx={{ py: 1.5 }}
              >
                Generate New Ideas
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarMonth />}
                component={RouterLink}
                to="/calendar"
                sx={{ py: 1.5 }}
              >
                View Content Calendar
              </Button>
              <Button
                variant="outlined"
                startIcon={<BookmarkBorder />}
                component={RouterLink}
                to="/saved-ideas"
                sx={{ py: 1.5 }}
              >
                Browse Saved Ideas
              </Button>
              <Button
                variant="outlined"
                startIcon={<TrendingUp />}
                component={RouterLink}
                to="/analytics"
                sx={{ py: 1.5 }}
              >
                View Analytics
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Ideas */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            elevation={2}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Recently Generated Ideas
              </Typography>
              <Button
                component={RouterLink}
                to="/saved-ideas"
                endIcon={<ChevronRight />}
                size="small"
              >
                View All
              </Button>
            </Box>
            <List>
              {recentIdeas.map((idea, index) => (
                <React.Fragment key={idea.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Lightbulb color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={idea.title}
                      secondary={
                        <>
                          {new Date(idea.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          • {idea.type}
                        </>
                      }
                    />
                    <Button size="small" color="primary">
                      Use
                    </Button>
                  </ListItem>
                  {index < recentIdeas.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
              {recentIdeas.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No ideas generated yet"
                    secondary="Start creating content ideas with our AI generator"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Upcoming Content
              </Typography>
              <Button
                component={RouterLink}
                to="/calendar"
                endIcon={<ChevronRight />}
                size="small"
              >
                Open Calendar
              </Button>
            </Box>
            <Grid container spacing={2}>
              {upcomingContent.map((content) => (
                <Grid item xs={12} key={content.id}>
                  <Card variant="outlined">
                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="subtitle1" component="div">
                        {content.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Due: {new Date(content.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {content.status}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={content.progress}
                          sx={{ height: 8, borderRadius: 5 }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Edit</Button>
                      <Button size="small" color="primary">
                        Mark Complete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              {upcomingContent.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    No upcoming content scheduled. Visit the calendar to plan your content.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Trending Topics */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Typography variant="h6" component="h2" gutterBottom>
              Trending Topics
            </Typography>
            <List>
              {trendingTopics.map((topic, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <TrendingUp color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                    <Button
                      size="small"
                      variant="outlined"
                      component={RouterLink}
                      to={`/idea-generator?topic=${encodeURIComponent(topic)}`}
                    >
                      Generate
                    </Button>
                  </ListItem>
                  {index < trendingTopics.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
