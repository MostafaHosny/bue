      google.load("visualization", "1.1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
            
        var t1 ;
        var t2 ;
        var a ;
        var T ;
      var options = {
          legend: 'none',
          hAxis: { title: 'f(t)' },
          vAxis: {
        title: "V(volt)"
        },

          colors: ['#3A81BF'],
          pointSize: 1,
          pointShape: 'square'
       };

       var options2 = {

          hAxis: { title: 'F' ,gridlines: {color: 'transparent'}},
          vAxis: {
        title: "A(n)" 

        },
         explorer: { actions: ['dragToPan', 'rightClickToReset'] },
          colors: ['#C10B0B'],
          lineWidth: 3
       };

      function drawChart() {
        var data = google.visualization.arrayToDataTable
            ([['f(t)', 'V(votl)'],
              [0, 1],
              [2, 1],
              [2, -1],
              [4, -1],
              [4, 0]
        ]);
            var data2 = google.visualization.arrayToDataTable
            ([['X', 'A(n)'],
              [0, 0],
              [0, 6]
        ]);
           
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);

         var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart2.draw(data2, options2);
    }

       
    function changechart(t1,t2,a) {

         t1 = parseInt(t1)
         t2 = parseInt(t2)
         a = parseInt(a)
         T = t1 + t2

        var data = google.visualization.arrayToDataTable
             ([['f(t)', 'V(volt)'],
              [0, a],
              [t1, a],
              [t1, -a],
              [t1+t2, -a],
              [t1+t2, 0]
            
        ]);


              for (var i = 0; i < 3; i++) {
                 data.addRows([
              [T, a],
              [T+t1, a],
              [T+t1, -a],
              [T+t1+t2, -a],
              [T+t1+t2, 0],
                  ]);
                 T = T+t1+t2 ;
              // more statements
          }
        
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    function changef(t1,t2,a,n) {

        var n = parseInt(n);
        var ano = Math.abs(a*(t1-t2)/(t1+t2));
        var fno = 1/(t1+t2);
        var data2 = google.visualization.arrayToDataTable
             ([['X', 'A(n)'],
              [0, 0],
              [0, ano],
         ]);

              for (var i = 1; i <= n; i++) {
            data2.addRows([
              [i*fno, 2*a/i*fno*Math.PI],
              [i*fno, 2*a/i*fno*Math.PI],
              [-i*fno, 2*a/i*fno*Math.PI],
              [-i*fno, 2*a/i*fno*Math.PI],
            
                  ]);
              //more statements 4*a/(2*n*Math.pi)

         }

       var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart2.draw(data2, options2);
        }

    $(document).ready(function(){

    $("#bootstrap-slider-t1").slider();
    $("#bootstrap-slider-t2").slider();
    $("#bootstrap-slider-A").slider();
    $("#bootstrap-slider-N").slider();
    
    $("#bootstrap-slider-t1").on("slide", function(slideEvt) {
      changechart(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
      changef(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t1").text(slideEvt.value);
  });
    $("#bootstrap-slider-t2").on("slide", function(slideEvt) {
      changechart($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val())
      changef($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t2").text(slideEvt.value);
  });
    $("#bootstrap-slider-A").on("slide", function(slideEvt) {
      changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value)
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value,$('#bootstrap-slider-N').val());
    $("#sliderValue-A").text(slideEvt.value);
  });
    $("#bootstrap-slider-N").on("slide", function(slideEvt) {
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),slideEvt.value);
      
    $("#sliderValue-N").text(slideEvt.value);
  });
  
   $('.slider').on("click", function() {
      // var newvalue = $('.tooltip-inner').text();
      changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
    $("#sliderValue-t1").text($('#bootstrap-slider-t1').val());
    $("#sliderValue-t2").text($('#bootstrap-slider-t2').val());
    $("#sliderValue-A").text($('#bootstrap-slider-A').val());
    $("#sliderValue-N").text($('#bootstrap-slider-N').val());
  });

});


