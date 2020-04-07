var createTables = function(students) {
    studentTable(students);
}

var getHWmean = function(student){
    return d3.mean(student.homework.map(function(homework){return homework.grade}))
}

var getHWSum = function(student){
    return d3.sum(student.homework.map(function(homework){return homework.grade}))
}

var getQuizMean = function(student){
    return d3.mean(student.quizes.map(function(quize){return quize.grade}))
}

var getQuizSum = function(student){
    return d3.sum(student.quizes.map(function(quize){return quize.grade}))
}

var gettestMean = function(student){
    return d3.mean(student.test.map(function(test){return test.grade}))
}

var getGrade = function(student){
    return student.final[0].grade*0.35 + gettestMean(student)*0.3 +
                           getQuizSum(student)*0.2 + getHWSum(student)*0.15
}

var studentTable = function(students)
{
    var rows = d3.select("#studentTable tbody")
      .selectAll("tr")
      .data(students)
      .enter()
      .append("tr");

    
    rows.append("td")
    .text(function(student){return student.final[0].grade})
    
    rows.append("td")
    .text(function(student){return getHWmean(student)})
    
    rows.append("td")
    .append("img")
    .attr("src",function(student){return "../imgs/" + student.picture})
    
    rows.append("td")
    .text(function(student){return getQuizMean(student)})
    
    rows.append("td")
    .text(function(student){return gettestMean(student)})
    
    rows.append("td")
    .text(function(student){return getGrade(student)})
}

var clearTable = function()
{
    d3.selectAll("#studentTable tbody tr")
        .remove();
}

var initHeaders = function(students)
{
    d3.select("#final")
    .on("click",function()
    { console.log("clicked");
        students.sort(function(a,b)
        {
            if(a.final[0].grade > b.final[0].grade) {return 1}
            else if(a.final[0].grade < b.final[0].grade) {return -1}
            else { return 0;}
        });
        clearTable();
        studentTable(students);
    });
    
    d3.select("#homework")
    .on("click",function()
    { console.log("clicked");
        students.sort(function(a,b)
        {
            if(getHWmean(a) > getHWmean(b)) {return 1}
            else if( getHWmean(a) < getHWmean(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        studentTable(students);
    });
    
    d3.select("#quizes")
    .on("click",function()
    { console.log("clicked");
        students.sort(function(a,b)
        {
            if(getQuizMean(a) > getQuizMean(b)) {return 1}
            else if(getQuizMean(a) < getQuizMean(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        studentTable(students);
    });
    
    d3.select("#test")
    .on("click",function()
    { console.log("clicked");
        students.sort(function(a,b)
        {
            if(gettestMean(a) > gettestMean(b)) {return 1}
            else if(gettestMean(a) < gettestMean(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        studentTable(students);
    });
    
    d3.select("#grade")
    .on("click",function()
    { console.log("clicked");
        students.sort(function(a,b)
        {
            if(getGrade(a) > getGrade(b)) {return 1}
            else if(getGrade(a) < getGrade(b)) {return -1}
            else { return 0;}
        });
        clearTable();
        studentTable(students);
    });
}

var studentPromise = d3.json("classData.json");

studentPromise.then(
function(students){
createTables(students);
initHeaders(students)},
function(err){console.log("failed:",err)});