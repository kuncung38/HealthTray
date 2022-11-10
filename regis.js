const container = document.querySelector('.container'),
      showHidePw = document.querySelectorAll('.showHidePw'),
      pwFields = document.querySelectorAll('.password'),
      signUp = document.querySelector('.signup-link'),
      login = document.querySelector('.login-link'),
      forgotLink = document.querySelector(`#forgot-link`),
      forgotPage = document.querySelector(`#forgot-page`),
      goBack = document.querySelector('#go-back'),
      emailLogin = document.querySelector('#email-login'),
      passwordLogin = document.querySelector('#password-login'),
      loginButton = document.querySelector('#login-button'),
      wrongInformation = document.querySelector('#wrongInformation'),
      wrongInformationText = document.querySelector("#wrongInformationText")

const regisName = document.querySelector('#regisName'),
      regisEmail = document.querySelector('#regisEmail'),
      regisPassword = document.querySelector('#regisPassword'),
      confirmPassword = document.querySelector('#confirmPassword'),
      registerButton = document.querySelector('#registerButton')

showHidePw.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if(pwField.type === 'password') {
                pwField.type = 'text';

                showHidePw.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye")
                })
            } else {
                pwField.type = 'password';

                showHidePw.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash")
                })

            }
        })
    })
})

//User database
let user =[
    {
        email:'Ricko.wijaya@gmail.com',
        password:'kuncung123',
        addres:'Jakarta',
        alergi:['seafood'],
        penyakit :['diabetes']
    },
    {
        email:"gusdi",
        password:'gusdi123',
        addres:'Depok',
        alergi:['dairy'],
        penyakit :[]
    },
    {
        email:"rayhan",
        password:'rayhan123',
        addres:'Bogor',
        alergi:['seafood','kacang'],
        penyakit :[]
    },
    {
        email:"brian",
        password:'brian123',
        addres:'Cibubur',
        alergi:[],
        penyakit :[]
    },
    {
        email:"haditya",
        password:'haditya123',
        addres:'Bekasi',
        alergi:[],
        penyakit :['diabetes','darah tinggi']
    }
]

// js code to appear signup and login form
signUp.addEventListener('click', () => {
    container.classList.add('active')
})

login.addEventListener('click', () => {
    container.classList.remove('active')
})


// Forgot Password
forgotLink.addEventListener('click', () => {
    container.style.display = 'none'
    forgotPage.style.display = 'grid'
})

goBack.addEventListener('click', () => {
    forgotPage.style.display = 'none'
    container.style.display = 'block'
})


//Login & Register button
function checkLogin() {
    let inputEmail = emailLogin.value
    let inputPassword = passwordLogin.value
    for(let orang of user) {
        if(inputEmail === orang.email && inputPassword === orang.password) {
            console.log('oke cocok jing')
            break;
        } else {
            console.log('mabok ya?')
            // wrongInformation
            setTimeout(function() {
                wrongInformationText.innerHTML = 'Email atau passwordnya salah noh!'
                loginButton.style['background-color'] = 'red';
                wrongInformation.classList.toggle('show')
            },10)
            setTimeout(function() {
                loginButton.style['background-color'] = 'var(--primary-green)';
                wrongInformation.classList.toggle('show')
            },800)
            break;
        }
    }
}

function registerFunction(){
    let obj ={
        email:'',
        password:''
    }
    let regisNames = regisName.value
    let regisEmails = regisEmail.value
    let regisPasswords = regisPassword.value
    let confirmPasswords = confirmPassword.value

    if(!regisNames || !regisEmails || !regisPasswords || !confirmPasswords){
        setTimeout(function() {
            wrongInformationText.innerHTML ='Jangan ada yang kosong woi!'
            registerButton.style['background-color'] = 'red';
            wrongInformation.classList.toggle('show')
        },20)
        setTimeout(function() {
            registerButton.style['background-color'] = 'var(--primary-green)';
            wrongInformation.classList.toggle('show')
        },800)
        
    }else if(regisPasswords !== confirmPasswords){
        setTimeout(function() {
            wrongInformationText.innerHTML ='Passwordnya beda tuh haduu'
            registerButton.style['background-color'] = 'red';
            console.log(registerButton.style['background-color'])
            wrongInformation.classList.toggle('show');
        },10)
        setTimeout(function() {
            registerButton.style['background-color'] = 'var(--primary-green)';
            wrongInformation.classList.toggle('show')
        },800)
    } else {
        obj.email=regisEmails
        obj.password=regisPasswords
        user.push(obj)
        console.log('sukses woi')
    }  
}
