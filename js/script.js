let inputTouched = {
    email: false,
    password: false,
    name:false,
    Repassword:false

}

const inputEmail = document.getElementById("inputEmail")
const inputPassword = document.getElementById("inputPassword")
const inputName= document.getElementById("inputName")
const inputWrapperEmail = document.getElementById("input-wrapper-email")
const inputWrapperPassword = document.getElementById("input-wrapper-password")
const warningName=document.getElementById("warningName")
const warningEmail = document.getElementById("warningEmail")
const warningPassword = document.getElementById("warningPassword")
const warningRePassword = document.getElementById("warningRePassword")

const inputOnBlur = (ev) =>{
  if(inputTouched.name){
      if(inputName.value==null || inputName.value==""){
          warningName.style.display="block"
          inputName.style.borderBottom='2px solid #e87c03'
      }
      else{
          warningName.style.display="none"
          inputName.style.borderBottom="none"
      }
  }

    if(inputTouched.email){
        if(!validateEmail(inputEmail.value)){
            warningEmail.style.display="block"
            inputEmail.style.borderBottom='2px solid #e87c03'
        }
        else{
            warningEmail.style.display="none"
            inputEmail.style.borderBottom="none"
        }
    }
    if(inputTouched.password){
        if(!(inputPassword.value.length >= 4 && inputPassword.value.length <= 60)){
            warningPassword.style.display="block"
            inputPassword.style.borderBottom='2px solid #e87c03'
        }
        else{
            warningPassword.style.display="none"
            inputPassword.style.borderBottom="none"
        }
    }
    if(inputTouched.Repassword){
        if(!(inputRePassword.value.length >= 4 && inputRePassword.value.length <= 60 && inputRePassword.value==inputPassword.value) ){
            warningRePassword.style.display="block"
            inputRePassword.style.borderBottom='2px solid #e87c03'
        }
        else{
            warningRePassword.style.display="none"
            inputRePassword.style.borderBottom="none"
        }
    }
}

const inputOnFocus = (ev) =>{
    inputTouched[ev.name] = true;
}

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
