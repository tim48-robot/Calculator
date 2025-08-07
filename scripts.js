let onOperator = false;
let operatorVar = "";
let numberClicked = false;
let tempvar = 0;
let memoryVar = 0;

const arrowOperator = {
    "+": (a,b) => a+b, 
    "-": (a,b) => a-b,
    "÷": (a,b) => a/b,
    "x": (a,b) => a*b
}

// document.getElementById() is better but the performance different is small.
allButton = document.querySelectorAll("button");
buttons = document.querySelectorAll(".number");
operate = document.querySelectorAll(".operate");
output = document.querySelector("#inputOutput");
allClear = document.querySelector("#AC");
negation = document.querySelector("#negation");
percentage = document.querySelector("#percent");
squareRoot = document.getElementById("sqrt");
dot = document.getElementById("dot");
memory = document.querySelector("#specialFunction");
backspace = document.querySelector("#backspace");
output.textContent="0";



allButton.forEach(eachButton => {

    eachButton.addEventListener("mousedown", ()=> {
        eachButton.style.opacity = 0.6;
    })

    eachButton.addEventListener("mouseup", () => {
        setTimeout(() => {
            eachButton.style.opacity = 1.0;
        }, 200);
    })

})




dot.addEventListener("click", () => {
    if (!output.textContent.includes(".")){
         output.textContent += ".";
    }
})

negation.addEventListener("click", () => {
    output.textContent = -output.textContent;
})

percentage.addEventListener("click", () => {
    output.textContent = output.textContent / 100;
})

backspace.addEventListener("click", () => {
    if (output.textContent.length === 1 && output.textContent != 0){
        if(tempvar===output.textContent){
            tempvar = 0;
        }
        output.textContent = 0;
    }
    else if (output.textContent === NaN || output.textContent.length === 1){
        // do nothing
    } 
    else {
        if (tempvar === output.textContent){
            tempvar = tempvar.slice(0,-1);
        }
        output.textContent = output.textContent.slice(0,-1);        
    }
})

squareRoot.addEventListener("click", () => {
    output.textContent = Math.sqrt(output.textContent);
    console.log(typeof output.textContent);
})


memory.addEventListener("click", (e) =>{

    if (e.target.tagName !== "BUTTON") return;
  
    
    switch (e.target.id){
        case "mc":
            console.log(e.id)
            memoryVar = 0;
            break;
        case "mr":
            output.textContent = memoryVar;
            break;

        case "m-":
            memoryVar -= parseFloat(output.textContent);
            break;

        case "m+":
            memoryVar += parseFloat(output.textContent);
            break;
    }
})




allClear.addEventListener("click", () => {
    output.textContent = 0;
    onOperator = false;
    operatorVar = "";
    tempvar = 0;
})

operate.forEach((operateEach) => {
    operateEach.addEventListener("click", () => {
        console.log(tempvar);
        console.log(onOperator);
        console.log(numberClicked);
        console.log(operatorVar)
        if (onOperator === true && numberClicked === true){
                if (operatorVar != "="){
                    console.log(tempvar);
                    console.log((output.textContent))
                    console.log(operatorVar)
                    tempvar = arrowOperator[operatorVar](parseFloat(tempvar), parseFloat(output.textContent))
                    console.log
                    output.textContent = tempvar;
                }
        }  

        else if (tempvar != 0){
            output.textContent = tempvar;
            tempvar = 0;
        }

        tempvar = output.textContent
        onOperator = true;
        operatorVar = operateEach.id;
        numberClicked = false;

    })
})


buttons.forEach((button) => {
    button.addEventListener("mousedown", () =>{
        if (!Number.isNaN(parseInt(button.id))){
            if (onOperator === false ){
                output.textContent = parseFloat(output.textContent + button.id);
            }

            else if (onOperator === true){
                if (tempvar === output.textContent){
                    output.textContent = button.id;
                    numberClicked = true;
                } 
                else {  
                    output.textContent = parseFloat((output.textContent) + (button.id));
                    numberClicked = true;
                }
            }

        }
        
    })
})

