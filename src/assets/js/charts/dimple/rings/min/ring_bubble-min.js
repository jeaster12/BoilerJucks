$(function(){var e=dimple.newSvg("#dimple-ring-bubble","100%",500);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(a){function t(){n.draw(0,!0),r.shapes.selectAll("text").attr("dy","1")}a=dimple.filterData(a,"Date","01/12/2011");var n=new dimple.chart(e,a);n.setBounds(0,0,"100%","100%"),n.setMargins(45,30,35,10);var i=n.addMeasureAxis("x","Unit Sales Monthly Change"),d=n.addMeasureAxis("y","Price Monthly Change");n.addMeasureAxis("p","Operating Profit"),n.addMeasureAxis("z","Operating Profit");var s=n.addSeries(["SKU","Channel"],dimple.plot.pie);s.innerRadius="80%";var r=n.addLegend(0,5,"100%",0,"left");i.fontSize="12",d.fontSize="12",i.fontFamily="Open Sans",d.fontFamily="Open Sans",r.fontSize="12",r.fontFamily="Open Sans",n.draw(),r.shapes.selectAll("text").attr("dy","1"),$(window).on("resize",t),$(".sidebar-control").on("click",t)})});