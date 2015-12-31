

        var options = {
              chart: {
              renderTo: 'chart_div',
              type: 'spline',
               

                },
                tooltip: { enabled: false },
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
                series: [{
                  showInLegend: false,
                  animation: false,
                   name: "A",
                   data:[],
                  color: 'blue',
                  
                }],
                title: {
            text: 'Time domain',
            style:{
                        color:'blue'
                    }
              },
            xAxis: {

              gridLineWidth: 1,
              ordinal: false,
              max:40,
              min:0,
            title: {
                text: 'T(sec)'

            },
            style:{
                        color:'blue'
                    }
              },
            yAxis: {
              gridLineWidth: 1,
              ordinal: false,
              max:20,
              min:-20 ,
            
            title: {
                text: 'A' ,
                style:{
                        color:'blue'
                    }
            }

          }

            };
       
       var max = 1;
       var options2 = {
              chart: {
              renderTo: 'chart_div2',
              type: 'column',
              

                },
                 credits: {
            enabled: false
        },
       // var max = 20*1/parseInt($('.js-t1').val())+ parseInt($('.js-t2').val());
                series: [{
                  borderWidth: 0,
                  pointWidth: 2,
                   showInLegend: false,
                  animation: false,
                   name: "C(N)" ,
                   data:[] ,
                    color: 'blue'
                  
                }],
                title: {
            text: 'Amplitude',
              },
            xAxis: {
              gridLineWidth: .5,
              ordinal: false,
              max:max,
              min:-max,
             
            title: {
                text: 'F hz'
            }
              },
            yAxis: {
              gridLineWidth: .5,
              ordinal: false,
              max:10,
              min:0,
            title: {
                text: 'C(N)'
            }
          }

            };


       var options3 = {
              chart: {
              renderTo: 'chart3',
              type: 'column' ,
              
                },
                 credits: {
            enabled: false
        },
                series: [{

                  animation: false,
                   borderWidth: 0,
                   pointWidth: 2,
                   showInLegend: false,
                   name: "Phase(N)",
                   data:[],
                    color: 'blue'
                  
                }],
                title: {
            text: 'Phase',
              },
              xAxis: {
              gridLineWidth: .5,
              ordinal: false,
              max:max,
              min:-max,
             
            title: {
                text: 'phase(N)'
            }
              },
            yAxis: {
              gridLineWidth: .5,
              ordinal: false,
              max:90,
              min:-90,
            title: {
                text: 'C(n)'
            }
          }
                
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


              for (var i = 0; i < 20; i++) {
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

    function changef(t1,t2,a,n,max) {
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
         
        
      maxy = 40*2*a/20*fno*Math.PI
          
       options2.xAxis.max = max
       options2.xAxis.min = -max
       options2.yAxis.max = maxy
       options2.series[0].data = data2;
  var chart2 = new Highcharts.Chart(options2);
 
     options3.xAxis.max = max
     options3.xAxis.min = -max
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
 
 $('#select_chart').on('change', function() {
  alert( this.value );
})


//remove this if you can set id attr for each div and then
//modify the code below to use id attr
  max = 20*1/(parseInt($('.js-t1').val())+ parseInt($('.js-t2').val()));
    // changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),vert.value)
    // changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val())
    
      changechart($('.js-t1').val(),$('.js-t2').val(),$('.js-A').val())
      changef($('.js-t1').val(),$('.js-t2').val(),$('.js-A').val(),$('.js-N').val());
  document.getElementById('js-display-total').innerHTML = parseInt($('.js-t1').val())+ parseInt($('.js-t2').val());
    // $("#bootstrap-slider-t1").slider();
    // $("#bootstrap-slider-t2").slider();
    // $("#bootstrap-slider-A").slider();
    // $("#bootstrap-slider-N").slider();
    
    $("#bootstrap-slider-t1").on("slide", function(slideEvt) {
       var tempScrollTop = $(window).scrollTop();
      changechart(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
      changef(slideEvt.value,$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t1").text(slideEvt.value);
    $(window).scrollTop(tempScrollTop);
  });
    $("#bootstrap-slider-t2").on("slide", function(slideEvt) {
     // var tempScrollTop = $(window).scrollTop();
      changechart($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val())
      changef($('#bootstrap-slider-t1').val(),slideEvt.value,$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val());
    $("#sliderValue-t2").text(slideEvt.value);
    $(window).scrollTop(tempScrollTop);
  });
    $("#bootstrap-slider-A").on("slide", function(slideEvt) {
     var tempScrollTop = $(window).scrollTop();
      changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value)
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),slideEvt.value,$('#bootstrap-slider-N').val());
    $("#sliderValue-A").text(slideEvt.value);
    $(window).scrollTop(tempScrollTop);
  });
    $("#bootstrap-slider-N").on("slide", function(slideEvt) {
     var tempScrollTop = $(window).scrollTop();
      changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),slideEvt.value);
      
    $("#sliderValue-N").text(slideEvt.value);
    $(window).scrollTop(tempScrollTop);
  });
  
   $('.slider').on("click", function(event) {

     var tempScrollTop = $(window).scrollTop();
     // event.preventDefault();
      // var newvalue = $('.tooltip-inner').text();
       changechart($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val())
     changef($('#bootstrap-slider-t1').val(),$('#bootstrap-slider-t2').val(),$('#bootstrap-slider-A').val(),$('#bootstrap-slider-N').val())
    $("#sliderValue-t1").text($('#bootstrap-slider-t1').val());
    $("#sliderValue-t2").text($('#bootstrap-slider-t2').val());
    $("#sliderValue-A").text($('#bootstrap-slider-A').val());
    $("#sliderValue-N").text($('#bootstrap-slider-N').val());

    $(window).scrollTop(tempScrollTop);
  });

    var vert = document.querySelector('.js-A');
    var initVert = new Powerange(vert, {callback: displayValueA ,vertical: true ,hideRange: true ,start: 10 ,min: 1, max: 20 });

