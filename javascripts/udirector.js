var __uMinWidth, __uPcStyle, __uMbStyle;
function udirect(minWidth, pcStyle, mbStyle) {
    __uMinWidth = minWidth;
    __uPcStyle = pcStyle;
    __uMbStyle = mbStyle;
	try{
		var w = document.body.clientWidth;
		if (w > minWidth) {
		    var css = document.createElement("link")
		    css.setAttribute("rel", "stylesheet");
		    css.setAttribute("type", "text/css");
		    css.setAttribute("href", pcStyle);
		    document.body.appendChild(css);
		} else {
		    var css = document.createElement("link")
		    css.setAttribute("rel", "stylesheet");
		    css.setAttribute("type", "text/css");
		    css.setAttribute("href", mbStyle);
		    document.body.appendChild(css);
		}
		document.body.onresize = uResize; 
	}catch(d){
	}
}

function uResize() {
    udirect(__uMinWidth, __uPcStyle, __uMbStyle)
}
