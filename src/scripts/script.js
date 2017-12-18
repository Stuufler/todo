var todoItem =  {
		name: '',
		id: -1,
		checked: false,
		deleted: false
	};
const todolist = document.getElementById('list');
const todoArr = [];

const checkItem = (event) => {
	const id = event.srcElement.parentElement.attributes.id.value;
	const uncheck = () => { event.srcElement.nextElementSibling.className = "normal"; todoArr[id].checked = false; return};
	const check = () => { event.srcElement.nextElementSibling.className = "through"; todoArr[id].checked = true; return}
	todoArr[id].checked ? uncheck() : check()
	console.log(id, todoArr[id].checked);
	return  event };

const deleteitem = (event) => {
	const id = event.srcElement.parentElement.attributes.id.value;
	console.log(event);
	const hideitem = () => {event.srcElement.parentElement.className = "hidden"; todoArr[id].deleted = true; return};
	if (!todoArr[id].deleted) {hideitem()};
	return event;
};

const addListeners = () => { 
	for (let i = 0; i < todoArr.length; i++) {
		let itemID = todoArr[i].id
		console.log(itemID);
		document.getElementById(itemID).firstChild.addEventListener("click", checkItem)
		document.getElementById(itemID).lastChild.addEventListener("click", deleteitem)
	}
		return;
	};

const add = (todo) => { 
	let itemTemplate = 	'<div id="'+ todo.id +'" class="todo"><input type="checkbox" />' + 
						'<label>'+ todo.name +'</label>' + 
						'<button>x</button></div>';
	todolist.innerHTML += itemTemplate;	
	return todolist};

const save = () =>  {
	todoItem.name = document.getElementById('input').value;
	if (todoItem.name !== ''){
	++todoItem.id;
	var addedItem = JSON.parse(JSON.stringify(todoItem));
	todoArr.push(addedItem);
	add(addedItem);
	addListeners();
	document.getElementById('input').value = ''};
	return; }

document.getElementById('submit').addEventListener("click", save);















