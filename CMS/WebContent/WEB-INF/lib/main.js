/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.
 *
 */
var student_array = [];
var data_object = {};

// define ajax paramenter

var ajaxParams = {
    data: data_object,
    dataType: 'json',
    url: '',
    method: 'post',
    success: '', 
    error: ""
}
 
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
    readDataFromSGT();      
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){

    $("#add_btn").click( handleAddClicked );
    $(".btn-default").click( handleCancelClick );
    $("#update_btn").click( handleUpdateClicked );
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();
}

/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
} 

/***************************************************************************************************
 * handleUpdateClicked - Event Handler when user clicks the update button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleUpdateClicked(){    
    updateStudent();
    
}
/***************************************************************************************************
 * handleDeleteBtnClicked - Event Handler when user clicks the update button
 * @param: targetrow studentindex , 
 * @return: 
       none
 */
function handleDeleteBtnClicked(currentStudent, studentindex){
    displayConfirmModal(currentStudent, studentindex);
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('') ;
}

/***************************************************************************************************
 * popupMsg -  message show with modal 
 * @param response: message
 */
function popupMsg( response ){
    $(".modal-body > p").text(response);
    $('#confirmModal').modal();
  
}


/***************************************************************************************************
 * readDataFromSGT - call ajax to read student data
 * @param none
 * @returns {undefined} none
 * @calls  */

function readDataFromSGT(){
    
    ajaxParams.data = data_object;
    ajaxParams.url = 'index_select.jsp';
    ajaxParams.success =getStudentList;
    $.ajax(ajaxParams);   
    
}


/***************************************************************************************************
 * getStudentList - read student data from ajax
 * @param response  the ajax sucess respnse
 * @returns {undefined} none
 * @calls  */

function  getStudentList(response){
    if(response.success){
        for( let i  in  response.data) {
            let    student = {};
            student.id = response.data[i].id;
            student.name = response.data[i].name;
            student.course =  response.data[i].course;
            student.grade =  response.data[i].grade;
            student_array.push(student);
            updateStudentList();
        }
       
    }else{
        popupMsg(response.errors);
    }
}



/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(){
    $("tbody").empty();
    for( let i = 0 ;  i < student_array.length ; i++ ) {
        renderStudentOnDom(student_array[i]);
    }
    let average = calculateGradeAverage(student_array);
    renderGradeAverage(average);
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    let    student = {};
    student.name =  $('#studentName').val();
    student.course =  $('#course').val();
    student.grade =  $('#studentGrade').val();
    let valid = validateData( student.name, student.course,student.grade , "parent");
    if(valid ){
        data_object.name = student.name;
        data_object.course = student.course;
        data_object.grade     = Number(student.grade);
        ajaxParams.data = data_object;
        ajaxParams.url = 'index_insert.jsp';
        $.ajax(ajaxParams);   
        student_array.push(student);
        updateStudentList();
        clearAddStudentFormInputs();
    } 
}
/***************************************************************************************************
 * updateStudent - update a student info
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function updateStudent(){
    let    student = {};
    // data_object ={};
    student.student_id =  $('#studentId').val();
    student.name =  $('#updStudentName').val();
    student.course =  $('#updCourse').val();
    student.grade =  $('#updstudentGrade').val();
    let valid = validateData( student.name, student.course,student.grade , "popup");
    if(valid ){
        $("tbody").empty();
        data_object.student_id = student.student_id ;
        data_object.name = student.name;
        data_object.course = student.course;
        data_object.grade     = Number(student.grade);
        ajaxParams.data = data_object;
        ajaxParams.url = 'index_update.jsp';
        $.ajax(ajaxParams);   
        updateStudentArray(data_object);
        
    } 
}
/***************************************************************************************************
* displayConfirmModal -  displaying model
* @params {studnetrow,studentIndex } 
* @returns  {undefined}
*/

function displayConfirmModal(studnetrow, studentIndex){
    $(".modal-body > p").text("Do you want to delete this data?");
    $('#confirmModal').modal();
    $("#cancel_btn").on("click", closeDeletingModal);
    $("#delete_btn").on("click", ()=>{
    deleteStudent(studnetrow , studentIndex);
    });

}

/***************************************************************************************************
* closeDeletingModal - close displaying model
* @params {none} 
* @returns  {undefined}
*/
function closeDeletingModal(){
    let modal = $('#confirmModal').css('display','none');
}


/***************************************************************************************************
 * deleteStudent - delete student info
 * @param {student, studentIndex} none
 * @return undefined
 */
