
function altNote(){
    let soloNotes = document.querySelector('.notes');
    let userNote = document.querySelector('.notas');
    let userList = document.querySelector('.box-tolist');
    let plusNote =document.querySelector('.plusnote')
  
        soloNotes.style.display = 'block';
        userList.style.display = 'none';
        plusNote.style.display =  'block';

    
};

function altList(){
    let soloNotes = document.querySelector('.notes');
    let userNote = document.querySelector('.notas');
    let userList = document.querySelector('.box-tolist');
    let plusNote =document.querySelector('.plusnote')
    soloNotes.style.display = "none";
    userList.style.display = 'block';
    plusNote.style.display = "none";
};

// /\/\/\/\/\/\/\/\/\ aqui é o menu de seleção responsivo /\/\/\/\/\/\/\/\/\

let nextNoteId = 1;
 

function addNota(){
    let core = document.querySelector('.corenote');
    let novaNota = core.cloneNode(true);

    novaNota.style.display = 'block';    
    novaNota.setAttribute('data-note-id', nextNoteId++);
    document.querySelector('.notes').appendChild(novaNota);
    novaNota.querySelector('.typenote').addEventListener('input', function(){
      saveNotes();
    });

    const dateLabel = document.createElement('label');
    dateLabel.className = 'dateLabel';
    dateLabel.style.fontSize = '10px';
    dateLabel.style.color = 'white';
    dateLabel.textContent = getCurrentDate();
    novaNota.appendChild(dateLabel);
}



function delNote(delDel){
    let noteId = delDel.parentNode.getAttribute('data-note-id');
    delDel.parentNode.remove();
    removeFromStorage(noteId);
};

function removeFromStorage(noteId){
  let savedNotes = JSON.parse(localStorage.getItem('nota')) || [];
  savedNotes = savedNotes.filter(note => note.noteId !== noteId);
  localStorage.setItem('nota', JSON.stringify(savedNotes));
};

function getCurrentDate(){
  const now = new Date();
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  return now.toLocaleDateString('pt-BR', options);
}



function saveNotes(){
    let notes = document.querySelectorAll('.corenote');
    let notasContents = [];
    
   notes.forEach((note) => {
     let content = note.querySelector('.typenote').value.trim();
     let noteId = note.getAttribute('data-note-id');
    
     
     if (content !== ''){
       notasContents.push({content, noteId});
     }
   });
    localStorage.setItem('nota', JSON.stringify(notasContents));
  };
    


   window.addEventListener('load', function() {
    let savedNotes = localStorage.getItem('nota');
    if (savedNotes){
      savedNotes = JSON.parse(savedNotes)
      savedNotes.forEach(function (note){
       addNota();
        let lastNote = document.querySelector('.corenote:last-child');
        lastNote.querySelector('.typenote').value = note.content;
        lastNote.setAttribute('data-note-id', note.noteId);

        const dateLabel = document.createElement('label');
        dateLabel.className = 'dateLabel';
        dateLabel.textContent = note.date;
        lastNote.appendChild(dateLabel);
     });
      
    } else{
        addNota();
    }
  });

  ////////////////////////// AQUI SE ENCERRA O COGIDO DOS NOTES /////////////////////////

  const button = document.querySelector('.buttonTask'),
        input = document.querySelector('.inputTask'),
        list = document.querySelector('.list');

  let myTaskList = []

  function addTasks(){
    myTaskList.push({
      task:input.value,
      check:false
    })
   
    showTask()
    input.value = ''

  }


  function showTask(){
    let newLi = ''
    myTaskList.forEach((item, index) => {
      newLi = newLi + `<li class="listTask ${item.check && "done"}">

      <svg class="check-icon" viewBox="0 0 512 512" width="100" title="check-circle" onclick="checkTask(${index})">
          <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
        </svg>

      <p>${item.task}</p>

      <svg class="trash-icon" viewBox="0 0 448 512" width="100" title="trash-alt" onclick="deleteTask(${index})">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
        </svg>

  </li>
`
})
    list.innerHTML = newLi
    localStorage.setItem('listas', JSON.stringify(myTaskList));
  }

  


  function deleteTask(index){
    myTaskList.splice(index, 1)
    showTask()
  }

  function checkTask(index){
    myTaskList[index].check = !myTaskList[index].check
    showTask()
  }


   function reLoadTasks(){
   const myStorage = localStorage.getItem('listas');
  
    if(myStorage){
      myTaskList = JSON.parse(myStorage)
     }
    showTask()
 }

 reLoadTasks()

  button.addEventListener('click', addTasks);