function displayValueA() {
      document.getElementById('js-display-A').innerHTML = vert.value;
      changechart($('.js-t1').val(),$('.js-t2').val(),vert.value)
       max = 20*1/(parseInt($('.js-t1').val())+ parseInt($('.js-t2').val()));
      changef($('.js-t1').val(),$('.js-t2').val(),vert.value,$('.js-N').val(),max);

    }
      // Callback.
    var clbkt1 = document.querySelector('.js-t1');
    var initClbk = new Powerange(clbkt1, { callback: displayValuet1, start: 10 ,min: 1, max: 20 });

    function displayValuet1() {
      document.getElementById('js-display-t1').innerHTML = clbkt1.value;
      document.getElementById('js-display-total').innerHTML = parseInt($('.js-t1').val())+ parseInt($('.js-t2').val());
      changechart(clbkt1.value,$('.js-t2').val(),$('.js-A').val())
       max = 20*1/(parseInt($('.js-t1').val())+ parseInt($('.js-t2').val()));
      changef(clbkt1.value, $('.js-t2').val(), $('.js-A').val(), $('.js-N').val(),max);

    }

    var clbkt2 = document.querySelector('.js-t2');
    var initClbk = new Powerange(clbkt2, { callback: displayValuet2, start: 10 ,min: 1, max: 20 });

    function displayValuet2() {
      document.getElementById('js-display-t2').innerHTML = clbkt2.value;
      document.getElementById('js-display-total').innerHTML = parseInt($('.js-t1').val())+ parseInt($('.js-t2').val());
      changechart($('.js-t1').val(), clbkt2.value,$('.js-A').val())
      max = 20*1/(parseInt($('.js-t1').val())+ parseInt($('.js-t2').val()));
      changef($('.js-t1').val(), clbkt2.value, $('.js-A').val(), $('.js-N').val(),max);

    }

    var clbkN = document.querySelector('.js-N');
    var initClbk = new Powerange(clbkN, { callback: displayValueN, start: 10 ,min: 1, max: 20 });

    function displayValueN() {
      document.getElementById('js-display-N').innerHTML = clbkN.value;
     // changechart($('.js-t1').val(), clbkt2.value,$('.js-A').val())
      max = 20*1/(parseInt($('.js-t1').val())+ parseInt($('.js-t2').val()));
     changef($('.js-t1').val(), $('.js-t2').val(), $('.js-A').val(),clbkN.value , max);
    
    }

});