function deleteStudent(currentStudent,studentIndex){
    let   data_object ={};
    
    data_object.student_id = currentStudent.id;
    ajaxParams.url = 'index_delete.jsp';
    ajaxParams.data = data_object;
    $.ajax(ajaxParams);
    student_array.splice(studentIndex,1);
    updateStudentList();
    let average = calculateGradeAverage(student_array);
    renderGradeAverage(average);
    closeDeletingModal();
}

// /***************************************************************************************************
//  * updateStudentArray - update student_array
//  * /
 
function updateStudentArray(dataobj){
    for(let i=0; i < student_array.length; i++){
        if(student_array[i].id === dataobj.student_id){
            let index = i;
            student_array.splice(index,1,dataobj);
        }
        updateStudentList();
    }
}


/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
    // data_object ={};
    let row = $('<tr>');
    row.attr('id', studentObj.id);
    let column = '<td>' + studentObj.name + '</td>'
        + '<td>' + studentObj.course + '</td>'
        + '<td>' + studentObj.grade + '</td>'
    var tableButton1 = $("<td>");
    var updateBtn = $('<button>').addClass('btn btn-info');  
    updateBtn.text('Update');  
    var tableButton2 = $("<td>");
    var deleteBtn = $('<button>').addClass('btn btn-danger');
    deleteBtn.text('Delete');
    var body = $(".table").find('tbody');
    row.append(column);
    tableButton1.append(updateBtn);
    row.append(updateBtn);
    tableButton2.append(deleteBtn);
    row.append(deleteBtn);
    row.appendTo(body);
    // delete button click
    deleteBtn.click( function(){
        let stuIndex = student_array.indexOf(studentObj);
        let currentStudent = student_array[stuIndex]; 
        handleDeleteBtnClicked(currentStudent, stuIndex);
    });

   // Edit button click
    updateBtn.click( function(){
        
        $('#updModal').modal("show");
        data_object ={};
        let stuIndex = student_array.indexOf(studentObj);
        let targetrow = $(event.currentTarget).parent();

        let student_id = parseInt(targetrow.attr('id'));
        $('#studentId').val(student_id);
        $('#updStudentName').val(targetrow[0].children[0].innerText);
        $('#updCourse').val(targetrow[0].children[1].innerText);
        $('#updstudentGrade').val(targetrow[0].children[2].innerText );
    });

}

/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_list){
    let sum = 0;
    for( let i=0;  i < student_list.length ; i++ ){
        sum += parseFloat(student_list[i].grade);
    }
    return parseInt(sum / (student_list.length));
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $(".badge").text( isNaN(average) ?  0 : average );
}

/***************************************************************************************************
 * validateData - check input data is valid for student table 
 * @param students name, course, grade
 * @returns true,false 
 */
function validateData(fullName, course, grade, type){
    // name
    var validName = /^[a-zA-Z]+ ?[a-zA-Z]*$/;
    var validCourse = /^[a-zA-Z]+ ?[a-zA-Z]*$/;
    var validGrade = /^[0-9]{1,3}$/;
    
    if ( !validName.test(fullName)){
        if(type==="parent"){
           $(".student-name").addClass("has-error");
		   $(".student-icon").popover("show");
        }else{
              alert("Name must be filled out");
        }
        return false;
    }else{
        $(".student-name").removeClass("has-error");
        $(".student-name").addClass("has-success");
        $(".student-icon").popover("hide");            
    }
    //course
    if ( !validCourse.test(course)){
        if(type==="parent"){
            $(".student-course").addClass("has-error");
		    $(".course-icon").popover("show");
        }else{
            $("#updModal .invalid-course")
                .text("Course must be filled out")
                .css("display", "block");
            // alert("Course must be filled out");
        }
        return false;
    } else{
            $(".student-course").removeClass("has-error");
            $(".student-course").addClass("has-success");
            $(".course-icon").popover("hide");
            $('#updModal').modal("hide");
    }
    // grade
    if( (!validGrade.test(grade)) && ( praseInt(grade) > 100)  ){
        if(type==="parent"){
            $(".student-grade").addClass("has-error");
		    $(".grade-icon").popover("show");
        }else{
             alert("Grade Number must between 0 ~ 100");
        }
        return false;
    } else{
        $(".student-grade").removeClass("has-error");
        $(".student-grade").addClass("has-success");
        $(".grade-icon").popover("hide");
    }
    return true;
}






