'use client'

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  IconButton,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  NotificationsNone as NotificationIcon,
  NotificationsOff as NotificationOffIcon,
  AccessTime as ClockIcon 
} from '@mui/icons-material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddIcon from '@mui/icons-material/Add';
import BlenderIcon from '@mui/icons-material/Blender';
import KnifeIcon from '@mui/icons-material/ContentCut';
import BurnerIcon from '@mui/icons-material/LocalFireDepartment';

type Preset = {
  id: string;
  type: string;
  name: string;
  time: string;
  notifications: boolean;
  isRunning: boolean;
};

interface RecipeWizardLeftMenuProps {
  presets: Preset[];
  onPresetsChange: (presets: Preset[]) => void;
}

export default function RecipeWizardLeftMenu({ presets: initialPresets, onPresetsChange }: RecipeWizardLeftMenuProps) {
  const [timeRemaining, setTimeRemaining] = useState('00:00');
  const [isMuted, setIsMuted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [openPresetModal, setOpenPresetModal] = useState(false);
  const [presetType, setPresetType] = useState('');
  const [presetName, setPresetName] = useState('');
  const [presetMinutes, setPresetMinutes] = useState('');
  const [presetSeconds, setPresetSeconds] = useState('');
  const [presetNotifications, setPresetNotifications] = useState(true);
  const [presets, setPresets] = useState<Preset[]>([]);
  const timerRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({});
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);

  useEffect(() => {
    setPresets(initialPresets);
  }, [initialPresets]);

  const handleNotificationToggle = (presetId: string) => {
    setPresets(prev => prev.map(p => 
      p.id === presetId 
        ? { ...p, notifications: !p.notifications }
        : p
    ));
  };

  const handleOpenModal = (presetId: string) => {
    setEditingPresetId(presetId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditingPresetId(null);
    setOpenModal(false);
    setMinutes('');
    setSeconds('');
  };

  const handleOpenPresetModal = () => setOpenPresetModal(true);
  const handleClosePresetModal = () => setOpenPresetModal(false);
  
  const handleSetTime = (presetId: string) => {
    const totalTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    setPresets(prev => prev.map(p => 
      p.id === presetId 
        ? { ...p, time: totalTime }
        : p
    ));
    handleCloseModal();
  };

  const toggleTimer = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    if (preset.isRunning) {
      if (timerRef.current[presetId]) {
        clearInterval(timerRef.current[presetId]!);
        timerRef.current[presetId] = null;
      }
      setPresets(prev => prev.map(p => 
        p.id === presetId ? { ...p, isRunning: false } : p
      ));
      return;
    }

    const id = setInterval(() => {
      setPresets(prev => {
        const updatedPresets = prev.map(p => {
          if (p.id !== presetId) return p;
          
          const [mins, secs] = p.time.split(':').map(Number);
          const totalSeconds = mins * 60 + secs;
          
          if (totalSeconds <= 0) {
            clearInterval(timerRef.current[presetId]!);
            timerRef.current[presetId] = null;
            return { ...p, isRunning: false, time: '00:00' };
          }
          
          const newTotalSeconds = totalSeconds - 1;
          const newMins = Math.floor(newTotalSeconds / 60);
          const newSecs = newTotalSeconds % 60;
          return {
            ...p,
            time: `${String(newMins).padStart(2, '0')}:${String(newSecs).padStart(2, '0')}`
          };
        });
        
        return updatedPresets;
      });
    }, 1000);

    timerRef.current[presetId] = id;
    
    setPresets(prev => prev.map(p => 
      p.id === presetId ? { ...p, isRunning: true } : p
    ));
  };

  const getPresetIcon = (type: string) => {
    switch (type) {
      case 'cook':
        return <LocalFireDepartmentIcon />;
      case 'blend':
        return <BlenderIcon />;
      case 'mince':
        return <KnifeIcon />;
      case 'burner':
        return <BurnerIcon />;
      default:
        return <LocalFireDepartmentIcon />;
    }
  };

  const handleCreatePreset = () => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      type: presetType,
      name: presetName,
      time: `${presetMinutes.padStart(2, '0')}:${presetSeconds.padStart(2, '0')}`,
      notifications: presetNotifications,
      isRunning: false,
    };
    
    setPresets(prev => [...prev, newPreset]);
    handleClosePresetModal();
    setPresetType('');
    setPresetName('');
    setPresetMinutes('');
    setPresetSeconds('');
    setPresetNotifications(true);
  };

  const handleDeletePreset = (presetId: string) => {
    if (timerRef.current[presetId]) {
      clearInterval(timerRef.current[presetId]!);
      timerRef.current[presetId] = null;
    }
    setPresets(prev => prev.filter(p => p.id !== presetId));
  };

  useEffect(() => {
    // Capture the current timers in a variable
    const currentTimers = timerRef.current;
    return () => {
      Object.values(currentTimers).forEach(timer => {
        if (timer) clearInterval(timer);
      });
    };
  }, []);

  // Add input validation helper
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0) {
      setter('0');
    } else {
      setter(value);
    }
  };

  // Add validation function
  const isPresetValid = () => {
    const totalSeconds = (parseInt(presetMinutes) || 0) * 60 + (parseInt(presetSeconds) || 0);
    return (
      presetType !== '' && 
      presetName.trim() !== '' && 
      totalSeconds > 0  // Ensures time is not 00:00
    );
  };

  // Add validation for timer
  const isTimeValid = () => {
    const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    return totalSeconds > 0;
  };

  // Add this sorting function before the render
  const sortedPresets = [...(presets || [])].sort((a, b) => {
    // Helper function to get priority (0 highest, 2 lowest)
    const getPriority = (preset: Preset) => {
      if (preset.isRunning) return 0;  // Running timers at top
      if (preset.time !== '00:00' && !preset.isRunning) return 1;  // Paused timers in middle
      return 2;  // Completed timers (00:00) at bottom
    };

    return getPriority(a) - getPriority(b);
  });

  return (
    <div className="h-[calc(100vh-80px)] w-[300px] sticky top-20 overflow-y-auto bg-white rounded-lg p-4">
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton 
            size="small"
            onClick={handleOpenPresetModal}
            sx={{ 
              color: 'text.secondary'
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Divider />
      </Box>

      {sortedPresets.map(preset => (
        <Card 
          key={preset.id}
          elevation={1}
          sx={{
            borderRadius: 2,
            bgcolor: 'background.paper',
            mb: 2,
            width: '100%',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent sx={{ p: 2, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="h6" component="h2">
                {preset.name}
              </Typography>
              <IconButton 
                size="small"
                onClick={() => handleNotificationToggle(preset.id)}
                sx={{ 
                  padding: '4px'
                }}
              >
                {preset.notifications ? (
                  <NotificationIcon sx={{ fontSize: 18 }} />
                ) : (
                  <NotificationOffIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mr: 1 }}>
                  {preset.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  min remaining
                </Typography>
              </Box>
              {!preset.isRunning && (
                <IconButton onClick={() => handleOpenModal(preset.id)}>
                  <ClockIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>

            <Card 
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                textAlign: 'center',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CardContent sx={{ p: '8px !important', width: '100%' }}>
                {getPresetIcon(preset.type)}
                {preset.time === '00:00' && (
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}
                  >
                    {preset.name} should be ready!
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {preset.time !== '00:00' && (
                <Button 
                  variant="contained" 
                  fullWidth
                  size="small"
                  onClick={() => toggleTimer(preset.id)}
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  {preset.isRunning ? 'Pause' : 'Start'}
                </Button>
              )}
              <Button 
                variant="outlined" 
                fullWidth
                size="small"
                onClick={() => handleDeletePreset(preset.id)}
                sx={{
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'text.primary'
                }}
              >
                Done
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Set Timer</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => handleNumberInput(e.target.value, setMinutes)}
              size="small"
              inputProps={{ min: 0 }}
              error={parseInt(minutes) === 0 && parseInt(seconds) === 0}
              helperText={parseInt(minutes) === 0 && parseInt(seconds) === 0 ? "Time cannot be 00:00" : ""}
            />
            <TextField
              label="Seconds"
              type="number"
              value={seconds}
              onChange={(e) => handleNumberInput(e.target.value, setSeconds)}
              size="small"
              inputProps={{ min: 0 }}
              error={parseInt(minutes) === 0 && parseInt(seconds) === 0}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button 
            onClick={() => editingPresetId && handleSetTime(editingPresetId)} 
            variant="contained"
            disabled={!isTimeValid()}
          >
            Set Time
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPresetModal} onClose={handleClosePresetModal}>
        <DialogTitle>Create a preset</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={presetType}
                label="Type"
                onChange={(e) => setPresetType(e.target.value)}
              >
                <MenuItem value="cook">Cook</MenuItem>
                <MenuItem value="blend">Blend</MenuItem>
                <MenuItem value="mince">Mince</MenuItem>
                <MenuItem value="burner">Burner</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Preset Name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Minutes"
                type="number"
                value={presetMinutes}
                onChange={(e) => handleNumberInput(e.target.value, setPresetMinutes)}
                size="small"
                inputProps={{ min: 0 }}
                error={parseInt(presetMinutes) === 0 && parseInt(presetSeconds) === 0}
                helperText={parseInt(presetMinutes) === 0 && parseInt(presetSeconds) === 0 ? "Time cannot be 00:00" : ""}
              />
              <TextField
                label="Seconds"
                type="number"
                value={presetSeconds}
                onChange={(e) => handleNumberInput(e.target.value, setPresetSeconds)}
                size="small"
                inputProps={{ min: 0 }}
                error={parseInt(presetMinutes) === 0 && parseInt(presetSeconds) === 0}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={presetNotifications}
                  onChange={(e) => setPresetNotifications(e.target.checked)}
                />
              }
              label="Enable Notifications"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePresetModal}>Cancel</Button>
          <Button 
            onClick={handleCreatePreset} 
            variant="contained"
            disabled={!isPresetValid()}
          >
            Set Preset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 