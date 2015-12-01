# tqjphone
Jquery Phone Number Input

Usage
=====

```
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Nguyễn Như Tuấn</title>
<link rel="stylesheet" href="js/jphone/jquery.jphone.v2.1.css">
</head>

<body>

<h1>Demo Jquery Phone Input - ver 2.1</h1>

<input type="text" class="phone-input" id="vidu1" value="+840903258221" />

<p>
    <button type="button" id="btnClearValue">Clear Value</button> |
    <button type="button" id="btnGetValue">Get Value</button> |
    <button type="button" id="btnSetValue">Set Value</button> |
    <button type="button" id="btnValidate">Validate</button> |
    <button type="button" id="btnDisabled">Disabled</button> |
    <button type="button" id="btnEnabled">Enabled</button>
</p>

<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/jphone/phonenumbers/goog/base.js"></script>
<script>
    goog.require('goog.proto2.Message');
    goog.require('goog.dom');
    goog.require('goog.json');
    goog.require('goog.proto2.ObjectSerializer');
    goog.require('goog.string.StringBuffer');
</script>
<script src="js/jphone/phonenumbers/phonemetadata.pb.js"></script>
<script src="js/jphone/phonenumbers/phonenumber.pb.js"></script>
<script src="js/jphone/phonenumbers/metadata.js"></script>
<script src="js/jphone/phonenumbers/phonenumberutil.js"></script>
<script src="js/jphone/phonenumbers/asyoutypeformatter.js"></script>
<script src="js/jphone/jquery.jphone.v2.1.js"></script>
<script>
    jQuery('.phone-input').tqjphone({
        defaultCode: 'vn',
        addClass: 'example-class',
        maxHeight: 320
    });
    //jQuery('#vidu1').tqjphone('getval');
    //jQuery('#vidu1').tqjphone('setval', '+840903258221');

    $("#btnClearValue").click(function(e){
        jQuery('#vidu1').tqjphone('clearval');
    });

    $("#btnGetValue").click(function(e){
        var val = jQuery('#vidu1').tqjphone('getval');
        alert(val);
    });

    $("#btnSetValue").click(function(e){
        var val = window.prompt("Please enter phone number","");
        jQuery('#vidu1').tqjphone('setval', val);
    });

    $("#btnValidate").click(function(e){
        var val = jQuery('#vidu1').tqjphone('validate');
        alert(val);
    });

    $("#btnDisabled").click(function(e){
        jQuery('#vidu1').tqjphone('disabled');
    });

    $("#btnEnabled").click(function(e){
        jQuery('#vidu1').tqjphone('enabled');
    });

</script>
</body>
</html>
```
