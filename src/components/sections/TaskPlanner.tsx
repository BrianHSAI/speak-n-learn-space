import React from 'react';

const TaskPlanner = () => {
  return (
    <iframe 
      srcDoc={`<!DOCTYPE html>
      <html lang="da">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Opgaveplanlægger</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
              @media print {
                  .print-hide {
                      display: none !important;
                  }
                  body {
                      background-color: white;
                      color: black;
                  }
              }
              .tab-content {
                  display: none;
              }
              .tab-content.active {
                  display: block;
              }
              .line-through {
                  text-decoration: line-through;
                  color: #6b7280;
              }
          </style>
      </head>
      <body class="bg-gray-50">
          <div class="container mx-auto py-8 px-4">
              <h1 class="text-3xl font-bold text-center mb-8">Opgaveplanlægger</h1>

              <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="print-hide">
                      <div class="flex border-b">
                          <button id="input-tab" class="flex-1 py-3 px-4 text-center font-medium border-b-2 border-blue-500 bg-white">Indtast Opgave</button>
                          <button id="approach-tab" class="flex-1 py-3 px-4 text-center font-medium text-gray-500 bg-gray-100" disabled>Fremgangsmåde</button>
                      </div>
                  </div>

                  <div id="input-content" class="tab-content active p-6">
                      <div class="mb-4">
                          <h2 class="text-xl font-semibold mb-2">Beskriv din opgave</h2>
                          <p class="text-gray-600 mb-4">Fortæl os om den opgave, du skal løse, så hjælper vi dig med en fremgangsmåde.</p>
                      </div>
                      
                      <form id="task-form" class="space-y-4">
                          <div class="space-y-2">
                              <label for="education" class="block font-medium text-gray-700">Uddannelsesniveau</label>
                              <select id="education" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <option value="folkeskole">Folkeskole</option>
                                  <option value="gymnasium">Gymnasium</option>
                              </select>
                          </div>

                          <div class="space-y-2">
                              <label for="subject" class="block font-medium text-gray-700">Fag</label>
                              <select id="subject" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <!-- Options will be populated by JavaScript -->
                              </select>
                          </div>

                          <div class="space-y-2">
                              <label for="assignment-type" class="block font-medium text-gray-700">Opgavetype</label>
                              <select id="assignment-type" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <!-- Options will be populated by JavaScript -->
                              </select>
                          </div>

                          <div class="space-y-2">
                              <label for="task" class="block font-medium text-gray-700">Opgavebeskrivelse (valgfri)</label>
                              <textarea 
                                  id="task" 
                                  placeholder="Beskriv din opgave her med flere detaljer, hvis du ønsker det..."
                                  class="w-full p-2 border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              ></textarea>
                          </div>

                          <div class="flex justify-between pt-4">
                              <button 
                                  type="button" 
                                  id="reset-btn"
                                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                  Nulstil
                              </button>
                              <button 
                                  type="submit" 
                                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                  Få Fremgangsmåde
                              </button>
                          </div>
                      </form>
                  </div>

                  <div id="approach-content" class="tab-content p-6">
                      <div class="flex items-start justify-between mb-4">
                          <div>
                              <h2 id="approach-title" class="text-xl font-semibold">Fremgangsmåde</h2>
                              <p id="approach-description" class="text-gray-600 mt-1"></p>
                          </div>
                          <button 
                              id="back-btn"
                              class="print-hide p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                              </svg>
                          </button>
                      </div>

                      <div class="rounded-lg border border-gray-200 p-4 mb-6">
                          <h3 class="font-medium mb-2">Trin for trin</h3>
                          <ul id="steps-list" class="space-y-3">
                              <!-- Steps will be inserted here -->
                          </ul>
                      </div>

                      <div class="flex justify-between print-hide">
                          <div class="flex gap-2">
                              <button 
                                  id="print-btn"
                                  class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  title="Udskriv"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                  </svg>
                              </button>
                              <button 
                                  id="download-btn"
                                  class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  title="Download"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                              </button>
                          </div>
                          <button 
                              id="new-task-btn"
                              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                              Ny Opgave
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          <script>
              // DOM Elements
              const educationSelect = document.getElementById('education');
              const subjectSelect = document.getElementById('subject');
              const assignmentTypeSelect = document.getElementById('assignment-type');
              const inputTab = document.getElementById('input-tab');
              const approachTab = document.getElementById('approach-tab');
              const inputContent = document.getElementById('input-content');
              const approachContent = document.getElementById('approach-content');
              const taskForm = document.getElementById('task-form');
              const taskInput = document.getElementById('task');
              const resetBtn = document.getElementById('reset-btn');
              const backBtn = document.getElementById('back-btn');
              const printBtn = document.getElementById('print-btn');
              const downloadBtn = document.getElementById('download-btn');
              const newTaskBtn = document.getElementById('new-task-btn');
              const approachDescription = document.getElementById('approach-description');
              const stepsList = document.getElementById('steps-list');

              // Subject and assignment type data
              const educationData = {
                  folkeskole: {
                      subjects: [
                          { value: "dansk", label: "Dansk" },
                          { value: "matematik", label: "Matematik" },
                          { value: "engelsk", label: "Engelsk" },
                          { value: "naturfag", label: "Naturfag" },
                          { value: "humanistisk", label: "Humanistiske fag" },
                          { value: "praktisk", label: "Praktisk/musisk fag" }
                      ],
                      assignmentTypes: {
                          dansk: [
                              { value: "retskrivning", label: "Retskrivning og læsning" },
                              { value: "fremstilling", label: "Skriftlig fremstilling" }
                          ],
                          matematik: [
                              { value: "uden_hjælpemidler", label: "Uden hjælpemidler" },
                              { value: "med_hjælpemidler", label: "Med hjælpemidler" }
                          ],
                          engelsk: [
                              { value: "skriftlig", label: "Skriftlig fremstilling" }
                          ],
                          naturfag: [
                              { value: "biologi", label: "Biologi" },
                              { value: "geografi", label: "Geografi" },
                              { value: "fysik_kemi", label: "Fysik/kemi" }
                          ],
                          humanistisk: [
                              { value: "historie", label: "Historie" },
                              { value: "samfundsfag", label: "Samfundsfag" },
                              { value: "kristendom", label: "Kristendomskundskab" }
                          ],
                          praktisk: [
                              { value: "musik", label: "Musik" },
                              { value: "billedkunst", label: "Billedkunst" },
                              { value: "madkundskab", label: "Madkundskab" },
                              { value: "håndværk", label: "Håndværk og design" }
                          ]
                      }
                  },
                  gymnasium: {
                      subjects: [
                          { value: "dansk", label: "Dansk" },
                          { value: "engelsk", label: "Engelsk" },
                          { value: "matematik", label: "Matematik" },
                          { value: "fysik", label: "Fysik" },
                          { value: "samfundsfag", label: "Samfundsfag" },
                          { value: "biologi", label: "Biologi" },
                          { value: "sprog", label: "Spansk/Tysk" },
                          { value: "musik", label: "Musik" }
                      ],
                      assignmentTypes: {
                          dansk: [
                              { value: "analyserende", label: "Analyserende artikel" },
                              { value: "debatterende", label: "Debatterende artikel" },
                              { value: "reflekterende", label: "Reflekterende artikel" }
                          ],
                          engelsk: [
                              { value: "non_fiktion", label: "Analyse af non-fiktion" },
                              { value: "fiktion", label: "Analyse af fiktion" },
                              { value: "film", label: "Filmanalyse" }
                          ],
                          matematik: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ],
                          fysik: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ],
                          samfundsfag: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ],
                          biologi: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ],
                          sprog: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ],
                          musik: [
                              { value: "generel", label: "Generel opgaveløsning" }
                          ]
                      }
                  }
              };

              // Approach steps data
              const approachSteps = {
                  folkeskole: {
                      dansk: {
                          retskrivning: [
                              "Lyt opmærksomt til diktaten og skriv teksten korrekt.",
                              "Brug ordbøger til at tjekke stavning og grammatik.",
                              "Læs teksten igennem for at finde og rette fejl.",
                              "Vær opmærksom på tegnsætning og sætningsstruktur.",
                              "Tjek for almindelige fejl som nutids-r og sammensatte ord."
                          ],
                          fremstilling: [
                              "Læs alle opgaverne og vælg den, du bedst kan skrive om.",
                              "Lav en disposition med indledning, hoveddel og afslutning.",
                              "Skriv teksten med fokus på klarhed og sammenhæng.",
                              "Brug passende sprog og stil til opgavetypen.",
                              "Læs teksten igennem og ret eventuelle fejl.",
                              "Sørg for, at teksten opfylder opgavens krav."
                          ]
                      },
                      matematik: {
                          uden_hjælpemidler: [
                              "Læs opgaven grundigt og forstå, hvad der spørges om.",
                              "Identificer relevante formler og metoder.",
                              "Udfør beregningerne trin for trin.",
                              "Tjek dine resultater for rimelighed.",
                              "Skriv dine svar klart og tydeligt."
                          ],
                          med_hjælpemidler: [
                              "Brug lommeregner og formelsamling effektivt.",
                              "Analyser opgaven og planlæg din løsning.",
                              "Udfør beregninger og dokumenter dine trin.",
                              "Tjek dine resultater og overvej alternative metoder.",
                              "Skriv en konklusion, der besvarer opgaven."
                          ]
                      },
                      engelsk: {
                          skriftlig: [
                              "Læs opgaveformuleringen og forstå kravene.",
                              "Lav en brainstorm over ideer og ordforråd.",
                              "Skriv et udkast med fokus på struktur og indhold.",
                              "Brug varieret sprog og passende grammatik.",
                              "Læs teksten igennem og ret fejl.",
                              "Sørg for, at teksten opfylder opgavens krav."
                          ]
                      },
                      naturfag: {
                          biologi: [
                              "Læs opgaven og identificer det faglige emne.",
                              "Anvend relevante fagbegreber og teorier.",
                              "Analyser data og informationer.",
                              "Besvar spørgsmålene klart og præcist.",
                              "Tjek dine svar for faglig korrekthed.",
                              "Læs dine svar igennem for sprogfejl."
                          ],
                          geografi: [
                              "Læs opgaven og identificer det faglige emne.",
                              "Anvend relevante fagbegreber og teorier.",
                              "Analyser data og informationer.",
                              "Besvar spørgsmålene klart og præcist.",
                              "Tjek dine svar for faglig korrekthed.",
                              "Læs dine svar igennem for sprogfejl."
                          ],
                          fysik_kemi: [
                              "Læs opgaven og identificer det faglige emne.",
                              "Anvend relevante fagbegreber og teorier.",
                              "Analyser data og informationer.",
                              "Besvar spørgsmålene klart og præcist.",
                              "Tjek dine svar for faglig korrekthed.",
                              "Læs dine svar igennem for sprogfejl."
                          ]
                      },
                      humanistisk: {
                          historie: [
                              "Forbered et oplæg om det trukne emne.",
                              "Brug relevante kilder og fagbegreber.",
                              "Øv din præsentation og tidsstyring.",
                              "Vær klar til at besvare spørgsmål fra censor.",
                              "Vis sammenhæng mellem emnet og samfundet.",
                              "Afslut med en konklusion eller refleksion."
                          ],
                          samfundsfag: [
                              "Forbered et oplæg om det trukne emne.",
                              "Brug relevante kilder og fagbegreber.",
                              "Øv din præsentation og tidsstyring.",
                              "Vær klar til at besvare spørgsmål fra censor.",
                              "Vis sammenhæng mellem emnet og samfundet.",
                              "Afslut med en konklusion eller refleksion."
                          ],
                          kristendom: [
                              "Forbered et oplæg om det trukne emne.",
                              "Brug relevante kilder og fagbegreber.",
                              "Øv din præsentation og tidsstyring.",
                              "Vær klar til at besvare spørgsmål fra censor.",
                              "Vis sammenhæng mellem emnet og samfundet.",
                              "Afslut med en konklusion eller refleksion."
                          ]
                      },
                      praktisk: {
                          musik: [
                              "Forbered en praktisk opgave eller præsentation.",
                              "Vis dine færdigheder og kreativitet.",
                              "Forklar dine valg og metoder.",
                              "Relatér til teori og fagbegreber.",
                              "Vær åben for feedback og spørgsmål.",
                              "Reflektér over din proces og resultat."
                          ],
                          billedkunst: [
                              "Forbered en praktisk opgave eller præsentation.",
                              "Vis dine færdigheder og kreativitet.",
                              "Forklar dine valg og metoder.",
                              "Relatér til teori og fagbegreber.",
                              "Vær åben for feedback og spørgsmål.",
                              "Reflektér over din proces og resultat."
                          ],
                          madkundskab: [
                              "Forbered en praktisk opgave eller præsentation.",
                              "Vis dine færdigheder og kreativitet.",
                              "Forklar dine valg og metoder.",
                              "Relatér til teori og fagbegreber.",
                              "Vær åben for feedback og spørgsmål.",
                              "Reflektér over din proces og resultat."
                          ],
                          håndværk: [
                              "Forbered en praktisk opgave eller præsentation.",
                              "Vis dine færdigheder og kreativitet.",
                              "Forklar dine valg og metoder.",
                              "Relatér til teori og fagbegreber.",
                              "Vær åben for feedback og spørgsmål.",
                              "Reflektér over din proces og resultat."
                          ]
                      }
                  },
                  gymnasium: {
                      dansk: {
                          analyserende: [
                              "Læs og forstå teksten grundigt - Hvad handler den om?",
                              "Identificér emne og genre.",
                              "Lav en analyse af indhold, sprog og virkemidler.",
                              "Sæt teksten i perspektiv (samfund, genre, forfatterskab).",
                              "Strukturér din artikel med en klar indledning, analyse og konklusion.",
                              "Brug fagbegreber og dokumentér dine pointer med citater."
                          ],
                          debatterende: [
                              "Forstå emnet og udform din holdning.",
                              "Find argumenter, der støtter din holdning.",
                              "Undersøg og inddrag modargumenter.",
                              "Strukturer artiklen med indledning, argumentation og afslutning.",
                              "Skriv levende og engagerende - gerne med retoriske virkemidler.",
                              "Underbyg dine pointer med fakta, eksempler eller citater."
                          ],
                          reflekterende: [
                              "Reflektér over det stillede emne og hvad det betyder for dig/samfundet.",
                              "Skriv åbent og undersøgende - ikke overbevisende.",
                              "Inddrag tekst(er), der relaterer til emnet.",
                              "Analyser relevante dele af teksten/teksterne.",
                              "Diskutér flere synsvinkler og perspektiver.",
                              "Afslut med at samle trådene - ikke nødvendigvis en konklusion."
                          ]
                      },
                      engelsk: {
                          non_fiktion: [
                              "Læs teksten og identificér afsender, modtager og formål.",
                              "Find hovedbudskabet og de vigtigste pointer.",
                              "Analyser sproglige og retoriske virkemidler.",
                              "Sæt teksten i kontekst (historisk, kulturelt, politisk).",
                              "Brug fagbegreber som ethos, logos, pathos.",
                              "Strukturer din opgave med indledning, analyse og vurdering."
                          ],
                          fiktion: [
                              "Læs teksten og identificér genre og tema.",
                              "Beskriv hovedpersoner og deres udvikling.",
                              "Analyser fortæller, synsvinkel og komposition.",
                              "Undersøg sproglige virkemidler og symbolik.",
                              "Perspektivér til samfund, historie eller anden litteratur.",
                              "Brug citater og analysér dem grundigt."
                          ],
                          film: [
                              "Se filmen og identificér tema og budskab.",
                              "Beskriv karakterer og konflikter.",
                              "Analyser filmiske virkemidler (lys, lyd, kameravinkler).",
                              "Kommentér struktur og fortælleform.",
                              "Perspektivér filmen til samfund eller lignende værker.",
                              "Brug filmbegreber og argumenter for dine analyser."
                          ]
                      },
                      matematik: {
                          generel: [
                              "Læs opgaven grundigt - hvad bliver der spurgt om?",
                              "Identificér, hvilke formler eller metoder du skal bruge.",
                              "Sæt de rigtige tal ind i formlerne.",
                              "Løs opgaven trin for trin - vis dine udregninger.",
                              "Tjek dit resultat - giver det mening?",
                              "Skriv en tydelig og overskuelig besvarelse."
                          ]
                      },
                      fysik: {
                          generel: [
                              "Læs opgaven og find ud af, hvilket fænomen den handler om.",
                              "Find relevante formler og størrelser.",
                              "Tegn evt. en figur over forsøget eller problemet.",
                              "Regn med korrekte enheder og dokumentér trin for trin.",
                              "Forklar med ord, hvad dine resultater betyder.",
                              "Perspektivér evt. til dagligdag eller teknologi."
                          ]
                      },
                      samfundsfag: {
                          generel: [
                              "Forstå spørgsmålet - handler det om analyse, diskussion eller vurdering?",
                              "Find relevante teorier og begreber.",
                              "Brug aktuelle eksempler og fakta.",
                              "Analyser med modeller (fx ideologi, økonomi, magt).",
                              "Vurder flere synspunkter.",
                              "Strukturer din besvarelse med tydelige afsnit og konklusion."
                          ]
                      },
                      biologi: {
                          generel: [
                              "Læs opgaven og identificér det biologiske emne.",
                              "Brug fagbegreber og forklar processer (fx fotosyntese, DNA).",
                              "Tegn modeller/figurer hvis nødvendigt.",
                              "Beskriv sammenhænge og årsag-virkning.",
                              "Brug eksempler fra forsøg, naturen eller kroppen.",
                              "Saml op i en konklusion, der besvarer spørgsmålet."
                          ]
                      },
                      sprog: {
                          generel: [
                              "Læs opgaven og forstå opgavetypen (fx tekstforståelse, skrivning).",
                              "Lav en brainstorm eller plan, hvis du selv skal skrive.",
                              "Brug korrekt grammatik og relevante gloser.",
                              "Hold fokus på struktur: intro, midte og slutning.",
                              "Korrekturlæs din tekst grundigt.",
                              "Brug evt. ordbog og husk kulturelle aspekter ved emnet."
                          ]
                      },
                      musik: {
                          generel: [
                              "Lyt opmærksomt til musikken - hvad hører du?",
                              "Identificér genre, instrumentation og form.",
                              "Beskriv tempo, rytme, dynamik og melodik.",
                              "Analyser brug af musikteori (akkorder, skalaer, harmonik).",
                              "Perspektivér til kultur eller periode.",
                              "Opsummer analysen i et klart sprog - brug musikteoretiske begreber."
                          ]
                      }
                  }
              };

              // Populate subject dropdown based on selected education
              function populateSubjects() {
                  const education = educationSelect.value;
                  const subjects = educationData[education].subjects;
                  
                  // Clear current options
                  subjectSelect.innerHTML = '';
                  
                  // Add new options
                  subjects.forEach(subject => {
                      const option = document.createElement('option');
                      option.value = subject.value;
                      option.textContent = subject.label;
                      subjectSelect.appendChild(option);
                  });
                  
                  // Trigger assignment type update
                  populateAssignmentTypes();
              }

              // Populate assignment type dropdown based on selected subject
              function populateAssignmentTypes() {
                  const education = educationSelect.value;
                  const subject = subjectSelect.value;
                  const assignmentTypes = educationData[education].assignmentTypes[subject] || [];
                  
                  // Clear current options
                  assignmentTypeSelect.innerHTML = '';
                  
                  // Add new options
                  assignmentTypes.forEach(type => {
                      const option = document.createElement('option');
                      option.value = type.value;
                      option.textContent = type.label;
                      assignmentTypeSelect.appendChild(option);
                  });
              }

              // Initialize dropdowns
              educationSelect.addEventListener('change', populateSubjects);
              subjectSelect.addEventListener('change', populateAssignmentTypes);
              
              // Initial population
              populateSubjects();

              // Tab switching
              inputTab.addEventListener('click', () => {
                  inputTab.classList.add('border-blue-500', 'bg-white');
                  inputTab.classList.remove('text-gray-500', 'bg-gray-100');
                  approachTab.classList.remove('border-blue-500', 'bg-white');
                  approachTab.classList.add('text-gray-500', 'bg-gray-100');
                  inputContent.classList.add('active');
                  approachContent.classList.remove('active');
              });

              approachTab.addEventListener('click', () => {
                  if (approachTab.disabled) return;
                  
                  approachTab.classList.add('border-blue-500', 'bg-white');
                  approachTab.classList.remove('text-gray-500', 'bg-gray-100');
                  inputTab.classList.remove('border-blue-500', 'bg-white');
                  inputTab.classList.add('text-gray-500', 'bg-gray-100');
                  approachContent.classList.add('active');
                  inputContent.classList.remove('active');
              });

              // Form submission
              taskForm.addEventListener('submit', (e) => {
                  e.preventDefault();
                  
                  const education = educationSelect.value;
                  const subject = subjectSelect.value;
                  const assignmentType = assignmentTypeSelect.value;
                  const task = taskInput.value.trim();
                  
                  // Get steps from our predefined data
                  const steps = approachSteps[education][subject][assignmentType] || [];
                  
                  // Display the approach
                  displayApproach(education, subject, assignmentType, task, steps);
                  
                  // Enable and switch to approach tab
                  approachTab.disabled = false;
                  approachTab.classList.remove('text-gray-500', 'bg-gray-100');
                  approachTab.click();
              });

              // Reset form
              resetBtn.addEventListener('click', () => {
                  taskInput.value = '';
                  educationSelect.value = 'folkeskole';
                  populateSubjects();
              });

              // Back button
              backBtn.addEventListener('click', () => {
                  inputTab.click();
              });

              // New task button
              newTaskBtn.addEventListener('click', () => {
                  taskInput.value = '';
                  inputTab.click();
                  approachTab.disabled = true;
                  approachTab.classList.add('text-gray-500', 'bg-gray-100');
              });

              // Print button
              printBtn.addEventListener('click', () => {
                  window.print();
              });

              // Download button
              downloadBtn.addEventListener('click', () => {
                  const education = educationSelect.value;
                  const subject = subjectSelect.value;
                  const assignmentType = assignmentTypeSelect.value;
                  const task = taskInput.value.trim();
                  
                  // Get the selected options' text labels
                  const educationLabel = education === 'folkeskole' ? 'Folkeskole' : 'Gymnasium';
                  const subjectLabel = educationData[education].subjects.find(s => s.value === subject)?.label || subject;
                  const assignmentTypeLabel = educationData[education].assignmentTypes[subject]?.find(t => t.value === assignmentType)?.label || assignmentType;
                  
                  // Get steps
                  const steps = approachSteps[education][subject][assignmentType] || [];
                  
                  // Create content
                  const content = `
# Fremgangsmåde: ${assignmentTypeLabel} i ${subjectLabel}
## Uddannelse: ${educationLabel}
${task ? `## Opgavebeskrivelse: ${task}\n` : ''}

${steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}
                              `.trim();
                  
                  // Download as text file
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'fremgangsmåde.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
              });

              // Display approach
              function displayApproach(education, subject, assignmentType, task, steps) {
                  // Get the selected options' text labels
                  const subjectLabel = educationData[education].subjects.find(s => s.value === subject)?.label || subject;
                  const assignmentTypeLabel = educationData[education].assignmentTypes[subject]?.find(t => t.value === assignmentType)?.label || assignmentType;
                  
                  // Set description
                  approachDescription.textContent = `${assignmentTypeLabel} i ${subjectLabel}${task ? ': ' + task : ''}`;
                  
                  // Clear and populate steps list
                  stepsList.innerHTML = '';
                  steps.forEach((step, index) => {
                      const li = document.createElement('li');
                      li.className = 'flex items-start gap-3';
                      
                      const checkbox = document.createElement('input');
                      checkbox.type = 'checkbox';
                      checkbox.id = `step-${index}`;
                      checkbox.className = 'mt-1 print-hide';
                      
                      const label = document.createElement('label');
                      label.htmlFor = `step-${index}`;
                      label.className = 'text-sm';
                      label.textContent = step;
                      
                      checkbox.addEventListener('change', () => {
                          if (checkbox.checked) {
                              label.classList.add('line-through');
                          } else {
                              label.classList.remove('line-through');
                          }
                      });
                      
                      const printCheckbox = document.createElement('span');
                      printCheckbox.className = 'hidden print:inline-block';
                      printCheckbox.textContent = '☐ ';
                      
                      li.appendChild(checkbox);
                      li.appendChild(printCheckbox);
                      li.appendChild(label);
                      stepsList.appendChild(
