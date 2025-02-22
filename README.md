# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# AI-Powered Lesson Planner

An intelligent lesson planning tool that leverages AI to generate customized lesson plans. Designed for educators to easily create, edit, and download lesson plans in PDF format. 

## Features
- AI-powered lesson generation using Google Gemini API
- User authentication (login and registration) with bcrypt password hashing
- Responsive design with dark and light theme support
- Editable lesson details including topic, grade level, objectives, and more
- PDF download option for generated lesson plans

## Demo Login
Use the following credentials to explore the app:
Email: demouser@demo.com
Password: demouser

## Technologies Used
- **React.js** with ShadCN and TailwindCSS for UI components and styling
- **Google Gemini API** for AI-generated lesson content
- **Local Storage** and **Session Management** for user authentication
- **bcryptjs** for secure password hashing

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/lesson-planner.git
    cd lesson-planner
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm start
    ```

## Usage

- Visit the site and register or log in using the demo credentials.
- Enter lesson details such as topic, grade level, and objectives.
- Generate a lesson plan using the AI-powered engine.
- Edit the generated content as needed.
- Download the lesson plan as a PDF for offline use.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance the project.
