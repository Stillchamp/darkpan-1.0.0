quiz_cate = document.getElementById('inputGroupSelect01')
generator = document.getElementById('cards')
total = document.getElementById('total')


let category_list = JSON.parse(localStorage.getItem("records")) || null;
quiz_cate.innerHTML = ""
quiz_cate.innerHTML = "<option value=''>Choose...</option>"
if(category_list != null){
    category_list = category_list.filter(el => el.reader == "Active");
    for(var i = 0; i < category_list.length; i++){
        quiz_cate.innerHTML +=`
        <option value='${category_list[i].cat}'>${category_list[i].cat}</option>
        `;
    }
}



function generate() {

    let quiz_manager = JSON.parse(localStorage.getItem("quiz_layout")) || null;
    if (quiz_cate.value == "") { 
        alert("Choose from the list of categories to take quiz")
        generator.style.display="none"
    } 
    generator.innerHTML =""
    for (var i = 0; i < quiz_manager.length; i++) {
        if(quiz_cate.value) {
            quiz_manager = quiz_manager.filter(el => el.category == quiz_cate.value)
            generator.style.display="block"
         }
        if (quiz_manager.length == 0) {
            alert("Quiz is not available")
            generator.style.display=""
        }
        generator.innerHTML +=`
        <div class="card border-danger mb-3">
        <div class="card-header text-danger d-flex justify-content-between">
             <h5>Cateory ${i + 1}</h5>
             <h5>Number Of Quiz question</h5>
        </div>

        <div class="card-body d-flex justify-content-between">
               <h2 class="card-title" id="cate_name">${quiz_cate.value}</h2>
               <h2 id="total">${quiz_manager.length}</h2>
        </div>

        <div class="card-footer">
             <button type="button" class="btn btn-lg">Take Quiz</button>
        </div>
       </div>
        `;
    }
   
}
