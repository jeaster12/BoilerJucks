$(function(){var e=dimple.newSvg("#dimple-line-horizontal-single","100%",500);d3.tsv("assets/demo_data/dimple/demo_data.tsv",function(t){function a(){setTimeout(function(){i.draw(0,!0),n.titleShape.remove(),o.titleShape.remove()},100)}t=dimple.filterData(t,"Owner",["Aperture","Black Mesa"]);var i=new dimple.chart(e,t);i.setBounds(0,0,"100%","100%"),i.setMargins(40,10,0,50);var n=i.addCategoryAxis("x","Month");n.addOrderRule("Date");var o=i.addMeasureAxis("y","Unit Sales"),l=i.addSeries(null,dimple.plot.line).interpolation="basis";n.fontSize="12",o.fontSize="12",n.fontFamily="Open Sans",o.fontFamily="Open Sans",i.draw(),n.titleShape.remove(),o.titleShape.remove(),$(window).on("resize",a),$(".sidebar-control").on("click",a)})});