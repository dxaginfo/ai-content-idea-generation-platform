import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Lightbulb,
  Refresh,
  Bookmark,
  BookmarkBorder,
  Send,
  ContentCopy,
} from '@mui/icons-material';

// Mock data for industries and content types
const industries = [
  'Technology',
  'Marketing',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Travel',
  'Food & Beverage',
  'Fashion',
  'Fitness',
];

const contentTypes = [
  'Blog Post',
  'Social Media Post',
  'Video Script',
  'Email Newsletter',
  'Podcast Episode',
  'Infographic',
  'Case Study',
  'How-to Guide',
];

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  contentType: string;
  isSaved?: boolean;
}

// This would normally come from an API call
const mockGenerateIdeas = (topic: string, industry: string, contentType: string): Promise<ContentIdea[]> => {
  // In a real app, we would call the backend API here
  return new Promise((resolve) => {
    setTimeout(() => {
      const ideas: ContentIdea[] = [
        {
          id: `idea-${Date.now()}-1`,
          title: `${contentType}: ${topic} Trends in ${industry} for 2025`,
          description: `Explore the upcoming trends in ${topic} within the ${industry} sector. This ${contentType.toLowerCase()} will cover innovations, market changes, and expert predictions.`,
          keywords: [topic, industry, 'trends', '2025', 'innovation'],
          contentType,
        },
        {
          id: `idea-${Date.now()}-2`,
          title: `How ${topic} is Transforming ${industry}`,
          description: `Deep dive into the impact of ${topic} on the ${industry} landscape. Explore case studies, success stories, and transformation strategies.`,
          keywords: [topic, industry, 'transformation', 'case study', 'impact'],
          contentType,
        },
        {
          id: `idea-${Date.now()}-3`,
          title: `${topic} Best Practices for ${industry} Professionals`,
          description: `A comprehensive guide to ${topic} best practices specifically tailored for ${industry} professionals. Include expert tips, tools, and actionable strategies.`,
          keywords: [topic, industry, 'best practices', 'guide', 'tips'],
          contentType,
        },
        {
          id: `idea-${Date.now()}-4`,
          title: `The Future of ${topic} in ${industry}`,
          description: `Examine what's next for ${topic} within the ${industry} sector. Cover emerging technologies, changing consumer behaviors, and strategic opportunities.`,
          keywords: [topic, industry, 'future', 'emerging', 'strategy'],
          contentType,
        },
      ];
      resolve(ideas);
    }, 1500); // Simulate API delay
  });
};

const IdeaGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedContentType, setSelectedContentType] = useState('');
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleIndustryChange = (event: SelectChangeEvent) => {
    setSelectedIndustry(event.target.value);
  };

  const handleContentTypeChange = (event: SelectChangeEvent) => {
    setSelectedContentType(event.target.value);
  };

  const handleGenerateIdeas = async () => {
    if (!topic) {
      setSnackbar({
        open: true,
        message: 'Please enter a topic',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const generatedIdeas = await mockGenerateIdeas(
        topic,
        selectedIndustry || 'General',
        selectedContentType || 'Blog Post'
      );
      setIdeas(generatedIdeas);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error generating ideas. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIdea = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, isSaved: !idea.isSaved } : idea
    ));
    
    setSnackbar({
      open: true,
      message: 'Idea saved successfully!',
      severity: 'success',
    });
  };

  const handleCopyIdea = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({
      open: true,
      message: 'Copied to clipboard!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Content Idea Generator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Generate creative content ideas based on your topic, industry, and preferred content type.
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Topic or Keyword"
              variant="outlined"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., Artificial Intelligence, Remote Work)"
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Industry</InputLabel>
              <Select
                value={selectedIndustry}
                label="Industry"
                onChange={handleIndustryChange}
                disabled={loading}
              >
                <MenuItem value="">Any Industry</MenuItem>
                {industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={selectedContentType}
                label="Content Type"
                onChange={handleContentTypeChange}
                disabled={loading}
              >
                <MenuItem value="">Any Type</MenuItem>
                {contentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Lightbulb />}
              onClick={handleGenerateIdeas}
              disabled={loading}
              sx={{ py: 1.5, px: 4 }}
            >
              {loading ? 'Generating Ideas...' : 'Generate Ideas'}
            </Button>
            {ideas.length > 0 && !loading && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Refresh />}
                onClick={handleGenerateIdeas}
                sx={{ ml: 2, py: 1.5 }}
              >
                Refresh Ideas
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {ideas.length > 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              Generated Ideas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              {ideas.length} ideas generated
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {ideas.map((idea) => (
              <Grid item xs={12} md={6} key={idea.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { boxShadow: 3 },
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {idea.title}
                      </Typography>
                      <Chip
                        label={idea.contentType}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {idea.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                      {idea.keywords.map((keyword) => (
                        <Chip
                          key={keyword}
                          label={keyword}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <IconButton
                      aria-label="save"
                      onClick={() => handleSaveIdea(idea.id)}
                      color={idea.isSaved ? 'primary' : 'default'}
                    >
                      {idea.isSaved ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                    <IconButton
                      aria-label="copy"
                      onClick={() => handleCopyIdea(`${idea.title}\n\n${idea.description}`)}
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<Send />}
                      sx={{ ml: 'auto' }}
                    >
                      Use Idea
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default IdeaGeneratorPage;
