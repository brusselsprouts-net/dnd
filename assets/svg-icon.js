//Leaflet-SVGIcon
//SVG icon for any marker class
//Ilya Atkin
//ilya.atkin@unh.edu

L.DivIcon.SVGIcon = L.DivIcon.extend({
    options: {
        "className": "svg-icon",
        "circleAnchor": null, //defaults to [iconSize.x/2, iconSize.x/2]
        "circleColor": null, //defaults to color
        "circleFillColor": "rgb(255,255,255)",
        "circleFillOpacity": null, //default to opacity
        "circleImageAnchor": null, //defaults to [(iconSize.x - circleImageSize.x)/2, (iconSize.x - circleImageSize.x)/2]
        "circleImagePath": null, //no default, preference over circleText
        "circleImageSize": null, //defaults to [iconSize.x/4, iconSize.x/4] if circleImage is supplied
        "circleOpacity": null, // defaults to opacity
        "circleRatio": 0.5,        
        "circleText": "",
        "circleWeight": null, //defaults to weight
        "color": "rgb(0,102,255)",
        "fillColor": null, // defaults to color
        "fillOpacity": 0.4,
        "fontColor": "rgb(0, 0, 0)",
        "fontOpacity": "1",
        "fontSize": null, // defaults to iconSize.x/4
        "fontWeight": "normal",
        "iconAnchor": null, //defaults to [iconSize.x/2, iconSize.y] (point tip)
        "iconSize": L.point(32,48),
        "opacity": 1,
        "popupAnchor": null,
        "shadowAngle": 45,
        "shadowBlur": 1,
        "shadowColor": "rgb(0,0,10)",
        "shadowEnable": false,
        "shadowLength": .75,
        "shadowOpacity": 0.5,
        "shadowTranslate": L.point(0,0),
        "weight": 0
    },
    initialize: function(options) {
        options = L.Util.setOptions(this, options)
        
        //iconSize needs to be converted to a Point object if it is not passed as one
        options.iconSize = L.point(options.iconSize)

        //in addition to setting option dependant defaults, Point-based options are converted to Point objects
        if (!options.circleAnchor) {
            options.circleAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.x)/2)
        }
        else {
            options.circleAnchor = L.point(options.circleAnchor)
        }
        if (!options.circleColor) {
            options.circleColor = options.color
        }
        if (!options.circleFillOpacity) {
            options.circleFillOpacity = options.opacity
        }
        if (!options.circleOpacity) {
            options.circleOpacity = options.opacity
        }
        if (!options.circleWeight) {
            options.circleWeight = options.weight
        }
        if (!options.fillColor) { 
            options.fillColor = options.color
        }
        if (!options.fontSize) {
            options.fontSize = Number(options.iconSize.x/4) 
        }
        if (!options.iconAnchor) {
            options.iconAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.y))
        }
        else {
            options.iconAnchor = L.point(options.iconAnchor)
        }
        if (!options.popupAnchor) {
            options.popupAnchor = L.point(0, (-0.75)*(options.iconSize.y))
        }
        else {
            options.popupAnchor = L.point(options.popupAnchor)
        }
        if (options.circleImagePath && !options.circleImageSize) {
            options.circleImageSize = L.point(Number(options.iconSize.x)/4, Number(options.iconSize.x)/4)
        }
        else {
            options.circleImageSize = L.point(options.circleImageSize)
        }
        if (options.circleImagePath && !options.circleImageAnchor) {
            options.circleImageAnchor = L.point(
                (Number(options.iconSize.x) - Number(options.circleImageSize.x))/2,
                (Number(options.iconSize.x) - Number(options.circleImageSize.y))/2
            )
        }
        else {
            options.circleImageAnchor = L.point(options.circleImageAnchor)
        }

        options.html = this._createSVG()
    },
    _createCircle: function() {
        var cx = Number(this.options.circleAnchor.x)
        var cy = Number(this.options.circleAnchor.y)
        var radius = this.options.iconSize.x/2 * Number(this.options.circleRatio)
        var fill = this.options.circleFillColor
        var fillOpacity = this.options.circleFillOpacity
        var stroke = this.options.circleColor
        var strokeOpacity = this.options.circleOpacity
        var strokeWidth = this.options.circleWeight
        var className = this.options.className + "-circle"        
       
        var circle = '<circle class="' + className + '" cx="' + cx + '" cy="' + cy + '" r="' + radius +
            '" fill="' + fill + '" fill-opacity="'+ fillOpacity + 
            '" stroke="' + stroke + '" stroke-opacity=' + strokeOpacity + '" stroke-width="' + strokeWidth + '"/>'
        
        return circle
    },
    _createCircleImage: function() {
        var x = this.options.circleImageAnchor.x
        var y = this.options.circleImageAnchor.y
        var height = this.options.circleImageSize.y
        var width = this.options.circleImageSize.x
        var href = this.options.circleImagePath
        
        var image = '<image x="' + x + '" y="' + y + '" height="' + height + '" width="' + width + '" href="' + href + '"</image>'
        
        return image
    },
    _createPathDescription: function() {
        var height = Number(this.options.iconSize.y)
        var width = Number(this.options.iconSize.x)
        var weight = Number(this.options.weight)
        var margin = weight / 2
        
        var h = height - (width/2)
        var r = width/4
        var l  = Math.sqrt(Math.pow(h, 2) - Math.pow(r, 2))
        var theta = Math.asin((r/h))
        var alpha = Math.PI/2 - theta
        var x = l * Math.cos(alpha)
        var y = l * Math.sin(alpha)

        // var startPoint = "M " + margin + " " + (width/2) + " "
        // var leftLine = "L " + (width/2) + " " + (height - weight) + " "
        // var rightLine = "L " + (width - margin) + " " + (width/2) + " "
        // var arc = "A " + (width/4) + " " + (width/4) + " 0 0 0 " + margin + " " + (width/2) + " Z"
        
        var startPoint = "M " + (width/4 - x + margin) + " " + (height - y) + " "
        var leftLine = "L " + (width/2) + " " + (height - weight) + " "
        var rightLine = "L " + (width*0.75 + x - margin) + " " + (height - y) + " "
        var arc = "A " + (width/2) + " " + (width/2) + " 0 1 0 " + (width/4 - x + margin) + " " + (height - y) + " Z"

        var d = startPoint + leftLine + rightLine + arc

        return d
    },
    _createPath: function() {
        var pathDescription = this._createPathDescription()
        var strokeWidth = this.options.weight
        var stroke = this.options.color
        var strokeOpacity = this.options.opacity
        var fill = this.options.fillColor
        var fillOpacity = this.options.fillOpacity
        var className = this.options.className + "-path"

        var path = '<path class="' + className + '" d="' + pathDescription +
            '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" stroke-opacity="' + strokeOpacity +
            '" fill="' + fill + '" fill-opacity="' + fillOpacity + '"/>'

        return path
    },
    _createShadow: function() {
        var pathDescription = this._createPathDescription()
        var strokeWidth = this.options.weight
        var stroke = this.options.shadowColor
        var fill = this.options.shadowColor
        var className = this.options.className + "-shadow"

        var origin = (this.options.iconSize.x / 2) + "px " + (this.options.iconSize.y) + "px"
        var rotation = this.options.shadowAngle
        var height = this.options.shadowLength
        var opacity = this.options.shadowOpacity
        var blur = this.options.shadowBlur
        var translate = this.options.shadowTranslate.x + "px, " + this.options.shadowTranslate.y + "px"

        var blurFilter = "<filter id='iconShadowBlur'><feGaussianBlur in='SourceGraphic' stdDeviation='" + blur + "'/></filter>"

        var shadow = '<path filter="url(#iconShadowBlur") class="' + className + '" d="' + pathDescription +
            '" fill="' + fill + '" stroke-width="' + strokeWidth + '" stroke="' + stroke + 
            '" style="opacity: ' + opacity + '; ' + 'transform-origin: ' + origin +'; transform: rotate(' + rotation + 'deg) translate(' + translate + ') scale(1, '+ height +')' +
            '"/>'

        return blurFilter+shadow 
    },
    _createSVG: function() {
        var path = this._createPath()
        var circle = this._createCircle()
        var shadow = this.options.shadowEnable ? this._createShadow() : ""
        var innerCircle = this.options.circleImagePath ? this._createCircleImage() : this._createText()
        var className = this.options.className + "-svg"
        var width = this.options.iconSize.x 
        var height = this.options.iconSize.y
            
        if (this.options.shadowEnable) {
            width += this.options.iconSize.y * this.options.shadowLength - (this.options.iconSize.x / 2)
            width = Math.max(width, 32)
            height += this.options.iconSize.y * this.options.shadowLength
        }

        var style = "width:" + width + "px; height:" + height

        var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="' + className + '" style="' + style + '">' + shadow + path + circle + innerCircle + '</svg>'

        return svg
    },
    _createText: function() {
        var fontSize = this.options.fontSize + "px"
        var fontWeight = this.options.fontWeight
        var lineHeight = Number(this.options.fontSize)

        var x = this.options.circleAnchor.x
        var y = this.options.circleAnchor.y + (lineHeight * 0.35) //35% was found experimentally 
        var circleText = this.options.circleText
        var textColor = this.options.fontColor.replace("rgb(", "rgba(").replace(")", "," + this.options.fontOpacity + ")")

        var text = '<text text-anchor="middle" x="' + x + '" y="' + y + '" style="font-size: ' + fontSize + '; font-weight: ' + fontWeight +'" fill="' + textColor + '">' + circleText + '</text>'

        return text
    }
})

