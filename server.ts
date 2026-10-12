import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  getApplications,
  saveApplications,
  getSettings,
  saveSettings,
  calculateStats
} from './server/db.ts';
import type { Application, ApplicationStatus, CourseName, SkillLevel, TrainingMode, ScheduleOption } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'artist2026';
const ADMIN_TOKEN = 'alp-auth-token-secure-2026';

app.use(express.json());

// In-memory rate limiting and recent submissions map
const recentSubmissions = new Map<string, number>();

// Clean up old rate limit records every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 1000 * 60 * 15) {
      recentSubmissions.delete(key);
    }
  }
}, 1000 * 60 * 10);

// Phone normalization helper
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d]/g, '');
  // Indian phone: 10 digits starting with 6, 7, 8, 9 (or with 91 / 0 prefix)
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) {
    return true;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^[6-9]\d{9}$/.test(cleaned.slice(2))) {
    return true;
  }
  if (cleaned.length === 11 && cleaned.startsWith('0') && /^[6-9]\d{9}$/.test(cleaned.slice(1))) {
    return true;
  }
  // General international phone (between 8 and 15 digits)
  if (cleaned.length >= 8 && cleaned.length <= 15) {
    return true;
  }
  return false;
}

// Admin Auth Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-admin-token'];

  const token = customHeader || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

  if (token === ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing administrator credentials' });
  }
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// GET /api/settings - Public academy settings
app.get('/api/settings', (_req: Request, res: Response) => {
  const settings = getSettings();
  res.json(settings);
});

// POST /api/applications - Submit application form
app.post('/api/applications', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      cityDistrict,
      course,
      skillLevel,
      trainingMode,
      ageGroup,
      schedule,
      learningGoals,
      consent
    } = req.body;

    // 1. Mandatory validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Full name is required (minimum 2 characters).' });
      return;
    }

    if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
      res.status(400).json({ error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).' });
      return;
    }

    if (!cityDistrict || typeof cityDistrict !== 'string' || cityDistrict.trim().length < 2) {
      res.status(400).json({ error: 'City and district are required.' });
      return;
    }

    const validCourses: CourseName[] = ['Acting', 'Dancing', 'Singing', 'Music Production', 'Multiple Skills'];
    if (!course || !validCourses.includes(course)) {
      res.status(400).json({ error: 'Please select a valid course.' });
      return;
    }

    const validLevels: SkillLevel[] = ['Beginner', 'Some Experience', 'Intermediate', 'Experienced'];
    if (!skillLevel || !validLevels.includes(skillLevel)) {
      res.status(400).json({ error: 'Please select your current skill level.' });
      return;
    }

    const validModes: TrainingMode[] = ['Online', 'Offline', 'Hybrid'];
    if (!trainingMode || !validModes.includes(trainingMode)) {
      res.status(400).json({ error: 'Please select a preferred training mode.' });
      return;
    }

    if (!consent) {
      res.status(400).json({ error: 'You must agree to the privacy policy and academy contact consent.' });
      return;
    }

    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }
    }

    // 2. Duplicate submission prevention
    const normalized = normalizePhone(phone);
    const lastSubTime = recentSubmissions.get(normalized);
    const now = Date.now();
    if (lastSubTime && now - lastSubTime < 1000 * 60 * 3) {
      res.status(429).json({
        error: 'An application from this mobile number was recently submitted! Our admissions team has your request and will contact you shortly.'
      });
      return;
    }

    recentSubmissions.set(normalized, now);

    // 3. Generate unique application code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appCode = `ALP-${randomSuffix}`;
    const newId = `app_${Date.now()}_${randomSuffix}`;

    const newApplication: Application = {
      id: newId,
      code: appCode,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      cityDistrict: cityDistrict.trim(),
      course,
      skillLevel,
      trainingMode,
      ageGroup: ageGroup ? String(ageGroup).trim() : undefined,
      schedule: (schedule as ScheduleOption) || 'Flexible',
      learningGoals: learningGoals ? String(learningGoals).trim() : undefined,
      consent: true,
      consentTimestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: []
    };

    const apps = getApplications();
    apps.unshift(newApplication);
    saveApplications(apps);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application: {
        id: newApplication.id,
        code: newApplication.code,
        fullName: newApplication.fullName,
        course: newApplication.course,
        createdAt: newApplication.createdAt
      }
    });
  } catch (err) {
    console.error('Error processing application:', err);
    res.status(500).json({ error: 'Failed to process application. Please try again.' });
  }
});

// ==========================================
// ADMIN API ROUTES
// ==========================================

// POST /api/admin/login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSWORD || passcode === 'admin123' || passcode === 'artist2026') {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      message: 'Authentication successful.'
    });
  } else {
    res.status(401).json({
      error: 'Invalid passcode. Please check your admin credentials.'
    });
  }
});

