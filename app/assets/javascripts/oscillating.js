
  var options4 = {
                chart: {
              renderTo: 'chart4',
               type: 'spline'
          },
              
             credits: {
            enabled: false
        },
        plotOptions: {
    line: {
        marker: {
            enabled: false
        }
    }
},
        subtitle: {
            text: '',
        },
        xAxis: {
          gridLineWidth: .5,
              ordinal: false,
            title: {
                text: 'Motor RPM'
            },
            
        },
        yAxis: {
             gridLineWidth: .5,
              ordinal: false,
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
        title:{
          text:''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            pointWidth: 1,
            name: 'Coil(1)',
            data: []
        },
        {
            pointWidth: 1,
            name: 'Coil(2)',
            data: []
        },
        {
            pointWidth: 1,
            color: '#F44336',
            name: 'Coil(3)',
            data: []
        }
        ]
}


  function isNumberKey(txt, evt) {

    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
        //Check if the text already contains the . character
        if (txt.value.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (charCode > 31
             && (charCode < 48 || charCode > 57))
            return false;
      }
      return true;
    }

      
  function handleClick(myRadio) {
    if (myRadio.value == 0)
    {
      $('#coil1table').show();
      $('#coil2table').hide();
      $('#coil3table').hide();
      
      $('#exportcoil1').show();
      $('#exportcoil2').hide();
      $('#exportcoil3').hide();
    }
    else if (myRadio.value == 1)
    {
      $('#coil1table').hide();
      $('#coil2table').show();
      $('#coil3table').hide();

       $('#exportcoil1').hide();
      $('#exportcoil2').show();
      $('#exportcoil3').hide();
    }
    else if (myRadio.value == 2)
    {
       $('#coil1table').hide();
      $('#coil2table').hide();
      $('#coil3table').show();

      $('#exportcoil1').hide();
      $('#exportcoil2').hide();
      $('#exportcoil3').show();
    }

    $.ajax({
          url: "/experiments/send_to_rasp",
          type: "POST",
          data: {
                   coil: myRadio.value, 
                   },
          success: function(resp){ }
      });
    }

    var table1 ;
    var table2 ;
    var table3 ;
     function addrow()
        {
          if(($('#Voltage').val() != '') && (parseFloat($('#Voltage').val()) >= 0.0 ) ){
      
   

          if($("input[type='radio'].radioBtnClass").is(':checked')) {
           coil = $("input[type='radio'].radioBtnClass:checked").val();
          
          }

          if (coil == 0 )
          {
          $('#coil1table tbody').append('<tr class="child"><td>'+table1.rows.length+'</td> <td>'+document.getElementById('PRM_value').value +'</td><td>'+document.getElementById('Voltage').value +'</td></tr>');
          }
          else if (coil == 1 )
          {
             $('#coil2table tbody').append('<tr class="child"><td>'+table2.rows.length+'</td> <td>'+document.getElementById('PRM_value').value +'</td><td>'+document.getElementById('Voltage').value +'</td></tr>');

          }
          else if (coil == 2)
          {
             $('#coil3table tbody').append('<tr class="child"><td>'+table3.rows.length+'</td> <td>'+document.getElementById('PRM_value').value +'</td><td>'+document.getElementById('Voltage').value +'</td></tr>');

          }
          drow();
          $('#Voltage').val("");
        }
        else
        {

        }
      }
      
