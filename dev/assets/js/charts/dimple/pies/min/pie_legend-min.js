$(function(){var e=dimple.newSvg("#dimple-pie-legend",420,300);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(d){var a=new dimple.chart(e,d);a.setBounds(0,0,"100%","100%"),a.setMargins(5,5,100,5),a.addMeasureAxis("p","Unit Sales"),a.addSeries("Owner",dimple.plot.pie);var i=a.addLegend("100%",0,0,"100%","right");i.fontSize="12",i.fontFamily="Open Sans",a.draw()})});