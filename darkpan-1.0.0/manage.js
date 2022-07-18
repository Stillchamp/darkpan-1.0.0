let  cards = document.getElementById('cards')
let number_of = document.getElementById('number_of')
let option = document.getElementById('option');
let cart_select =document.getElementById("cart_select")
let q_cat = document.querySelector(".q_cat")
q_cat.style.display="none"
let manageQuizs = document.querySelector('#manageQuiz')
let editor = "";
let editSetQuestion = document.querySelector('#editSetQuestion');
let editOption_ss = document.querySelector('#editOption_ss');
let editOption_select = document.querySelector('#editOption_select');
let editCorrectAns = document.querySelector('#editCorrectAns');

function generate(){
if(Number (number_of.value == 0 ) || number_of.value == "") 
alert('u need to input valid number')
//    console.log('a')
cards.innerHTML = ""
if(Number(number_of.value)>10) return alert('too much cards');
q_cat.style.display = ""
for(let i = 0; i < Number(number_of.value); i ++){
    cards.innerHTML +=`
        <div class="col-lg-6 col-md-12" >
            <div class="card mt-2"  >
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Question ${i + 1}</h6>
                    <textarea  class="card-title" name="question" id="setQuestion${i}" cols="45" rows="3" placeholder="Set Question"></textarea>
                    <p class="card-text">Number of options</p>
                    <div class="input-group mb-3 optNum col-8">
                        <select name="option" id="option_ss${i}" class="custom-select" onchange="generate_opt(${i})">
                            <option value="">you need to select an option</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div id="option_select${i}">
                      <div class="form-row"></div>
                    </div>
                    <p>Correct Answer</p>
                    <div id="correctAns${i}"></div>
                </div>
            </div>
        </div>
    `
}
};

function  generate_opt(fas){
  let  option_ss = document.getElementById(`option_ss${fas}`).value;
  let  option_select = document.getElementById(`option_select${fas}`);
  let  correctAns = document.getElementById(`correctAns${fas}`) 
  option_select.innerHTML=""
  correctAns.innerHTML =""
    for (let i = 0; i < Number(option_ss); i++) {
        option_select.innerHTML +=`
            <div class="input-group mb-3 col-md-6 corAns">
                <span class="input-group-text border-dark corAnss">Option ${i + 1}</span>
                <div class="input-group-append">
                    <input type="text" id="option${i}${fas}" class="form-control border-dark col-md-6 col-sm-6 question_options">
                </div>
            </div>
        `
        correctAns.innerHTML +=`
            <div class="">
                <input class="form-check-input" type="radio" name="exampleRadios${fas}" id="exampleRadios${i}${fas}" value="option${i}${fas}">
                <label class="form-check-label text-danger" for="exampleRadios${fas}">
                    Option ${i + 1}
                </label>
            </div>
        `;
   }
};


// to save quiz
function save() {
    let parentId = Math.floor(Math.random() * 1000000) * Math.floor(Math.random() * 1000000) 
    let questions = [];
    let duplicateStatus = false;
    let quiz_details = JSON.parse(localStorage.getItem("quiz_layout"))
    for (let i = 0; i < Number(number_of.value); i++) {
        let obj = {
            parentId,
            id: Math.floor(Math.random()*10000000),
            category:cart_select.value,
            question: document.getElementById(`setQuestion${i}`).value,
            question_option: []
        }
        //   option value fetch
        let op = Number(document.getElementById(`option_ss${i}`).value)
        for(let a = 0; a< op; a++){
            let xy = {
                name:document.getElementById(`option${a}${i}`).value,
                ans: document.getElementById(`exampleRadios${a}${i}`).checked
            }
            obj.question_option.push(xy)
        }
         questions.push(obj)  
    }

    let arr = []
    if (quiz_details == null){
        arr.push(...questions);
    } 
    else{
        arr = JSON.parse(localStorage.getItem("quiz_layout"));
        arr.forEach(item =>  {
            if (questions.some((el) => el.question == item.question)) {
                duplicateStatus = true;
            }
        });
        if (duplicateStatus) {
           alert('duplicate entry detected')
           return
        }
        arr.push(...questions);
    }
        localStorage.setItem("quiz_layout", JSON.stringify(arr));
        fetchData();
};

 cart_select.innerHTML =""
 let category_list = JSON.parse(localStorage.getItem("records")) || null;
 if (category_list !== null){
     category_list = category_list.filter(das => das.reader == "Active")
     for(let ind = 0; ind < category_list.length; ind++){
         cart_select.innerHTML +=`
         <option value="${category_list[ind].cat}">
                 ${category_list[ind].cat}
         </option>`;
     }
 }

