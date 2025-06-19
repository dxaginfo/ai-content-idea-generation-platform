import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Bookmark,
  Delete,
  Edit,
  ContentCopy,
  Search,
  FilterList,
  Send,
} from '@mui/icons-material';

// Mock data for saved ideas
const mockSavedIdeas = [
  {
    id: 'idea-1',
    title: '10 AI Tools for Content Creation in 2025',
    description:
      'Explore the top AI tools that content creators can use to streamline their workflow and create better content faster.',
    contentType: 'Blog Post',
    industry: 'Technology',
    keywords: ['AI', 'content creation', 'tools', '2025', 'productivity'],
    createdAt: '2025-06-15',
  },
  {
    id: 'idea-2',
    title: 'How to Leverage Social Media for B2B Marketing',
    description:
      'Strategic approaches to using social media platforms for effective B2B marketing and lead generation.',
    contentType: 'Social Media Strategy',
    industry: 'Marketing',
    keywords: ['B2B', 'social media', 'marketing', 'lead generation', 'strategy'],
    createdAt: '2025-06-14',
  },
  {
    id: 'idea-3',
    title: 'The Future of Remote Work: Post-Pandemic Trends',
    description:
      'Analysis of how remote work has evolved after the pandemic and what trends are shaping the future of work.',
    contentType: 'Video Script',
    industry: 'Human Resources',
    keywords: ['remote work', 'future of work', 'post-pandemic', 'trends', 'HR'],
    createdAt: '2025-06-13',
  },
  {
    id: 'idea-4',
    title: '5 Effective Email Marketing Campaigns for E-commerce',
    description:
      'Case studies of successful email marketing campaigns for e-commerce businesses with actionable takeaways.',
    contentType: 'Email Newsletter',
    industry: 'E-commerce',
    keywords: ['email marketing', 'e-commerce', 'campaigns', 'case studies'],
    createdAt: '2025-06-12',
  },
  {
    id: 'idea-5',
    title: 'Sustainable Business Practices for Small Companies',
    description:
      'Practical sustainability initiatives that small businesses can implement to reduce their environmental impact.',
    contentType: 'Blog Post',
    industry: 'Sustainability',
    keywords: ['sustainability', 'small business', 'environmental impact', 'green practices'],
    createdAt: '2025-06-11',
  },
  {
    id: 'idea-6',
    title: 'Mental Health in the Tech Workplace: Breaking the Stigma',
    description:
      'Strategies for tech companies to support employee mental health and create a more supportive work environment.',
    contentType: 'Podcast Episode',
    industry: 'Technology',
    keywords: ['mental health', 'tech industry', 'workplace wellness', 'stigma'],
    createdAt: '2025-06-10',
  },
];

const contentTypes = [
  'All Types',
  'Blog Post',
  'Social Media Post',
  'Video Script',
  'Email Newsletter',
  'Podcast Episode',
  'Infographic',
  'Case Study',
];

const industries = [
  'All Industries',
  'Technology',
  'Marketing',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Human Resources',
  'Sustainability',
];

const SavedIdeasPage: React.FC = () => {
  const [savedIdeas, setSavedIdeas] = useState(mockSavedIdeas);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('All Types');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);

  const handleContentTypeFilterChange = (event: SelectChangeEvent) => {
    setContentTypeFilter(event.target.value);
  };

  const handleIndustryFilterChange = (event: SelectChangeEvent) => {
    setIndustryFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteClick = (ideaId: string) => {
    setIdeaToDelete(ideaId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ideaToDelete) {
      setSavedIdeas(savedIdeas.filter((idea) => idea.id !== ideaToDelete));
      setIdeaToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIdeaToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleCopyIdea = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a snackbar notification here
  };

  // Filter ideas based on search query and selected filters
  const filteredIdeas = savedIdeas.filter((idea) => {
    const matchesSearch =
      searchQuery === '' ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesContentType =
      contentTypeFilter === 'All Types' || idea.contentType === contentTypeFilter;

    const matchesIndustry =
      industryFilter === 'All Industries' || idea.industry === industryFilter;

    return matchesSearch && matchesContentType && matchesIndustry;
  });

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Ideas
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse and manage your saved content ideas.
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          mb: 4,
          mt: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="content-type-filter-label">
              <FilterList fontSize="small" sx={{ mr: 1 }} />
              Content Type
            </InputLabel>
            <Select
              labelId="content-type-filter-label"
              value={contentTypeFilter}
              label="Content Type"
              onChange={handleContentTypeFilterChange}
            >
              {contentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="industry-filter-label">
              <FilterList fontSize="small" sx={{ mr: 1 }} />
              Industry
            </InputLabel>
            <Select
              labelId="industry-filter-label"
              value={industryFilter}
              label="Industry"
              onChange={handleIndustryFilterChange}
            >
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Results */}
      {filteredIdeas.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No saved ideas found.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchQuery || contentTypeFilter !== 'All Types' || industryFilter !== 'All Industries'
              ? 'Try adjusting your filters or search terms.'
              : 'Generate some ideas to save them for later.'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/idea-generator"
            sx={{ mt: 3 }}
          >
            Generate New Ideas
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredIdeas.map((idea) => (
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
                  <Box sx={{ mt: 1, mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" component="div">
                      Saved on {new Date(idea.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Typography>
                    <Chip
                      label={idea.industry}
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                  <IconButton aria-label="edit">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="copy"
                    onClick={() => handleCopyIdea(`${idea.title}\n\n${idea.description}`)}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(idea.id)}
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<Send />}
                  >
                    Use Idea
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Saved Idea</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this idea? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedIdeasPage;
