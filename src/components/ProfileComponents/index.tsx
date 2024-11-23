'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
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
import { Recipe } from '@/types/recipe.types'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MonthlyMealPlan } from '@/types/mealPlan.types'

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

export default function ProfileContent() {
  const { data: session } = useSession()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: '',
    image: '/placeholder.svg',
    title: '',
    bio: '',
    socialLinks: {
      youtubeUrl: '',
      instagramUrl: '',
      tiktokUrl: '',
    }
  })
  const [mealPlan, setMealPlan] = useState<MonthlyMealPlan | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const [selectedWeek, setSelectedWeek] = useState<WeekKey>('Wk1')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [isReplateDialogOpen, setIsReplateDialogOpen] = useState(false)
  const [weekDates, setWeekDates] = useState<Record<WeekKey, string[]>>({
    'Wk1': [],
    'Wk2': [],
    'Wk3': [],
    'Wk4': [],
  })

  // Move weekKeyMap definition here, before any useEffect that uses it
  const weekKeyMap = useMemo(() => ({
    0: 'Wk1',
    1: 'Wk2',
    2: 'Wk3',
    3: 'Wk4'
  } as Record<number, WeekKey>), [])

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const response = await fetch(`/api/user/${session.user.email}`)
        const data = await response.json()
        setUserData(data)
      }
    }
    fetchUserData()
  }, [session])

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user/${session.user.email}/mealplan`)
          if (!response.ok) throw new Error('Failed to fetch meal plan')
          const data = await response.json()
          console.log('API Response:', data)
          
          if (!data) {
            console.log('No meal plan data received')
            return
          }
          
          // Verify the data structure
          if (!data.weeks || !Array.isArray(data.weeks)) {
            console.error('Invalid meal plan data structure:', data)
            return
          }
          
          setMealPlan(data)
        } catch (error) {
          console.error('Error fetching meal plan:', error)
        }
      }
    }
    
    fetchMealPlan()
  }, [session])

  useEffect(() => {
    if (!mealPlan || !mealPlan.weeks) {
      console.log('No meal plan data to format')
      return
    }

    const formattedDates: Record<WeekKey, string[]> = {
      'Wk1': [],
      'Wk2': [],
      'Wk3': [],
      'Wk4': []
    };

    try {
      mealPlan.weeks.forEach((week, index) => {
        const weekKey = weekKeyMap[index];
        if (weekKey && week.days) {
          formattedDates[weekKey] = week.days.map(day => {
            if (!day.date) {
              console.error('Day missing date:', day)
              return ''
            }
            const date = new Date(day.date);
            return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
          }).filter(Boolean); // Remove any empty strings
        }
      });

      console.log('Formatted dates:', formattedDates)
      setWeekDates(formattedDates)
    } catch (error) {
      console.error('Error formatting dates:', error)
    }
  }, [mealPlan, weekKeyMap]);

  useEffect(() => {
    console.log('weekDates updated:', weekDates)
  }, [weekDates])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReplate = () => {
    setIsReplateDialogOpen(true)
  }

  const handleSetMyPlans = async () => {
    if (!session?.user?.email || !selectedDay) return

    try {
      const response = await fetch(`/api/user/${session.user.email}/mealplan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDay,
          // Add other meal plan data
        }),
      })

      if (!response.ok) throw new Error('Failed to update meal plan')
      
      // Refresh meal plan data
      const updatedMealPlan = await response.json()
      setMealPlan(updatedMealPlan)
      setIsReplateDialogOpen(false)
    } catch (error) {
      console.error('Error updating meal plan:', error)
    }
  }

  const socialIcons: { name: string; icon: React.ReactNode; urlKey: keyof typeof userData.socialLinks }[] = [
    { name: 'youtube', icon: <YouTubeIcon sx={{ fontSize: 16 }} />, urlKey: 'youtubeUrl' },
    { name: 'instagram', icon: <InstagramIcon sx={{ fontSize: 16 }} />, urlKey: 'instagramUrl' },
    { name: 'tiktok', icon: <TiktokIcon sx={{ fontSize: 16 }} />, urlKey: 'tiktokUrl' },
  ];

  const router = useRouter()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes')
        if (!response.ok) throw new Error('Failed to fetch recipes')
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      <div className="p-4 bg-white rounded-lg">
        <div className="flex items-start gap-4">
          <Image
            src={userData.image || '/placeholder.svg'}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold mb-1">{userData.name}</h1>
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
              {userData.bio || 'No bio available'}
            </div>
            <div className="flex gap-2 mt-2">
              {socialIcons.map((social) => {
                const url = userData.socialLinks?.[social.urlKey];
                return url ? (
                  <Link 
                    key={social.name} 
                    href={url}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {social.icon}
                  </Link>
                ) : null;
              })}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div>Loading recipes...</div>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  component={Link}
                  href={`/recipes/${recipe.id}`}
                  sx={{ 
                    textDecoration: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={recipe.image || '/placeholder.svg'}
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
                      {recipe.totalTime}
                    </div>
                  </div>
                  <CardContent sx={{ p: 2 }}>
                    <h3 className="font-semibold text-sm mb-0.5 truncate">{recipe.title}</h3>
                    <p className="text-xs text-gray-500">Craved by {recipe.craves}+ foodies</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div>No recipes found</div>
            )}
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
                    {weekDates[selectedWeek].map((date, index) => {
                      const weekNumber = parseInt(selectedWeek.replace('Wk', '')) - 1;
                      const dayPlan = mealPlan?.weeks[weekNumber]?.days[index];
                      
                      return (
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
                              <div className="font-semibold text-sm">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                              </div>
                              <div className="text-xs text-gray-500">{date}</div>
                            </div>
                            <div className="h-full flex flex-col justify-center text-xs">
                              {dayPlan?.meals ? (
                                <>
                                  <div className="text-gray-600">🌅 {dayPlan.meals.morning}</div>
                                  <div className="text-gray-600">☀️ {dayPlan.meals.afternoon}</div>
                                  <div className="text-gray-600">🌙 {dayPlan.meals.evening}</div>
                                </>
                              ) : (
                                <span className="text-sm text-gray-500">No meals planned</span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
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