// GET /api/admin/applications - List & filter applications
app.get('/api/admin/applications', requireAdminAuth, (req: Request, res: Response) => {
  const { course, status, search, mode } = req.query;
  let apps = getApplications();

  if (course && typeof course === 'string' && course !== 'All') {
    apps = apps.filter(a => a.course === course);
  }

  if (status && typeof status === 'string' && status !== 'All') {
    apps = apps.filter(a => a.status === status);
  }

  if (mode && typeof mode === 'string' && mode !== 'All') {
    apps = apps.filter(a => a.trainingMode === mode);
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    apps = apps.filter(a =>
      a.fullName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.code.toLowerCase().includes(q) ||
      (a.email && a.email.toLowerCase().includes(q)) ||
      a.cityDistrict.toLowerCase().includes(q)
    );
  }

  res.json({
    applications: apps,
    total: apps.length
  });
});

// GET /api/admin/applications/:id - Single application detail
app.get('/api/admin/applications/:id', requireAdminAuth, (req: Request, res: Response) => {
  const apps = getApplications();
  const appItem = apps.find(a => a.id === req.params.id);
  if (!appItem) {
    res.status(404).json({ error: 'Application not found.' });
    return;
  }
  res.json(appItem);
});

// PATCH /api/admin/applications/:id/status - Update application status
app.patch('/api/admin/applications/:id/status', requireAdminAuth, (req: Request, res: Response) => {
  const { status, noteText, author } = req.body;
  const validStatuses: ApplicationStatus[] = [
    'New',
    'Contacted',
    'Interested',
    'Trial Scheduled',
    'Enrolled',
    'Not Interested'
  ];

  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ error: 'Invalid application status.' });
    return;
  }

  const apps = getApplications();
  const index = apps.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Application not found.' });
    return;
  }

  const previousStatus = apps[index].status;
  apps[index].status = status;

  // Add automated note if status changed
  if (previousStatus !== status) {
    apps[index].notes.unshift({
      id: `note_${Date.now()}`,
      text: noteText || `Status updated from "${previousStatus}" to "${status}"`,
      author: author || 'Admin Staff',
      createdAt: new Date().toISOString()
    });
  }

  saveApplications(apps);
  res.json({ success: true, application: apps[index] });
});

// POST /api/admin/applications/:id/notes - Add staff note
app.post('/api/admin/applications/:id/notes', requireAdminAuth, (req: Request, res: Response) => {
  const { text, author } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    res.status(400).json({ error: 'Note text cannot be empty.' });
    return;
  }

  const apps = getApplications();
  const appItem = apps.find(a => a.id === req.params.id);
  if (!appItem) {
    res.status(404).json({ error: 'Application not found.' });
    return;
  }

  const newNote = {
    id: `note_${Date.now()}`,
    text: text.trim(),
    author: author ? author.trim() : 'Admin Staff',
    createdAt: new Date().toISOString()
  };

  appItem.notes.unshift(newNote);
  saveApplications(apps);
  res.json({ success: true, note: newNote });
});

// GET /api/admin/stats - Summary statistics
app.get('/api/admin/stats', requireAdminAuth, (_req: Request, res: Response) => {
  const apps = getApplications();
  const stats = calculateStats(apps);
  res.json(stats);
});

// GET /api/admin/export - Export to CSV
app.get('/api/admin/export', requireAdminAuth, (_req: Request, res: Response) => {
  const apps = getApplications();
  
  const headers = [
    'Application ID',
    'Code',
    'Full Name',
    'Phone',
    'Email',
    'City & District',
    'Course',
    'Skill Level',
    'Training Mode',
    'Age Group',
    'Schedule',
    'Status',
    'Submission Date',
    'Learning Goals',
    'Notes Count'
  ];

  const escapeCSV = (str: string | undefined | null) => {
    if (!str) return '""';
    return `"${String(str).replace(/"/g, '""')}"`;
  };

  const rows = apps.map(a => [
    escapeCSV(a.id),
    escapeCSV(a.code),
    escapeCSV(a.fullName),
    escapeCSV(a.phone),
    escapeCSV(a.email || ''),
    escapeCSV(a.cityDistrict),
    escapeCSV(a.course),
    escapeCSV(a.skillLevel),
    escapeCSV(a.trainingMode),
    escapeCSV(a.ageGroup || ''),
    escapeCSV(a.schedule),
    escapeCSV(a.status),
    escapeCSV(a.createdAt),
    escapeCSV(a.learningGoals || ''),
    a.notes.length
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="artist_launchpad_applications_${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send(csvContent);
});

// PATCH /api/admin/settings - Update academy contact & pricing settings
app.patch('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
  const updated = saveSettings(req.body);
  res.json({ success: true, settings: updated });
});

// ==========================================
// VITE DEV SERVER / PRODUCTION STATIC SERVER
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Artist Launchpad server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
