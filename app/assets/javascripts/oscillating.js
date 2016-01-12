
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
                text: 'RPM'
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
         var coil1 = [];
    
    for (var i = 1 ; i <= table.rows.length-1; i++) {
        for (var j = 0;  j<= 2; j++) {
            if (j==1) {
                  x.push(parseFloat(table.rows[i].cells[j].innerText))
                 coil1.push(parseFloat(table.rows[i].cells[j+1].innerText))
                 //  console.log (table.rows[i].cells[j].innerText) // x
                 // console.log (table.rows[i].cells[j+2].innerText) // y
            }
        }  
    }
        // }
       

        options4.series[0].data = coil1;
         options4.xAxis.categories = x;
       var chart4 = new Highcharts.Chart(options4);
    }

     function sortFunction(a, b) {
          if (a[0] === b[0]) {
          return 0;
          }
          else {
          return (a[0] < b[0]) ? -1 : 1;
            }
        }

    var clbkprm = document.querySelector('.js-PRM');
    var initClbk = new Powerange(clbkprm, { callback: displayPRM, start: 10 ,min: 0, max: 1024 });
    function displayPRM() {
          document.getElementById('js-display-PRM').innerHTML = clbkprm.value;
          document.getElementById('PRM_value').value = clbkprm.value;

          // if (clbkprm.value == 0)
          // {
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
         // }
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

        function addrow()
        {
          $('#tableID tbody').append('<tr class="child"><td>'+table.rows.length+'</td> <td>'+document.getElementById('PRM_value').value +'</td><td>'+document.getElementById('Voltage').value +'</td></tr>');
          drow();
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

        $("#Voltage").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


        var iframe = document.createElement('iframe');
        iframe.frameBorder=0;
        iframe.width="480px";
        iframe.height="400px";
        iframe.id="myFrame";
        iframe.scrolling="no";
        iframe.setAttribute("src", 'http://user@41.38.70.12:4440/video.cgi');
        document.getElementById("parentDivId").appendChild(iframe);
     
     })
