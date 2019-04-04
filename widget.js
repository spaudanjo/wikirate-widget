console.log('here we go')

var scope1DeferredData = fetch('https://wikirate.org/CDP+Scope_1_Emissions+Marks_and_Spencer_Group_plc+2019')
	.then(data => {return data.json()})

var scope2DeferredData = fetch('https://wikirate.org/CDP+Scope_2_Emissions+Marks_and_Spencer_Group_plc+2019')
	.then(data => {return data.json()})

var scope3DeferredData = fetch('https://wikirate.org/CDP+Scope_3_Emissions+Marks_and_Spencer_Group_plc+2019')
	.then(data => {return data.json()})

var scopes
Promise.all([scope1DeferredData, scope2DeferredData, scope3DeferredData])
	.then(function(values) {console.log(values)})


// extract companies



// based on prepared DOM, initialize echarts instance
//var myChart

//var data

//var oReq = new XMLHttpRequest();
//oReq.addEventListener("load", reqListener);
//oReq.open("GET", "https://wikirate.org/CDP+Scope_1_Emissions+Answer.json");
//oReq.send();

function reqListener () {
	data = JSON.parse(this.responseText)
}

function chartPayscale() {
	var labels = data.items.filter(item => item.company == document.getElementById('company').value).map(item => item.company)
    var values = data.items.filter(item => item.company == document.getElementById('company').value).map(item => parseInt(item.value))

    labels.push('London average payscale to worker')
    values.push(200)

	// specify chart configuration item and data
    var option = {
    	tooltip: {
	        trigger: 'axis'
	    },
        xAxis: {
            data: labels
        },
        yAxis: {},
        series: [{
            type: 'bar',
            data: values
        }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
}

// function renderOn(elementId) {
	// pieChart = echarts.init(document.getElementById(elementId));

	
// }