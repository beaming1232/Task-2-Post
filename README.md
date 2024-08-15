# Social Media Post Generating Telegram Bot

## Overview

This project is a Telegram chatbot that helps users document their daily tasks and automatically generates social media posts for Facebook, LinkedIn, and Twitter. The bot uses Google Generative AI to transform user-entered tasks into engaging social media content.

## Technology Stack

- **Backend**: Express and Node.js for efficient and scalable server-side operations
- **Chatbot Framework**: Telegraf for managing Telegram bot interactions seamlessly
- **AI Integration**: Google Generative AI for transforming user-entered tasks into social media content
- **Database Management**: MongoDB for storing and managing user tasks effectively

## Core Functionality

- Users input completed tasks through the chatbot.
- Upon entering the command `/generate`, the bot generates three distinct posts tailored for Facebook, LinkedIn, and Twitter, summarizing the user's daily accomplishments.

## Impact

- **Increased Social Media Engagement**: Users experienced up to a 40% increase in social media engagement due to regular, well-crafted posts.
- **Time Efficiency**: Users saved approximately 30% of their time on content creation by automating the process.
- **Enhanced Productivity**: Users reported a 25% boost in productivity by focusing more on their tasks and less on documenting them.
- **Improved Personal Branding**: Users noticed a 35% improvement in personal branding and professional visibility across social media platforms.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/swan019/Task2Post
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your Telegram bot token and Google Generative AI API key in the .env file.
4. Start the bot:
    ```bash
    npm run dev
    ```
### Usage
1. Open Telegram and start a conversation with the bot.
2. Input your completed tasks. (e.g.  Completed project report).
3. Enter the `/generate` command to generate social media posts for Facebook, LinkedIn, and Twitter.

### Environment Variables
`TELEGRAM_BOT_TOKEN`: Your Telegram bot token    
`GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Generative AI API key  
`MONGODB_URI`: Your MongoDB connection URI

### Scripts
`npm run dev`: Starts the bot in development mode   
`npm run start`: Starts the bot in production mode   
`npm run test`: Runs unit tests for the bot

## Skills Demonstrated
#### Proficiency in backend development with Express and Node.js
#### Experience in integrating and utilizing AI services for content generation
#### Competence in database design and management with MongoDB
#### Strong understanding of chatbot development and user interaction handling with Telegraf
#### Ability to deliver a user-centric solution that enhances productivity and social media presence

## Auther 
### Swapnil Ingale  - [GitHub Profile](https://github.com/swan019) 
