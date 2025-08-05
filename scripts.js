let onOperator = false;
let operatorVar = "";
let tempvar = 0;

const arrowOperator = {
    "+": (a,b) => a+b, 
    "-": (a,b) => a-b,
    "÷": (a,b) => a/b,
    "x": (a,b) => a*b
}

buttons = document.querySelectorAll("button");
operate = document.querySelectorAll(".operate");
output = document.querySelector("#inputOutput");
allClear = document.querySelector("#AC");


allClear.addEventListener("click", () => {
    output.textContent = 0;
    onOperator = false;
    operatorVar = "";
    tempvar = 0;
    console.log(output.textContent);
})

operate.forEach((operateEach) => {
    operateEach.addEventListener("click", () => {
        if (onOperator === true){
                if (operatorVar != "="){
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

    })
})


buttons.forEach((button) => {
    button.addEventListener("mousedown", () =>{
        if (typeof parseInt(button.id) === "number" && !Number.isNaN(button.id) && onOperator === false){
            output.textContent = parseFloat(parseFloat(output.textContent) + button.id);
        } else if (typeof parseInt(button.id) === "number" && !Number.isNaN(parseInt(button.id)) && onOperator === true){
            if (tempvar === output.textContent){
                output.textContent = 0;
            }   
            output.textContent = parseFloat(parseFloat(output.textContent) + (button.id));
        }
        
        
        button.style.opacity = 0.6;
    })

    button.addEventListener("mouseup", () => {
        setTimeout(() => {
            button.style.opacity = 1.0;
        }, 200);
    })
})

