Menu On Scroll - jQuery Plugin
---
A jQuery plugin that allows you to auto update your navigation menu automatically when you scroll

## Installation
Download the source code here, and follow two simple steps as below. That is it!
### Javascript
Include jQuery 1.8+ and the menuOnScroll plugin either in the footer or header
of your website.
You can then initialize the plugin right after the document is ready.

    <script src="path/to/jquery.js"></script>
    <script src="path/to/jquery.menuOnScroll.js"></script>
    <script>
      $(document).ready(function() {
        $("#menu").menuOnScroll();
      });
    </script>

### HTML
You have full control of what element you want to use for this plugin. However,
it's designed specifically for the navigation of one-page website. Like this
site!

    <ul id="menus">
      <li class="menu-item">
        <a href="#introduction">Introduction</a>
      </li>
      <li class="menu-item">
        <a href="#installation">Installation</a>
      </li>
    </ul>

    <div id="container">
      <div id="introduction">...</div>
      <div id="installation">...</div>
    </div>

## Options
The plugin requires no extra configuration if you follow the HTML markup above.
However, it still offers the flexibility that you can configure to meet your
requirements.


**menuActiveClass**

Type: ``String``

Default: ``"active"``

The class that attaches to the menu item when it's active.

------
**menuSelector**

Type: ``Class Selector``

Default: ``".menu-item"``

The class name of the menu item.

------
**headerOffset**

Type: Number

Default: 0

The height of the fixed header

------
**footerOffset**

Type: ``Number``

Default: ``0``

The offset value of footer (if has one), this is used when you want to notify
the position of last menu item from the bottom of the page.

------
**scrollOnClickOffset**

Type: ``Number``

Default: ``80``

The offset value used for scroll to element when the menu item is clicked.
