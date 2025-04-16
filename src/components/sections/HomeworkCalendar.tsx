
import React from 'react';

const HomeworkCalendar = () => {
  // Using dangerouslySetInnerHTML would be simpler but iframe with srcDoc is safer
  return (
    <iframe 
      srcDoc={`<!DOCTYPE html>
      <html lang="da">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lektiekalender</title>
          <link href='https://cdn.jsdelivr.net/npm/@fullcalendar/core@4.4.0/main.min.css' rel='stylesheet' />
          <link href='https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@4.4.0/main.min.css' rel='stylesheet' />
          <style>
              :root {
                  --primary-color: #2c3e50;
                  --secondary-color: #3498db;
                  --accent-color: #e74c3c;
                  --background-color: #f5f6fa;
                  --text-color: #2c3e50;
                  --card-background: #ffffff;
              }

              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: var(--background-color);
                  color: var(--text-color);
                  margin: 0;
                  padding: 0;
                  line-height: 1.6;
              }

              header {
                  background-color: var(--primary-color);
                  color: white;
                  padding: 1.5rem;
                  text-align: center;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }

              main {
                  padding: 2rem;
                  display: grid;
                  grid-template-columns: 1fr 600px;
                  gap: 2rem;
                  max-width: 1600px;
                  margin: 0 auto;
              }

              .content {
                  background-color: var(--card-background);
                  border-radius: 10px;
                  padding: 2rem;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              }

              .add-homework-btn {
                  background-color: var(--secondary-color);
                  color: white;
                  border: none;
                  padding: 1rem 2rem;
                  border-radius: 8px;
                  font-size: 1.1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  width: 100%;
                  margin-bottom: 2rem;
                  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
              }

              .add-homework-btn:hover {
                  background-color: #2980b9;
                  transform: translateY(-2px);
              }

              .section {
                  margin-bottom: 2rem;
              }

              .section h2 {
                  color: var(--primary-color);
                  border-bottom: 2px solid var(--secondary-color);
                  padding-bottom: 0.5rem;
                  margin-bottom: 1.5rem;
                  font-size: 1.5rem;
              }

              .section ul {
                  list-style-type: none;
                  padding: 0;
              }

              .section li {
                  background-color: var(--card-background);
                  margin-bottom: 0.8rem;
                  padding: 1rem;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-left: 4px solid var(--secondary-color);
              }

              .section li.assignment {
                  border-left-color: var(--accent-color);
              }

              .section li.completed {
                  opacity: 0.7;
                  text-decoration: line-through;
              }

              .form-container {
                  display: none;
                  background-color: var(--card-background);
                  padding: 2rem;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  margin-top: 1rem;
              }

              .form-container h2 {
                  color: var(--primary-color);
                  margin-bottom: 1.5rem;
              }

              .form-container input,
              .form-container select {
                  width: 100%;
                  padding: 0.8rem;
                  margin-bottom: 1rem;
                  border: 1px solid #e1e1e1;
                  border-radius: 6px;
                  font-size: 1rem;
              }

              .form-container button {
                  background-color: var(--secondary-color);
                  color: white;
                  border: none;
                  padding: 0.8rem;
                  border-radius: 6px;
                  cursor: pointer;
                  width: 100%;
                  font-size: 1rem;
                  font-weight: 600;
              }

              .sidebar {
                  background-color: var(--card-background);
                  border-radius: 10px;
                  padding: 1.5rem;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                  min-width: 550px;
              }

              .fc {
                  background-color: white;
                  padding: 1rem;
                  border-radius: 8px;
                  font-size: 1.1rem;
              }

              .fc-day-grid-event {
                  border-radius: 4px;
                  padding: 4px 8px;
                  cursor: pointer;
                  margin: 2px 4px;
              }

              .fc-day-grid-event .fc-content {
                  white-space: normal;
                  overflow: hidden;
                  padding: 4px 6px;
              }

              .fc-day-number {
                  font-size: 1.2rem !important;
                  padding: 8px !important;
              }

              .fc-event.assignment {
                  background-color: var(--accent-color);
                  border-color: var(--accent-color);
              }

              .complete-btn {
                  background-color: #27ae60;
                  color: white;
                  border: none;
                  padding: 0.5rem 1rem;
                  border-radius: 4px;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-weight: 500;
              }

              .complete-btn:hover {
                  background-color: #219a52;
              }

              .complete-btn.completed {
                  background-color: #95a5a6;
              }

              .deadline-info {
                  color: #666;
                  font-size: 0.9rem;
              }

              .modal {
                  display: none;
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  z-index: 1000;
              }

              .modal-content {
                  position: relative;
                  background-color: white;
                  margin: 10% auto;
                  padding: 20px;
                  width: 80%;
                  max-width: 600px;
                  border-radius: 10px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }

              .close-button {
                  position: absolute;
                  right: 10px;
                  top: 10px;
                  background: none;
                  border: none;
                  font-size: 1.5rem;
                  cursor: pointer;
                  color: var(--primary-color);
              }

              .modal-list {
                  list-style: none;
                  padding: 0;
              }

              .modal-list li {
                  padding: 1rem;
                  margin-bottom: 0.8rem;
                  border-radius: 6px;
                  background-color: #f8f9fa;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  transition: all 0.3s ease;
              }

              .modal-list li:hover {
                  transform: translateX(4px);
              }

              .homework-item {
                  flex: 1;
                  margin-right: 1rem;
              }

              .homework-title {
                  margin-bottom: 0.5rem;
              }

              .homework-time {
                  font-size: 0.9rem;
                  color: #666;
              }

              @media (max-width: 1200px) {
                  main {
                      grid-template-columns: 1fr;
                  }

                  .sidebar {
                      min-width: auto;
                      width: 100%;
                  }
              }
          </style>
      </head>
      <body>
          <header>
              <h1>Lektiekalender</h1>
          </header>
          <main>
              <div class="content">
                  <button class="add-homework-btn" onclick="toggleForm()">Tilføj lektier</button>
                  <div class="section">
                      <h2>Lektier til i morgen</h2>
                      <ul id="tomorrowsLektier">
                          <!-- Lektier vil blive tilføjet her dynamisk -->
                      </ul>
                  </div>
                  <div class="form-container" id="formContainer">
                      <h2>Tilføj nye lektier</h2>
                      <select id="type">
                          <option value="lektie">Lektie</option>
                          <option value="aflevering">Aflevering</option>
                      </select>
                      <input type="text" id="fag" placeholder="Fag">
                      <input type="text" id="beskrivelse" placeholder="Beskrivelse">
                      <input type="datetime-local" id="deadline">
                      <button onclick="tilfojLektier()">Tilføj</button>
                  </div>
              </div>
              <div class="sidebar">
                  <div id="calendar"></div>
              </div>
          </main>

          <!-- Modal -->
          <div id="homeworkModal" class="modal">
              <div class="modal-content">
                  <button class="close-button" onclick="closeModal()">&times;</button>
                  <h2 id="modalDate"></h2>
                  <div id="modalContent"></div>
              </div>
          </div>

          <!-- Scripts -->
          <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/core@4.4.0/main.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@4.4.0/main.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/@fullcalendar/interaction@4.4.0/main.js'></script>
          <script>
              document.addEventListener('DOMContentLoaded', function() {
                  const calendarEl = document.getElementById('calendar');
                  const calendar = new FullCalendar.Calendar(calendarEl, {
                      plugins: [ 'dayGrid', 'interaction' ],
                      defaultView: 'dayGridMonth',
                      locale: 'da',
                      header: {
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth'
                      },
                      events: [],
                      dateClick: function(info) {
                          showDayHomework(info.date);
                      },
                      eventClick: function(info) {
                          showDayHomework(info.event.start);
                      },
                      eventRender: function(info) {
                          info.el.setAttribute('title', 'Klik for at se detaljer');
                      }
                  });
                  calendar.render();
                  window.calendar = calendar;
              });

              function showDayHomework(date) {
                  const modal = document.getElementById('homeworkModal');
                  const modalDate = document.getElementById('modalDate');
                  const modalContent = document.getElementById('modalContent');
                  
                  const dateStr = date.toLocaleDateString('da-DK', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                  });
                  
                  modalDate.textContent = dateStr;
                  
                  const events = window.calendar.getEvents().filter(event => {
                      const eventDate = new Date(event.start);
                      return eventDate.toDateString() === date.toDateString();
                  });
                  
                  if (events.length > 0) {
                      const list = document.createElement('ul');
                      list.className = 'modal-list';
                      
                      events.forEach(event => {
                          const li = document.createElement('li');
                          li.style.borderLeft = \`4px solid \${event.backgroundColor || '#3498db'}\`;
                          
                          const isCompleted = event.extendedProps.completed;
                          
                          li.innerHTML = \`
                              <div class="homework-item" style="\${isCompleted ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                                  <div class="homework-title">
                                      <strong>\${event.extendedProps.subject}</strong>: \${event.extendedProps.description}
                                  </div>
                                  <div class="homework-time">
                                      Tidspunkt: \${event.start.toLocaleTimeString('da-DK', {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                      })}
                                  </div>
                              </div>
                              <button onclick="toggleHomeworkComplete('\${event.id}')" 
                                  class="complete-btn \${isCompleted ? 'completed' : ''}">
                                  \${isCompleted ? 'Genåbn' : 'Markér færdig'}
                              </button>\`;
                          
                          list.appendChild(li);
                      });
                      
                      modalContent.innerHTML = '';
                      modalContent.appendChild(list);
                  } else {
                      modalContent.innerHTML = '<p>Ingen lektier denne dag</p>';
                  }
                  
                  modal.style.display = 'block';
              }

              function closeModal() {
                  document.getElementById('homeworkModal').style.display = 'none';
              }

              function toggleHomeworkComplete(eventId) {
                  const event = window.calendar.getEventById(eventId);
                  if (event) {
                      const isCompleted = !event.extendedProps.completed;
                      event.setExtendedProp('completed', isCompleted);
                      
                      event.setProp('backgroundColor', isCompleted ? '#27ae60' : 
                          (event.classNames.includes('assignment') ? '#e74c3c' : '#3498db'));
                      
                      updateTomorrowsList();
                      
                      const modal = document.getElementById('homeworkModal');
                      if (modal.style.display === 'block') {
                          showDayHomework(event.start);
                      }
                  }
              }

              function toggleForm() {
                  const formContainer = document.getElementById('formContainer');
                  formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
              }

              function tilfojLektier() {
                  const type = document.getElementById('type').value;
                  const fag = document.getElementById('fag').value;
                  const beskrivelse = document.getElementById('beskrivelse').value;
                  const deadline = new Date(document.getElementById('deadline').value);

                  if (fag && beskrivelse && deadline) {
                      const eventId = Date.now().toString();
                      
                      const event = {
                          id: eventId,
                          title: \`\${fag}: \${beskrivelse}\`,
                          start: deadline,
                          allDay: type === 'aflevering',
                          className: type === 'aflevering' ? 'assignment' : '',
                          backgroundColor: type === 'aflevering' ? '#e74c3c' : '#3498db',
                          extendedProps: {
                              completed: false,
                              type: type,
                              subject: fag,
                              description: beskrivelse
                          }
                      };

                      window.calendar.addEvent(event);

                      if (isTomorrow(deadline)) {
                          const listItem = createHomeworkListItem(event);
                          document.getElementById('tomorrowsLektier').appendChild(listItem);
                      }

                      document.getElementById('fag').value = '';
                      document.getElementById('beskrivelse').value = '';
                      document.getElementById('deadline').value = '';
                      toggleForm();

                      window.calendar.render();
                  } else {
                      alert('Alle felter skal udfyldes.');
                  }
              }

              function createHomeworkListItem(event) {
                  const listItem = document.createElement('li');
                  listItem.className = event.className || '';
                  
                  const contentDiv = document.createElement('div');
                  contentDiv.className = 'homework-item';
                  contentDiv.innerHTML = \`
                      <div class="homework-title">
                          <strong>\${event.extendedProps.subject}</strong>: \${event.extendedProps.description}
                      </div>
                      <div class="deadline-info">
                          Deadline: \${event.start.toLocaleString('da-DK')}
                      </div>
                  \`;
                  
                  const completeButton = document.createElement('button');
                  completeButton.className = 'complete-btn';
                  completeButton.textContent = 'Markér færdig';
                  completeButton.onclick = () => toggleHomeworkComplete(event.id);
                  
                  listItem.appendChild(contentDiv);
                  listItem.appendChild(completeButton);
                  
                  return listItem;
              }

              function isTomorrow(date) {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(0, 0, 0, 0);
                  const nextDay = new Date(tomorrow);
                  nextDay.setDate(nextDay.getDate() + 1);

                  const checkDate = new Date(date);
                  checkDate.setHours(0, 0, 0, 0);

                  return checkDate.getTime() === tomorrow.getTime();
              }

              function updateTomorrowsList() {
                  const tomorrowsList = document.getElementById('tomorrowsLektier');
                  tomorrowsList.innerHTML = '';
                  
                  const events = window.calendar.getEvents().filter(event => isTomorrow(event.start));
                  
                  events.forEach(event => {
                      const listItem = createHomeworkListItem(event);
                      if (event.extendedProps.completed) {
                          listItem.classList.add('completed');
                      }
                      tomorrowsList.appendChild(listItem);
                  });
              }

              window.onclick = function(event) {
                  const modal = document.getElementById('homeworkModal');
                  if (event.target === modal) {
                      closeModal();
                  }
              }
          </script>
      </body>
      </html>`}
      style={{
        width: '100%',
        height: 'calc(100vh - 160px)',
        border: 'none',
        borderRadius: '8px',
      }}
    />
  );
};

export default HomeworkCalendar;
