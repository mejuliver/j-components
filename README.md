# j-components
A jquery set of custom components and CSS helper classes.

## j-components.css
Just open j-components.css to see available helper classes.

## j-components.js

### Limit text component
This will limit the wording on the given element.

```
// "el" element id, class
// "limit" words limitation e.g. 235, must be number, this parameter will be use on checking if the given contents did exceed the given limit or not
// "crop" must be number e.g. 234, indicate how many words will be cut-off from the given contents

limitText(el, limit, crop)
```

### Long shadow component
This will add a long shadow to a given element. This will require [Long shadow plugin](ttps://github.com/dangvanthanh/jquery.longShadow).

```
// "el", element id, class
// "shadow_color", the color of the shadow
// "shadow_length", the length of the shadow
// "shadow_position", the direction of the shadow, currently the shadow has 8 directions 'top, right, bottom, left, top-right, top-left, bottom-right, bottom-left'

j_shadow(el, shadow_color, shadow_length, shadow_position)
```

### Spinner, spinner component
Add spinner, spinner unto your app.

```
// "status", can be 'on' or 'off', 'on' display the spinner, 'off' remove the spinner
// "spinner_type", type can be 'spinner1,spinner2,spinner3,spinner4,spinner5,spinner6,spinner7,spinner8,spinner9,spinner10'

j_spinner(status,spinner_type)
```

### Pop-up modal dialog component
Show modal dialog in your page. This requires [Bootstrap framework](http://getbootstrap.com/)

```
// "title", the title of the modal
// "content", the contents of the modal
// "dependencies", function that will be called upon modal display

modal(title, content, dependencies)
```

### Extra pop-up modal dialog component
Show additional modal dialog above current dispalyed modal dialog in your page. This requires [Bootstrap framework](http://getbootstrap.com/)

```
// "title", the title of the modal
// "content", the contents of the modal
// "dependencies", function that will be called upon extra modal display

extra_modal(title, content, dependencies)
```

### Run global function
 Run a globally declared function

```
// "dependencies", names of the function to be called. Note: if multiple functions, separated by space

get_dependencies(dependencies)
```

### Get html page
  pull and render html page using AJAX

```
// "dependencies", names of the function to be called. Note: if multiple functions, separated by space

get_page(this_tab_content_link, container, dependencies)
```

### Toast notification
  Show a toast notification box

```
// "contents", contents of the toast notification
// "auto_hide", if 'yes' then toast notification will be hidden after 5 seconds
// "hide", hide toast notification

j_notification(contents, auto_hide, hide)
```

### Custom drop-down menu
  Create a custom drop-down menu

  Example:
```
<div class="j-components">
	<nav class="j-menu">
		<ul class="j-menu-nav">
			<li>
				<a href="#test.html" data-ajaxpage="yes" data-ajax-render="#test-page-container" data-dependencies="function1 function2">Home</a>
			</li>
			<li>
				<a href="#" data-allow-active="yes">About</a>
			</li>
			<li>
				<a href="#" data-allow-active="no">Contact</a>
			</li>
		</ul>
	</nav>
</div>
```

Example tabs:
```
<div class="j-components">
	<nav class="j-menu">
		<ul class="j-menu-nav" data-tabs-container="tabs-container">
			<li>
				<a href="#tab1" data-dependencies="function1 function2" data-tabs="yes">Tab 1</a>
			</li>
			<li>
				<a href="#tab2" data-tabs="yes">Tab 2</a>
			</li>
			<li>
				<a href="#tab3" data-tabs="yes">Tab 3</a>
			</li>
		</ul>
	</nav>
</div>
<div id="tabs-container">
	<div class="j-tabs" id="tab1">
		tab 1 contents
	</div>
	<div class="j-tabs" id="tab2">
		tab 2 contents
	</div>
	<div class="j-tabs" id="tab3">
		tab 3 contents
	</div>
</div>
```

Example with dropdown:
```
<div class="j-components">
	<nav class="j-menu">
		<ul class="j-menu-nav">
			<li>
				<a href="#" data-has-submenu="yes" data-on-close="function1 function2" data-on-open="function1 function2">Has submenu</a>
				<ul class="j-menu-dp-container">
					<li>
						<a href="#">Submenu 1</a>
					</li>
					<li>
						<a href="#" data-tabs="yes">Submenu 2</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
```

### Others helper components

#### "dont-write" class
Inputs,textareas that has a class of "dont-write", will be put on read-only state, in short, you won't able to write/type

#### "numbersonly" class
This will allow only numbers on inputs and textareas

#### ".ani-auto-delay" class
This will add animation delay to each element that has a class of "ani-auto-delay"

#### ".ani-auto-delay" class
This will add animation delay to each element that has a class of "ani-auto-delay"





