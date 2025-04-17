import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const StudentCalendar = () => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100vh - 200px)';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    
    // Create a blob from the HTML content
    const htmlContent = `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elevkalender</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@0.321.0/font/lucide.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reset og grundlæggende styling */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    :root {
      --primary: #1e40af; /* blue-800 */
      --primary-light: #3b82f6; /* blue-500 */
      --primary-dark: #1e3a8a; /* blue-900 */
      --primary-bg: #eff6ff; /* blue-50 */
      --primary-bg-accent: #dbeafe; /* blue-100 */
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --success: #22c55e; /* green-500 */
      --warning: #f59e0b; /* amber-500 */
      --purple: #a855f7; /* purple-500 */
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --radius-sm: 0.25rem;
      --radius: 0.375rem;
      --radius-md: 0.5rem;
      --radius-lg: 0.75rem;
    }
    
    body {
      background-color: var(--gray-50);
      color: var(--gray-800);
      padding: 1.5rem;
      line-height: 1.5;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    /* Kort styling */
    .card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      margin-bottom: 1.5rem;
      overflow: hidden;
      border: 1px solid var(--gray-200);
    }
    
    .card-header {
      background-color: var(--primary);
      padding: 1.25rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: -0.025em;
    }
    
    .card-title i {
      color: white;
    }
    
    .nav-buttons {
      display: flex;
      gap: 0.5rem;
    }
    
    /* Knapper */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      font-weight: 500;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      gap: 0.5rem;
    }
    
    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }
    
    .btn-icon {
      padding: 0.375rem;
      width: 2rem;
      height: 2rem;
    }
    
    .btn-primary {
      background-color: var(--primary);
      color: white;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-dark);
    }
    
    .btn-outline {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary {
      background-color: white;
      color: var(--primary);
      border: 1px solid var(--primary-light);
    }
    
    .btn-secondary:hover {
      background-color: var(--primary-bg);
    }
    
    .btn-ghost {
      background-color: transparent;
      color: var(--gray-500);
    }
    
    .btn-ghost:hover {
      background-color: var(--gray-100);
    }
    
    .btn-danger {
      color: #ef4444;
    }
    
    .btn-danger:hover {
      background-color: #fee2e2;
    }
    
    .btn-full {
      width: 100%;
    }
    
    /* Tabs */
    .tabs {
      padding: 1rem 1rem 0;
    }
    
    .tabs-list {
      display: flex;
      background-color: var(--gray-100);
      border-radius: var(--radius-md);
      padding: 0.25rem;
    }
    
    .tab {
      flex: 1;
      text-align: center;
      padding: 0.625rem;
      cursor: pointer;
      border-radius: var(--radius);
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .tab.active {
      background-color: white;
      color: var(--primary);
      box-shadow: var(--shadow-sm);
    }
    
    /* Tab indhold */
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
    }
    
    /* Dag visning */
    .date-header {
      background-color: var(--primary-bg);
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid var(--primary-bg-accent);
    }
    
    .date-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-dark);
    }
    
    .activity-list {
      border-top: 1px solid var(--gray-200);
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--gray-200);
      transition: background-color 0.2s ease;
    }
    
    .activity-item:hover {
      background-color: var(--gray-50);
    }
    
    .activity-icon {
      margin-right: 0.75rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--gray-100);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .activity-icon:hover {
      transform: scale(1.1);
      background-color: var(--gray-200);
    }
    
    .icon-lesson {
      color: var(--success);
    }
    
    .icon-break {
      color: var(--warning);
    }
    
    .icon-homework {
      color: var(--purple);
    }
    
    .icon-other {
      color: var(--gray-500);
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-title {
      font-weight: 500;
    }
    
    .activity-time {
      font-size: 0.75rem;
      color: var(--gray-500);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.25rem;
    }
    
    .activity-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    /* Styling for fuldførte aktiviteter */
    .activity-item.completed .activity-title {
      text-decoration: line-through;
      color: var(--gray-400);
    }
    
    .activity-item.completed .activity-time {
      color: var(--gray-400);
    }
    
    .activity-item.completed .activity-icon {
      background-color: var(--gray-200);
    }
    
    .activity-item.completed .icon-lesson,
    .activity-item.completed .icon-break,
    .activity-item.completed .icon-homework,
    .activity-item.completed .icon-other {
      color: var(--gray-400);
    }
    
    .activity-item.completed .activity-icon::after {
      content: '\\2713'; /* Checkmark */
      position: absolute;
      font-size: 0.875rem;
      color: var(--gray-600);
    }
    
    .empty-state {
      padding: 3rem 1rem;
      text-align: center;
      color: var(--gray-500);
      background-color: var(--gray-50);
    }
    
    /* Uge visning */
    .week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-right: 1px solid var(--gray-200);
    }
    
    .week-day {
      min-height: 120px;
      border-left: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .week-day:hover {
      background-color: var(--gray-50);
    }
    
    .week-day.today {
      background-color: var(--primary-bg);
    }
    
    .week-day.selected {
      box-shadow: inset 0 0 0 2px var(--primary);
    }
    
    .day-header {
      padding: 0.5rem;
      text-align: center;
      font-weight: 500;
      background-color: var(--gray-100);
      border-bottom: 1px solid var(--gray-200);
    }
    
    .today .day-header {
      background-color: var(--primary-bg-accent);
      color: var(--primary-dark);
    }
    
    .day-number {
      font-size: 0.75rem;
      margin-top: 0.125rem;
    }
    
    .today .day-number {
      font-weight: bold;
    }
    
    .day-activities {
      padding: 0.25rem;
    }
    
    .day-activity {
      font-size: 0.75rem;
      padding: 0.25rem;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      border-radius: var(--radius-sm);
      transition: background-color 0.2s ease;
    }
    
    .day-activity:hover {
      background-color: var(--gray-100);
    }
    
    .day-activity i {
      font-size: 0.75rem;
    }
    
    .day-activity.completed {
      text-decoration: line-through;
      color: var(--gray-400);
    }
    
    .day-activity.completed i {
      color: var(--gray-400);
    }
    
    .more-activities {
      font-size: 0.75rem;
      text-align: center;
      color: var(--gray-500);
      padding: 0.25rem;
    }
    
    /* Måned visning */
    .month-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-right: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
    }
    
    .month-day-name {
      padding: 0.5rem;
      text-align: center;
      font-weight: 500;
      background-color: var(--gray-100);
      border-left: 1px solid var(--gray-200);
    }
    
    .month-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-right: 1px solid var(--gray-200);
    }
    
    .month-day {
      min-height: 80px;
      border-left: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
      cursor: pointer;
      position: relative;
      transition: background-color 0.2s ease;
    }
    
    .month-day:hover {
      background-color: var(--gray-50);
    }
    
    .month-day.other-month {
      background-color: var(--gray-50);
      color: var(--gray-400);
    }
    
    .month-day.today {
      background-color: var(--primary-bg);
    }
    
    .month-day.selected {
      box-shadow: inset 0 0 0 2px var(--primary);
    }
    
    .month-day-header {
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    
    .month-day-number {
      font-size: 0.875rem;
    }
    
    .today .month-day-number {
      font-weight: bold;
      color: var(--primary-dark);
    }
    
    .activity-indicators {
      display: flex;
      gap: 0.25rem;
    }
    
    .activity-indicator {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }
    
    .indicator-lesson {
      background-color: var(--success);
    }
    
    .indicator-break {
      background-color: var(--warning);
    }
    
    .indicator-homework {
      background-color: var(--purple);
    }
    
    .indicator-other {
      background-color: var(--gray-500);
    }
    
    .month-day-activities {
      padding: 0 0.5rem 0.25rem;
      font-size: 0.75rem;
      color: var(--gray-500);
    }
    
    /* Dialog */
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      display: none;
      backdrop-filter: blur(4px);
    }
    
    .dialog {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 500px;
      padding: 1.5rem;
      animation: dialog-appear 0.3s ease;
    }
    
    @keyframes dialog-appear {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .dialog-header {
      margin-bottom: 1.5rem;
    }
    
    .dialog-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-800);
    }
    
    .form-group {
      margin-bottom: 1.25rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--gray-700);
    }
    
    .form-input {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius);
      font-size: 1rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    
    .form-select {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid var(--gray-300);
      border-radius: var(--radius);
      font-size: 1rem;
      background-color: white;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    
    .form-select:focus {
      outline: none;
      border-color: var(--primary-light);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
    
    .form-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .form-checkbox input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
    }
    
    /* Udskrift knapper */
    .print-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 0 1rem 1rem;
    }
    
    /* Responsivt design */
    @media (max-width: 768px) {
      .week-grid, .month-grid, .month-header {
        font-size: 0.75rem;
      }
      
      .week-day {
        min-height: 100px;
      }
      
      .month-day {
        min-height: 60px;
      }
      
      .print-buttons {
        flex-direction: column;
        align-items: stretch;
      }
    }
    
    @media (max-width: 640px) {
      .card-title {
        font-size: 1.25rem;
      }
      
      .btn-sm {
        padding: 0.25rem;
      }
      
      .week-grid, .month-grid {
        grid-template-columns: repeat(7, 1fr);
      }
      
      .day-activity {
        font-size: 0.625rem;
      }
      
      body {
        padding: 0.5rem;
      }
    }
    
    /* Print styling */
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      
      .container {
        max-width: 100%;
      }
      
      .card {
        box-shadow: none;
        border: none;
        margin-bottom: 0;
      }
      
      .card-header {
        color: var(--primary);
        background-color: white;
        border-bottom: 2px solid var(--primary);
        padding: 1rem 0;
      }
      
      .card-title i {
        color: var(--primary);
      }
      
      .tabs, .nav-buttons, .print-buttons, .btn-full, .activity-actions {
        display: none !important;
      }
      
      .tab-content {
        display: none !important;
      }
      
      .print-day-only #day-view,
      .print-week-only #week-view,
      .print-month-only #month-view {
        display: block !important;
      }
      
      .date-header {
        background-color: white;
        border-bottom: 1px solid var(--gray-300);
      }
      
      .week-day, .month-day {
        border: 1px solid var(--gray-300);
      }
      
      .day-header, .month-day-name {
        background-color: var(--gray-100);
      }
      
      .today .day-header {
        background-color: var(--primary-bg);
      }
      
      .week-day.today, .month-day.today {
        background-color: var(--primary-bg);
      }
      
      .week-day.selected, .month-day.selected {
        box-shadow: none;
      }
      
      .activity-item:hover, .week-day:hover, .month-day:hover, .day-activity:hover {
        background-color: transparent;
      }
      
      /* Tilføj sidehoved og sidefod */
      @page {
        margin: 1cm;
      }
      
      /* Skjul dialog ved udskrift */
      .dialog-backdrop {
        display: none !important;
      }
    }
    
    /* Print-specifikke klasser */
    .print-day-only .tab-content:not(#day-view),
    .print-week-only .tab-content:not(#week-view),
    .print-month-only .tab-content:not(#month-view) {
      display: none !important;
    }
    
    .print-day-only #day-view,
    .print-week-only #week-view,
    .print-month-only #month-view {
      display: block !important;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <i class="lucide-calendar"></i>
          <span>Elevkalender</span>
        </div>
        <div class="nav-buttons">
          <button class="btn btn-outline btn-sm" id="prev-btn">
            <i class="lucide-chevron-left"></i>
          </button>
          <button class="btn btn-outline btn-sm" id="today-btn">I dag</button>
          <button class="btn btn-outline btn-sm" id="next-btn">
            <i class="lucide-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div class="tabs">
        <div class="tabs-list">
          <div class="tab active" data-view="day">Dag</div>
          <div class="tab" data-view="week">Uge</div>
          <div class="tab" data-view="month">Måned</div>
        </div>
      </div>
      
      <div class="print-buttons">
        <button class="btn btn-secondary btn-sm" id="print-day-btn">
          <i class="lucide-printer"></i> Udskriv dag
        </button>
        <button class="btn btn-secondary btn-sm" id="print-week-btn">
          <i class="lucide-printer"></i> Udskriv uge
        </button>
        <button class="btn btn-secondary btn-sm" id="print-month-btn">
          <i class="lucide-printer"></i> Udskriv måned
        </button>
      </div>
      
      <!-- Dag visning -->
      <div class="tab-content active" id="day-view">
        <div class="date-header">
          <h2 class="date-title" id="day-title">Mandag, 13. april 2025</h2>
        </div>
        <div class="activity-list" id="activity-list">
          <!-- Aktiviteter indsættes her via JavaScript -->
        </div>
      </div>
      
      <!-- Uge visning -->
      <div class="tab-content" id="week-view">
        <div class="date-header">
          <h2 class="date-title" id="week-title">Uge 16 - 2025</h2>
        </div>
        <div class="week-grid" id="week-grid">
          <!-- Ugedage indsættes her via JavaScript -->
        </div>
      </div>
      
      <!-- Måned visning -->
      <div class="tab-content" id="month-view">
        <div class="date-header">
          <h2 class="date-title" id="month-title">April 2025</h2>
        </div>
        <div class="month-header">
          <div class="month-day-name">Man</div>
          <div class="month-day-name">Tir</div>
          <div class="month-day-name">Ons</div>
          <div class="month-day-name">Tor</div>
          <div class="month-day-name">Fre</div>
          <div class="month-day-name">Lør</div>
          <div class="month-day-name">Søn</div>
        </div>
        <div class="month-grid" id="month-grid">
          <!-- Månedsdage indsættes her via JavaScript -->
        </div>
      </div>
    </div>
    
    <button class="btn btn-primary btn-full" id="add-activity-btn">
      <i class="lucide-plus"></i> Tilføj ny aktivitet
    </button>
  </div>
  
  <!-- Dialog til at tilføje/redigere aktiviteter -->
  <div class="dialog-backdrop" id="activity-dialog">
    <div class="dialog">
      <div class="dialog-header">
        <h3 class="dialog-title" id="dialog-title">Tilføj ny aktivitet</h3>
      </div>
      <div class="dialog-content">
        <div class="form-group">
          <label class="form-label" for="activity-title">Titel</label>
          <input type="text" class="form-input" id="activity-title" placeholder="F.eks. Matematik">
        </div>
        <div class="form-group">
          <label class="form-label" for="activity-time">Tidspunkt</label>
          <input type="time" class="form-input" id="activity-time">
        </div>
        <div class="form-group">
          <label class="form-label" for="activity-date">Dato</label>
          <input type="date" class="form-input" id="activity-date">
        </div>
        <div class="form-group">
          <label class="form-label" for="activity-type">Type</label>
          <select class="form-select" id="activity-type">
            <option value="lesson">Undervisning</option>
            <option value="break">Pause</option>
            <option value="homework">Lektier</option>
            <option value="other">Andet</option>
          </select>
        </div>
        <div class="form-group form-checkbox">
          <input type="checkbox" id="activity-completed">
          <label class="form-label" for="activity-completed">Markér som fuldført</label>
        </div>
        <button class="btn btn-primary btn-full" id="save-activity-btn">Tilføj aktivitet</button>
      </div>
    </div>
  </div>
  
  <script>
    // Aktivitetstyper
    const ActivityType = {
      LESSON: 'lesson',
      BREAK: 'break',
      HOMEWORK: 'homework',
      OTHER: 'other'
    };
    
    // Kalender state
    const state = {
      currentDate: new Date(),
      selectedDate: formatDate(new Date()),
      currentView: 'day',
      activities: [
        { id: '1', time: '08:00', title: 'Matematik', type: ActivityType.LESSON, date: formatDate(new Date()), completed: false },
        { id: '2', time: '09:45', title: 'Pause', type: ActivityType.BREAK, date: formatDate(new Date()), completed: false },
        { id: '3', time: '10:15', title: 'Dansk', type: ActivityType.LESSON, date: formatDate(new Date()), completed: false },
        { id: '4', time: '12:00', title: 'Frokost', type: ActivityType.BREAK, date: formatDate(new Date()), completed: false },
        { id: '5', time: '12:45', title: 'Historie', type: ActivityType.LESSON, date: formatDate(new Date()), completed: false },
        { id: '6', time: '14:30', title: 'Lektier - Matematik', type: ActivityType.HOMEWORK, date: formatDate(new Date()), completed: false },
        { id: '7', time: '08:30', title: 'Engelsk', type: ActivityType.LESSON, date: formatDate(addDays(new Date(), 1)), completed: false },
        { id: '8', time: '10:15', title: 'Idræt', type: ActivityType.LESSON, date: formatDate(addDays(new Date(), 1)), completed: false }
      ],
      editingActivity: null
    };
    
    // DOM elementer
    const elements = {
      tabs: document.querySelectorAll('.tab'),
      tabContents: document.querySelectorAll('.tab-content'),
      dayTitle: document.getElementById('day-title'),
      weekTitle: document.getElementById('week-title'),
      monthTitle: document.getElementById('month-title'),
      activityList: document.getElementById('activity-list'),
      weekGrid: document.getElementById('week-grid'),
      monthGrid: document.getElementById('month-grid'),
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn'),
      todayBtn: document.getElementById('today-btn'),
      addActivityBtn: document.getElementById('add-activity-btn'),
      activityDialog: document.getElementById('activity-dialog'),
      dialogTitle: document.getElementById('dialog-title'),
      activityTitleInput: document.getElementById('activity-title'),
      activityTimeInput: document.getElementById('activity-time'),
      activityDateInput: document.getElementById('activity-date'),
      activityTypeInput: document.getElementById('activity-type'),
      activityCompletedInput: document.getElementById('activity-completed'),
      saveActivityBtn: document.getElementById('save-activity-btn'),
      printDayBtn: document.getElementById('print-day-btn'),
      printWeekBtn: document.getElementById('print-week-btn'),
      printMonthBtn: document.getElementById('print-month-btn')
    };
    
    // Hjælpefunktioner til datoer
    function formatDate(date) {
      return date.toISOString().split('T')[0];
    }
    
    function parseDate(dateString) {
      return new Date(dateString);
    }
    
    function formatDisplayDate(date, format = 'long') {
      return date.toLocaleDateString('da-DK', {
        weekday: format === 'long' ? 'long' : undefined,
        year: 'numeric',
        month: format === 'long' ? 'long' : 'short',
        day: 'numeric'
      });
    }
    
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    
    function addMonths(date, months) {
      const result = new Date(date);
      result.setMonth(result.getMonth() + months);
      return result;
    }
    
    function getWeekNumber(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDay(d.getUTCDay() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCDay(), 0, 1));
      return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
    
    function getWeekDays(date) {
      const day = date.getDay() || 7;
      const diff = date.getDate() - day + 1;
      const monday = new Date(date);
      monday.setDate(diff);
      
      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        weekDays.push(day);
      }
      
      return weekDays;
    }
    
    function getMonthDays(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      const startDate = new Date(firstDay);
      const firstDayOfWeek = startDate.getDay() || 7;
      startDate.setDate(startDate.getDate() - (firstDayOfWeek - 1));
      
      const weeks = [];
      let currentWeek = [];
      
      for (let i = 0; i < 42; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        
        currentWeek.push(day);
        
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
        
        if (day.getMonth() > month && day.getDay() === 0 && weeks.length > 0) {
          break;
        }
      }
      
      return weeks;
    }
    
    // Aktivitetsfunktioner
    function getActivitiesForDate(date) {
      return state.activities.filter(activity => activity.date === date);
    }
    
    function countActivitiesForDate(date) {
      return getActivitiesForDate(date).length;
    }
    
    function getActivityTypesForDate(date) {
      const activities = getActivitiesForDate(date);
      return [...new Set(activities.map(activity => activity.type))];
    }
    
    function getActivityIcon(type) {
      switch (type) {
        case ActivityType.LESSON:
          return '<i class="lucide-book-open icon-lesson"></i>';
        case ActivityType.BREAK:
          return '<i class="lucide-coffee icon-break"></i>';
        case ActivityType.HOMEWORK:
          return '<i class="lucide-edit icon-homework"></i>';
        default:
          return '<i class="lucide-calendar icon-other"></i>';
      }
    }
    
    // Render funktioner
    function renderDayView() {
      const activities = getActivitiesForDate(state.selectedDate);
      elements.dayTitle.textContent = formatDisplayDate(parseDate(state.selectedDate));
      
      if (activities.length === 0) {
        elements.activityList.innerHTML = \`
          <div class="empty-state">
            Ingen aktiviteter planlagt for denne dag
          </div>
        \`;
        return;
      }
      
      activities.sort((a, b) => a.time.localeCompare(b.time));
      
      elements.activityList.innerHTML = activities.map(activity => \`
        <div class="activity-item \${activity.completed ? 'completed' : ''}" data-id="\${activity.id}">
          <div class="activity-icon toggle-completed" data-id="\${activity.id}">
            \${getActivityIcon(activity.type)}
          </div>
          <div class="activity-content">
            <div class="activity-title">\${activity.title}</div>
            <div class="activity-time">
              <i class="lucide-clock"></i> \${activity.time}
            </div>
          </div>
          <div class="activity-actions">
            <button class="btn btn-ghost btn-icon edit-activity" data-id="\${activity.id}">
              <i class="lucide-edit"></i>
            </button>
            <button class="btn btn-ghost btn-icon delete-activity btn-danger" data-id="\${activity.id}">
              <i class="lucide-trash-2"></i>
            </button>
          </div>
        </div>
      \`).join('');
      
      // Tilføj event listeners til knapper
      document.querySelectorAll('.edit-activity').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          editActivity(id);
        });
      });
      
      document.querySelectorAll('.delete-activity').forEach(button => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          deleteActivity(id);
        });
      });
      
      // Tilføj event listeners til afkrydsning
      document.querySelectorAll('.toggle-completed').forEach(icon => {
        icon.addEventListener('click', () => {
          const id = icon.getAttribute('data-id');
          toggleActivityCompleted(id);
        });
      });
    }
    
    function renderWeekView() {
      const weekDays = getWeekDays(state.currentDate);
      elements.weekTitle.textContent = \`Uge \${getWeekNumber(state.currentDate)} - \${state.currentDate.getFullYear()}\`;
      
      elements.weekGrid.innerHTML = weekDays.map(day => {
        const dateStr = formatDate(day);
        const isToday = dateStr === formatDate(new Date());
        const isSelected = dateStr === state.selectedDate;
        const dayActivities = state.activities.filter(activity => activity.date === dateStr)
          .sort((a, b) => a.time.localeCompare(b.time));
        
        return \`
          <div class="week-day \${isToday ? 'today' : ''} \${isSelected ? 'selected' : ''}" data-date="\${dateStr}">
            <div class="day-header">
              \${day.toLocaleDateString('da-DK', { weekday: 'short' })}
              <div class="day-number">\${day.getDate()}/\${day.getMonth() + 1}</div>
            </div>
            <div class="day-activities">
              \${dayActivities.slice(0, 3).map(activity => \`
                <div class="day-activity \${activity.completed ? 'completed' : ''}" title="\${activity.time} - \${activity.title}">
                  \${getActivityIcon(activity.type)}
                  <span>\${activity.time} \${activity.title}</span>
                </div>
              \`).join('')}
              \${dayActivities.length > 3 ? \`
                <div class="more-activities">
                  +\${dayActivities.length - 3} mere...
                </div>
              \`
                : ''}
            </div>
          </div>
        \`;
      }).join('');
      
      // Tilføj event listeners til ugedage
      document.querySelectorAll('.week-day').forEach(day => {
        day.addEventListener('click', () => {
          const date = day.getAttribute('data-date');
          state.selectedDate = date;
          setActiveTab('day');
          renderCalendar();
        });
      });
    }
    
    function renderMonthView() {
      const monthDays = getMonthDays(state.currentDate);
      elements.monthTitle.textContent = state.currentDate.toLocaleDateString('da-DK', { month: 'long', year: 'numeric' });
      
      elements.monthGrid.innerHTML = monthDays.map(week => {
        return week.map(day => {
          const dateStr = formatDate(day);
          const isCurrentMonth = day.getMonth() === state.currentDate.getMonth();
          const isToday = dateStr === formatDate(new Date());
          const isSelected = dateStr === state.selectedDate;
          const activityTypes = getActivityTypesForDate(dateStr);
          
          return \`
            <div class="month-day \${!isCurrentMonth ? 'other-month' : ''} \${isToday ? 'today' : ''} \${isSelected ? 'selected' : ''}" data-date="\${dateStr}">
              <div class="month-day-header">
                <span class="month-day-number">\${day.getDate()}</span>
                \${activityTypes.length > 0 ? \`
                  <div class="activity-indicators">
                    \${activityTypes.includes(ActivityType.LESSON) ? '<div class="activity-indicator indicator-lesson"></div>' : ''}
                    \${activityTypes.includes(ActivityType.BREAK) ? '<div class="activity-indicator indicator-break"></div>' : ''}
                    \${activityTypes.includes(ActivityType.HOMEWORK) ? '<div class="activity-indicator indicator-homework"></div>' : ''}
                    \${activityTypes.includes(ActivityType.OTHER) ? '<div class="activity-indicator indicator-other"></div>' : ''}
                  </div>
                \` : ''}
              </div>
              \${countActivitiesForDate(dateStr) > 0 ? \`
                <div class="month-day-activities">
                  \${countActivitiesForDate(dateStr)} aktiviteter
                </div>
              \` : ''}
            </div>
          \`;
        }).join('');
      }).join('');
      
      // Tilføj event listeners til månedsdage
      document.querySelectorAll('.month-day').forEach(day => {
        day.addEventListener('click', () => {
          const date = day.getAttribute('data-date');
          state.selectedDate = date;
          setActiveTab('day');
          renderCalendar();
        });
      });
    }
    
    function renderCalendar() {
      switch (state.currentView) {
        case 'day':
          renderDayView();
          break;
        case 'week':
          renderWeekView();
          break;
        case 'month':
          renderMonthView();
          break;
      }
    }
    
    // Aktivitetshåndtering
    function addActivity() {
      openActivityDialog();
    }
    
    function editActivity(id) {
      const activity = state.activities.find(activity => activity.id === id);
      if (activity) {
        state.editingActivity = activity;
        elements.dialogTitle.textContent = 'Rediger aktivitet';
        elements.activityTitleInput.value = activity.title;
        elements.activityTimeInput.value = activity.time;
        elements.activityDateInput.value = activity.date;
        elements.activityTypeInput.value = activity.type;
        elements.activityCompletedInput.checked = activity.completed;
        elements.saveActivityBtn.textContent = 'Opdater aktivitet';
        openActivityDialog();
      }
    }
    
    function deleteActivity(id) {
      state.activities = state.activities.filter(activity => activity.id !== id);
      renderCalendar();
    }
    
    function toggleActivityCompleted(id) {
      state.activities = state.activities.map(activity => {
        if (activity.id === id) {
          return {
            ...activity,
            completed: !activity.completed
          };
        }
        return activity;
      });
      renderCalendar();
    }
    
    function saveActivity() {
      const title = elements.activityTitleInput.value;
      const time = elements.activityTimeInput.value;
      const date = elements.activityDateInput.value;
      const type = elements.activityTypeInput.value;
      const completed = elements.activityCompletedInput.checked;
      
      if (title && time && date) {
        if (state.editingActivity) {
          // Opdater eksisterende aktivitet
          state.activities = state.activities.map(activity => {
            if (activity.id === state.editingActivity.id) {
              return {
                ...activity,
                title,
                time,
                date,
                type,
                completed
              };
            }
            return activity;
          });
        } else {
          // Tilføj ny aktivitet
          const newActivity = {
            id: Date.now().toString(),
            title,
            time,
            date,
            type,
            completed
          };
          state.activities.push(newActivity);
        }
        
        closeActivityDialog();
        renderCalendar();
      }
    }
    
    function openActivityDialog() {
      if (!state.editingActivity) {
        elements.dialogTitle.textContent = 'Tilføj ny aktivitet';
        elements.activityTitleInput.value = '';
        elements.activityTimeInput.value = '';
        elements.activityDateInput.value = state.selectedDate;
        elements.activityTypeInput.value = ActivityType.LESSON;
        elements.activityCompletedInput.checked = false;
        elements.saveActivityBtn.textContent = 'Tilføj aktivitet';
      }
      
      elements.activityDialog.style.display = 'flex';
    }
    
    function closeActivityDialog() {
      elements.activityDialog.style.display = 'none';
      state.editingActivity = null;
    }
    
    // Navigation
    function goToToday() {
      const today = new Date();
      state.currentDate = today;
      state.selectedDate = formatDate(today);
      renderCalendar();
    }
    
    function goToPrevious() {
      switch (state.currentView) {
        case 'day':
          state.currentDate = addDays(state.currentDate, -1);
          break;
        case 'week':
          state.currentDate = addDays(state.currentDate, -7);
          break;
        case 'month':
          state.currentDate = addMonths(state.currentDate, -1);
          break;
      }
      state.selectedDate = formatDate(state.currentDate);
      renderCalendar();
    }
    
    function goToNext() {
      switch (state.currentView) {
        case 'day':
          state.currentDate = addDays(state.currentDate, 1);
          break;
        case 'week':
          state.currentDate = addDays(state.currentDate, 7);
          break;
        case 'month':
          state.currentDate = addMonths(state.currentDate, 1);
          break;
      }
      state.selectedDate = formatDate(state.currentDate);
      renderCalendar();
    }
    
    function setActiveTab(view) {
      state.currentView = view;
      
      elements.tabs.forEach(tab => {
        if (tab.getAttribute('data-view') === view) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      
      elements.tabContents.forEach(content => {
        if (content.id === \`\${view}-view\`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    }
    
    // Udskriftsfunktioner
    function printDay() {
      document.body.classList.add('print-day-only');
      window.print();
      document.body.classList.remove('print-day-only');
    }
    
    function printWeek() {
      document.body.classList.add('print-week-only');
      window.print();
      document.body.classList.remove('print-week-only');
    }
    
    function printMonth() {
      document.body.classList.add('print-month-only');
      window.print();
      document.body.classList.remove('print-month-only');
    }
    
    // Event listeners
    elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        setActiveTab(view);
        renderCalendar();
      });
    });
    
    elements.prevBtn.addEventListener('click', goToPrevious);
    elements.nextBtn.addEventListener('click', goToNext);
    elements.todayBtn.addEventListener('click', goToToday);
    elements.addActivityBtn.addEventListener('click', addActivity);
    elements.saveActivityBtn.addEventListener('click', saveActivity);
    
    elements.activityDialog.addEventListener('click', (e) => {
      if (e.target === elements.activityDialog) {
        closeActivityDialog();
      }
    });
    
    // Udskriftsknapper
    elements.printDayBtn.addEventListener('click', printDay);
    elements.printWeekBtn.addEventListener('click', printWeek);
    elements.printMonthBtn.addEventListener('click', printMonth);
    
    // Initialiser kalenderen
    renderCalendar();
  </script>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    
    // Add the iframe to the container
    const container = document.getElementById('calendar-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    // Cleanup
    return () => {
      if (container && iframe) {
        container.removeChild(iframe);
      }
      URL.revokeObjectURL(url);
    };
  }, []);
  
  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Calendar size={28} className="text-primary" />
        <div>
          <CardTitle className="text-2xl">Elevkalender</CardTitle>
          <CardDescription>Hold styr på dine aktiviteter og begivenheder</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div id="calendar-container" className="h-full"></div>
      </CardContent>
    </Card>
  );
};

export default StudentCalendar;
