# JoinIn

Demo video: [click here](https://youtu.be/z7VisfvuD6g?si=_YHACnzJPkYq8J9A)

Website link: [click here to "JoinIn"](https://joinin.nick-lemy.tech)

## Table of Content

### [1. Description](https://github.com/Nick-Lemy/JoinIn?tab=readme-ov-file#description)

### [2. User Manual](#description)

### [1. Conclusion](https://github.com/Nick-Lemy/JoinIn?tab=readme-ov-file#description)

## Description

JoinIn is a user-friendly web application designed to streamline event management for the African Leadership Community. It addresses the challenge of students missing important event information due to low engagement with email notifications and the inefficiencies of traditional event coordination methods.

## User Manual

### 1.System Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari, Brave, ..)
- Internet connection

### 2. Accessing JoinIn

- Open your web browser.
- Go to the JoinIn website [here](https://joinin.nick-lemy.tech).

- Log in or register to access event features.

### 3. Features

- User Registration

  - Go to the Sign Up Page.
  - Fill in your details (name, email, password, ...).
  - Click Register.

- Logging In

  - Go to the Login Page.
  - Enter your email and password.
  - Click Login.
  - You will be redirected to the Home page.

- Browsing Events

  - Once logged in, go to the Events page.
  - Browse the list of events.
  - Click on More Info on an event to see details.

- Event Registration

  - Click Register.
  - A QR code will be generated for your event entry.
  - You can see your QR code on the History in the Account page.

- Checking In to an Event

  - On the event day, open your QR code on the History.
  - Show your QR code at the check-in desk.
  - The event staff will scan your QR code to verify your registration.

- Providing Feedback
  - After attending an event, navigate to Feedback of the event in the History section on the Account Page.
  - Fill in the feedback form.
  - Click Submit.

### 4. Support

For any issues, contact our support team via <n.kayiranga@alustudent.com> or the Contact section on the website's Home page.

## Runing the website on local

### 1. Cloning the Project

```bash
git clone https://github.com/Nick-Lemy/JoinIn
cd JoinIn
```

### 2. Add Evironment variables (.env)

```bash
# Go into the backend directory
cd backend/

# Creating a .env file
touch .env

# Adding env variables to the file
nano .env # or by using VScode

# add this in the file (with your information of course)
PORT=<port_of_your_choice>
SQL_DRIVE=<add_sql_drive_link_of_your_database>
REDIS_USERNAME=<add_your_redis_username>
REDIS_PASSWORD=<redis_password>
REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
```

### 3. Run the Program

Finally these are the command to run the program

```bash
# Make sure you are in the backend directory

# Install dependencies
npm install

# Run the program
npm run start:dev
```

### 4. Open the Website

```bash
# You’ll be given a link like this
http://localhost:${PORT}
# Click on it to start using JoinIn!
```

## Conclusion

JoinIn offers an innovative solution to enhance event coordination and engagement within the African Leadership Community. By leveraging a simple, QR-code-based system and a streamlined interface, it empowers users to stay informed and participate effortlessly in community events. Whether you're an organizer or an attendee, JoinIn simplifies the process, making event management more efficient and accessible. With its open-source availability and straightforward setup, it also invites collaboration and customization for broader impact.
