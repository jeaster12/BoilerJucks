$(function(){function t(t,e){function n(t){function h(){o=i.node().getBoundingClientRect().width-l.left-l.right,p=f.nodes(d),links=f.links(p),c.attr("width",o+l.left+l.right),s.attr("width",o+l.left+l.right),f.size([e,o-180]),u.projection(function(t){return[t.y,t.x]}),s.selectAll(".d3-tree-link").attr("d",u),s.selectAll(".d3-tree-node").attr("transform",function(t){return"translate("+t.y+","+t.x+")"})}var y=d3.event&&d3.event.altKey?5e3:500,p=f.nodes(d).reverse(),x=s.selectAll(".d3-tree-node").data(p,function(t){return t.id||(t.id=++a)}),g=x.enter().append("g").attr("class","d3-tree-node").attr("transform",function(e){return"translate("+t.y0+","+t.x0+")"}).on("click",function(t){r(t),n(t)});g.append("circle").attr("r",1e-6).style("fill","#fff").style("stroke","#0079bd").style("stroke-width",1.5).style("cursor","pointer").style("fill",function(t){return t._children?"#0079bd":"#fff"}),g.append("text").attr("x",function(t){return t.children||t._children?-10:10}).attr("dy",".35em").style("text-anchor",function(t){return t.children||t._children?"end":"start"}).style("font-size",12).style("fill-opacity",1e-6).text(function(t){return t.name});var v=x.transition().duration(y).attr("transform",function(t){return"translate("+t.y+","+t.x+")"});v.select("circle").attr("r",4.5).style("fill",function(t){return t._children?"#0079bd":"#fff"}),v.select("text").style("fill-opacity",1);var m=x.exit().transition().duration(y).attr("transform",function(e){return"translate("+t.y+","+t.x+")"}).remove();m.select("circle").attr("r",1e-6),m.select("text").style("fill-opacity",1e-6);var k=s.selectAll(".d3-tree-link").data(f.links(p),function(t){return t.target.id});k.enter().insert("path","g").attr("class","d3-tree-link").style("fill","none").style("stroke","#ddd").style("stroke-width",1.5).attr("d",function(e){var n={x:t.x0,y:t.y0};return u({source:n,target:n})}).transition().duration(y).attr("d",u),k.transition().duration(y).attr("d",u),k.exit().transition().duration(y).attr("d",function(e){var n={x:t.x,y:t.y};return u({source:n,target:n})}).remove(),p.forEach(function(t){t.x0=t.x,t.y0=t.y}),$(window).on("resize",h),$(".sidebar-control, .d3-tree-node circle").on("click",h)}function r(t){t.children?(t._children=t.children,t.children=null):(t.children=t._children,t._children=null)}var i=d3.select(t),l={top:0,right:0,bottom:0,left:40},o=i.node().getBoundingClientRect().width-l.left-l.right,e=e-l.top-l.bottom-5,a=0,d,c=i.append("svg"),s=c.attr("width",o+l.left+l.right).attr("height",e+l.top+l.bottom).append("g").attr("transform","translate("+l.left+","+l.top+")"),f=d3.layout.tree().size([e,o-180]),u=d3.svg.diagonal().projection(function(t){return[t.y,t.x]});d3.json("assets/demo_data/d3/tree/tree_data_collapsible.json",function(t,i){function l(t){t.children&&(t.children.forEach(l),r(t))}d=i,d.x0=e/2,d.y0=0,d.children.forEach(l),r(d.children[1]),r(d.children[1].children[2]),r(d.children[9]),r(d.children[9].children[0]),n(d)})}t("#d3-tree-collapsible",800)});