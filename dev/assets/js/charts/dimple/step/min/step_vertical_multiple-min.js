$(function(){var e=dimple.newSvg("#dimple-step-vertical-multiple","100%",500);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(t){function a(){n.draw(0,!0),s.shapes.selectAll("text").attr("dy","1")}t=dimple.filterData(t,"Owner",["Aperture","Black Mesa"]);var n=new dimple.chart(e,t);n.setBounds(0,0,"100%","100%"),n.setMargins(70,25,20,45);var i=n.addMeasureAxis("x","Unit Sales"),d=n.addCategoryAxis("y","Month");d.addOrderRule("Date");var l=n.addSeries("Channel",dimple.plot.line).interpolation="step",s=n.addLegend(0,5,"100%",0,"right");i.fontSize="12",d.fontSize="12",i.fontFamily="Open Sans",d.fontFamily="Open Sans",s.fontSize="12",s.fontFamily="Open Sans",n.draw(),s.shapes.selectAll("text").attr("dy","1"),$(window).on("resize",a),$(".sidebar-control").on("click",a)})});