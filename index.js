// Store all cars Globally for filtering
let allCars = []

// Defining an Asynchronous Function to fecth car data from a json file
const fetchCarData = async () => {
    try{
        // fetching the json file containing car data
    const response = await fetch('cars.json')
        // Parse the JSON response into a JavaScript Object
    const data = await response.json()
    // Storing the array of cars in a global variable 'allCars' for future filtering
    allCars = data.cars

    // Initially display all cars when the page loads
    displayCars(allCars)

    generateFilterButtons(allCars)

    // This handles any error that occurs during fetch process
    }catch(error){
        // Log the error message to the console
        console.error('Error fetch car data', error)
    }
    
}

// Defining a function to display the car cards on the Webpage
const displayCars = (cars) => {
    const carContainer = document.getElementById('carContainer')

    carContainer.innerHTML = '';

    if(cars.length === 0){
        carContainer.innerHTML = "<p>No data found</p>"
        return;
    }

    // Loops through each car object in the cars array
    cars.forEach((car) => {
        // Creating a new div element for each car card
        const carCard = document.createElement('div')
        // adding a css class name for styling purpose
        carCard.classList.add('card')

        // Adding HTML content to the car carCard, including an image, name and model of the car
        carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name} ${car.model}" width="300">
        <h2>${car.name}</h2>
        <p>Model: ${car.model}</p>
        `
        // Appending the car Card to the car container on the webpage
        carContainer.appendChild(carCard)
    })
}

// Define a function to Dynamically create filter buttons
const generateFilterButtons = (cars) => {
    // Get the HTML element where the buttons will be placed
    const filterButtonsContainer = document.getElementById('filterButtons')

    // Use Map() to create an array of all car names
    const uniqueNames = [...new Set(cars.map((car) => car.name))]; //Set is used to remove duplicates and filter buttons will be placed

    // Loop through the array of unique car names
    uniqueNames.forEach((name) => {
        // Create a new button element for each uniqueNames
        const button = document.createElement('button')
        // Set the text of the button to car name
        button.textContent = name

        button.addEventListener('click', () => filterCarsByName(name));

        filterButtonsContainer.appendChild(button);
    })
}

const filterCarsByName = (name) => {
    const filteredCars = allCars.filter((car) => car.name === name);

    displayCars(filteredCars)
}

const searchCars = (query) => {
    const searchedCars = allCars.filter((car) =>
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase())
    )
    displayCars(searchedCars)
}
document.getElementById('searchInput').addEventListener('input', (event) => {
    searchCars(event.target.value) //Filter cars on input change
});

// Fetch and display all car data when page loads
window.onload = fetchCarData