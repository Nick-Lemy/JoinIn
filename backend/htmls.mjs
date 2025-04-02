export const returnEvent = (
  event_id,
  title,
  image_link,
  organizer,
  date,
  location,
  participants,
  description,
  user
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Details - JoinIn</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  </head>
  <body class="bg-gray-50">
  <style>
    body {
      font-family: 'Poppins', sans-serif
    }
  </style>
    <!-- Streamlined Header -->
  <header class="sticky z-40 -top-0.5">
    <nav class="bg-[#0F2449] border-blue-950 py-4 shadow-[0_20px_50px_rgba(10,_10,_10,_0.4)] border-b-1">
      <div class="justify-between flex flex-wrap max-w-7xl mx-auto items-center px-9 sm:px-0">
        <a href="/"><img src="/logo.png" alt="JoinIn logo" class="w-16 sm:w-32 h-auto" /></a>
        <button id="menu-toggle" class="sm:hidden block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul id="menu" class="hidden sm:flex w-full sm:w-auto flex-col sm:flex-row gap-4 sm:gap-10 text-white text-lg mt-4 sm:mt-0">
          <li><a href="/" class="block py-2 sm:py-0">Home</a></li>
          <li><a href="/events" class="block py-2 sm:py-0">Events</a></li>
          <li><a href="/account" class="block py-2 sm:py-0">Account</a></li>
        </ul>
        <a href="/account" class="profile-icon hidden sm:block">
          <img class="w-10" src="/codicon_account.png" alt="Profile" />
        </a>
      </div>
    </nav>
  </header>
    <!-- Event Details Container -->
<div class="max-w-7xl mx-auto py-8 items-center px-7 sm:px-8">
  <!-- Breadcrumb - Keeping original structure -->
  <nav class="flex mb-6" aria-label="Breadcrumb">
    <ol class="inline-flex items-center">
      <li class="inline-flex items-center">
        <a href="/" class="text-sm text-gray-600 hover:text-[#0F2449] transition-colors">Home</a>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
          <a href="/events" class="ml-1 text-sm text-gray-600 hover:text-[#0F2449] transition-colors">Events</a>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span class="ml-1 text-sm text-gray-500 font-medium">${title}</span>
        </div>
      </li>
    </ol>
  </nav>

  <!-- Event Card - Modern styling but keeping structure -->
  <div class="flex flex-col md:flex-row gap-7">
  <div class="flex-1 h-fit  bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Image Section with Overlay - Keeping original structure -->
    <div class="relative">
      <img src=${image_link} alt="Event" class="w-full h-64 sm:h-[500px] object-cover">
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
      </div>
      
      <!-- Event Details with Icons - Keeping original icons -->
      <div class="grid grid-cols-1 gap-4 mb-6">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-22 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p class="text-gray-700">${date}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p class="text-gray-700">${location}</p>
          </div>
        </div>
      </div>
      
      <!-- Join Button -->
      <a id='register-btn' class="md:px-10 w-full md:w-fit bg-[#0F2449] text-white py-3 font-medium rounded-lg hover:bg-[#193865] transition-colors flex items-center justify-center">
        <i class="fas fa-ticket-alt mr-2"></i> Register
      </a>
    </div>
  </div>
      <!-- Description Section -->
  <div class="flex-1 border-gray-200 bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="py-2 px-3">
      <div class="">
        ${description}
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

  // Registration popup elements
  const popupHTML = \`
    <div id="registrationPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="bg-[#0F2449] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 class="text-xl font-bold">Registration Successful!</h3>
          <button id="closePopup" class="text-white text-2xl">&times;</button>
        </div>
        <div class="p-6">

            <p class="text-center text-gray-800"><span class="font-bold text-xl">${title}</span> </p>
          <div class="flex flex-col items-center">
            <img id="qrCodeImage" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://joinin.nick-lemy.tech/registration/JoinIn-${event_id}-${314 * Number(user.id)}" 
                 alt="Event QR Code" class="border border-gray-200 p-2 mb-4">
            <p class="text-gray-600 text-sm">This QR code will be scan at the event entrance</p>
          </div>

        </div>
        <div class="bg-gray-50 px-6 py-3 rounded-b-lg flex justify-center">
          <a href="/account" class="bg-[#0F2449] text-white px-4 py-2 rounded hover:bg-[#193865] transition-colors">
           View in History
          </a>
        </div>
      </div>
    </div>
  \`;

  // Add popup to body
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  const registerButton = document.getElementById('register-btn');
  registerButton.addEventListener('click', () => {
    fetch('https://joinin.nick-lemy.tech/api/events/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_id: ${event_id},
        volunteer_role_id: 1,
        qr_code: 'JoinIn-${event_id}-${314 * Number(user.id)}'
      })
    }).then(response => {
        // Show popup on successful registration
        const popup = document.getElementById('registrationPopup');
        popup.classList.remove('hidden');
    }).catch(error => {
      console.error('Error while registering:', error);
    });
  });

  // Close popup functionality
  document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('registrationPopup').classList.add('hidden');
  });

  // Close when clicking outside
  document.getElementById('registrationPopup').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.add('hidden');
    }
  });

  // Download QR code functionality
  document.getElementById('downloadQR').addEventListener('click', function() {
    const qrImage = document.getElementById('qrCodeImage');
    const link = document.createElement('a');
    link.href = qrImage.src;
    link.download = 'event-qr-code.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
</script>
  </body>
  </html>
    `;
};


