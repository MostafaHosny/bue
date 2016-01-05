
  var options4 = {
                chart: {
              renderTo: 'chart4',
          },
              
             credits: {
            enabled: false
        },
        subtitle: {
            text: 'PRM',
        },
        xAxis: {
            title: {
                text: 'Induced Voltage (volt)'
            },
            categories: []
        },
        yAxis: {
            title: {
                text: 'Induced Voltage (volt)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            showInLegend: false,
            name: 'Coil 1',
            data: []},
            {
            showInLegend: false,
            name:'Coil 2',
            data: []
        }
        
         ]
}

    // cells = table.getElementsByTagName('td');

    var table = document.getElementById('tableID');

function drow (){


         var x =  [] ;
         var y = [];
    
    for (var i = 1 ; i <= table.rows.length-1; i++) {
        for (var j = 0;  j<= 3; j++) {
            if (j==1) {
                 x.push(parseFloat(table.rows[i].cells[j].innerText))
                 y.push(parseFloat(table.rows[i].cells[j+2].innerText))
                 //  console.log (table.rows[i].cells[j].innerText) // x
                 // console.log (table.rows[i].cells[j+2].innerText) // y
            }
        }  
    }
        // }
       

        options4.series[0].data = y;
        options4.xAxis.categories = x;
       var chart4 = new Highcharts.Chart(options4);
    }

    var clbkprm = document.querySelector('.js-PRM');
    var initClbk = new Powerange(clbkprm, { callback: displayPRM, start: 10 ,min: 0, max: 1024 });
    function displayPRM() {
          document.getElementById('js-display-PRM').innerHTML = clbkprm.value;
          document.getElementById('PRM_value').value = clbkprm.value;
        }


    

        function sendMessage()
        {
          var res;
          submitAjaxRequest("POST",
                  "/experiments/send_to_rasp",
                  "coil=" + document.getElementById('PRM_value').value + "&prm="+document.getElementById('PRM_value').value,
                 res)
                 console.log ();
        }
     $(document).ready(function(){

        drow();


       
    
        $('#Measure').click(function(){
           var coil ; 
          if($("input[type='radio'].radioBtnClass").is(':checked')) {
           coil = $("input[type='radio'].radioBtnClass:checked").val();
          }

          $.ajax({
          url: "/experiments/send_to_rasp",
          type: "POST",
          data: {
                   coil: coil, 
                   prm: document.getElementById('PRM_value').value },
          success: function(resp){ }
});
        })
     })