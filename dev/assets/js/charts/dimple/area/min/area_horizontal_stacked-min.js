$(function(){var e=dimple.newSvg("#dimple-area-horizontal-stacked","100%",500);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(a){function t(){n.draw(0,!0),s.shapes.selectAll("text").attr("dy","1"),i.titleShape.remove()}a=dimple.filterData(a,"Owner",["Aperture","Black Mesa"]);var n=new dimple.chart(e,a);n.setBounds(0,0,"100%","100%"),n.setMargins(55,25,10,50);var i=n.addCategoryAxis("x","Month");i.addOrderRule("Date");var d=n.addMeasureAxis("y","Unit Sales"),r=n.addSeries("Channel",dimple.plot.area).interpolation="basis",s=n.addLegend(0,5,"100%",0,"right");i.fontSize="12",d.fontSize="12",i.fontFamily="Open Sans",d.fontFamily="Open Sans",s.fontSize="12",s.fontFamily="Open Sans",n.draw(),s.shapes.selectAll("text").attr("dy","1"),i.titleShape.remove(),$(window).on("resize",t),$(".sidebar-control").on("click",t)})});