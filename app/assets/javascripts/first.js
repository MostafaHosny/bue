

        var options = {
              chart: {
              renderTo: 'chart_div',
              type: 'spline'
                },
                series: [{
                   name: "A",
                   data:[]
                }],
                title: {
            text: 'Time domain',
              },
            xAxis: {
            title: {
                text: 'F(n)'
            }
              },
            yAxis: {
            
            title: {
                text: 'A'
            }
          }

            };
      


       var options2 = {
              chart: {
              renderTo: 'chart_div2',
              type: 'column'
                },
                series: [{
                   name: "A(N)" ,
                   data:[]
                }],
                title: {
            text: 'Amplitude',
              },
            xAxis: {
            title: {
                text: 'F hz'
            }
              },
            yAxis: {
            
            title: {
                text: 'A(n)'
            }
          }

            };


       var options3 = {
              chart: {
              renderTo: 'chart3',
              type: 'column'
                },
                series: [{
                   name: "F Hz",
                   data:[]
                }],
                title: {
            text: 'Phase',
              },
                
            };

      
       
    function changechart(t1,t2,a) {

         t1 = parseInt(t1)
         t2 = parseInt(t2)
         a = parseInt(a)
         T = t1 + t2

       var data = [
              [0, a],
              [t1, a],
              [t1, -a],
              [t1+t2, -a],
              [t1+t2, 0]]


              for (var i = 0; i < 3; i++) {
                 data.push(
              [T, a],
              [T+t1, a],
              [T+t1, -a],
              [T+t1+t2, -a],
              [T+t1+t2, 0]);
                 T = T+t1+t2 ;
              // more statements
          }
        options.series[0].data = data;

         var chart = new Highcharts.Chart(options);
        // var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        // chart.draw(data, options);
    }

    function changef(t1,t2,a,n) {
         t1 = parseInt(t1)
         t2 = parseInt(t2)
         a = parseInt(a)
         n = parseInt(n);

        var ano = Math.abs(a*(t1-t2)/(t1+t2));
        var fno = 1/(t1+t2);
       
        var data3 =  [] ;
        var data2 = [] ;
        data2.push([0,ano])
        // var data2 = google.visualization.arrayToDataTable
        //      ([['X', 'A(n)'],
        //       [0, 0],
        //       [0, ano],
        //  ]);
              

              for (var i = 1; i <= n; i++) {
            data2.push([i*fno, 2*a/i*fno*Math.PI],[-i*fno, 2*a/i*fno*Math.PI])    
            data3.push([i*fno, i*Math.PI/2],[-i*fno, -i*Math.PI/2])
              //more statements 4*a/(2*n*Math.pi)

         }
          

         data3.sort(sortFunction);
         data2.sort(sortFunction);
         
        

          

       options2.series[0].data = data2;
  var chart2 = new Highcharts.Chart(options2);

  options3.series[0].data = data3;
  var chart3 = new Highcharts.Chart(options3);
        }

        function sortFunction(a, b) {
          if (a[0] === b[0]) {
          return 0;
          }
          else {
          return (a[0] < b[0]) ? -1 : 1;
            }
        }

    $(document).ready(function(){
      var activeDivAttr;

//remove this if you can set id attr for each div and then
//modify the code below to use id attr
$('div').each (function (index) {
    $(this).attr('divID', 'divID'+index);    
});


$('div').mousedown(function(e) {
    e.stopImmediatePropagation(); //stops event bubbling    
    
    
    if (activeDivAttr == $(this).attr('divID')) {
        this.focus();
    } else {
        e.preventDefault();  //stops default browser action (focus)
    }
    
    activeDivAttr= $(this).attr('divID');
}).focus(function() {
    activeDivAttr= $(this).attr('divID');
}).blur(function() {
    activeDivAttr= '';
});
    changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
    changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val())
    $("#bootstrap-slider-t1").slider();
    $("#bootstrap-slider-t2").slider();
    $("#bootstrap-slider-A").slider();
    $("#bootstrap-slider-N").slider();
    
    $("#bootstrap-slider-t1").on("slide", function(slideEvt) {
       slideEvt.stopPropagation();
      changechart(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
      changef(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t1").text(slideEvt.value);
  });
    $("#bootstrap-slider-t2").on("slide", function(slideEvt) {
      slideEvt.stopPropagation();
      changechart($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val())
      changef($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t2").text(slideEvt.value);
  });
    $("#bootstrap-slider-A").on("slide", function(slideEvt) {
      slideEvt.stopPropagation();
      changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value)
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value,$('#bootstrap-slider-N').val());
    $("#sliderValue-A").text(slideEvt.value);
  });
    $("#bootstrap-slider-N").on("slide", function(slideEvt) {
      slideEvt.stopPropagation();
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),slideEvt.value);
      
    $("#sliderValue-N").text(slideEvt.value);
  });
  
   $('.slider').on("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
      // var newvalue = $('.tooltip-inner').text();
       changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
     changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val())
    $("#sliderValue-t1").text($('#bootstrap-slider-t1').val());
    $("#sliderValue-t2").text($('#bootstrap-slider-t2').val());
    $("#sliderValue-A").text($('#bootstrap-slider-A').val());
    $("#sliderValue-N").text($('#bootstrap-slider-N').val());
  });

});


