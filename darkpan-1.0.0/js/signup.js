    function saveData(){
        let floatingInput, floatingText, floatingPassword;
        floatingInput = document.getElementById('floatingInput').value;
        floatingText = document.getElementById('floatingText').value;
        floatingPassword = document.getElementById('floatingPassword').value
    

        let records = new Array();
        records = JSON.parse(localStorage.getItem("user_records"))?JSON.parse(localStorage.getItem("user_records")):[]
        if ((floatingInput.value == "" || floatingText.value == "") || ( floatingPassword.value == "" )){
            alert ("details can't be empty");
            // console.log('empty')
        } else if(floatingText.value != floatingPassword.value) {
            alert('password do not match');
            // console.log('do not match')
        } else if (records.some((v)=>{return v.floatingInput == floatingInput || v.floatingPassword == floatingPassword}))
        {
            alert("duplicate data");
        } 

        else
        {
            records.push ({
            "floatingInput" : floatingInput, 
            "floatingText": floatingText, 
            "floatingPassword": floatingPassword,
            "id": Math.floor(Math.random()*10000000000),
            "userType": "user"
            })

        localStorage.setItem("user_records",JSON.stringify(records));
        }

    }
    saveData();