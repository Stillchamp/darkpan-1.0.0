let display = document.querySelector('#display');
let welcome = document.querySelector('#welcome');
let users = document.querySelector('#users');
const editCategory = document.querySelector('#editCategory');
const report = document.querySelector('#report');
const live = document.querySelector('#live');
const  subject = document.querySelector('#subject');
const  status_reader = document.querySelector('#status_reader');
let element1 = document.createElement('input')
element1.type = "checkbox"
element1.name = "chkbox[]"

// modal select field
let reader = [
 {status: "Active"},
 {status: "Not Active"},
]

for (let i = 0; i < reader.length; i++) {   
 status_reader.innerHTML +=`<option value="${reader[i].status}">${reader[i].status}</option>`;               
};
 
// modal select field ended


// to collect data
function fetchData(){
    category.innerHTML = "";
   let quiz_set = JSON.parse(localStorage.getItem("records")) || null;
   if (quiz_set !== null) {
        let active_Counter = 1;
        let notactive_Counter = 1;
        quiz_set.forEach((element, a) => {    
            category.innerHTML += `
                <tr>
                   <td>
                       <span class="custom-checkbox">
                       <input type="checkbox" id="selectAll"  name="chk">
                       <label for="selectAll"></label>
                       </span>
                    </td>   
                   <td>${a+1}</td>
                   <td>${element.cat}</td>
                   <td>${element.reader}</td>
                   <td class="nav-item dropdown">
                       <a class="nav-link dropdown-toggle ml-1" id="navbarDropdown" href="#" role="" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                       
                         <i class="fas fa-th ml-3 mb-0"></i>
                       </a>
                       <span class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                          <button type="button" class="dropdown-item btn" data-toggle="modal" data-target="#editModal" onclick="update(${element.id})">Edit</button>
                          <button class="dropdown-item  btn" onclick="deleteCategory(${a})">Delete</button>
                       </span>
                   </td>
                </tr>
            `; 
            if(element.reader == "Active"){
                document.getElementById('active').innerHTML = active_Counter++
            }
            if(element.reader == "Not Active") {
               document.getElementById('notActive').innerHTML = notactive_Counter++
            }
        });  
           document.getElementById('total_cat').innerHTML = quiz_set.length 
    } 
};
fetchData();     
// ending of random fetch data

// to save data collected
function saveCategory(){
   let  records = JSON.parse(localStorage.getItem("records")) || null;
   let status = false;
   let data = { 
      id: Math.floor(Math.random() * 100000000),
      cat : subject.value, 
      reader : status_reader.value,
    };

    let arr = [];
    if (records == null) {
       arr.push(data)
       localStorage.setItem('records', JSON.stringify(arr))
    }else {
        for (let i = 0; i < records.length; i++) {
           if (data.cat == records[i].cat) {
               status = true;
            }
        }                
    }
   if (status) {
       swal({
           title: "Item already selected"
        }); 
    } else if (subject.value == ""){
       alert('category is empty')
    }else{
       records.push(data) 
       localStorage.setItem('records', JSON.stringify(records)); 
    }
      fetchData(); 
};
// ending of saved data 

 // categoryEditbtn
function update(ind){
save = ind;
let obj = {};
let holder1 = JSON.parse(localStorage.getItem("records"))
for (let i = 0; i < holder1.length; i++) {
    if (holder1[i].id == ind) {
      obj = holder1[i]; 
     }      
 }
 editCategory.value = obj.cat;
 live.value = obj.reader;
fetchData();
};    
   
  
function cateSelect(e){
let editCategory1="";

for (let i = 0; i < cat.length; i++) {
    if (e.target.value == cat[i].subject) {
        editCategory1 = cat[i].status_reader;
     }            
 }
 editCategory.value = editCategory1;
};

// categoryModalEditbtn
function saveNewCategory() {
let holder1 = JSON.parse(localStorage.getItem('records'));
if (editCategory.value == "" || live.value == "") {
   alert('cannot update empty category')
} else {
 for (let i = 0; i < holder1.length; i++) {
     if (holder1[i].id == save) {
         holder1[i].cat = editCategory.value;
         holder1[i].reader = live.value;
     } 
            
 }
 editCategory.value = "";
 live.value = "";
}
localStorage.setItem("records", JSON.stringify(holder1))
fetchData();

};



// $(document).ready(function(){
// 	// Activate tooltip
// 	$('[data-toggle="tooltip"]').tooltip();
	
// 	// Select/Deselect checkboxes
// 	var checkbox = $('table tbody input[type="checkbox"]');
// 	$("#selectAll").click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;                        
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;                        
// 			});
// 		} 
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			$("#selectAll").prop("checked", false);
// 		}
// 	});
// });

// Pass the checkbox name to the function
// function getCheckedBoxes(selectAll) {
//     var checkboxes = document.getElementsByName(selectAll);
//     var checkboxesChecked = [];
//     // loop over them all
//     for (var i=0; i<checkboxes.length; i++) {
//        // And stick the checked ones onto an array...
//        if (checkboxes[i].checked) {
//           checkboxesChecked.push(checkboxes[i]);
//        }
//     }
//     // Return the array if it is non-empty, or null
//     return checkboxesChecked.length > 0 ? checkboxesChecked : null;
//   }
  
//   // Call as
//   var checkedBoxes = getCheckedBoxes("mycheckboxes");

function checkAll(event){
    checked = event;
    console.log(checked);
    var checkboxes = document.getElementsByName('chk');
    if(checked.checkboxes){
        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].type == 'checkbox'){
                checkboxes[i].checked = true;
            }
        }
    }else {
        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].type == 'checkbox'){
                checkboxes[i].checked = false;
            }
        }
    }
}

function deleteCategory(ind) {
 swal({
     title: "Are you sure?",
     text: "Once deleted, you will not be able to recover category",
     icon: "warning",
     buttons: true,
     dangerMode: true,
 })
.then((willDelete) => {
     if (willDelete) {
         var holder1 = JSON.parse(localStorage.getItem('records'));
         if (holder1) {
            holder1.splice(ind, 1); 
            localStorage.setItem('records', JSON.stringify(holder1))
         }
          fetchData();
         swal("category has been deleted!", {
             icon: "success",
         });
       }
       else{
        fetchData();
        swal("item still in cart", {
            icon: "success",
         }); 
     }  
});       
};

function deleteCatego(id) {
    // var holder1 = JSON.parse(localStorage.getItem('records'));
    var checkboxes = document.getElementsByClassName('checkbox');
     for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].type == 'checkbox' &&  checkboxes[i].checked == false){
            return alert('select from category to delete from')
        }
     }
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover category",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
   .then((willDelete) => {
        if (willDelete) {
           var holder1 = JSON.parse(localStorage.getItem('records'));

            if (holder1) {
               holder1.splice(id); 
               localStorage.setItem('records', JSON.stringify(holder1))
            }
             fetchData();
            swal("category has been deleted!", {
                icon: "success",
            });
          }
          else{
           fetchData();
           swal("item still in cart", {
               icon: "success",
            }); 
        }  
   });       
   };
   
