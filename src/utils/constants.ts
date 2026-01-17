import { FaHome, FaBriefcase, FaCode, FaTools, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'projects', label: 'Projects', icon: FaCode },
  { id: 'skills', label: 'Skills', icon: FaTools },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
] as const;

export const ANIMATION_DURATION = 0.5;
export const STAGGER_DELAY = 0.1;