function fetchData(){
    manageQuizs.innerHTML = ""
    let quizManager = JSON.parse(localStorage.getItem("quiz_layout")) || null
    if (quizManager !== null) {
        for (let s = 0 ; s < quizManager.length; s++) {
            // creating an array based on the current array
            let joined_options = quizManager[s].question_option.map(item => {
                return item.name
            }).join(', ');
            // let joined_options = question_options_names.join(',');

            let corAnswer = quizManager[s].question_option.filter(el => {
                return el.ans === true
            }).map(item => {
                return item.name
            })[0];
            manageQuizs.innerHTML += `
                <tr>
                    <td>${s+1}</td>
                    <td>${quizManager[s].category}</td>
                    <td>${quizManager[s].question}</td>
                    <td>${joined_options}</td>
                    <td><span class="btn btn-sm btn-success">${corAnswer}</span></td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#editQuiz" onclick="editQuiz(${quizManager[s].id})">Edit</button>
                        <button type="button" class="btn btn-primary btn-sm" onclick="deleteQuiz(${s})">Delete</button>
                    </td>
                </tr>
            `;  
        };
       document.getElementById('totalQuiz').innerHTML = quizManager.length;
    };
};
    fetchData();

    function deleteQuiz(ind) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover Quiz",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
   .then((willDelete) => {
        if (willDelete) {
            var holder = JSON.parse(localStorage.getItem('quiz_layout'));
            if (holder) {
               holder.splice(ind, 1); 
               localStorage.setItem('quiz_layout', JSON.stringify(holder))
            }
            fetchData();
            swal("Quiz has been deleted!", {
                icon: "success",
            });
          }else {
           fetchData();
           swal("Quiz still In Check", {
               icon: "success",
            }); 
        }  
   });       
};
        //   onclick of edit button function in your table
function editQuiz(indi){
    let bs = JSON.parse(localStorage.getItem("quiz_layout"))
    editor = indi;
    let sj = {};
    for (let i = 0; i < bs.length; i++) {
        if (bs[i].id == indi) {
            sj = bs[i]; 
         }      
     }
     editSetQuestion.value= sj.question;
     editOption_ss.value = sj.question_option.length;
     editOption(sj.question_option);
};   
    //  onclick of editModal save button
function saveNewCategory() {
    let bss = JSON.parse(localStorage.getItem("quiz_layout"))
    if (editSetQuestion.value == "") {
        return alert('Question field is empty')
    } else {
        for (let i = 0; i < bss.length; i++) {
          if (bss[i].id == editor) {
             bss[i].question =  editSetQuestion.value;
          }
            
        }
    }
   localStorage.setItem("quiz_layout", JSON.stringify(bss)) ;
   fetchData();
};
 
// //onchange function in editModal select field
function editOption(optionArray) {
    editOption_select.innerHTML=""
    let correctAnswerIndex = 0;
    editCorrectAns.innerHTML = ""
    for (let i = 0; i < optionArray.length; i++){
        editOption_select.innerHTML +=`
            <div class="input-group mb-3 corAns">
                 <span class="input-group-text border-dark corAnss">Option ${i + 1}</span>
                <div class="input-group-append">
                    <input type="text" value="${optionArray[i].name}" id="editoption${i}" class="form-control border-dark col-md-6 col-sm-6 edit_question_options">
                </div>
            </div>
        `;
        
        editCorrectAns.innerHTML +=`
            <div class="">
                <input class="form-check-input" type="radio" checked="false" name="editRadio" value="editRadios${i}"  id="bindValue${i}" >
                <label class="form-check-label text-success" for="bindValue${i}">
                    Option ${i + 1}
                </label>
           </div>
        `;

        if(optionArray[i].ans) {
            correctAnswerIndex=i;

        }
    };
        document.getElementById(`bindValue${correctAnswerIndex}`).checked=true;
};
