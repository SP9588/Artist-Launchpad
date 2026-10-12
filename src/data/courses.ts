import type { CourseName, SkillLevel } from '../types/index.ts';
import actingImg from '../assets/images/acting_course_1791774760980.jpg';
import dancingImg from '../assets/images/dancing_course_1791774775301.jpg';
import singingImg from '../assets/images/singing_course_1791774785999.jpg';
import musicImg from '../assets/images/music_production_1791774796836.jpg';

export interface CourseData {
  id: string;
  name: CourseName;
  tagline: string;
  duration: string;
  level: SkillLevel | 'All Levels (Foundations to Advanced)';
  mode: string;
  image: string;
  description: string;
  highlights: string[];
  curriculum: { module: string; topics: string[] }[];
  defaultFee: string;
}

export const COURSES_DATA: CourseData[] = [
  {
    id: 'acting',
    name: 'Acting',
    tagline: 'Screen Presence, Monologues & Character Embodiment',
    duration: '8 Weeks (Weekend & Evening Batches)',
    level: 'All Levels (Foundations to Advanced)',
    mode: 'Studio Offline & Hybrid',
    image: actingImg,
    description: 'Master the craft of naturalistic acting for cinema, OTT series, stage, and commercial auditions. Develop unshakeable camera presence, vocal power, and psychological depth.',
    highlights: [
      'Acting fundamentals & Stanislavski / Meisner methods',
      'Facial expressions, micro-reactions & body language',
      'Dialogue delivery, diction & vocal modulation',
      'Audition preparation & self-tape techniques',
      'Screen presence, continuity & character development'
    ],
    curriculum: [
      {
        module: 'Module 1: Instrument & Body',
        topics: ['Sensory awareness', 'Vocal projection', 'Breaking physical inhibitions']
      },
      {
        module: 'Module 2: Text & Emotion',
        topics: ['Subtext analysis', 'Hindi/English dialogue clarity', 'Spontaneous emotional recall']
      },
      {
        module: 'Module 3: Camera & Casting',
        topics: ['Cinematic eye-lines', 'Self-tape lighting & setup', 'Live mock audition drills']
      }
    ],
    defaultFee: '₹18,500'
  },
  {
    id: 'dancing',
    name: 'Dancing',
    tagline: 'Rhythm, Footwork & Cinematic Stage Performance',
    duration: '8 Weeks (3 Sessions / Week)',
    level: 'All Levels (Foundations to Advanced)',
    mode: 'Studio Offline & Hybrid',
    image: dancingImg,
    description: 'Elevate your musicality and agility with intensive training spanning commercial Bollywood, contemporary lyrical, and street styles designed for the modern entertainer.',
    highlights: [
      'Dance fundamentals, posture & physical conditioning',
      'Rhythm, coordination & dynamic tempo shifts',
      'Bollywood commercial & contemporary fusion',
      'Choreography memory & rapid pickup skills',
      'Stage performance, expression & camera angles'
    ],
    curriculum: [
      {
        module: 'Module 1: Foundations & Agility',
        topics: ['Core strengthening', 'Isolation techniques', 'Musicality & beat counting']
      },
      {
        module: 'Module 2: Styles & Flow',
        topics: ['Lyrical contemporary', 'High-energy Bollywood hooks', 'Transition fluidity']
      },
      {
        module: 'Module 3: Performance Ready',
        topics: ['Facial expressions while dancing', 'Camera angle awareness', 'Group sync & solo showcase']
      }
    ],
    defaultFee: '₹14,000'
  },
  {
    id: 'singing',
    name: 'Singing',
    tagline: 'Vocal Precision, Pitch Mastery & Studio Technique',
    duration: '10 Weeks (Bi-weekly + 1-on-1 Clinics)',
    level: 'All Levels (Foundations to Advanced)',
    mode: 'Studio Offline, Online & Hybrid',
    image: singingImg,
    description: 'Find your authentic signature voice. Build solid pitch accuracy, diaphragmatic breath control, and professional microphone technique for studio tracks and live stages.',
    highlights: [
      'Vocal fundamentals, pitch stabilization & ear training',
      'Diaphragmatic breath control & stamina exercises',
      'Hindi, Bollywood & semi-classical song interpretation',
      'Microphone technique, proximity effect & dynamics',
      'Performance delivery, emotional resonance & stage confidence'
    ],
    curriculum: [
      {
        module: 'Module 1: Vocal Anatomy & Pitch',
        topics: ['Sur & Swara precision', 'Diaphragm breathing routines', 'Vocal warmup regimes']
      },
      {
        module: 'Module 2: Expression & Repertoire',
        topics: ['Bollywood song phrasing', 'Harkat & modulation nuances', 'Overcoming vocal fatigue']
      },
      {
        module: 'Module 3: Studio Recording',
        topics: ['Condenser mic discipline', 'Tracking with reference headphones', 'Full studio song take']
      }
    ],
    defaultFee: '₹16,500'
  },
  {
    id: 'music-production',
    name: 'Music Production',
    tagline: 'DAW Mastery, Beat Arranging & Audio Engineering',
    duration: '10 Weeks (Practical Studio Projects)',
    level: 'All Levels (Foundations to Advanced)',
    mode: 'Online & Studio Workstations',
    image: musicImg,
    description: 'Transform musical ideas into commercially competitive tracks. Learn industry DAWs (Ableton Live, Logic Pro, FL Studio), beat architecture, vocal comping, and modern mixing.',
    highlights: [
      'Digital Audio Workstation (DAW) fundamentals & architecture',
      'Beat-making, drum programming & groove arrangement',
      'Professional vocal recording & tracking workflows',
      'Audio editing, timing correction & pitch tuning',
      'Mixing fundamentals (EQ, compression, spatial reverb & delay)',
      'Industry-standard release-ready production workflow'
    ],
    curriculum: [
      {
        module: 'Module 1: DAW & Sound Design',
        topics: ['Audio routing & MIDI setup', 'Synthesizer basics', 'Drum groove quantization']
      },
      {
        module: 'Module 2: Arrangement & Vocals',
        topics: ['Song structuring & tension release', 'Vocal tracking chains', 'Melodyne & tuning basics']
      },
      {
        module: 'Module 3: Mix & Final Master',
        topics: ['Frequency balance & EQ carve', 'Dynamic compression & buss processing', 'Exporting for streaming']
      }
    ],
    defaultFee: '₹24,000'
  }
];
