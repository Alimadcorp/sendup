# Personal Sendup Schedule Generator
MadSchedule v1.49.1

This project is a responsive website that allows students to generate their personalized exam schedules by entering their roll numbers. The site dynamically displays the schedule in a formatted table and is optimized for both desktop and mobile use.

## Features

- **Roll Number Input**: Students can enter their roll numbers to generate a custom exam schedule.
- **Dynamic Table**: Exam details (subjects, time, room, etc.) are displayed in a visually appealing, responsive table.
- **Mobile Optimization**: The website is fully responsive and works seamlessly on mobile devices.
- **Custom Animations**: Rows fade in and expand dynamically when new data is added.
- **Social Media Integration**: Open Graph metadata ensures a rich preview when sharing links on platforms like WhatsApp, Discord, and others.
- **Back Button Handling**: Special event handling for Android back button presses (if accessed via browser).

## Technologies Used

- **HTML**: For the structure of the website.
- **CSS**: For styling and animations.
- **JavaScript**: To dynamically generate schedules, handle events, and create animations.
- **Python**: Used `pdfplumber` library to extract data from the official PDF.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/student-exam-schedule-generator.git

2. Open the project folder:

cd student-exam-schedule-generator


3. Open the index.html file in your browser.



Project Structure

student-exam-schedule-generator/  
├── index.html          # Main HTML file  
├── style.css           # CSS styles  
├── fetch.js            # Fetch exam data (if applicable)  
├── script.js           # Handles input, event listeners, and table generation  
├── generate.js         # Generates and formats schedule data  
├── icon.png            # Favicon for the site  
└── README.md           # Project documentation

Roadmap

Add support for saving schedules locally or exporting as PDF.

Enable integration with external APIs for real-time exam updates.

Implement a login system for personalized experiences.


Contributing

1. Fork the repository.


2. Create a new branch:

git checkout -b feature-name


3. Commit your changes:

git commit -m "Added feature-name"


4. Push to the branch:

git push origin feature-name


5. Create a pull request.



License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Created by Muhammad Ali.
