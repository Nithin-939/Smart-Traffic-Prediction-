const cityAreas = {

    Hyderabad:[
        "Gachibowli",
        "Hitech City",
        "Kukatpally",
        "Secunderabad"
    ],

    Bangalore:[
        "Electronic City",
        "Whitefield",
        "Koramangala",
        "MG Road"
    ],

    Chennai:[
        "T Nagar",
        "Anna Nagar",
        "Velachery",
        "OMR"
    ],

    Mumbai:[
        "Andheri",
        "Bandra",
        "Powai",
        "Dadar"
    ],

    Delhi:[
        "Connaught Place",
        "Dwarka",
        "Rohini",
        "Karol Bagh"
    ]
};

function updateAreas(){

    const city = document.getElementById("city").value;

    const areaDropdown =
    document.getElementById("area");

    areaDropdown.innerHTML = "";

    cityAreas[city].forEach(area=>{

        let option =
        document.createElement("option");

        option.value = area;
        option.text = area;

        areaDropdown.add(option);
    });
}

window.onload = function(){
    updateAreas();
    createChart();
};

function predictTraffic(){

    const city =
    document.getElementById("city").value;

    const area =
    document.getElementById("area").value;

    const hour =
    parseInt(document.getElementById("hour").value);

    const weather =
    parseInt(document.getElementById("weather").value);

    const day =
    parseInt(document.getElementById("day").value);

    if(isNaN(hour)){
        alert("Enter Hour");
        return;
    }

    let score = hour;

    const busyAreas = {

        "Hitech City":15,
        "Gachibowli":12,
        "Electronic City":15,
        "Whitefield":13,
        "MG Road":10,
        "Bandra":14,
        "Connaught Place":15
    };

    score += busyAreas[area] || 8;

    score += weather * 3;

    score += day * 2;

    let result = "";
    let color = "";

    if(score < 20){
        result="🟢 LOW TRAFFIC";
        color="green";
    }
    else if(score < 30){
        result="🟡 MEDIUM TRAFFIC";
        color="orange";
    }
    else{
        result="🔴 HEAVY TRAFFIC";
        color="red";
    }

    document.getElementById("result").innerHTML=
    `
    <div style="color:${color}">
        <h2>${city}</h2>
        <h3>${area}</h3>
        <h2>${result}</h2>
    </div>
    `;

    updateChart(score);
}

let trafficChart;

function createChart(){

    const ctx =
    document.getElementById("trafficChart");

    trafficChart = new Chart(ctx,{
        type:'bar',
        data:{
            labels:[
                'Traffic Score'
            ],
            datasets:[{
                label:'Traffic Density',
                data:[0]
            }]
        },
        options:{
            responsive:true
        }
    });
}

function updateChart(score){

    trafficChart.data.datasets[0].data =
    [score];

    trafficChart.update();
}