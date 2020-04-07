var getChange = function(subject)
{
    return subject.weights[0] -
            subject.weights[subject.weights.length-1];
}

//Fills in Tooltip info
var drawToolTip = function(subject)
{
    console.log("drawing");
    
    d3.select("#tooltip div")
        .remove();

    
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;

    
    var base = d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPosition+"px")
        .style("left",xPosition+"px")
        .append("div")
    
    base.append("div")
        .classed("tt-Title",true)
        .text("Weight Data by Week");

    var summary = base.append("div")
        .classed("tt-summary",true);
    
    var s = summary.append("div")
        .classed("startWeight",true);
    
    s.append("div")
        .classed("tt-subtitle",true)
        .text("Start Weight")
    
    s.append("div")
        .classed("bigNum",true)
        .text(subject.weights[0].toFixed(0));

    var e = summary.append("div")
        .classed("endWeight",true)
    
    e.append("div")
        .classed("tt-subtitle",true)
        .text("Ending Weight")
        
    
    e.append("div")
    .classed("bigNum",true)
    .text(subject.weights[subject.weights.length -1].toFixed(0));
    
    
    base.append("div")
        .classed("allWeights",true)
        .append("ol")
        .selectAll("li")
        .data(subject.weights)
        .enter()
        .append("li")
        .text(function(d)
        {
            return d.toFixed(2)+" kg";
        })  
}


//takes an array of medical subjects
//draws the table
var drawTable = function(subjects)
{
  var rows = 
      d3.select("#fullTable tbody")
          .selectAll("tr")
            .data(subjects)
          .enter()
          .append("tr")
            .attr("class",function(subject)
            {
                var exp = subject.experiment;
                if(exp=="Control")
                    {return "control";}
                else if (exp == "Drug A")
                    {return "drugA";}
                else if (exp == "Drug B")
                    {return "drugB";}
            })
            .on("mouseover",drawToolTip)
            .on("mouseout",function() 
            {//leave parameter empty since not using
                d3.select("#tooltip")
                    .classed("hidden",true);
            });
    
    //sex
    rows.append("td")
        .classed("icon",true)
        .append("i")
        .classed("fas",true)
        .classed("fa-male",function(subject)
                 {return subject.sex=="male";})
        .classed("fa-female",function(subject)
                 {return subject.sex=="female";})
    
    
    //age
    rows.append("td")
        .text(function(subject){return subject.age;});
    
    //income
    rows.append("td")
        .text(function(subject)
        {
          return subject.income;
        });
    
    //children
    rows.append("td")
        .text(function(subject){return subject.children;});

    //bloodType
    rows.append("td")
        .text(function(subject){return subject.bloodType;});
    
    //experiment
    rows.append("td")
        .text(function(subject){return subject.experiment;});
    
    //weight change
    rows.append("td")
        
        .text(function(subject){
            var diff= getChange(subject);
        return Math.abs(diff).toFixed(2);
        })
        .attr("class",function(subject)
          {
            var diff= getChange(subject);
            diff = diff.toFixed(2);
            if(diff<0)
            {
                return "increase";     
            }
            else if (diff>0)
            {
                return "decrease";        
            }
            else
            {
                return "stable";        
            }
        
          })
   
}

//removes the rows from the table
var clearTable = function()
{
    d3.selectAll("#fullTable tbody tr")
        .remove();
}


//returns a Number for the income of subject
var getIncome = function(subject)
{
    return Number(subject.income
                  .replace(",",""));
    
}

var initHeaders = function(subjects)
{
    d3.select("#sex")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            if(a.sex > b.sex) {return 1}
            else if(a.sex < b.sex) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    d3.select("#age")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            if(a.age > b.age) {return 1}
            else if(a.age < b.age) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    
    d3.select("#income")
    .on("click",function()
    { 
        subjects.sort(function(a,b)
        {
            var ainc = getIncome(a);
            var binc = getIncome(b);
            if(ainc > binc) {return 1}
            else if(ainc < binc) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    
    
    d3.select("#kids")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            if(a.children > b.children) {return 1}
            else if(a.children < b.children) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    
     d3.select("#blood")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            if(a.bloodType > b.bloodType) {return 1}
            else if(a.bloodType < b.bloodType) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    
     d3.select("#group")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            if(a.experiment > b.experiment) {return 1}
            else if(a.experiment < b.experiment) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
    
    
     d3.select("#change")
    .on("click",function()
    { console.log("clicked");
        subjects.sort(function(a,b)
        {
            var adiff = getChange(a);
            var bdiff = getChange(b);
            
            if(adiff > bdiff) {return 1}
            else if(adiff < bdiff) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(subjects);
    });
}






var initButtons = function(subjects)
{
    
    d3.select("#clear")
        .on("click",function()
        {
            clearTable()
            drawTable(subjects)
            initHeaders(subjects);
            setTitle("Medical Data on Weight Loss");
        });

    d3.select("#bloodA")
        .on("click",function()
        {
            var filtered = 
                subjects.filter(function(subject)
                {
                    if(subject.bloodType=="A")
                        {return true;}
                    else
                        {return false;}
                })
        
            setTitle("Weight results for Blood Type A");
            clearTable()
            drawTable(filtered)
            initHeaders(filtered);
        });
    
     d3.select("#bloodAB")
        .on("click",function()
        {
            var filtered = 
                subjects.filter(function(subject)
                {
                    if(subject.bloodType=="AB")
                        {return true;}
                    else
                        {return false;}
                })
        
         setTitle("Weight results for Blood Type AB");
            clearTable()
            drawTable(filtered)
            initHeaders(filtered);
        });
    
     d3.select("#bloodB")
        .on("click",function()
        {
            var filtered = 
                subjects.filter(function(subject)
                {
                    if(subject.bloodType=="B")
                        {return true;}
                    else
                        {return false;}
                })
        
         setTitle("Weight results for Blood Type B");
            clearTable()
            drawTable(filtered)
            initHeaders(filtered);
        });
    
    
     d3.select("#bloodO")
        .on("click",function()
        {
            var filtered = 
                subjects.filter(function(subject)
                {
                    if(subject.bloodType=="O")
                        {return true;}
                    else
                        {return false;}
                })
        
         setTitle("Weight results for Blood Type O");
            clearTable()
            drawTable(filtered)
            initHeaders(filtered);
        });

    
    
}


//sets the title
var setTitle = function(msg)
{
    d3.select("#fullTable h2")
    .text(msg);
}


var tablePromise = d3.json("/data/weightLoss.json");

tablePromise.then(function(subjects)
{
    console.log("subject data",subjects);
    setTitle("Medical Data on Weight Loss");
    drawTable(subjects);
    initHeaders(subjects);
    initButtons(subjects);
},
function(err)
{
    setTitle("Error while loading data");
    console.log("Error Loading data:",err);
});