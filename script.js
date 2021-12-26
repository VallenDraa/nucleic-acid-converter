const inputField = document.getElementsByClassName("input-field")[0];
const convertBtn = document.getElementsByClassName("fa-exchange-alt")[0];
const typeCheckboxes = document.querySelectorAll(".checkbox");
const resultField = document.getElementsByClassName("result-field")

// for the input field
let inputValue ="";
let sequenceArray = [] 
// for the checkbox
let checkboxValues =[];
let inputType = "";


// eventListeners

// input field listener
inputField.addEventListener("input", ()=>{
    inputValue = inputField.value.toUpperCase();    
    inputValue = inputValue.replaceAll(" ", "")
})
// input type listener
for(let i=0; i<typeCheckboxes.length; i++){
        typeCheckboxes[i].addEventListener("input",()=>{
            if(typeCheckboxes[i].checked){
                inputType = checkboxProcess(checkboxValues, typeCheckboxes, inputValue)
            }
        })
    }
// convert button listener
convertBtn.addEventListener("click", ()=>{
    sequenceArray = insertInputToArr(inputValue, sequenceArray)
    if(inputType == "sense"){
        resultField[0].value = sequenceArray.join("-")
        resultField[1].value =(codonToAntiSense(antiCodonToCodon(senseToAntiCodon(sequenceArray)))).join("-") //to antisense
        resultField[2].value =(antiCodonToCodon(senseToAntiCodon(sequenceArray))).join("-") //to codon
        resultField[3].value =(senseToAntiCodon(sequenceArray)).join("-") //to anticodon
    }
    else if(inputType == "antiSense"){
        resultField[0].value =(antiSenseToSense(sequenceArray).join("-"))//to sense
        resultField[1].value =sequenceArray.join("-")
        resultField[2].value =(antiCodonToCodon(senseToAntiCodon(antiSenseToSense(sequenceArray)))).join("-") //to codon
        resultField[3].value =(senseToAntiCodon(antiSenseToSense(sequenceArray))).join("-") //to anticodon
    }
    else if(inputType == "codon"){
        resultField[0].value =(antiSenseToSense(codonToAntiSense(sequenceArray))).join("-") //to codon
        resultField[1].value =(codonToAntiSense(sequenceArray)).join("-") //to anti sense
        resultField[2].value =sequenceArray.join("-")
        resultField[3].value =(senseToAntiCodon(antiSenseToSense(codonToAntiSense(sequenceArray)))).join("-") //to anti codon
    }
    else if(inputType == "antiCodon"){
        resultField[0].value =(antiSenseToSense(codonToAntiSense(antiCodonToCodon(sequenceArray)))).join("-")
        resultField[1].value =(codonToAntiSense(antiCodonToCodon(sequenceArray))).join("-")
        resultField[2].value =(antiCodonToCodon(sequenceArray)).join("-")
        resultField[3].value =sequenceArray.join("-")
    }
    else{
        alert("Please Select The Valid Input Type Or Input A Valid Sequence")
    }
})


// Functions
function insertInputToArr(inputValueAr, resultArrayAr){
    inputValueAr = inputValueAr.toUpperCase();
    for(let i = 0; i <= inputValueAr.length; i++){
        // i%4 because the insert function replaces the I'th index
        if(i%4 == 0){
            inputValueAr = inputValueAr.insert(i," ")
        }
    }
    resultArrayAr = inputValueAr.split(" ");
    resultArrayAr.shift();
    resultArrayAr.pop();
    return resultArrayAr;  
}
function checkboxProcess(checkboxValuesAr, dataAr, inputValueAr){
    checkboxValuesAr=[]
    for(let x = 0; x < dataAr.length; x++) {
    checkboxValuesAr.push(dataAr[x].checked);
    } 

    if(checkboxValuesAr[0].toString() == "true" && !inputValueAr.includes("U") && inputValueAr.includes("T")){
        return "sense"
    }
    else if(checkboxValuesAr[1].toString()== "true" && !inputValueAr.includes("U")&& inputValueAr.includes("T")){
        return "antiSense"
    }
    else if(checkboxValuesAr[2].toString()== "true"  && !inputValueAr.includes("T")&& inputValueAr.includes("U")){
        return "codon"
    }
    else if(checkboxValuesAr[3].toString()== "true"  && !inputValueAr.includes("T")&& inputValueAr.includes("U")){
        return "antiCodon"
    }
}


