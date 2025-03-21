import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { authVerification } from "./middlewares/authMiddleware.mjs";
import { PORT } from "./config.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRouters.mjs";
import { __dirname } from "./config.mjs";
import { sessionHandler } from "./config.mjs";
import { showAllEvents } from "./models/eventModel.mjs";

const app = express();

app.use(sessionHandler);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/auth/", userRoutes);
app.use("/api/events/", eventRoutes);
app.use(express.static(__dirname + "assets/"));
app.set("views", __dirname);

app.get("/register", (req, res) => {
  return res.sendFile(path.join(__dirname + "register.html"));
});
app.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname + "login.html"));
});

app.use(authVerification);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "home.html"));
});
app.get("/events", (req, res) => {
  return res.sendFile(path.join(__dirname + "events.html"));
});

function returnEvent(
  title,
  image_link,
  organizer,
  date,
  location,
  participants,
  description
) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Details - JoinIn</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
  <!-- Streamlined Header -->
  <header class="sticky z-40 -top-0.5">
    <nav class="bg-[#0F2449] border-blue-950 py-4 border-b-1">
      <div class="justify-between flex flex-wrap max-w-7xl mx-auto items-center px-9 sm:px-0">
        <a href="/"><img src="/logo.png" alt="JoinIn logo" class="w-16 sm:w-32 h-auto" /></a>
        <!-- Mobile menu button -->
        <button id="menu-toggle" class="sm:hidden block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Menu -->
        <ul id="menu" class="hidden sm:flex w-full sm:w-auto flex-col sm:flex-row gap-4 sm:gap-10 text-white text-lg mt-4 sm:mt-0">
          <li><a href="/" class="block py-2 sm:py-0">Home</a></li>
          <li><a href="/events" class="block py-2 sm:py-0">Events</a></li>
          <li><a href="/contact-us" class="block py-2 sm:py-0">Contact Us</a></li>
          <li><a href="/about-us" class="block py-2 sm:py-0">About Us</a></li>
        </ul>
        <div class="profile-icon hidden sm:block">
          <img class="w-10" src="/codicon_account.png" alt="Profile" />
        </div>
      </div>
    </nav>
  </header>
  <!-- Event Details Container -->
  <div class="max-w-7xl mx-auto py-8 items-center px-7 sm:px-8">
    <!-- Simplified Breadcrumb -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="inline-flex items-center">
        <li class="inline-flex items-center">
          <a href="/" class="text-sm text-gray-600 hover:text-[#0F2449]">Home</a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/events" class="ml-1 text-sm text-gray-600 hover:text-[#0F2449]">Events</a>
          </div>
        </li>
        <li>
          <div class="flexr">
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 text-sm text-gray-500 font-medium">${title}</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Enhanced Event Card -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Image Section with Overlay -->
      <div class="relative">
        <img src=${image_link} alt="Event" class="w-full h-64 sm:h-72 object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-4 sm:p-6">
          <span class="bg-[#0F2449] text-white px-3 py-1 rounded-full text-sm font-medium">
            <i class="fas fa-users mr-2"></i>${participants} spots left
          </span>
        </div>
      </div>
      
      <div class="px-3 py-6">
        <!-- Event Title and Organizer -->
        <div class="mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">${title}</h1>
          <p class="text-sm text-gray-500 mt-2">Organized by <a href="#" class="text-[#0F2449] font-medium">${organizer}</a></p>
        </div>
        
        <!-- Event Details with Icons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="">${date}</p>
            </div>
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p class="">${location}</p>
            </div>
          </div>
        </div>
        
        <!-- Join Button -->
        <a href="#" class="w-full bg-[#0F2449] text-white py-3 font-medium rounded-lg hover:bg-[#193865] transition-colors flex items-center justify-center">
          <i class="fas fa-ticket-alt mr-2"></i> Register
        </a>
      </div>
      
      <!-- Description Section -->
      <div class="border-t border-gray-200">
        <div class="py-6 px-3">
          <h2 class="text-xl font-bold mb-4">Event Description</h2>
          <div class="prose max-w-none">
            <p>${description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});
  </script>
</body>
</html>
  `;
}

app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const allEvents = await showAllEvents();

  const event = allEvents.find(event=>event.id === Number(id))
  const { title, location, image_link, date, max_attendees, description } =
    event;
  return res.send(
    returnEvent(title, image_link, 'undefined', date, location, max_attendees, description)
  );
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
