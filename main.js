let slider = document.querySelector("input[type=range]")
let password = document.querySelector("h2")
let checkBoxes = document.querySelectorAll("input[type=checkbox")
let generateBtn = document.querySelector(".generate")
let copy = document.querySelector(".copy")
let copied = document.querySelector(".copied")
let boxes = document.querySelectorAll(".box")
let strength = document.querySelector(".strength")
let generatedPass = ""
let passLower = "abcdefghijklmnopqrstuvwxyz"
let passUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let passNumber = "1234567890"
let passSymbols ="!?()-.[]_`~;:#$%^%*+="
let passAllowed = passLower + passUpper + passNumber + passSymbols
let sliderValue 
    
slider.addEventListener("input", ()=>{
  sliderValue = (slider.value / 20) * 100
  slider.style.backgroundSize = sliderValue.toString() + "%"
})
copy.addEventListener("click", () => {
    copied.classList.remove("hidden")
    navigator.clipboard.writeText(generatedPass)
})
checkBoxes.forEach((check) => {
    check.addEventListener("input", ()=> {
        if(check.checked){
            switch(check.className){
                case "Upper":
                    passAllowed += passUpper 
                    break
                case "Lower":
                    passAllowed += passLower 
                    break
                case "Number":
                    passAllowed += passNumber 
                    break
                case "Symbols":
                    passAllowed += passSymbols 
                    break
            }
        }
        if(!check.checked){
            switch(check.className){
                case "Upper":
                    passAllowed = passAllowed.replace(passUpper, "")
                    break
                case "Lower":
                    passAllowed = passAllowed.replace(passLower, "") 
                    break
                case "Number":
                    passAllowed = passAllowed.replace(passNumber, "") 
                    break
                case "Symbols":
                    passAllowed = passAllowed.replace(passSymbols, "")
                    break
            }
        }
        
    })
})

generateBtn.addEventListener("click", () => {
    generatedPass = ""
    boxes[0].classList.remove("fill-box")
    boxes[1].classList.remove("fill-box")
    boxes[2].classList.remove("fill-box")
    boxes[3].classList.remove("fill-box")
    for(let i = 1; i <= slider.value; i++){
        generatedPass += passAllowed.charAt(Math.round(Math.random() * passAllowed.length))
    }
    copied.classList.add("hidden")
    password.innerText = generatedPass
    
    console.log(zxcvbn(generatedPass).score)
    switch(zxcvbn(generatedPass).score){
        case 0:
        case 1:
            strength.innerHTML = " VERY WEAK"
            boxes[0].classList.add("fill-box")
            break
        case 2:
            strength.innerHTML = "WEAK"
            boxes[0].classList.add("fill-box")
            boxes[1].classList.add("fill-box")
            break
        case 3:
            strength.innerHTML = "GOOD"
            boxes[0].classList.add("fill-box")
            boxes[1].classList.add("fill-box")
            boxes[2].classList.add("fill-box")
            break
        case 4:
            strength.innerHTML = " VERY GOOD"
            boxes[0].classList.add("fill-box")
            boxes[1].classList.add("fill-box")
            boxes[2].classList.add("fill-box")
            boxes[3].classList.add("fill-box")
            break
    }


})



