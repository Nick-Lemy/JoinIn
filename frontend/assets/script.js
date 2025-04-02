document.getElementById("menu-toggle").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

const eventCards = document.querySelectorAll(".event-card");

const description = document.getElementById('description');

// Function to render Markdown
// function renderMarkdown() {
//   const markdownText = `
// # Hello World
// This is **bold text**!
// \`nick\`
//   `;
//   const html = marked.parse(markdownText);
//   description.innerHTML = html;
// }

// renderMarkdown();

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
        const { id, title, location, image_link, date, max_attendees } = elem;
        content += `
<div class="bg-white border rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.005]">
  <div class="">
    <img src="${image_link}" alt="Event" class="w-full h-52 object-cover">
  </div>
  <div class="flex flex-col justify-between p-4 gap-4">
    <h3 class="text-xl font-bold mb-2">${title}</h3>
    <div class="flex flex-col gap-2">
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
    </div>
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-500 text-sm">${max_attendees} spots left</span>
      <a href="/events/${id}" class=" bg-[#0F2449] text-white py-1 px-4 rounded-md hover:bg-[#193865] transition-colors text-sm">More info</a>
    </div>
  </div>
</div>`;
      }
      eventsContainer.innerHTML = content;
    });
};
fetchAll();
