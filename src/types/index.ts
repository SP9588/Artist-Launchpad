/**
 * Artist Launchpad Academy Types & Data Contracts
 */

export type CourseName = 
  | 'Acting'
  | 'Dancing'
  | 'Singing'
  | 'Music Production'
  | 'Multiple Skills';

export type SkillLevel = 
  | 'Beginner'
  | 'Some Experience'
  | 'Intermediate'
  | 'Experienced';

export type TrainingMode = 
  | 'Online'
  | 'Offline'
  | 'Hybrid';

export type ScheduleOption = 
  | 'Morning'
  | 'Afternoon'
  | 'Evening'
  | 'Flexible';

export type ApplicationStatus = 
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Trial Scheduled'
  | 'Enrolled'
  | 'Not Interested';

export interface ApplicationNote {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Application {
  id: string;
  code: string;
  fullName: string;
  phone: string;
  email?: string;
  cityDistrict: string;
  course: CourseName;
  skillLevel: SkillLevel;
  trainingMode: TrainingMode;
  ageGroup?: string;
  schedule: ScheduleOption;
  learningGoals?: string;
  consent: boolean;
  consentTimestamp: string;
  createdAt: string;
  status: ApplicationStatus;
  notes: ApplicationNote[];
}

export interface ApplicationSubmission {
  fullName: string;
  phone: string;
  email?: string;
  cityDistrict: string;
  course: CourseName;
  skillLevel: SkillLevel;
  trainingMode: TrainingMode;
  ageGroup?: string;
  schedule: ScheduleOption;
  learningGoals?: string;
  consent: boolean;
}

export interface AcademySettings {
  academyName: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  location: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  showPricing: boolean;
  actingPrice: string;
  dancingPrice: string;
  singingPrice: string;
  musicProductionPrice: string;
}

export interface ApplicationStats {
  total: number;
  newCount: number;
  contactedCount: number;
  interestedCount: number;
  trialCount: number;
  enrolledCount: number;
  notInterestedCount: number;
  byCourse: Record<CourseName, number>;
  byMode: Record<TrainingMode, number>;
}