L.divIcon.svgIcon = function(options) {
    return new L.DivIcon.SVGIcon(options)
}

L.Marker.SVGMarker = L.Marker.extend({
    options: {
        "iconFactory": L.divIcon.svgIcon,
        "iconOptions": {}
    },
    initialize: function(latlng, options) {
        options = L.Util.setOptions(this, options)
        options.icon = options.iconFactory(options.iconOptions)
        this._latlng = latlng
    },
    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map)
    },
    setStyle: function(style) {
        if (this._icon) {
            var svg = this._icon.children[0]
            var iconBody = this._icon.children[0].children[0]
            var iconCircle = this._icon.children[0].children[1]

            if (style.color && !style.iconOptions) {
                var stroke = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.opacity+")")
                var fill = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.fillOpacity+")")
                iconBody.setAttribute("stroke", stroke)
                iconBody.setAttribute("fill", fill)
                iconCircle.setAttribute("stroke", stroke)

                this.options.icon.fillColor = fill
                this.options.icon.color = stroke
                this.options.icon.circleColor = stroke
            }
            if (style.opacity) {
                this.setOpacity(style.opacity)
            }
            if (style.iconOptions) {
                if (style.color) { style.iconOptions.color = style.color }
                var iconOptions = L.Util.setOptions(this.options.icon, style.iconOptions)
                this.setIcon(L.divIcon.svgIcon(iconOptions))
            }
        }
    }
})

L.marker.svgMarker = function(latlng, options) {
    return new L.Marker.SVGMarker(latlng, options)
}