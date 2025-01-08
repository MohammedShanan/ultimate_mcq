# UltimateMCQ

## Introduction

**UltimateMCQ** is an interactive quiz management platform designed for creating, editing, and taking quizzes. Whether you're a teacher, student, or trivia enthusiast, ultimateMCQ simplifies quiz creation while offering a dynamic and engaging user experience. With features like customizable questions, instant feedback, and score tracking, ultimateMCQ is perfect for learning, teaching, or just having fun!

## Technologies Used

### Front-End Technologies
- **HTML**: For structuring web content.
- **CSS**: For layout and design styling.
- **JavaScript**: For interactivity and dynamic content.
- **Vue**: For building the front-end user interface..
- **Tailwind**: For responsive design and UI components.

### Back-End Technologies
- **PHP ([Laravel 11.x](https://laravel.com/docs/11.x))**: For server-side logic and API development.
- **MySQL**: For database management.

## Installation

### Prerequisites
Ensure the following software is installed on your system:
- **[PHP 8.2+](https://www.php.net/downloads.php)**: To run the backend logic.
- **[Vue.js](https://vuejs.org/)**: For building the front-end user interface.
- **[npm](https://nodejs.org/en/download)**: For managing front-end dependencies.
- **[MySQL](https://dev.mysql.com/downloads/mysql/)**: To store data.
- **[Composer](https://getcomposer.org/download/)**: For managing PHP packages.

### Steps to Install
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MohammedShanan/ultimate_mcq

   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd ultimate_mcq
   ```

## Frontend
1. **Navigate to the Project Directory**:
   ```bash
   cd Frontend
   ```
2. **Install JavaScript Dependencies**:
   ```bash
   npm install
   ```
3. **Build Front-End Assets**:
   ```bash
   npm run dev
   ```

## Backend
1. **Navigate to the Project Directory**:
   ```bash
   cd Backend
   ```

2. **Install PHP Dependencies**:
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up the Environment File**:
   ```bash
   cp .env.example .env
   ```

5. **Configure the Database**:  
   Open the `.env` file and configure your database details:
   ```bash
   DB_DATABASE=your_database_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   ```

6. **Generate Application Key**:
   ```bash
   php artisan key:generate
   ```

7. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

8. **Serve the Application**:
    ```bash
    php artisan serve
    ```

## Usage

After installation, follow these steps to start using UltimateMCQ:
.

## How to Contribute

Contributions are welcome! To contribute to **UltimateMCQ**, follow these steps:

1. **Fork the Repository**:  
   Click the "Fork" button on the repository's GitHub page to copy the project to your GitHub account.

2. **Clone the Forked Repository**:
   ```bash
   git clone https://github.com/MohammedShanan/ultimate_mcq
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Your Changes**:  
   Improve code, fix bugs, or add new features.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of changes"
   ```

6. **Push to Your Branch**:
   ```bash
   git push origin your-branch-name
   ```

7. **Create a Pull Request**:  
   Go to the original repository, navigate to the "Pull Requests" tab, and click "New Pull Request."

8. **Review and Merge**:  
   After approval, your contributions will be merged into the project.
