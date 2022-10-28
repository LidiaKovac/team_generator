// Variables that are needed everywhere: 
let waitingList = [] //names will be pushed here
let numberOfTeams = 0 //this will be the number of teams the user wants
let assignBtn = document.querySelector("button#assign")
let ul = document.querySelector(".waiting__list ul") //ul for the waiting list


//takes name from input and pushes it in array at line 2
//is used inside of the function eventHandleKey and on click of the assign button

const addName = () => { //takes the name from the input and adds it to the list
	let newMemberValue = document.querySelector("input#name")
	waitingList.push(newMemberValue.value)
	newMemberValue.value = "" //clears the input
	renderWaitingList(waitingList)
}

//this function takes as array as parameter and 
//renders all the names inside of the waiting list ul

const renderWaitingList = (list /* array of names */) => { //renders a list of strings (names) in an UL element
	ul.innerHTML = ""
	ul.classList.add("border--green")
	for (const name of list) {
		ul.innerHTML = `<li> ${name} </li>`
		//ALTERNATIVE WAY
		// let li = document.createElement("li")
		// li.innerText = name
		// ul.appendChild(li)
	}
}
//this function is called everyTime the amount of teams changes

const renderTeams = (teamAmount) => {

	// Nice, possible upgrade => make sure that the teams are ADDED, not always recreated, 
	// so you can keep the already assigned players

	if (teamAmount <= 0) {
		//if there are no teams yet, the assign button is disabled
		assignBtn.disabled = true

	} else assignBtn.disabled = false

	// Change the amount on the screen
	document.querySelector(".teams__amount").innerText = teamAmount

	let wrapper = document.querySelector("div.teams__wrap")
	wrapper.innerHTML = "" //makes the wrapper empty so the teams can be generated from scratch
	for (let i = 0; i < teamAmount; i++) {
		wrapper.innerHTML += `<div class="team__single" >
			<h3> Team ${i + 1}: </h3>
			<ul class="border--green" id="team_${i}"> </ul>
		</div>`
		// The UL is purposely left empty and will be filled later in the assignment phase
		// If you don't want to use innerHTML, here is an alternative version.
		// Keep in mind this is an outdated method. 

		// let newTeam = document.createElement("div")
		// newTeam.classList.add("team__single")
		// newTeam.id = "team_" + i.toString()
		// newTeam.innerHTML = `
		// <h3>Team ${i + 1}:</h3>
		// <ul></ul>
		//     `
		// wrapper.appendChild(newTeam)

	}
}

// INCREASE AND DECREATE THE AMOUNT OF TEAMS, 
//these functions are called on the + and - buttons
const increaseTeams = () => {
	numberOfTeams++
	renderTeams(numberOfTeams)
}

const decreaseTeams = () => {
	numberOfTeams--
	if (numberOfTeams < 0) {
		//if the used is trying to go with negative teams, always reset at 0
		numberOfTeams = 0

	}
	renderTeams(numberOfTeams)

}
//if user presses "enter" on the text input, call the addName function
const handleKeyEvent = (event) => {
	if (event.key === "Enter") {
		addName()
	}
}

//generates a pre-set of players
const preset = () => {
	waitingList = ["Lidia", "May", "Aron", "Tetiana", "Ubeyt", "Stefano M", "Stefano P", "Riccardo", "Diego", "Alessia"]
	renderWaitingList(waitingList)
}


//assign all students
const assign = () => { 
	//this is the same logic as distributing cards among players: 
	//each player gets one card, in order. Once all the players have received the first round of cards,
	//they all recieve a second round and so on, so forth...

	let currentTeam = 0 //this will make sure that names are assigned through all teams
	while (waitingList.length > 0) { //until there's people in the waitingList...
		if (currentTeam >= numberOfTeams) { //if we have assigned a student for each team...
			currentTeam = 0 //start from the first team again 
		}
		//this below happens in ALL cases
		let randomStudent = waitingList[Math.floor(Math.random() * waitingList.length)] //randomize a student
		waitingList = waitingList.filter((name) => name !== randomStudent) //remove it from the list
		let currentId = "#team_" + currentTeam.toString() //get the id of the team
		let teamUl = document.querySelector(currentId) //retrieve the element
		teamUl.classList.add("border--green")
		let li = document.createElement("li") //create an li
		li.innerText = randomStudent
		teamUl.appendChild(li)
		currentTeam += 1
	}
}

//resets the page
const reset = () => {
	numberOfTeams = 0
	waitingList = []
	renderTeams(0)
	renderWaitingList(waitingList)
	ul.classList.remove("border--green")
}

renderTeams(numberOfTeams)