class users{
    
    constructor(uname,dob,gender){
        this.uname=uname;
        this.dob=dob;
        this.gender=gender;
    }



    }
    let userdetails=[]
    function adduser(){
        event.preventDefault();
        let name=document.getElementById("Uname").value;
        let dob=document.getElementById("Dob").value;
        let gender=document.getElementById("Gen").value;

      
        let user=new users(name,dob,gender);
        userdetails.push(user);
        displaytable();
        document.getElementById("Uname").value='';
        document.getElementById("Dob").value='';
        document.getElementById("Gen").value='';
        
        

    }
     let tbody=document.getElementById("Tablebody");
     function displaytable(){ 
         row=[];

        
        userdetails.forEach(users=> {
            
            row.push(`<tr class="row">
            <td>${users.uname}</td>
            <td>${users.dob}</td>
            <td>${users.gender}</td>
            <td>${users.gender}</td>
            <td  style="display:flex"><button type="button" class="del-btn" onclick="deletee('${users.uname}')">Delete</button>
            <button type="button" class="edit-btn" onclick="edit('${users.uname}')">Edit</button></td>
            </tr>`);
            
            
             
        
        });

        tbody.innerHTML=row.join(' ');
        console.log(userdetails);


    }
    function deletee(name){
            let index=userdetails.findIndex(u=>u.uname===name);
            if(index!==-1){
                userdetails.splice(index,1);
                displaytable();
            }
            

            
    }
   function edit(name){
     let user=userdetails.find(u=>u.uname===name);
     let a=prompt("enter the anme");
     user.uname=a;
     displaytable()

    

   }