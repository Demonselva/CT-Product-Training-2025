interface data{
    name:string,
    email:string,
    role:string
}
function adduser():void{
        let name_input : HTMLInputElement=document.getElementById("name") as HTMLInputElement;
        let name : string=name_input.value;

        let email_input : HTMLInputElement=document.getElementById("email") as HTMLInputElement;
        let email : String = email_input.value;

        let role_input :  HTMLInputElement=document.getElementById("role") as HTMLInputElement;
        let role : String =role_input.value;

}