export const registration_html = (
  event_name,
  registration_date,
  attendee_name,
  attendee_email,
  checked_in,
  qr,
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendee Check-In - JoinIn</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  </head>
  <body class="bg-gray-50">
    <style>
    body {
      font-family: 'Poppins', sans-serif
    }
  </style>
    <!-- Header -->
  <header class="sticky z-40 -top-0.5">
    <nav class="bg-[#0F2449] border-blue-950 py-4 shadow-[0_20px_50px_rgba(10,_10,_10,_0.4)] border-b-1">
      <div class="justify-between flex flex-wrap max-w-7xl mx-auto items-center px-9 sm:px-0">
        <a href="/"><img src="/logo.png" alt="JoinIn logo" class="w-16 sm:w-32 h-auto" /></a>
        <button id="menu-toggle" class="sm:hidden block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul id="menu" class="hidden sm:flex w-full sm:w-auto flex-col sm:flex-row gap-4 sm:gap-10 text-white text-lg mt-4 sm:mt-0">
          <li><a href="/" class="block py-2 sm:py-0">Home</a></li>
          <li><a href="/events" class="block py-2 sm:py-0">Events</a></li>
          <li><a href="/account" class="block py-2 sm:py-0">Account</a></li>
        </ul>
        <a href="/account" class="profile-icon hidden sm:block">
          <img class="w-10" src="/codicon_account.png" alt="Profile" />
        </a>
      </div>
    </nav>
  </header>

    <!-- Admin Check-In Container -->
    <div class="max-w-7xl mx-auto py-8 items-center px-7 sm:px-8">
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center">
          <li class="inline-flex items-center">
            <a href="/admin" class="text-sm text-gray-600 hover:text-[#0F2449]">Admin</a>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <a href="/admin/events" class="ml-1 text-sm text-gray-600 hover:text-[#0F2449]">Event Management</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-sm text-gray-500 font-medium">Check-In</span>
            </div>
          </li>
        </ol>
      </nav>
  
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="bg-[#0F2449] px-6 py-4">
          <h1 class="text-xl font-bold text-white flex items-center">
            <i class="fas fa-user-check mr-2"></i> Attendee Check-In
          </h1>
        </div>
        
        <div class="px-6 py-6">
          <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 class="text-lg font-semibold text-[#0F2449] mb-4">Event Information</h2>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-500 text-sm mb-1">Event Name</p>
                  <p class="font-medium text-gray-800 mb-3" id="eventName">${event_name}</p>
                  <p class="text-gray-500 text-sm mb-1">Registration Date</p>
                  <p class="font-medium text-gray-800" id="registeredAt">${formatReadableDate(registration_date)}</p>
                </div>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-[#0F2449] mb-4">Attendee Information</h2>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-500 text-sm mb-1">Name</p>
                  <p class="font-medium text-gray-800 mb-3" id="userName">${attendee_name}</p>
                  <p class="text-gray-500 text-sm mb-1">Email</p>
                  <p class="font-medium text-gray-800" id="userEmail">${attendee_email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div id="statusCard" class="border border-gray-200 rounded-lg p-4 mb-6 flex items-center">
            <div id="statusIcon" class="mr-4 text-2xl">
              <i class="fas fa-clock text-yellow-500"></i>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800" id="statusTitle">Not Checked In</h3>
              <p class="text-gray-500 text-sm" id="statusMessage">This attendee has not been checked in yet</p>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button id="checkInButton" class="bg-[#0F2449] text-white px-8 py-4 rounded-lg hover:bg-[#193865] transition-colors flex items-center justify-center text-lg font-medium">
              <i class="fas fa-check-circle mr-2"></i> Check In Attendee
            </button>
            <button id="alreadyCheckedInButton" class="hidden bg-gray-400 text-white px-8 py-4 rounded-lg flex items-center justify-center text-lg font-medium cursor-not-allowed">
              <i class="fas fa-check-circle mr-2"></i> Already Checked In
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="confirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h3 class="text-xl font-bold">Check-In Successful!</h3>
          <button id="closeModal" class="text-white text-2xl">×</button>
        </div>
        <div class="p-6 text-center">
          <div class="mb-4 text-5xl text-green-500">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">${attendee_name}</h2>
          <p class="text-gray-600 mb-6">has been successfully checked in</p>
          <div class="flex justify-center">
            <button id="doneButton" class="bg-[#0F2449] text-white px-6 py-3 rounded-lg hover:bg-[#193865] transition-colors">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>

    <script>
      document
        .getElementById("menu-toggle")
        .addEventListener("click", function() {
          const menu = document.getElementById("menu");
          menu.classList.toggle("hidden");
          menu.classList.toggle("flex");
        });

      // DOM elements
      const statusCard = document.getElementById('statusCard');
      const statusIcon = document.getElementById('statusIcon');
      const statusTitle = document.getElementById('statusTitle');
      const statusMessage = document.getElementById('statusMessage');
      const checkInButton = document.getElementById('checkInButton');
      const alreadyCheckedInButton = document.getElementById('alreadyCheckedInButton');

      // Function to set checked-in state
      function setCheckedInState() {
        statusCard.classList.remove('border-gray-200');
        statusCard.classList.add('border-green-500', 'bg-green-50');
        statusIcon.innerHTML = '<i class="fas fa-check-circle text-green-500"></i>';
        statusTitle.textContent = 'Checked In';
        statusMessage.textContent = 'This attendee has been successfully checked in';
        checkInButton.classList.add('hidden');
        alreadyCheckedInButton.classList.remove('hidden');
      }

      // Set initial state based on checked_in parameter
      // console.log(${checked_in})
      if (${checked_in} === true) {
        setCheckedInState();
      }

      // Check-in button functionality
      document.getElementById('checkInButton').addEventListener('click', async function() {
        try {
          const attendeeData = {
            name: document.getElementById('userName').textContent,
            email: document.getElementById('userEmail').textContent,
            event: document.getElementById('eventName').textContent,
            qr: '${qr}',
            timestamp: new Date().toISOString()
          };

          const response = await fetch('https://joinin.nick-lemy.tech/registration/${qr}', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(attendeeData)
          });

          const data = await response.json();

          if (data.message === "Check-in successful") {
            // console.log('Check-in successful:', data);
            document.getElementById('confirmationModal').classList.remove('hidden');
            setCheckedInState();
          } else {
            console.error('Check-in failed:', data);
            alert('Check-in failed: ' + (data.message || 'Unknown error'));
          }
        } catch (error) {
          console.error('Error during check-in:', error);
          alert('An error occurred while checking in. Please try again.');
        }
      });

      // Modal controls
      document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('confirmationModal').classList.add('hidden');
      });

      document.getElementById('doneButton').addEventListener('click', function() {
        document.getElementById('confirmationModal').classList.add('hidden');
      });

      document.getElementById('confirmationModal').addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.add('hidden');
        }
      });
    </script>
  </body>
  </html>
  `;
};

// March 28, 2025 at 14:30
function formatReadableDate(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  };

  return date.toLocaleString("en-US", options);
}

export const feedback = (
  event_name,
  qr_code,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Feedback | JoinIn</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-poppins">
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Event Feedback</h1>
        <p class="text-2xl font-bold text-gray-800">${event_name}</p>
        <p class="text-gray-600">Share your experience with us</p>
      </div>
      <form id="feedbackForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div class="flex justify-center space-x-2" id="ratingStars">
            <!-- Stars will be added by JavaScript -->
          </div>
          <input type="hidden" id="ratingValue" name="rating" required>
        </div>
        
        <div>
          <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea id="comments" name="comments" rows="4" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                   placeholder="Tell us about your experience..."></textarea>
        </div>
        
        <div class="pt-2">
          <button type="submit" 
                  class="w-full bg-[#0F2449] text-white py-2 px-4 rounded-md hover:bg-[#193865] transition-colors">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Create rating stars
      const ratingContainer = document.getElementById('ratingStars');
      const ratingInput = document.getElementById('ratingValue');
      let selectedRating = 0;

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'text-3xl cursor-pointer text-gray-300';
        star.innerHTML = '★';
        star.dataset.value = i;
        
        star.addEventListener('click', function() {
          selectedRating = parseInt(this.dataset.value);
          ratingInput.value = selectedRating;
          
          // Update star colors
          const stars = ratingContainer.querySelectorAll('span');
          stars.forEach((s, index) => {
            s.className = \`text-3xl cursor-pointer \${index < selectedRating ? 'text-yellow-400' : 'text-gray-300'}\`;
          });
        });
        
        star.addEventListener('mouseover', function() {
          const hoverRating = parseInt(this.dataset.value);
          const stars = ratingContainer.querySelectorAll('span');
          stars.forEach((s, index) => {
            s.className = \`text-3xl cursor-pointer \${index < hoverRating ? 'text-yellow-300' : 'text-gray-300'}\`;
          });
        });
        
        star.addEventListener('mouseout', function() {
          const stars = ratingContainer.querySelectorAll('span');
          stars.forEach((s, index) => {
            s.className = \`text-3xl cursor-pointer \${index < selectedRating ? 'text-yellow-400' : 'text-gray-300'}\`;
          });
        });
        
        ratingContainer.appendChild(star);
      }

      // Handle form submission
      const feedbackForm = document.getElementById('feedbackForm');
      feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const rating = ratingInput.value;
        const comments = document.getElementById('comments').value;
        
        if (!rating) {
          alert('Please select a rating');
          return;
        }

        try {
          const response = await fetch(\`https://joinin.nick-lemy.tech/feedback/${event_name}\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rating: rating,
              comment: comments
            })
          });

          if (response.ok) {
            const result = await response.json();
            alert('Thank you for your feedback!');
            window.location.href = '/'; // Redirect to home after submission
          } else {
            throw new Error('Failed to submit feedback');
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
          alert('There was an error submitting your feedback. Please try again.');
        }
      });
    });
  </script>
</body>
</html>
`