
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

let nextNoteId = 1;
 

function addNota(){
    let core = document.querySelector('.corenote');
    let novaNota = core.cloneNode(true);

    novaNota.style.display = 'block';    
    novaNota.setAttribute('data-note-id', nextNoteId++);
    document.querySelector('.notes').appendChild(novaNota);
};

function delNote(delDel){
    let noteId = delDel.parentNode.getAttribute('data-note-id');
    delDel.parentNode.remove();
  };