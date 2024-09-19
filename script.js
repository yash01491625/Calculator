const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const prevOperandText = document.querySelector(".previous-operand");
const currOperandText = document.querySelector(".current-operand");
const clearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");

class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.clear()
    }
    clear() {   
        this.prevOperand = ""
        this.currOperand = ""
        this.operation = null
    }
    delete() {
        this.currOperand = this.currOperand.toString();
        this.currOperand = this.currOperand.substr(0, this.currOperand.length - 1);
    }    
    compute() {
        let final;
        if (this.prevOperand === '' || this.currOperand === '') return;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                final = prev + curr;
                break;  
            case '-':
                final = prev - curr;
                break;
            case '÷':
                final = prev / curr;
                break;
            case '*':
                final = prev * curr;
                break;
            default:
                return;
        }
        this.currOperand = final;
        this.operation = undefined;
        this.prevOperand = '';
    }
    append(number) {
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    displayNumber(number) {
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
    selectOperation(operation) {
        if(this.currOperand === '') return
        if(this.prevOperand != '') this.compute()
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }
    updateDisplay() {
        this.currOperandText.innerText = this.displayNumber(this.currOperand)
        if(this.operation != null) {
            this.prevOperandText.innerText = this.displayNumber(this.prevOperand) + "  " + this.operation
        } else {
            this.prevOperandText.innerText = ''
        }
        if (this.currOperand.length > 20) {
            this.currOperandText.style.fontSize = "1rem";
        } else if (this.currOperand.length > 15) {
            this.currOperandText.style.fontSize = "1.5rem";
        } else if (this.currOperand.length > 10) {
            this.currOperandText.style.fontSize = "2rem";
        } else {
            this.currOperandText.style.fontSize = "3rem";
        }
        if (this.prevOperand.length > 20) {
            this.prevOperandText.style.fontSize = "0.5rem";
        } else if (this.prevOperand.length > 15) {
            this.prevOperandText.style.fontSize = "1rem";
        } else if (this.prevOperand.length > 10) {
            this.prevOperandText.style.fontSize = "1.5rem";
        } else {
            this.prevOperandText.style.fontSize = "2rem";
        }        
    }
}

const calculator = new Calculator(prevOperandText, currOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()  
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()  
})