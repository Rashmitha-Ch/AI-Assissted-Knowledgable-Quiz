# AI-Assisted Knowledge Quiz

An interactive quiz app that uses AI (Gemini 2.5 Flash) to generate multiple-choice questions dynamically. Users can select a topic, answer questions one by one, and receive custom feedback based on their score. Built with **React**, **Tailwind CSS**, and **Gemini API**.

---

## Table of Contents

1. [Demo](#demo)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)   
5. [AI Integration](#ai-integration)  
6. [Screens](#screens)  
7. [Known Issues / Improvements](#known-issues--improvements)  
8. [Bonus Work](#bonus-work)  

---

## Demo

- **Deployed Link**: http://ai-assissted-knowledgable-quiz.vercel.app

- **Web**: Run locally using instructions below.  
npm install
npm install @google/generative-ai
npm run dev

- **Mobile**: Run using IP address link given in console

## Features

- Landing page to select topic or enter a topic  
- AI-generated 5-question MCQs per topic  
- Interactive quiz with next/previous navigation   
- Progress bar to track quiz completion  
- Custom AI feedback based on quiz score  
- Light/Dark mode support with Tailwind CSS design system  
- Smooth slide animations for question transitions  

---

## Tech Stack

- **Frontend**: React + Tailwind CSS  
- **AI**: Gemini 2.5 Flash model via `@google/generative-ai`  
- **State Management**: React Context API  
- **Styling**: Tailwind + Custom CSS variables & gradients  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Rashmitha-Ch/AI-Assissted-Knowledgable-Quiz.git
```
2. Create .env file and paste the following code : 

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```
- Generate your API Key from Google AI Studio

## AI Integration ##

- Model : Gemini 2.5 Flash
- Function: Generate MCQs dynamically with correct answers in JSON format
- Error Handling: Retry if JSON malformed
- Reusability: Question component used for rendering each question

---
## Architecture Explanation ##

- **Pages** :-
Index.tsx
QuizPage.tsx
ScoreCard.tsx

- **Services** :-
aiServices.ts for API Calls

## Prompts ##
 - Usage of ChatGPT for tailwindcss version and layout issues.

## Screens ##

- Screen 1: Landing Page - Topic Selection and Search Bar to enter topic
- Screen 2: Loading – Display loader while AI generates questions
- Screen 3: Quiz – Display questions one by one with next/previous navigation and progress bar
- Screen 4: Result – AI generates custom feedback based on score 

---

## Known Issues / Improvements ##

- Add Authentication
- Add question levels
- Add more questions and set timer
- Response is a little slow

---

## Bonus Work ##

- Smooth slide-down animations for question transitions
- Custom gradient design per topic
- Glassmorphism effects for cards and popovers
- Tailwind CSS design system with HSL-based color variables
- Light to Dark Mode button