const events = [
    {
        title: "CodeXtreme Hackathon",
        location: "Kigali, African Leadership University",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title: "CodeXtreme Hackathon",
        location: "Kigali, African Leadership University",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        title: "CodeXtreme Hackathon",
        location: "Kigali, African Leadership University",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
];

const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach((card, index) => {
    if (events[index]) {
        card.querySelector(".event-title").textContent = events[index].title;
        card.querySelector(".event-location").textContent = events[index].location;
        card.querySelector(".event-description").textContent = events[index].description;
    }
});
