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

    // This handles any error that occurs during fetch process
    }catch(error){
        // Log the error message to the console
        console.error('Error fetching car data', error)
    }
    
}

// Defining a function to display the car cards on the Webpage
const displayCars = (cars) => {
    const carContainer = document.getElementById('carContainer')

    carContainer.innerHTML = '';

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

// Fetch and display all car data when page loads
window.onload = fetchCarData