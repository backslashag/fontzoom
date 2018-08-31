# fontzoom
## Purpose
fontzoom is a small jQuery based library which adds allows to increase/decrease fontsizes for accessibility purposes. It has also included a theme-switcher to provide an alternative theme with negative colors for better readability for handicaped people.

## Examples
The library could be included like that:
```
<script type="text/javascript" src="fontzoom.min.js"></script>
<script type="text/javascript">
  $(document).ready(function(){
        var zConf = {
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
        };
        var zoomer = fontzoom.init(zConf);
        zoomer.onload();
       
    });
</script>
```

## Configuration
to be done…

## Version
The current version is **1.1.0**
## Changelog
### 1.1.0
- added theme-swither

### 1.0.0
- initial release

## Dependencies
The plugin works with jQuery 1.7+

Tested in:
* IE >= 8
* Firefox
* Chrome
* Safari

## Licence
Copyright (C) 2018 backslash - artists of new media (info@backslash.ch)

This work is licensed under the Creative Commons
Attribution 3.0 Unported License. To view a copy
of this license, visit
http://creativecommons.org/licenses/by/3.0/.
 
When using this software you use it at your own risk. We hold
no responsibility for any damage caused by using this plugin
or the documentation provided.
