$(function () {

    var hexMargin = 0.15;
    var hexWidthMarginRatio = 0.8;
    var hexHeight = 2;
    var hexWidth = 1.732;
    var hexSide = 1.0;
    var originX = -hexWidth * 0.8;
    var originY = -hexHeight * 0.7;

    var hexAnimateInDuration = 4000;
    var hexAnimateOutDuration = 4000;
    var hexAnimateInterval = 50; // in milliseconds
    var hexBaseOpacity = 0.1;
    var hexMaxOpacity = .8;
    var hexOpacityVariance = 0.2;
    var hexAnimateProbability = 0.035;
    var hexMaxFadeDelta = 0.1;
    var hexFadeInEasing = "easeInOutQuad";
    var hexFadeOutEasing = "easOutCirc";
    var hexOpacities = []

    var EM = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
    var maxWindowWidth = 4000.0;
    var maxWindowHeight = 2160.0;
    var hexFontSize = parseFloat($("#sample-hex").css("font-size")) / EM;
    var hexWidthEm = 1.732;
    var hexHeightEm = 2.0;  
    // console.log(hexFontSize);
    // console.log(maxWindowHeight/(hexHeightEm*(1 + hexMargin)*20.0*hexFontSize))
    for (var y = 0; 2 * y  < maxWindowHeight/(hexHeightEm*(1 + hexMargin)*20.0*hexFontSize); y++) {
        for (var x = 0; x < maxWindowWidth/(hexWidthEm*(1 + hexMargin)*20.0*hexFontSize); x++) {
            for (var i = 0; i < 2; i++) { 
                // console.log("adding hexagon...");
                var thisid = "hex-" + x + "-" + y + "-" + i;
                var landing = document.getElementById("landing");
                var hex = document.createElement("div");
                var l = document.createElement("div");
                var m = document.createElement("div"); 
                var r = document.createElement("div");
                l.setAttribute("class", "l");  
                m.setAttribute("class", "m");
                r.setAttribute("class", "r");
                hex.setAttribute("class", "hex");
                hex.appendChild(l);
                hex.appendChild(m);
                hex.appendChild(r);
                hex.id = thisid;
                var xOff = i===0 ? 0 : hexWidth * 0.5 + hexMargin * 0.4;
                var yOff = i===0 ? 0 : (1.5 + hexMargin * 0.5) * Math.pow(-1, -i + 1);
                // console.log(hexMargin * 0.5);
                $(hex).css("left", (x * (hexWidth + (hexMargin * hexWidthMarginRatio)) + xOff + originX).toString() + "em");
                $(hex).css("top", (y * (hexHeight + hexMargin + hexSide) + yOff + originY).toString() + "em");
                var op = parseFloat((hexBaseOpacity + (Math.random() * (Math.random() < 0.5 ? -1 : 1) * hexOpacityVariance)).toFixed(3));
                // console.log(op);
                $(hex).css("opacity", op);
                landing.appendChild(hex);
                hexOpacities.push(op)
            } 
        }
    }
    // console.log(hexOpacities)
    // .animate( properties [, duration ] [, easing ] [, complete ] )
    
    
    function hexFadeIn(hex) {
        if (!$(hex).hasClass("active")) {
            $(hex).addClass("active");
            $(hex).animate({ "opacity": hexMaxOpacity }, {
                duration: hexAnimateInDuration,
                easing: "easeInOutQuad",
                complete: function() {
                    $(hex).animate({ "opacity": parseFloat((hexBaseOpacity + (Math.random() * (Math.random() < 0.5 ? -1 : 1) * hexOpacityVariance)).toFixed(3)) }, {
                        duration: hexAnimateOutDuration,
                        easing: "easeOutCirc",
                        complete: function () {
                            $(hex).removeClass("active");
                        }
                    });
                }
            });
        }
        
    }

    
    function animateHexs() {
        var hexs = document.getElementById("landing").getElementsByClassName("hex");
        var i = 0;
        Array.prototype.forEach.call(hexs, function (hex) {
            if (!$(hex).hasClass("active")) {
                //var dirInfluence = activation(((hexBaseOpacity + hexOpacityVariance - parseFloat(hex.style.opacity)) / (2 * hexOpacityVariance)) - 0.5, 5.0);
                // if (i == 200)
                    // console.log(dirInfluence);
                // if (Math.abs(parseFloat(hex.style.opacity) - hexBaseOpacity) > hexOpacityVariance)
                    // console.log(hex.currentStyle.opacity);
                // console.log(window.getComputedStyle(hex).getPropertyValue('opacity'));
                // if (i == 200)
                    // console.log(hexOpacities[200]);
                var dir = (Math.random() < 0.5 ? 1 : -1)
                hexOpacities[i] = Math.min(Math.max((parseFloat(hexOpacities[i])
                    + (dir * Math.random() * hexMaxFadeDelta * hexAnimateInterval * 0.001 * hexOpacityVariance)).toFixed(3), 0), hexMaxOpacity);
                Math.random() < hexAnimateProbability * hexAnimateInterval * 0.001
                    ? hexFadeIn(hex)
                    : hex.style.opacity = hexOpacities[i];      
                // if (i == 200)
                    // console.log(hexOpacities[200]);
            }
            i++;
        });
    }

    var animateHexLoop = setInterval(animateHexs, hexAnimateInterval);
   
});

function activation(n, mult=1.52) {
    return (0.025 * Math.tan(n*3.05)) + 0.5
}

$(document).scroll(function() {
    //console.log("scrolled " + $(document).scrollTop());


});                    