// conversion Functions
function antiSenseToSense(sequenceArrayArr){
    let tempSeq = sequenceArrayArr.join("")
    let tempChar = "";
    let tempCharArr = [];
    let tempString = "";
    let finalResult = [];

    // The Conversion
    for(let i = 0; i <tempSeq.length; i++){
        if(tempSeq[i] == "A"){
            tempChar = tempSeq[i].replace('A', 'T');
            tempCharArr.push(tempChar);
        }   
        else if(tempSeq[i] == "T"){
            tempChar = tempSeq[i].replace('T', 'A');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "G"){
            tempChar = tempSeq[i].replace('G', 'C');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "C"){
            tempChar = tempSeq[i].replace('C', 'G');
            tempCharArr.push(tempChar);
        }
    }
    
    for(let i = 0; i < tempCharArr.length; i++){
        tempString = tempString.concat(tempCharArr[i]);
    }
    for(let i = 0; i <= tempString.length; i++){
        // i%4 because the insert function replaces the I'th index
        if(i%4 == 0){
            tempString = tempString.insert(i," ")
        }
    }
    finalResult = tempString.split(" ");
    finalResult.shift();
    finalResult.pop();
    return(finalResult);  
}
function codonToAntiSense(sequenceArrayArr){

    let tempSeq = sequenceArrayArr.join("")
    let tempChar = "";
    let tempCharArr = [];
    let tempString = "";
    let finalResult = [];

    // The Conversion
    for(let i = 0; i <tempSeq.length; i++){
        if(tempSeq[i] == "A"){
            tempChar = tempSeq[i].replace('A', 'A');
            tempCharArr.push(tempChar);
        }   
        else if(tempSeq[i] == "U"){
            tempChar = tempSeq[i].replace('U', 'T');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "G"){
            tempChar = tempSeq[i].replace('G', 'G');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "C"){
            tempChar = tempSeq[i].replace('C', 'C');
            tempCharArr.push(tempChar);
        }
    }

    for(let i = 0; i < tempCharArr.length; i++){
        tempString = tempString.concat(tempCharArr[i]);
    }
    for(let i = 0; i <= tempString.length; i++){
        // i%4 because the insert function replaces the I'th index
        if(i%4 == 0){
            tempString = tempString.insert(i," ")
        }
    }
    finalResult = tempString.split(" ");
    finalResult.shift();
    finalResult.pop();
    return(finalResult);  
}
function antiCodonToCodon(sequenceArrayArr){

    let tempSeq = sequenceArrayArr.join("")
    let tempChar = "";
    let tempCharArr = [];
    let tempString = "";
    let finalResult = [];

    // The Conversion
    for(let i = 0; i <tempSeq.length; i++){
        if(tempSeq[i] == "U"){
            tempChar = tempSeq[i].replace('U', 'A');
            tempCharArr.push(tempChar);
        }   
        else if(tempSeq[i] == "A"){
            tempChar = tempSeq[i].replace('A', 'U');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "G"){
            tempChar = tempSeq[i].replace('G', 'C');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "C"){
            tempChar = tempSeq[i].replace('C', 'G');
            tempCharArr.push(tempChar);
        }
    }

    for(let i = 0; i < tempCharArr.length; i++){
        tempString = tempString.concat(tempCharArr[i]);
    }
    for(let i = 0; i <= tempString.length; i++){
        // i%4 because the insert function replaces the I'th index
        if(i%4 == 0){
            tempString = tempString.insert(i," ")
        }
    }
    finalResult = tempString.split(" ");
    finalResult.shift();
    finalResult.pop();
    return(finalResult);  
}
function senseToAntiCodon(sequenceArrayArr){

    let tempSeq = sequenceArrayArr.join("")
    let tempChar = "";
    let tempCharArr = [];
    let tempString = "";
    let finalResult = [];

    // The Conversion
    for(let i = 0; i <tempSeq.length; i++){
        if(tempSeq[i] == "A"){
            tempChar = tempSeq[i].replace('A', 'A');
            tempCharArr.push(tempChar);
        }   
        else if(tempSeq[i] == "T"){
            tempChar = tempSeq[i].replace('T', 'U');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "G"){
            tempChar = tempSeq[i].replace('G', 'G');
            tempCharArr.push(tempChar);
        }
        else if(tempSeq[i] == "C"){
            tempChar = tempSeq[i].replace('C', 'C');
            tempCharArr.push(tempChar);
        }
    }

    for(let i = 0; i < tempCharArr.length; i++){
        tempString = tempString.concat(tempCharArr[i]);
    }
    for(let i = 0; i <= tempString.length; i++){
        // i%4 because the insert function replaces the I'th index
        if(i%4 == 0){
            tempString = tempString.insert(i," ")
        }
    }
    finalResult = tempString.split(" ");
    finalResult.shift();
    finalResult.pop();
    return(finalResult);  
}



// Utility Functions Prototypes
String.prototype.insert = function(index, concatenatedWord){
    let tempString1;
    let tempString2;

    for(let i = 0; i <= this.length; i++){
        if(i == index){
            tempString1 = this.substr(0, i)
            tempString1 = tempString1.concat(concatenatedWord); 
            tempString2 = this.substr(i,this.length) 
            return tempString1+tempString2;
        }
    }

    if(index > this.length || index < this.length){
        return "Index Out Of Range Exception"
    }
}
String.prototype.replaceAt = function(stringToInsert, index){
    let tempString1;
    let targetChar;
    let tempString2;

    for(let i = 0; i <= this.length; i++){
        if(i == index){ 
            tempString1 = this.substr(0, i)
            targetChar = string[i].replace(this[i],stringToInsert)
            tempString2 = this.substr(i+1,this.length) 
            return(tempString1+targetChar+tempString2)
        }
    }

   
}
Array.prototype.occurences = function(arr, string){
    // returns the amount of occurences of a string in an array
    let counter = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].toString() === string){
            counter++;
        }
    }
    return counter;
}