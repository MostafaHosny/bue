function changechart(t,a,e){t=parseInt(t),a=parseInt(a),e=parseInt(e),T=t+a;for(var l=[[0,e],[t,e],[t,-e],[t+a,-e],[t+a,0]],s=0;20>s;s++)l.push([T,e],[T+t,e],[T+t,-e],[T+t+a,-e],[T+t+a,0]),T=T+t+a;options.series[0].data=l;new Highcharts.Chart(options)}function changef(t,a,e,l,s){t=parseInt(t),a=parseInt(a),e=parseInt(e),l=parseInt(l);var o=Math.abs(e*(t-a)/(t+a)),r=1/(t+a),n=[],i=[];i.push([0,o]);for(var d=1;l>=d;d++)i.push([d*r,2*e/d*r*Math.PI],[-d*r,2*e/d*r*Math.PI]),n.push([d*r,d*Math.PI/2],[-d*r,-d*Math.PI/2]);n.sort(sortFunction),i.sort(sortFunction),maxy=80*e/20*r*Math.PI,options2.xAxis.max=s,options2.xAxis.min=-s,options2.yAxis.max=maxy,options2.series[0].data=i;new Highcharts.Chart(options2);options3.xAxis.max=s,options3.xAxis.min=-s,options3.series[0].data=n;new Highcharts.Chart(options3)}function sortFunction(t,a){return t[0]===a[0]?0:t[0]<a[0]?-1:1}var options={chart:{renderTo:"chart_div",type:"spline"},tooltip:{enabled:!1},credits:{enabled:!1},plotOptions:{line:{marker:{enabled:!1}}},series:[{showInLegend:!1,animation:!1,name:"A",data:[],color:"blue"}],title:{text:"Time domain",style:{color:"blue"}},xAxis:{gridLineWidth:1,ordinal:!1,max:40,min:0,title:{text:"T(sec)"},style:{color:"blue"}},yAxis:{gridLineWidth:1,ordinal:!1,max:20,min:-20,title:{text:"A",style:{color:"blue"}}}},max=1,options2={chart:{renderTo:"chart_div2",type:"column"},credits:{enabled:!1},series:[{borderWidth:0,pointWidth:2,showInLegend:!1,animation:!1,name:"C(N)",data:[],color:"blue"}],title:{text:"Amplitude"},xAxis:{gridLineWidth:.5,ordinal:!1,max:max,min:-max,title:{text:"F hz"}},yAxis:{gridLineWidth:.5,ordinal:!1,max:10,min:0,title:{text:"C(N)"}}},options3={chart:{renderTo:"chart3",type:"column"},credits:{enabled:!1},series:[{animation:!1,borderWidth:0,pointWidth:2,showInLegend:!1,name:"Phase(N)",data:[],color:"blue"}],title:{text:"Phase"},xAxis:{gridLineWidth:.5,ordinal:!1,max:max,min:-max,title:{text:"phase(N)"}},yAxis:{gridLineWidth:.5,ordinal:!1,max:90,min:-90,title:{text:"C(n)"}}};$(document).ready(function(){function t(){document.getElementById("js-display-A").innerHTML=s.value,changechart($(".js-t1").val(),$(".js-t2").val(),s.value),max=20/(parseInt($(".js-t1").val())+parseInt($(".js-t2").val())),changef($(".js-t1").val(),$(".js-t2").val(),s.value,$(".js-N").val(),max)}function a(){document.getElementById("js-display-t1").innerHTML=o.value,document.getElementById("js-display-total").innerHTML=parseInt($(".js-t1").val())+parseInt($(".js-t2").val()),changechart(o.value,$(".js-t2").val(),$(".js-A").val()),max=20/(parseInt($(".js-t1").val())+parseInt($(".js-t2").val())),changef(o.value,$(".js-t2").val(),$(".js-A").val(),$(".js-N").val(),max)}function e(){document.getElementById("js-display-t2").innerHTML=r.value,document.getElementById("js-display-total").innerHTML=parseInt($(".js-t1").val())+parseInt($(".js-t2").val()),changechart($(".js-t1").val(),r.value,$(".js-A").val()),max=20/(parseInt($(".js-t1").val())+parseInt($(".js-t2").val())),changef($(".js-t1").val(),r.value,$(".js-A").val(),$(".js-N").val(),max)}function l(){document.getElementById("js-display-N").innerHTML=n.value,max=20/(parseInt($(".js-t1").val())+parseInt($(".js-t2").val())),changef($(".js-t1").val(),$(".js-t2").val(),$(".js-A").val(),n.value,max)}$("#select_chart").on("change",function(){alert(this.value)}),max=20/(parseInt($(".js-t1").val())+parseInt($(".js-t2").val())),changechart($(".js-t1").val(),$(".js-t2").val(),$(".js-A").val()),changef($(".js-t1").val(),$(".js-t2").val(),$(".js-A").val(),$(".js-N").val()),document.getElementById("js-display-total").innerHTML=parseInt($(".js-t1").val())+parseInt($(".js-t2").val()),$("#bootstrap-slider-t1").on("slide",function(t){var a=$(window).scrollTop();changechart(t.value,$("#bootstrap-slider-t2").val(),$("#bootstrap-slider-A").val()),changef(t.value,$("#bootstrap-slider-t2").val(),$("#bootstrap-slider-A").val(),$("#bootstrap-slider-N").val()),$("#sliderValue-t1").text(t.value),$(window).scrollTop(a)}),$("#bootstrap-slider-t2").on("slide",function(t){changechart($("#bootstrap-slider-t1").val(),t.value,$("#bootstrap-slider-A").val()),changef($("#bootstrap-slider-t1").val(),t.value,$("#bootstrap-slider-A").val(),$("#bootstrap-slider-N").val()),$("#sliderValue-t2").text(t.value),$(window).scrollTop(tempScrollTop)}),$("#bootstrap-slider-A").on("slide",function(t){var a=$(window).scrollTop();changechart($("#bootstrap-slider-t1").val(),$("#bootstrap-slider-t2").val(),t.value),changef($("#bootstrap-slider-t1").val(),$("#bootstrap-slider-t2").val(),t.value,$("#bootstrap-slider-N").val()),$("#sliderValue-A").text(t.value),$(window).scrollTop(a)}),$("#bootstrap-slider-N").on("slide",function(t){var a=$(window).scrollTop();changef($("#bootstrap-slider-t1").val(),$("#bootstrap-slider-t2").val(),$("#bootstrap-slider-A").val(),t.value),$("#sliderValue-N").text(t.value),$(window).scrollTop(a)}),$(".slider").on("click",function(t){var a=$(window).scrollTop();changechart($("#bootstrap-slider-t1").val(),$("#bootstrap-slider-t2").val(),$("#bootstrap-slider-A").val()),changef($("#bootstrap-slider-t1").val(),$("#bootstrap-slider-t2").val(),$("#bootstrap-slider-A").val(),$("#bootstrap-slider-N").val()),$("#sliderValue-t1").text($("#bootstrap-slider-t1").val()),$("#sliderValue-t2").text($("#bootstrap-slider-t2").val()),$("#sliderValue-A").text($("#bootstrap-slider-A").val()),$("#sliderValue-N").text($("#bootstrap-slider-N").val()),$(window).scrollTop(a)});var s=document.querySelector(".js-A"),o=(new Powerange(s,{callback:t,vertical:!0,hideRange:!0,start:10,min:1,max:20}),document.querySelector(".js-t1")),r=(new Powerange(o,{callback:a,start:10,min:1,max:20}),document.querySelector(".js-t2")),n=(new Powerange(r,{callback:e,start:10,min:1,max:20}),document.querySelector(".js-N"));new Powerange(n,{callback:l,start:10,min:1,max:20})});