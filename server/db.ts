import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Application, AcademySettings, ApplicationStats, CourseName, TrainingMode } from '../src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const defaultSettings: AcademySettings = {
  academyName: 'Artist Launchpad',
  whatsappNumber: '+91 92791 20271',
  phoneNumber: '+91 92791 20271',
  email: 'santoshprasad8891@gmail.com',
  location: 'Raipur, Chhattisgarh (Studio Campus & Online Tracks)',
  instagramUrl: 'https://instagram.com/santymanikpuri',
  youtubeUrl: 'https://youtube.com/@makemestar4130',
  facebookUrl: 'https://facebook.com/artistlaunchpad',
  showPricing: false,
  actingPrice: '₹18,500 / 8-week module',
  dancingPrice: '₹14,000 / 8-week module',
  singingPrice: '₹16,500 / 8-week module',
  musicProductionPrice: '₹24,000 / 10-week module'
};

const initialSampleApplications: Application[] = [
  {
    id: 'app_101',
    code: 'ALP-1042',
    fullName: 'Aarav Sharma',
    phone: '+91 98201 54321',
    email: 'aarav.sharma@example.com',
    cityDistrict: 'Mumbai, Suburban',
    course: 'Acting',
    skillLevel: 'Beginner',
    trainingMode: 'Offline',
    ageGroup: '18-24',
    schedule: 'Evening',
    learningGoals: 'Aspiring theater and OTT actor. Want to master screen presence, voice projection, and audition monologues.',
    consent: true,
    consentTimestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    status: 'Interested',
    notes: [
      {
        id: 'note_1',
        text: 'Spoke with Aarav via WhatsApp. Highly motivated for the weekend batch.',
        author: 'Priya (Admissions)',
        createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
      }
    ]
  },
  {
    id: 'app_102',
    code: 'ALP-1089',
    fullName: 'Rhea Sen',
    phone: '+91 98112 34567',
    email: 'rhea.sen@example.com',
    cityDistrict: 'South Delhi, New Delhi',
    course: 'Singing',
    skillLevel: 'Some Experience',
    trainingMode: 'Hybrid',
    ageGroup: '25-34',
    schedule: 'Morning',
    learningGoals: 'Trained in basic Hindustani classical. Looking to sing Bollywood contemporary & improve studio mic performance.',
    consent: true,
    consentTimestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: 'Trial Scheduled',
    notes: [
      {
        id: 'note_2',
        text: 'Vocal audition slot booked for Saturday 11:30 AM with Maestro Vikram.',
        author: 'Arjun (Faculty Lead)',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ]
  },
  {
    id: 'app_103',
    code: 'ALP-1120',
    fullName: 'Karan Deshmukh',
    phone: '+91 97654 32109',
    email: 'karan.beats@example.com',
    cityDistrict: 'Pune, Maharashtra',
    course: 'Music Production',
    skillLevel: 'Intermediate',
    trainingMode: 'Online',
    ageGroup: '18-24',
    schedule: 'Flexible',
    learningGoals: 'Been making FL Studio beats for 1 year. Need professional mixing, mastering, and vocal tracking instruction in Ableton Live / Logic.',
    consent: true,
    consentTimestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'New',
    notes: []
  },
  {
    id: 'app_104',
    code: 'ALP-1145',
    fullName: 'Ananya Roy',
    phone: '+91 99032 11223',
    email: 'ananya.roy@example.com',
    cityDistrict: 'Kolkata, West Bengal',
    course: 'Dancing',
    skillLevel: 'Some Experience',
    trainingMode: 'Hybrid',
    ageGroup: '18-24',
    schedule: 'Evening',
    learningGoals: 'Passionate about commercial Bollywood and semi-classical fusion choreography.',
    consent: true,
    consentTimestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    status: 'Enrolled',
    notes: [
      {
        id: 'note_3',
        text: 'Registration completed. Enrolled in Batch Delta commencing next month.',
        author: 'Priya (Admissions)',
        createdAt: new Date(Date.now() - 3600000 * 10).toISOString()
      }
    ]
  },
  {
    id: 'app_105',
    code: 'ALP-1158',
    fullName: 'Sameer Verma',
    phone: '+91 98450 99887',
    email: 'sameer.v@example.com',
    cityDistrict: 'Bengaluru, Karnataka',
    course: 'Multiple Skills',
    skillLevel: 'Beginner',
    trainingMode: 'Offline',
    ageGroup: '25-34',
    schedule: 'Evening',
    learningGoals: 'Interested in dual Acting + Dance preparation for upcoming independent theater productions.',
    consent: true,
    consentTimestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'New',
    notes: []
  }
];

export function getApplications(): Application[] {
  try {
    if (!fs.existsSync(APPLICATIONS_FILE)) {
      fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(initialSampleApplications, null, 2), 'utf8');
      return initialSampleApplications;
    }
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf8');
    return JSON.parse(data) as Application[];
  } catch (err) {
    console.error('Error reading applications file:', err);
    return initialSampleApplications;
  }
}

export function saveApplications(apps: Application[]): void {
  try {
    const tempFile = `${APPLICATIONS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(apps, null, 2), 'utf8');
    fs.renameSync(tempFile, APPLICATIONS_FILE);
  } catch (err) {
    console.error('Error saving applications:', err);
  }
}

export function getSettings(): AcademySettings {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), 'utf8');
      return defaultSettings;
    }
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (err) {
    console.error('Error reading settings file:', err);
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<AcademySettings>): AcademySettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  try {
    const tempFile = `${SETTINGS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(updated, null, 2), 'utf8');
    fs.renameSync(tempFile, SETTINGS_FILE);
  } catch (err) {
    console.error('Error saving settings:', err);
  }
  return updated;
}

export function calculateStats(apps: Application[]): ApplicationStats {
  const byCourse: Record<CourseName, number> = {
    'Acting': 0,
    'Dancing': 0,
    'Singing': 0,
    'Music Production': 0,
    'Multiple Skills': 0
  };

  const byMode: Record<TrainingMode, number> = {
    'Online': 0,
    'Offline': 0,
    'Hybrid': 0
  };

  let newCount = 0;
  let contactedCount = 0;
  let interestedCount = 0;
  let trialCount = 0;
  let enrolledCount = 0;
  let notInterestedCount = 0;

  for (const app of apps) {
    if (byCourse[app.course] !== undefined) {
      byCourse[app.course]++;
    }
    if (byMode[app.trainingMode] !== undefined) {
      byMode[app.trainingMode]++;
    }

    switch (app.status) {
      case 'New':
        newCount++;
        break;
      case 'Contacted':
        contactedCount++;
        break;
      case 'Interested':
        interestedCount++;
        break;
      case 'Trial Scheduled':
        trialCount++;
        break;
      case 'Enrolled':
        enrolledCount++;
        break;
      case 'Not Interested':
        notInterestedCount++;
        break;
    }
  }

  return {
    total: apps.length,
    newCount,
    contactedCount,
    interestedCount,
    trialCount,
    enrolledCount,
    notInterestedCount,
    byCourse,
    byMode
  };
}
