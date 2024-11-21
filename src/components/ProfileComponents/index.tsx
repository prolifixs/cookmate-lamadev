'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Button, 
  Tabs, 
  Tab, 
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material'
import TiktokIcon from '../Icons/TiktokIcon'
import { Recipe } from './types/recipe.types'
import { useRouter } from 'next/navigation'
import { sampleRecipeData, mockSummary } from '../RecipeModuleComponents/data/sampleData'
import { sampleFoodInfoData } from '../RecipeModuleComponents/data/sampleFoodInfoData'
import { sampleAuthorData } from '../RecipeModuleComponents/data/sampleAuthorData'
import router from 'next/router'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

type WeekKey = 'Wk1' | 'Wk2' | 'Wk3' | 'Wk4';

// Sample data array (you would typically fetch this from an API)
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Italian Macaroni Pasta',
    image: '/placeholder.svg',
    time: {
      prep: mockSummary.prepTime,
      cook: mockSummary.cookTime,
      total: mockSummary.totalTime
    },
    servings: mockSummary.servings,
    difficulty: mockSummary.difficulty,
    calories: mockSummary.calories,
    craves: 120,
    cuisineType: sampleFoodInfoData.cuisineType,
    description: sampleFoodInfoData.description,
    ingredients: sampleRecipeData.ingredients,
    author: sampleAuthorData
  },
  {
    id: '2',
    title: 'Scrambled Pizza',
    image: '/placeholder.svg',
    time: {
      prep: '20 mins',
      cook: '40 mins',
      total: '1 H'
    },
    servings: '3',
    difficulty: 'Easy',
    calories: '380',
    craves: 85,
    cuisineType: 'Italian',
    description: 'A delicious twist on traditional pizza',
    ingredients: sampleRecipeData.ingredients,
    author: sampleAuthorData
  }
]

export default function ProfileContent() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState<WeekKey>('Wk1')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [isReplateDialogOpen, setIsReplateDialogOpen] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const weekDates: Record<WeekKey, string[]> = {
    'Wk1': ['Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6', 'Nov 7'],
    'Wk2': ['Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14'],
    'Wk3': ['Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21'],
    'Wk4': ['Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26', 'Nov 27', 'Nov 28'],
  }

  const handleReplate = () => {
    setIsReplateDialogOpen(true)
  }

  const handleSetMyPlans = () => {
    // Implement the logic for setting plans here
    setIsReplateDialogOpen(false)
  }

  const socialIcons = [
    { name: 'twitter', icon: <TwitterIcon sx={{ fontSize: 16 }} /> },
    { name: 'facebook', icon: <FacebookIcon sx={{ fontSize: 16 }} /> },
    { name: 'youtube', icon: <YouTubeIcon sx={{ fontSize: 16 }} /> },
    { name: 'tiktok', icon: <TiktokIcon sx={{ fontSize: 16 }} /> },
    { name: 'instagram', icon: <InstagramIcon sx={{ fontSize: 16 }} /> },
  ]

  const router = useRouter()

  const handleRecipeClick = (recipe: Recipe) => {
    router.push(`/RecipeModule?id=${recipe.id}`)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="p-4 bg-white rounded-lg">
        <div className="flex items-start gap-4">
          <Image
            src="/placeholder.svg"
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold mb-1">John Doe</h1>
                <div className="flex gap-4 text-xs mb-2">
                  <span><strong>1.2k</strong> Foodies</span>
                  <span><strong>20</strong> Craves</span>
                  <span><strong>9</strong> Recipes</span>
                </div>
                <div className="text-xs text-gray-500">
                  followed by <span className="font-semibold">user</span>, <span className="font-semibold">user</span> and 2+ foodies
                </div>
              </div>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: '9999px',
                  textTransform: 'none'
                }}
              >
                Crave Content
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Design development, UX/UI, and product design are all related terms in the field of design, but they refer to slightly different aspects of the design process.
            </div>
            <div className="flex gap-2 mt-2">
              {socialIcons.map((social) => (
                <Link 
                  key={social.name} 
                  href={`#${social.name}`} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="fullWidth"
          >
            <Tab label="Recipes" />
            <Tab label="Posts" />
            <Tab label="Meal Plan" />
          </Tabs>
        </Box>

        {/* Recipes Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {sampleRecipes.map((recipe) => (
              <Card 
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                sx={{ cursor: 'pointer' }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(0,0,0,0.5)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                        color: 'white'
                      }}
                    >
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                    {recipe.time.total}
                  </div>
                </div>
                <CardContent sx={{ p: 2 }}>
                  <h3 className="font-semibold text-sm mb-0.5 truncate">{recipe.title}</h3>
                  <p className="text-xs text-gray-500">Craved by {recipe.craves}+ foodies</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Posts Tab */}
        <TabPanel value={tabValue} index={1}>
          <div className="text-center text-gray-500">No posts yet</div>
        </TabPanel>

        {/* Meal Plan Tab */}
        <TabPanel value={tabValue} index={2}>
          <div className="max-w-4xl mx-auto">
            {selectedDay ? (
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <IconButton onClick={() => setSelectedDay(null)}>
                      <ArrowBackIcon />
                    </IconButton>
                    <div className="space-x-2">
                      <Button variant="outlined" size="small" onClick={handleReplate}>Replate</Button>
                      <Button variant="outlined" size="small">Dishy Remix</Button>
                    </div>
                  </div>
                  {['Morning', 'Afternoon', 'Evening'].map((time) => (
                    <div key={time} className="mb-4">
                      <h3 className="font-semibold mb-2">{time}</h3>
                      <TextField 
                        fullWidth
                        size="small"
                        placeholder={`Enter meal for ${time.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Info Section */}
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-lg font-semibold">Meal Plan Information</h2>
                  <p className="text-sm text-gray-500">Details about the meal plan for the current month.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Week Buttons */}
                  <div className="flex sm:flex-col gap-2 sm:w-24">
                    {Object.keys(weekDates).map((week) => (
                      <Button 
                        key={week}
                        variant={selectedWeek === week ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => setSelectedWeek(week as WeekKey)}
                      >
                        {week}
                      </Button>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="flex-grow grid grid-cols-4 gap-2">
                    {weekDates[selectedWeek].map((date, index) => (
                      <Card 
                        key={date}
                        sx={{ 
                          height: '160px',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'grey.50' }
                        }}
                        onClick={() => setSelectedDay(date)}
                      >
                        <CardContent className="h-full p-2 relative">
                          <div className="absolute top-2 right-2 text-right">
                            <div className="font-semibold text-sm">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</div>
                            <div className="text-xs text-gray-500">{date}</div>
                          </div>
                          <div className="h-full flex items-center justify-center">
                            <span className="text-sm text-gray-500">No meals planned</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Card sx={{ height: '160px' }}>
                      <CardContent className="h-full p-2 relative">
                        <div className="absolute top-2 right-2 text-right">
                          <div className="font-semibold text-sm">Actions</div>
                        </div>
                        <div className="h-full flex flex-col items-center justify-center space-y-2">
                          <Button variant="outlined" size="small" fullWidth onClick={handleReplate}>Replate</Button>
                          <Button variant="outlined" size="small" fullWidth>Dishy Remix</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        </TabPanel>
      </div>

      <Dialog
        open={isReplateDialogOpen}
        onClose={() => setIsReplateDialogOpen(false)}
      >
        <DialogTitle>
          Replate and recreate your perfect meal plan.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to replate your meal plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsReplateDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSetMyPlans}
            variant="contained"
          >
            Set My Plans
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
} 