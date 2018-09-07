var font_zoom_level = 1;
var fontzoom = {
    defaults : {
        step : 0.1,
        defaultlevel : 0.9375,
        maxlevel : 2,
        minlevel : 0.6, 
        chooserelement : '#zoom-triggers',
        zoominelement : '.zoom-in',
        zoomoutelement : '.zoom-out',
        zoomresetelement : '.zoom-reset',
        activeclass : 'active',
        activeelement : '#zoom-triggers li',
        disabledclass : 'disabled',
        displaychooser : true,
        usecookie : false,
        themetargetelement : 'html',
        themechooserelement : '.toggle-contrast',
        themetoggleclass : 'negative'
        },
    init: function (config) {
        var prop;
        if (config) {
            for (prop in config) {
                this.defaults[prop] = config[prop];
            }
        }
        return this;
        },
    onload : function () {
        if( this.defaults.displaychooser ) {
            $(this.defaults.chooserelement).show(); 
        }
        if ( this.defaults.defaultlevel != 1 ) {
            font_zoom_level = this.defaults.defaultlevel;
        }
        
        if( this.defaults.usecookie ) {
            var level = this.readCookie('fontzoomlevel');
            if($.isNumeric(level)) {
                font_zoom_level = parseFloat(level);
            }
            var theme = this.readCookie("theme");
            if( theme && theme != '' ) {
                this.defaults.themetoggleclass = theme;
                if ( theme != 'default' ) {
                    fontzoom.toggle_theme(); 
                }
            }

        }
        $(this.defaults.chooserelement + ' ' + this.defaults.zoominelement).click(function() { fontzoom.zoom_page(fontzoom.defaults.step, $(this), false) });
        $(this.defaults.chooserelement + ' ' + this.defaults.zoomoutelement).click(function() { fontzoom.zoom_page(-fontzoom.defaults.step, $(this), false) });
        $(this.defaults.chooserelement + ' ' + this.defaults.zoomresetelement).click(function() { fontzoom.zoom_page(0, $(this), false) });
        $(this.defaults.chooserelement + " " + this.defaults.themechooserelement).click(function() { fontzoom.toggle_theme(); });

        if ( font_zoom_level != this.defaults.defaultlevel ) {
            var newZoomStep = font_zoom_level - this.defaults.defaultlevel;
            newZoomStep = Math.round(newZoomStep * 10000) / 10000;
            
            if ( newZoomStep < 0 ) {
                this.zoom_page(0, $(this.defaults.chooserelement + ' ' + this.defaults.zoominelement), true);
            } else {
                this.zoom_page(0, $(this.defaults.chooserelement + ' ' + this.defaults.zoomoutelement), true);
            }
        } 
    },
    zoom_page : function (step, trigger, oninit) {
        // Zoom just to steps in or out
        if( font_zoom_level >= this.defaults.maxlevel && step > 0 || font_zoom_level <= this.defaults.minlevel && step < 0) {
            return;
        }

        // Set / reset zoom
        if( step == 0 && !oninit ) {
            font_zoom_level = this.defaults.defaultlevel;
        } else {
            font_zoom_level = font_zoom_level + step;
            font_zoom_level = Math.round(font_zoom_level * 10000) / 10000;
        }
        
        if ( this.defaults.usecookie ) {
            this.createCookie('fontzoomlevel', font_zoom_level, 365);
        }
        
        document.body.style.fontSize = font_zoom_level + "em";
        
        if( font_zoom_level >= this.defaults.maxlevel || font_zoom_level <= this.defaults.minlevel ) {
            trigger.addClass(this.defaults.disabledclass);
        } else {
            trigger.parents('ul').find('.'+this.defaults.disabledclass).removeClass(this.defaults.disabledclass);
        }
        
        $(this.defaults.activeelement).removeClass(this.defaults.activeclass);
        if( font_zoom_level != this.defaults.defaultlevel) {
            $(this.defaults.chooserelement + ' ' + this.defaults.zoomresetelement).removeClass(this.defaults.disabledclass);
            if ( font_zoom_level < 1 ) {
                $(this.defaults.chooserelement + ' ' + this.defaults.zoomoutelement).parent('li').addClass(this.defaults.activeclass);
            } else {
                $(this.defaults.chooserelement + ' ' + this.defaults.zoominelement).parent('li').addClass(this.defaults.activeclass);
            }
        } else {
            $(this.defaults.chooserelement + ' ' + this.defaults.zoomresetelement).addClass(this.defaults.disabledclass)
                .parent('li').addClass(this.defaults.activeclass);
        }
    
    },
    toggle_theme: function(){
        $(this.defaults.themetargetelement).toggleClass(this.defaults.themetoggleclass);
        if( this.defaults.usecookie ) {
            var currentTheme = '';
            if($(this.defaults.themetargetelement).hasClass(this.defaults.themetoggleclass)){
                currentTheme = this.defaults.themetoggleclass;
            }
            this.createCookie("theme", currentTheme, 365);
        }
    },
    createCookie : function(name,value,days){
        if (days){
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie : function(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++){
            var c = ca[i];
            while (c.charAt(0)==' ') {c = c.substring(1,c.length);}
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
    eraseCookie : function(name){
        this.createCookie(name,"",-1);
    }
};
