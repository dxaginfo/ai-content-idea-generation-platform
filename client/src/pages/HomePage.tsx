import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  LightbulbOutlined,
  TrendingUp,
  CalendarMonth,
  Analytics,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <LightbulbOutlined fontSize="large" color="primary" />,
      title: 'AI-Powered Idea Generation',
      description:
        'Generate creative content ideas based on topics, industries, and target audiences. Our AI analyzes trends and user data to suggest highly relevant content.',
    },
    {
      icon: <TrendingUp fontSize="large" color="primary" />,
      title: 'Trend Analysis',
      description:
        'Stay ahead of the curve with real-time trend analysis. Identify trending topics and content opportunities in your niche before your competitors.',
    },
    {
      icon: <CalendarMonth fontSize="large" color="primary" />,
      title: 'Content Calendar Planning',
      description:
        'Plan and schedule your content with an intuitive calendar interface. Never miss a posting deadline with our smart scheduling tools.',
    },
    {
      icon: <Analytics fontSize="large" color="primary" />,
      title: 'Performance Analytics',
      description:
        'Track the performance of your content ideas with comprehensive analytics. Understand what works and optimize your content strategy.',
    },
  ];

  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)',
          color: 'white',
          pt: 8,
          pb: 8,
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Generate Engaging Content Ideas with AI
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Supercharge your content creation process with AI-powered idea
            generation, trend analysis, and content planning tools.
          </Typography>
          <Box sx={{ mt: 4 }}>
            {user ? (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/idea-generator"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Start Generating Ideas
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/register"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Get Started For Free
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Powerful Features for Content Creators
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
                elevation={1}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="small"
                    color="primary"
                    component={RouterLink}
                    to={user ? '/idea-generator' : '/register'}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 8,
            py: 6,
            px: 4,
            textAlign: 'center',
            bgcolor: 'rgba(63, 81, 181, 0.08)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h3" gutterBottom>
            Ready to Transform Your Content Strategy?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
          >
            Join thousands of content creators, marketers, and social media
            managers who are using AI to generate better content ideas, faster.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to={user ? '/idea-generator' : '/register'}
            sx={{ px: 4, py: 1.5 }}
          >
            {user ? 'Go to Dashboard' : 'Start Your Free Trial'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
