$(function(){var e=dimple.newSvg("#dimple-bar-vertical-stacked-grouped","100%",500);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(a){function t(){n.draw(0,!0),s.shapes.selectAll("text").attr("dy","1")}var n=new dimple.chart(e,a);n.setBounds(0,0,"100%","100%"),n.setMargins(55,5,120,45);var d=n.addMeasureAxis("x","Unit Sales"),i=n.addCategoryAxis("y",["Price Tier","Channel"]);n.addSeries("Owner",dimple.plot.bar);var s=n.addLegend("100%",0,0,"100%","right");d.fontSize="12",i.fontSize="12",d.fontFamily="Open Sans",i.fontFamily="Open Sans",s.fontSize="12",s.fontFamily="Open Sans",n.draw(),s.shapes.selectAll("text").attr("dy","1"),$(window).on("resize",t),$(".sidebar-control").on("click",t)})});