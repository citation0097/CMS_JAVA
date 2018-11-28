<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html >
html>
<head>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="./lib/main.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Student Grade Management</title>
</head>
<body>
   
<div class="container">

        <div class="row">
            <!-- only show this element when the isnt on mobile -->
            <div class="hidden-xs">
                <div class="col-md-8">
                    <h1>Student Grade Table
                    </h1>
                </div>
                <div class="col-md-4">
                    <h1><small>Grade Average : <span class="badge"></span></small></h1>
                </div>
            </div>
            <!-- only show this element when the user gets to a mobile version -->
            <div class="hidden-sm hidden-md hidden-lg">
                <div class="col-xs-8">
                    <h3>Student Grade Table
                    </h3>
                </div>
                <div class="col-xs-4">
                    <h3><small>Grade Average : <span class="badge"></span></small></h3>
                </div>
            </div>

        </div>
        
    <!--<div class ="pull-right">-->
        <div class="form-horizontal col-md-3 pull-right">
            <h4>Add Student</h4>
            <div class="student-name form-group">
                <div class="input-group">
                        
                    <div class="input-group-addon">
                        <span class="student-icon glyphicon glyphicon-user" data-toggle="popover" data-placement="left" data-content="Please enter a valid name"></span>
                    </div>
                    <input type="text" class="form-control" name="name" id="studentName" placeholder="Student Name" required>
                </div>
                <!-- <p class="invalid-input invalid-name"></p> -->
            </div>
            <div class="student-course form-group">
                <div class="input-group">
                    <div class="input-group-addon">
                        <span class="course-icon glyphicon  glyphicon-list-alt" data-toggle="popover" data-placement="left" data-content="Please enter a valid course"></span>
                    </div>
                    <input type="text" class="form-control" name="course" id="course" placeholder="Student Course" required>
                </div>
                <!-- <p class="invalid-input invalid-course"></p> -->
            </div>
            <div class="student-grade form-group">
                <div class="input-group">
                    <div class="input-group-addon">
                        <span class="grade-icon glyphicon glyphicon-education" data-toggle="popover" data-placement="left" data-content="Please enter a grade between 0-100"></span>
                    </div>
                    <input type="number" min = 0 max=100 class="form-control" name="grade" id="studentGrade"  placeholder="Student Grade" required>
                </div>
                <!-- <p class="invalid-input invalid-grade"></p> -->
            </div>
           
                <button type="button" class="btn btn-success" id="add_btn" onclick=""> Add </button>
                <button type="button" class="btn btn-default" onclick="">Cancel</button>
            
            <!-- <button type="button" class="btn btn-info" onclick="">Get data</button> -->
        </div>
    <!--</div>-->
    <div class="table-responsive col-sm-12 col-md-9  pull-left">
        <table class="table ">
            <thead class="thead">
                <tr>
                    <th class="hidden-xs ">Student Name</th>
                    <th class="visible-xs hidden-sm hidden-md hidden-lg">Name</th>
                    <th class="hidden-xs ">Student Course</th>
                    <th class="visible-xs hidden-sm hidden-md hidden-lg">Course</th>
                    <th class="hidden-xs ">Student Grade</th>
                    <th class="visible-xs hidden-sm hidden-md hidden-lg">Grade</th>
                    <th class="hidden-xs ">Operations</th>
                    <th class="visible-xs hidden-sm hidden-md hidden-lg">Oper</th>
    
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="confirmModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Confirm!</h4>
            </div>
            <div class="modal-body">
                <p></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="delete_btn" >Confirm</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel_btn">Close</button>
            </div>
        </div>

    </div>
</div>

<div class="modal fade" id="updModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Student Grade Update</h4>
            </div>
            <div class="modal-body">
                    <div class="student-name-pop form-group">
                        <input type="hidden"  id="studentId" readonly  visible=false>
                        <label for="StudentName" class="col-sm-3 control-label">Name</label>
                        <div class="input-group col-sm-9">
                            <div class="student-icon-pop input-group-addon">
                                <!-- <span class="glyphicon glyphicon-user"></span> -->
                                <span class="student-icon-pop glyphicon glyphicon-user" data-toggle="popover" data-placement="left" data-content="Please enter a valid name"></span>
                            </div>
                            <input type="text" class="form-control" id="updStudentName" readonly>
                        </div>
                        <p class="invalid-input invalid-name"></p>
                    </div>
                    <div class="student-course-pop form-group">
                        <label for="dob" class="col-sm-3 control-label">Course</label>
                        <div class="input-group col-sm-9">
                            <div class="course-icon-pop input-group-addon">
                                <!-- <span class="glyphicon glyphicon-list-alt"></span> -->
                                <span class="course-icon-pop glyphicon  glyphicon-list-alt" data-toggle="popover" data-placement="left" data-content="Please enter a valid course"></span>
                            </div>
                            <input type="text" class="form-control" id="updCourse" placeholder="Student Course">
                        </div>
                        <p class="invalid-input invalid-course"></p>
                    </div>
                    <div class="student-grade-pop form-group">
                        <label for="" class="col-sm-3 control-label">Grade</label>
                        <div class="input-group col-sm-9">
                            <div class="input-group-addon">
                                <span class="grade-icon-pop glyphicon glyphicon-education"></span>
                            </div>
                            <input type="text" min=1 max=100 class="form-control" id="updstudentGrade" placeholder="Student Grade">
                        </div>
                        <p class="invalid-input invalid-grade"></p>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="update_btn" >Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
</body>
</html>