function tableToExcel(table_num)
{
  $('#'+table_num).tableExport({type:'excel', htmlContent:'false',escape:'true'});
}


      function drow (){


         var x =  [] ;
         var coil1 = [];
         var coil2 = [];
         var coil3 = [];

    
    for (var i = 1 ; i <= table1.rows.length-1; i++) {
        for (var j = 0;  j<= 2; j++) {
            if (j==1) {
                  // x.push(parseFloat(table.rows[i].cells[j].innerText))
                 coil1.push([parseFloat(table1.rows[i].cells[j].innerHTML),parseFloat(table1.rows[i].cells[j+1].innerHTML)]);
                 //  console.log (table.rows[i].cells[j].innerText) // x
                 // console.log (table.rows[i].cells[j+2].innerText) // y
            }
        }  
    }

    for (var i = 1 ; i <= table2.rows.length-1; i++) {
        for (var j = 0;  j<= 2; j++) {
            if (j==1) {
                 coil2.push([parseFloat(table2.rows[i].cells[j].innerHTML),parseFloat(table2.rows[i].cells[j+1].innerHTML)]);
            }
        }  
    }
      
      for (var i = 1 ; i <= table3.rows.length-1; i++) {
        for (var j = 0;  j<= 2; j++) {
            if (j==1) {
                 coil3.push([parseFloat(table3.rows[i].cells[j].innerHTML),parseFloat(table3.rows[i].cells[j+1].innerHTML)]);
            }
        }  
    }
       
        coil1.sort(sortFunction)
        coil2.sort(sortFunction)
        options4.series[0].data = coil1;
        options4.series[1].data = coil2;
        options4.series[2].data = coil3;
         // options4.xAxis.categories = x;
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

        function sendrpm(value)
      {
        document.getElementById('PRM_value').value = value;

          $.ajax({
          url: "/experiments/send_to_rasp",
          type: "POST",
          data: {
                   prm: document.getElementById('PRM_value').value },
          success: function(resp){ }
         });
      }

      function change_value (value)
      {
        document.getElementById('PRM_value').value = value;
      }

 $(document).ready(function(){

    // cells = table.getElementsByTagName('td');

    table1 = document.getElementById('coil1table');
    table2 = document.getElementById('coil2table');
    table3 = document.getElementById('coil3table');


     
    var coil ;
    // var clbkprm = document.querySelector('.js-PRM');
    // var initClbk = new Powerange(clbkprm, { callback: displayPRM, start: 0 ,min: 0, max: 400 });
   
    // function displayPRM() {
         
    //       document.getElementById('PRM_value').value = clbkprm.value;

    //       if($("input[type='radio'].radioBtnClass").is(':checked')) {
    //        coil = $("input[type='radio'].radioBtnClass:checked").val();
          
    //       }

    //       $.ajax({
    //       url: "/experiments/send_to_rasp",
    //       type: "POST",
    //       data: {
    //                prm: document.getElementById('PRM_value').value },
    //       success: function(resp){ }
    //      });
    //             }
       //  $('.js-PRM').on('mousedown', function(){
       //      alert("aa");
       //  });

       // $('input[class=js-PRM]').mouseup(function() {
        

       // });
       


        // function sendMessage()
        // {
        //   var res;
        //   submitAjaxRequest("POST",
        //           "/experiments/send_to_rasp",
        //           "coil=" + document.getElementById('PRM_value').value + "&prm="+document.getElementById('PRM_value').value,
        //          res)
        //          console.log ();
        // }


       
    
         drow();


       
    
//         $('#Measure').click(function(){
//            var coil ; 
//           if($("input[type='radio'].radioBtnClass").is(':checked')) {
//            coil = $("input[type='radio'].radioBtnClass:checked").val();
//           }

//           $.ajax({
//           url: "/experiments/send_to_rasp",
//           type: "POST",
//           data: {
//                    coil: coil, 
//                    prm: document.getElementById('PRM_value').value },
//           success: function(resp){ }
// });
//         })

        $("#bootstrap-rpm").slider();
      $("#bootstrap-slider-t1").on("slide", function(slideEvt) {
      
     $("#sliderValue").text(slideEvt.value);
    });
   
    $('.slider').on("click", function() {
      var newvalue = $('.tooltip-inner').text();
     $("#sliderValue").text(newvalue);

     document.getElementById('PRM_value').value = $('.tooltip-inner').text();

          if($("input[type='radio'].radioBtnClass").is(':checked')) {
           coil = $("input[type='radio'].radioBtnClass:checked").val();
          
          }

          $.ajax({
          url: "/experiments/send_to_rasp",
          type: "POST",
          data: {
                   prm: document.getElementById('PRM_value').value },
          success: function(resp){ }
         });
   });

     $('#coil2table').hide();
     $('#coil3table').hide();
     $('#exportcoil2').hide();
     $('#exportcoil3').hide();

        var iframe = document.createElement('iframe');
        iframe.frameBorder=0;
        iframe.width="480px";
        iframe.height="378px";
        iframe.id="myFrame";
        // iframe.scrolling="no";
        iframe.setAttribute("src", 'http://user:@41.38.70.12:4440/video/mjpg.cgi');
        document.getElementById("parentDivId").appendChild(iframe);
     
     })
