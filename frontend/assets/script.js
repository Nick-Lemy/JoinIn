const events = [
  {
    title: "CodeXtreme Hackathon",
    location: "Kigali, African Leadership University",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "CodeXtreme Hackathon",
    location: "Kigali, African Leadership University",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "CodeXtreme Hackathon",
    location: "Kigali, African Leadership University",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach((card, index) => {
  if (events[index]) {
    card.querySelector(".event-title").textContent = events[index].title;
    card.querySelector(".event-location").textContent = events[index].location;
    card.querySelector(".event-description").textContent =
      events[index].description;
  }
});

const eventsContainer = document.getElementById("events");
const fetchAll = async () => {
  await fetch("http://localhost:3000/api/events")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let content = "";
      for (const elem of data) {
        const { title, location, image_link, date, max_attendees } = elem;
        content += `
<div class="bg-white border rounded-lg sm:flex shadow-md overflow-hidden transition-transform hover:scale-[1.005]">
  <div class="sm:w-1/4">
    <img src="${image_link}" alt="Event" class="w-full h-44 object-cover">
  </div>
  <div class="sm:w-3/4 flex flex-col justify-center p-4">
    <h3 class="text-lg font-bold mb-2">${title}</h3>
    <div class="flex items-center mb-2 text-sm">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span>${date}</span>
    </div>
    <div class="flex mb-3 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="">${location}</span>
    </div>
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-500 text-sm">${max_attendees} spots left</span>
      <a href="#" class=" bg-[#0F2449] text-white py-1 px-4 rounded-md hover:bg-[#193865] transition-colors text-sm">Join Event</a>
    </div>
  </div>
</div>`;
      }
      eventsContainer.innerHTML = content;
    });
};
fetchAll();
