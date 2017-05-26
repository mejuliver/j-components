# j-components
A jquery set of custom components and CSS helper classes.

## j-components.css
Just open j-components.css to see available helper classes.

## j-components.js

### Limit text component
This will limit the wording on the given element

```
// "el" element id, class
// "limit" words limitation e.g. 235, must be number, this parameter will be use on checking if the given contents did exceed the given limit or not
// "crop" must be number e.g. 234, indicate how many words will be cut-off from the given contents

limitText(el, limit, crop)
```

### Long shadow component
This will add a long shadow to a given element. This will require [Long shadow plugin](ttps://github.com/dangvanthanh/jquery.longShadow)

```
// "el", element id, class
// "shadow_color", the color of the shadow
// "shadow_length", the length of the shadow
// "shadow_position", the direction of the shadow, currently the shadow has 8 directions 'top, right, bottom, left, top-right, top-left, bottom-right, bottom-left'

j_shadow(el, shadow_color, shadow_length, shadow_position)


### Loader, spinner component
Add loader, spinner unto your app

```

