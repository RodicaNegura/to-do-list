// Select the Elements

const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")
const element = document.getElementById("element")

// Classes names 

const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_TROUGH = "lineThrough"

// Variables 

let LIST, id

// Get item from localstorage
let data = localStorage.getItem("TODO")

		// check if data is not empty 
		if(data){
			LIST = JSON.parse(data)
			id = LIST.length // set id to the last one in the list
			loadList(LIST) //load the list to the user interface
		}else{
			// if data isn't empty
			LIST = []
			id = 0
		}

		// load items to user's interface 
		function loadList(array){
			array.forEach(function(item){
				addToDo(item.name, item.id, item.done, item.trash)
			})
		} 

		// clear the local storage 
			clear.addEventListener("click", function(){
				localStorage.clear()
				location.reload()
			})

// Show todays date

const options = {weekday:"long", month:"short", day:"numeric"}
const today = new Date() 

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// Add to to function

function addToDo(toDo, id, done, trash){
	if(trash){return}

	const DONE = done ? CHECK :UNCHECK
	const LINE = done ? LINE_TROUGH : ""

	const item = `
		<li class="item">
			<i class="fa ${DONE} co" job="complete" id=""></i>
			<p class="text ${LINE}">${toDo}</p>
			<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
		</li>
	`
	const position = "beforeend"
	list.insertAdjacentHTML(position, item)
}

// Add an item to the list user the enter key 

document.addEventListener("keyup",function(even){
	if(event.keyCode== 13){
		const toDo = input.value

			if(toDo){
				addToDo(toDo, id, false, false)

					LIST.push({
						name : toDo,
						id : id,
						done : false,
						trash : false
					})
					// Add item to localstorage (this code must be added where the LIST array is updated)
					localStorage.setItem("TODO", JSON.stringify(LIST))

					id++;
			}
			input.value = ""
	}
})

// Complete to do

function completeToDo(element){
	element.classList.toggle(CHECK)
	element.classList.toggle(UNCHECK)
	element.parentNode.querySelector(".text").classList.toggle(LINE_TROUGH)

	LIST[element.id].done = LIST[element.id].done ? false : true
}

// Remove to do

function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode)
	LIST[element.id].trash = true
}

// Target the items created dynamically

list.addEventListener("click", function(event){
	const element = event.target //return the clicked element inside
	const elementJob = element.attributes.job.value //complete or delete

	if(elementJob == "complete"){
			completeToDo(element)
	}else if(elementJob == "delete"){
			removeToDo(element)
	}
	// Add item to localstorage (this code must be added where the LIST array is updated)
	localstorage.setItem("TODO", JSON.stringify(LIST))
})
