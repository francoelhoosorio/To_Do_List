const btnAdd = document.getElementById("btn-add-task")
const localStorageValue = 'to-do-list'

btnAdd.addEventListener("click", function newTask(){
    let task = document.getElementById("name-task")

    if(!task.value){
        alert('Preencha os campos antes de adicionar uma tarefa!')
    } else if(validateTask()){
        alert('Já existe uma tarefa com esse nome')

    } else {
        let values = JSON.parse(localStorage.getItem(localStorageValue) || "[]")
        values.push({
            name: task.value
        })
        localStorage.setItem(localStorageValue,JSON.stringify(values))
        showTask()
    }
})

function validateTask(){
    let values = JSON.parse(localStorage.getItem(localStorageValue) || "[]")
    let taskValue = document.getElementById("name-task").value
    let exist = values.find(x => x.name == taskValue)
    return !exist ? false : true
}


function showTask(){
    let values = JSON.parse(localStorage.getItem(localStorageValue) || "[]")
    let list = document.getElementById("to-do-list")
    
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li id="item-list">${values[i]['name']}<a href="#" id='btn-delete' onclick='removeTask("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg></a></li>`
    }
}

function removeTask(data){
    let values = JSON.parse(localStorage.getItem(localStorageValue) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageValue,JSON.stringify(values))
    showTask()
}

showTask()