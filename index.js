let waitingList = [] //names will be pushed here
let currentTeam = 0 //this will make sure that names are assigned evenly
let numberOfTeams //this will be the number of teams the user wants
let colors = ["#ECCBD9", "#e1eff6", "#97d2fb", "#83bcff", "#80ffe8"] //colors to randomly pick from


let ul = document.querySelector("ul#waitingList") //ul for the waiting list


const addName = () => { //takes the name from the input and adds it to the list
	let input = document.querySelector("textarea#name").value.replaceAll("\n", "").split(",")
	waitingList.push(...input)
	input.value = "" //clears the input
	renderWaitingList(waitingList)
}

const renderWaitingList = (list /* array of names */) => { //renders a list of strings (names) in an UL element
	ul.innerHTML = ""
	for (const name of list) {
		let li = document.createElement("li")
		li.innerText = name
		ul.appendChild(li)
	}
}
const createTeams = () => { //creates a number of divs === to the amount of teams wanted by the user
	numberOfTeams = Number(document.querySelector("input#teams").value)
	let wrapper = document.querySelector("div.teams__wrap")
	for (let i = 0; i < numberOfTeams; i++) {
		let newTeam = document.createElement("div")
		newTeam.classList.add("team__single")
		newTeam.id = "team_" + i.toString()
		newTeam.innerHTML = `
        <h3>Team ${i + 1}:</h3>
        <ul></ul>
            `
		let randomColor = colors[Math.floor(Math.random() * colors.length)]
		newTeam.style.backgroundColor = randomColor
		newTeam.style.borderRadius = "20px"
		wrapper.appendChild(newTeam)
	}
}

const assign = () => { //assign all students (want to work on this more to make it cleaner)
	while (waitingList.length > 0) {
		if (currentTeam < numberOfTeams) {
			let randomStudent =
				waitingList[Math.floor(Math.random() * waitingList.length)]
			waitingList = waitingList.filter((name) => name !== randomStudent)
			let currentId = "#team_" + currentTeam.toString()
			let teamUl = document.querySelector(currentId)
			let li = document.createElement("li")
			li.innerText = randomStudent
			teamUl.appendChild(li)
			currentTeam += 1
			renderWaitingList(waitingList)
		} else {
			currentTeam = 0
			let randomStudent =
				waitingList[Math.floor(Math.random() * waitingList.length)]
			waitingList = waitingList.filter((name) => name !== randomStudent)
			let currentId = "#team_" + currentTeam.toString()
			let teamUl = document.querySelector(currentId)
			let li = document.createElement("li")
			li.innerText = randomStudent
			teamUl.appendChild(li)
			currentTeam += 1
			renderWaitingList(waitingList)
		}
	}
}
