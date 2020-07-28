//Define UI vars
const form= document.querySelector('#task-form');
const taskList= document.querySelector('.collection');
const clearbtn= document.querySelector('#clear-tasks');
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task');

//Load all event listeners
loadEventlistener();

//Load all event listener
function loadEventlistener(){
    //Add Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearbtn.addEventListener('click', clearTask);

    filter.addEventListener('keyup', filterTasks);
}
//Get tAsk
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        //Create li element
    const li= document.createElement('li');

    //Add Class
    li.className='list-group-item';
    li.classList.add('d-flex', 'justify-content-between' ,'align-items-center');
    //Append Li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.classList.add('badge','badge-pill', 'delete-item');

    //Add Icon
    link.innerHTML='<i class="fas fa-times"></i>';
    //Append li to link
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    });
}


//Add tasks
function addTask(e){
    if(taskInput.value ==='')
    alert('Add task');

    //Create li element
    const li= document.createElement('li');

    //Add Class
    li.className='list-group-item';
    li.classList.add('d-flex', 'justify-content-between' ,'align-items-center');
    //Append Li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.classList.add('badge','badge-pill', 'delete-item');

    //Add Icon
    link.innerHTML='<i class="fas fa-times"></i>';
    //Append li to link
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in ls
    storeTaskInLocalStorage(taskInput.value);
    
    //clear value
    taskInput.value='';




    e.preventDefault();
}


function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove tasks
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


//clear tasks
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}


// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
  }
  


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  //console.log(text);
    document.querySelectorAll('.list-group-item').forEach(function(task){
      const item = task.firstChild.textContent;
      //console.log(item);
      if(item.toLowerCase().indexOf(text) != -1){
          console.log(task);
        task.style.display ="block";
      } else {
        task.style.display ="none";
      }
    });
  }