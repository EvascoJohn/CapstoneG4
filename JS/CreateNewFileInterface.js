/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script> */
    // document.addEventListener("DOMContentLoaded", function() {
    //constant values related to table inputs
    const studentName = document.getElementsByName("student_name[]");
    const lecGrade = document.getElementsByName("lectureGrade[]");
    const labGrade= document.getElementsByName("labGrade[]");
    const mainContent = document.getElementById("content");
    const gradeTable = document.getElementById("gradeTable");
    const summaryReport = document.getElementById("Action-Summary");
    const addStudentButton = document.getElementById("addStudentButton");
    const exportButton = document.getElementById("exportButton");
    const removeStudentRow = document.getElementById("removeStudent");
    const resetTable = document.getElementById("resetTable");
    const selectOption = document.getElementsByName("Period");
    const gradeInput = document.querySelectorAll('.gradeInput');
    var newReport = document.getElementById('Summary-Report');
    var inputBox = document.getElementsByTagName('Input');


    window.addEventListener('load', (event) => {
        // Your code here
        if (localStorage.getItem('formData')) {
            // There is form data in the local storage, so restore it
            const formData = JSON.parse(localStorage.getItem('formData'));
            // Restore the form data here
          }
      });


    //variables/arrays for grades and computations
    const fortyPercent = .40;
    const sixtyPercent = .60;
    var numofStudents = 0;
    
    // textarea.addEventListener('input', adjustTextareaHeight);
    // function adjustTextareaHeight() {
    //     const textarea = document.getElementById('area');
    //     textarea.style.height = 'auto';
    //     textarea.style.height = textarea.scrollHeight + 'px';
    // }

    //new row of inputs  
    addStudentButton.addEventListener("click", function() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td><input type="text" name="student_name[]"></td>
        <td><input class="Lec-Grades" type="number" min="60" max="100" name="lectureGrade[]"  ></td>
        <td><input class="Lab-Grades" type="number" min="60" max="100" name="labGrade[]"  ></td>
        <td></td>
        `;
        gradeTable.appendChild(newRow);
    });//end add student function
    
    //delete row of inputs
    removeStudentRow.addEventListener("click", function() {
        if (studentName.length > 1){
            gradeTable.deleteRow(-1);
        }
    });

    //reset table
    resetTable.addEventListener("click", function(){
        while (studentName.length > 1){
            gradeTable.deleteRow(-1);
        }
    }
    )


        
    function countStudent(){
    var numofStudents = 0;
        //count number of students
        for (let i = 0; i < studentName.length; i++){
        
            // console.log("value " + studentName[i].value); //CHECK IF STUDENT NAME GOT SAVED
    
                if (studentName[i].value == null || studentName[i].value == ""){
                }
                else{
                    numofStudents++;
                }
            }
            // console.log("numofStudents: " + numofStudents);//CHEKING

        return numofStudents;
    }


// Restore input values from local storage
window.addEventListener('DOMContentLoaded', (event) => {
    const storedData = JSON.parse(localStorage.getItem('studentData')) || [];
   
    for (let i = 0; i < storedData.length; i++) {
       gradeTable.rows[i + 1].cells[0].textContent = storedData[i].name;
       gradeTable.rows[i + 1].cells[1].children[0].value = storedData[i].lecGrade;
       gradeTable.rows[i + 1].cells[2].children[0].value = storedData[i].labGrade;
    }
   });
   
   // Store input values in local storage
   function storeData() {
    const studentData = [];
   
    for (let i = 0; i < gradeTable.rows.length - 1; i++) {
       const name = gradeTable.rows[i + 1].cells[0].textContent;
       const lecGrade = gradeTable.rows[i + 1].cells[1].children[0].value;
       const labGrade = gradeTable.rows[i + 1].cells[2].children[0].value;
   
       studentData.push({ name, lecGrade, labGrade });
    }
   
    localStorage.setItem('studentData', JSON.stringify(studentData));
   }
   
   // Call storeData function on each input box's 'change' event
   for (let j = 0; j < gradeTable.rows.length - 1; j++) {
    const lecGradeInput = gradeTable.rows[j + 1].cells[1].children[0];
    const labGradeInput = gradeTable.rows[j + 1].cells[2].children[0];
   
    lecGradeInput.addEventListener('change', storeData);
    labGradeInput.addEventListener('change', storeData);
   }


    //AUTO Update "computations"
    gradeTable.addEventListener("input", function(event) {
        if (event.target.classList.contains("Lab-Grades") || event.target.classList.contains("Lec-Grades")) {
            const gradeValue = parseFloat(event.target.value) ;
            if (gradeValue < 60 || gradeValue > 100){//input range should be 50 - 100    
                if(gradeValue > 100){
                    event.target.value = 100;   
                }
                else{
                    event.target.style.color = "red";
                    event.target.style.fontsize = "2.5em";
                }  
            }
            else{
                event.target.style.color = "black";
            }
        }
    calculate();  
    });//end computations function
    
    function calculate(){
        numofStudents =  countStudent();
        // console.log("type of numstud: " + typeof(numofStudents));//CHEKING
        
        var finalGrade = [];
        var finalLecGrade = [];//40%
        var finalLabGrade = [];//60%
        // var finalGradeAVG = 0;
        var numOfStudentPassed_finalGrade = 0;
        var percentageOfStudentPassed_finalGrade = 0;
        var numOfStudentFailed_finalGrade = 0;
        var percentageOfStudentFailed_finalGrade = 0;
        // var finalGradeMIN = 100;
        // var finalGradeMAX = 0;
        var finalGradeSum = 0;
        var lecSum = 0;
        var labSum = 0;
        var lecNumberOfStudents_Passed = 0;
        var labNumberOfStudents_Passed = 0;
        var lecNumberOfStudents_Failed = 0;
        var labNumberOfStudents_Failed = 0;
        var HighestLectureGradePercentage = 0;
        var LowestLectureGradePercentage = 100;   
        var HighestLaboratoryGradePercentag = 0;
        var LowestLaboratoryGradePercentage = 100;
        var AverageLaboratoryGrade = 0;
        var AverageLectureGrade = 0;
        var percentageOfStudentPassed_Lec = 0;
        var percentageOfStudentPassed_Lab = 0;
        var percentageOfStudentFailed_Lec = 0;
        var percentageOfStudentFailed_Lab = 0;
        
        
        
        //FINAL GRADE COMPUTATION (FOR SUMMARY REPORT)vvvvv

        for (var i = 0; i < lecGrade.length; i++){
            finalLecGrade[i] = (parseFloat(lecGrade[i].value) * fortyPercent).toFixed(2); //getting 40% per lecture grade
            // console.log("final grade: " + finalLecGrade[0]);//CHECKING
        }
        for (var i = 0; i < labGrade.length; i++){
            finalLabGrade[i] = (parseFloat(labGrade[i].value) * sixtyPercent).toFixed(2); //getting 60% per laboratory grade
        }


        // console.log(finalLecGrade[0]);//CHECKING
        // console.log(typeof(finalLecGrade));//CHECKING

        //calculate final grade
        var finalGradeSum = 0;
        for (var i = 0; i < finalLecGrade.length; i++){
            // console.log(typeof(finalLecGrade));//CHECKING
            finalGrade[i] = parseFloat(finalLecGrade[i]) + parseFloat(finalLabGrade[i]);
            // console.log(finalLecGrade[i] + " + " + finalLabGrade[i] + " = " + finalGrade[i] );//CHECKING
            finalGradeSum = finalGrade[i] + finalGradeSum;
        }
        
        //get average of final grade
        finalGradeAVG = finalGradeSum / numofStudents.length;

        //get number of passed and failed student
        for (var i = 0; i < finalGrade.length; i++){
            finalGrade[i] = parseFloat(finalGrade[i]);
        
            if (!isNaN(finalGrade[i])){
            
                if (finalGrade[i] >= 75){
                    numOfStudentPassed_finalGrade++;
                    // console.log("student final passed: " + numOfStudentPassed_finalGrade);//CHECKING
                }
                else{
                    numOfStudentFailed_finalGrade++;
                    // console.log("student final failed: " + numOfStudentFailed_finalGrade);//CHECKING
                }
            }
            else{
                // console.log("type: " + typeof(finalGrade[i]));//CHECKING
            }
        }
        //get percentage of passed and failed student
        percentageOfStudentPassed_finalGrade = ((numOfStudentPassed_finalGrade/numofStudents) * 100).toFixed(2);
        percentageOfStudentFailed_finalGrade = ((numOfStudentFailed_finalGrade/numofStudents) * 100).toFixed(2);


        //result computations
        for (var count = 0; count < lecGrade.length; count++){
            //get LECUTRE average
            const lecGradeValue = parseFloat(lecGrade[count].value);
            if (lecGradeValue >= 75  && lecGradeValue  <= 100 && lecGradeValue !='' && lecGradeValue !=null){
                lecNumberOfStudents_Passed++;
            }
            else if(lecGradeValue >= 50  && lecGradeValue  <= 74 && lecGradeValue !='' && lecGradeValue !=null){
                lecNumberOfStudents_Failed++;
            }//end if

            percentageOfStudentPassed_Lec = ((lecNumberOfStudents_Passed / numofStudents) * 100).toFixed(2);
            percentageOfStudentFailed_Lec = ((lecNumberOfStudents_Failed / numofStudents) * 100).toFixed(2);
            lecSum += parseFloat(lecGradeValue);    
            // console.log("typee: " + typeof(parseFloat(AverageLectureGrade.toFixed(2))));//CHEKING
            AverageLectureGrade = lecSum / numofStudents;
            
            //Highest grade
            if (parseFloat(lecGradeValue) > HighestLectureGradePercentage){
                HighestLectureGradePercentage = lecGradeValue;
            }
            //lowest Grade
            if (parseFloat(lecGradeValue) < LowestLectureGradePercentage){
                LowestLectureGradePercentage = lecGradeValue;
            }  
        }//end lecture for loop

        for (var count = 0; count < labGrade.length; count++){
            //get LABORATORY average
            const labGradeValue = parseFloat(labGrade[count].value);
            if (labGradeValue >= 75  && labGradeValue  <= 100){
                labNumberOfStudents_Passed++; 
            }
            else if (labGradeValue >= 50  && labGradeValue  <= 74){
                labNumberOfStudents_Failed++;
            }//end if

            percentageOfStudentPassed_Lab = ((labNumberOfStudents_Passed / numofStudents) * 100).toFixed(2);
            percentageOfStudentFailed_Lab = ((labNumberOfStudents_Failed / numofStudents) * 100).toFixed(2);
            labSum += parseFloat(labGradeValue);   
            AverageLaboratoryGrade = labSum / numofStudents;
            
            //Highest grade
            if (labGradeValue > HighestLaboratoryGradePercentag){
                HighestLaboratoryGradePercentag = labGradeValue;
            }
            //lowest Grade
            if (labGradeValue < LowestLaboratoryGradePercentage){
                LowestLaboratoryGradePercentage = labGradeValue;
            }
        }//end laboratory for loop
        
        // console.log("student passed: " + percentageOfStudentPassed_Lec);//CHECKING
        
        
        
        
        //Print computation results into HTML
        document.getElementById("lecGradeAvg").innerHTML = AverageLectureGrade.toFixed(2);
        document.getElementById("labGradeAvg").innerHTML = AverageLaboratoryGrade.toFixed(2);
        document.getElementById("labNumberOfStudents_Passed").innerHTML = labNumberOfStudents_Passed;
        document.getElementById("lecNumberOfStudents_Passed").innerHTML = lecNumberOfStudents_Passed;
        document.getElementById("labNumberOfStudents_Failed").innerHTML = labNumberOfStudents_Failed;
        document.getElementById("lecNumberOfStudents_Failed").innerHTML = lecNumberOfStudents_Failed;
        document.getElementById("HighestLaboratoryGradePercentag").innerHTML = HighestLaboratoryGradePercentag;
        document.getElementById("HighestLectureGradePercentage").innerHTML = HighestLectureGradePercentage;
        document.getElementById("LowestLaboratoryGradePercentage").innerHTML = LowestLaboratoryGradePercentage;
        document.getElementById("LowestLectureGradePercentage").innerHTML = LowestLectureGradePercentage;
        
        generateSummaryReport(
            lecNumberOfStudents_Passed, //ok
            lecNumberOfStudents_Failed, //
            labNumberOfStudents_Passed, //
            labNumberOfStudents_Failed,//
            percentageOfStudentPassed_Lec, //ok
            percentageOfStudentFailed_Lec, //
            percentageOfStudentPassed_Lab,//
            percentageOfStudentFailed_Lab,//
            numofStudents,//
            numOfStudentPassed_finalGrade, 
            numOfStudentFailed_finalGrade,
            percentageOfStudentPassed_finalGrade,
            percentageOfStudentFailed_finalGrade    
        );
        
    }
    
    
    
    
    
    function generateSummaryReport(
        lecNumberOfStudents_Passed,
        lecNumberOfStudents_Failed,
        labNumberOfStudents_Passed, 
        labNumberOfStudents_Failed,
        percentageOfStudentPassed_Lec, 
        percentageOfStudentFailed_Lec,
        percentageOfStudentPassed_Lab,
        percentageOfStudentFailed_Lab,
        numofStudents,
        numOfStudentPassed_finalGrade, 
        numOfStudentFailed_finalGrade,
        percentageOfStudentPassed_finalGrade,
        percentageOfStudentFailed_finalGrade  
    ){
        // console.log("#student passed: " + lecNumberOfStudents_Passed);  //CHECKING

        newReport.innerHTML = " ";
        //summary report
        // newReport = document.createElement("td");
        var data = {
            lecNumberOfStudents_Passed: lecNumberOfStudents_Passed,
            lecNumberOfStudents_Failed: lecNumberOfStudents_Failed,
            labNumberOfStudents_Passed: labNumberOfStudents_Passed,
            labNumberOfStudents_Failed: labNumberOfStudents_Failed,
            percentageOfStudentPassed_Lec: percentageOfStudentPassed_Lec,
            percentageOfStudentFailed_Lec: percentageOfStudentFailed_Lec,
            percentageOfStudentPassed_Lab: percentageOfStudentPassed_Lab,
            percentageOfStudentFailed_Lab: percentageOfStudentFailed_Lab,
            numofStudents: numofStudents,
            numOfStudentPassed_finalGrade: numOfStudentPassed_finalGrade,
            numOfStudentFailed_finalGrade: numOfStudentFailed_finalGrade,
            percentageOfStudentPassed_finalGrade: percentageOfStudentPassed_finalGrade,
            percentageOfStudentFailed_finalGrade: percentageOfStudentFailed_finalGrade,
        };
    
        newReport.innerHTML = `
            <td id="Summary-Report">
            Data reveals that the students who passed obtained the frequency of <span>${data.lecNumberOfStudents_Passed}</span>, that means  
            <span>${data.percentageOfStudentPassed_Lec + '%'}</span> passed the lecture exam. Students who failed obtaned the 
            frequency of <span>${data.lecNumberOfStudents_Failed}</span>, that means <span>${data.percentageOfStudentFailed_Lec + '%'}</span> of the total 
            number of students failed the lecture exam
            <br>
            <br>
            Data reveals that the students who passed obtained the frequency of <span>${data.labNumberOfStudents_Passed}</span>, that means  
            <span>${data.percentageOfStudentPassed_Lab + '%'}</span> passed the laboratory exam. Students who failed obtaned the 
            frequency of <span>${data.labNumberOfStudents_Failed}</span>, that means <span>${data.percentageOfStudentFailed_Lab + '%'}</span> of the total 
            number of students failed the laboratory exam
            <br>
            <br>
            In summary, of <span>${data.numofStudents}</span>, <span>${data.numOfStudentPassed_finalGrade}</span> or <span>${data.percentageOfStudentPassed_finalGrade + '%'}</span> passed
            while <span>${data.numOfStudentFailed_finalGrade}</span> or <span>${data.percentageOfStudentFailed_finalGrade + '%'}</span> Failed the examination.
        </td>
    `;
        // summaryReport.appendChild(newReport);
    }

    
