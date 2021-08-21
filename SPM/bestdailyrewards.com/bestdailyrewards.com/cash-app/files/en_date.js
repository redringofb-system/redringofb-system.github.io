function calculateDate(geo){
    var dayNames    =   ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthNames  =   ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var now=new Date();
    if(geo == 'us'){
        document.write(dayNames[now.getDay()]+", "+now.getDate()+" "+monthNames[now.getMonth()]+", "+now.getFullYear());
    }else{
        document.write(dayNames[now.getDay()]+", "+monthNames[now.getMonth()]+" "+now.getDate()+", "+now.getFullYear());
    }
}

function showMonthandYear(){
    var dayNames    =   ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthNames  =   ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var now=new Date();
    document.write(monthNames[now.getMonth()]+" "+now.getFullYear());
}

function showDayOfWeek(){
    var dayNames    =   ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var now=new Date();
    document.write(dayNames[now.getDay()]);
}