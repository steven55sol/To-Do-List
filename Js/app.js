const d = document,
$body = d.body;


const modalTask = ()=>{
    const $div = d.createElement('div');
    $div.classList.add('modal');
    
    let $form = `   
    <form action="" class="form-card">
        <h2 class="title-form">Create a Task</h2>
          
        <div class="container-inputs">
        <label for="title" class="input-title__label">Title Task:</label>
        <input type="text" id="title" class="input-title" placeholder="Write title task">
        <label for="description" class="description">Description:</label>
        <textarea id="description" class="description-task" placeholder="description the task"></textarea>
        <div class="container-btn__task">
        <button class="btn-cancelar">Cancel</button>
        <button class="btn-task">Add Task</button>
        <button class="btn-edit__card">Edit Task</button>
        </div>
        </div>
        </form>`;
            
        $div.innerHTML = $form;
    $body.appendChild($div);
}

modalTask();

const $modal = d.querySelector('.modal'),
      $containerInputs = d.querySelector('.container-inputs'),
      $template = d.querySelector('.template-card').content,
      $containerCard = d.querySelector('.container-card'),
      $form = d.querySelector('.form-card');

      console.log($form)

const addTask = ($titleForm, $description)=>{
    const $formCard = d.querySelector('.form-card');

    $template.querySelector('.title-card__list').textContent = $titleForm;
    $template.querySelector('.content-card__list').textContent = $description;
    
    let $clone = d.importNode($template, true);

     $containerCard.appendChild($clone);

     $formCard.reset();
    

    $modal.classList.remove('view-modal');
}

const validarTask = ()=>{
    const $titleForm = d.querySelector('.input-title').value,
          $description = d.querySelector('.description-task').value;

    if($titleForm === "" || $description === ""){
        const $p = d.createElement('p');
        $p.classList.add('error');
        $p.textContent = "Todos los campos son obligatorios";
  
        $containerInputs.insertAdjacentElement('afterbegin', $p);
  
        setTimeout(()=>{
          $p.remove();
        },3000);
    }else{
        addTask($titleForm, $description);
    }
}

const viewModal = ()=> $modal.classList.add('view-modal');
const closeModal= ()=>   $modal.classList.remove('view-modal');

const btnEdit = ($cardTitleValue, $cardDescriptionValue)=>{
    d.addEventListener('click', e=>{
        if(e.target.matches('.btn-edit__card')){
            e.preventDefault();
            const $titleForm = d.querySelector('.input-title').value,
            $description = d.querySelector('.description-task').value;

        if($titleForm === "" || $description === ""){
             const $p = d.createElement('p');
             $p.classList.add('error');
             $p.textContent = "Todos los campos son obligatorios";
  
             $containerInputs.insertAdjacentElement('afterbegin', $p);
  
             setTimeout(()=>{
               $p.remove();
             },3000);
           }else{
             $cardTitleValue.textContent = $titleForm;
             $cardDescriptionValue.textContent = $description;
              
             closeModal();
           }
        }
    })
}


const editModal = (e)=>{
    let $cardTitle = e.target.closest('.card-list').querySelector('.title-card__list').textContent,
        $cardDescription = e.target.closest('.card-list').querySelector('.content-card__list').textContent;
        $cardTitleValue = e.target.closest('.card-list').querySelector('.title-card__list'),
        $cardDescriptionValue = e.target.closest('.card-list').querySelector('.content-card__list');
    
    $modal.querySelector('.title-form').textContent = "Edit a Task";
    $modal.querySelector('.input-title').value = $cardTitle;
    $modal.querySelector('.description-task').value = $cardDescription;

    $modal.querySelector('.btn-task').style.display = "none";
    $modal.querySelector('.btn-edit__card').style.display = 'block';
    
    viewModal();
    btnEdit($cardTitleValue, $cardDescriptionValue);
}

const DeleteCard = (e)=>{
   e.target.closest('.card-list').remove();
}

d.addEventListener('click', e=>{
    if(e.target.matches('.plus')){
        $modal.querySelector('.btn-task').style.display = "block";
        $modal.querySelector('.btn-edit__card').style.display = 'none';
        $modal.querySelector('.title-form').textContent = "Create a Task";
        $form.reset();

        viewModal();
    }

    if(e.target.matches('.btn-cancelar')){
        e.preventDefault();
        closeModal();
    }

    if(e.target.matches('.btn-task')){
        e.preventDefault();
        validarTask();
    }

    if(e.target.matches('.btn-edit')){
        e.preventDefault();
        editModal(e);
    }
    if(e.target.matches('.btn-delete')){
        e.preventDefault();
        DeleteCard(e);
    }
});




