/*
*   jQuery Phone version 2.2
*
*   Demo's and documentation:
*   https://github.com/tuanquynh0508/tqjphone
*
*   Copyright (c) 2015 Nguyen Nhu Tuan
*   http://i-designer.net
*
*   Dual licensed under the MIT and GPL licenses.
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
*   Required libraries
*   https://github.com/google/closure-library
*   https://github.com/googlei18n/libphonenumber
*/
(function( $ ){

    var defaultsOption = {
        defaultCode: 'fr',
        addClass: '',
        maxHeight: 300
    };

    var methods = {
        init: init,
        setval: setValue,
        getval: getValue,
        getRegionCode: getValue,
        getCountryCode: getValue,
        getNational: getValue,
        validate: validate,
        clearval: clearValue,
        disabled: disabledInput,
        enabled: enabledInput
    };

    var listCountry = [{"code":"fr","phoneCode":"33","name":"France"},{"code":"af","phoneCode":"93","name":"Afghanistan"},{"code":"al","phoneCode":"355","name":"Albania"},{"code":"dz","phoneCode":"213","name":"Algeria"},{"code":"ad","phoneCode":"376","name":"Andorra"},{"code":"ao","phoneCode":"244","name":"Angola"},{"code":"aq","phoneCode":"672","name":"Antarctica"},{"code":"ar","phoneCode":"54","name":"Argentina"},{"code":"am","phoneCode":"374","name":"Armenia"},{"code":"aw","phoneCode":"297","name":"Aruba"},{"code":"au","phoneCode":"61","name":"Australia"},{"code":"at","phoneCode":"43","name":"Austria"},{"code":"az","phoneCode":"994","name":"Azerbaijan"},{"code":"bh","phoneCode":"973","name":"Bahrain"},{"code":"bd","phoneCode":"880","name":"Bangladesh"},{"code":"by","phoneCode":"375","name":"Belarus"},{"code":"be","phoneCode":"32","name":"Belgium"},{"code":"bz","phoneCode":"501","name":"Belize"},{"code":"bj","phoneCode":"229","name":"Benin"},{"code":"bt","phoneCode":"975","name":"Bhutan"},{"code":"bo","phoneCode":"591","name":"Bolivia, Plurinational State Of"},{"code":"ba","phoneCode":"387","name":"Bosnia And Herzegovina"},{"code":"bw","phoneCode":"267","name":"Botswana"},{"code":"br","phoneCode":"55","name":"Brazil"},{"code":"bn","phoneCode":"673","name":"Brunei Darussalam"},{"code":"bg","phoneCode":"359","name":"Bulgaria"},{"code":"bf","phoneCode":"226","name":"Burkina Faso"},{"code":"mm","phoneCode":"95","name":"Myanmar"},{"code":"bi","phoneCode":"257","name":"Burundi"},{"code":"kh","phoneCode":"855","name":"Cambodia"},{"code":"cm","phoneCode":"237","name":"Cameroon"},{"code":"ca","phoneCode":"1","name":"Canada"},{"code":"cv","phoneCode":"238","name":"Cape Verde"},{"code":"cf","phoneCode":"236","name":"Central African Republic"},{"code":"td","phoneCode":"235","name":"Chad"},{"code":"cl","phoneCode":"56","name":"Chile"},{"code":"cn","phoneCode":"86","name":"China"},{"code":"cx","phoneCode":"61","name":"Christmas Island"},{"code":"cc","phoneCode":"61","name":"Cocos (keeling) Islands"},{"code":"co","phoneCode":"57","name":"Colombia"},{"code":"km","phoneCode":"269","name":"Comoros"},{"code":"cg","phoneCode":"242","name":"Congo"},{"code":"cd","phoneCode":"243","name":"Congo, The Democratic Republic Of The"},{"code":"ck","phoneCode":"682","name":"Cook Islands"},{"code":"cr","phoneCode":"506","name":"Costa Rica"},{"code":"hr","phoneCode":"385","name":"Croatia"},{"code":"cu","phoneCode":"53","name":"Cuba"},{"code":"cy","phoneCode":"357","name":"Cyprus"},{"code":"cz","phoneCode":"420","name":"Czech Republic"},{"code":"dk","phoneCode":"45","name":"Denmark"},{"code":"dj","phoneCode":"253","name":"Djibouti"},{"code":"tl","phoneCode":"670","name":"Timor-leste"},{"code":"ec","phoneCode":"593","name":"Ecuador"},{"code":"eg","phoneCode":"20","name":"Egypt"},{"code":"sv","phoneCode":"503","name":"El Salvador"},{"code":"gq","phoneCode":"240","name":"Equatorial Guinea"},{"code":"er","phoneCode":"291","name":"Eritrea"},{"code":"ee","phoneCode":"372","name":"Estonia"},{"code":"et","phoneCode":"251","name":"Ethiopia"},{"code":"fk","phoneCode":"500","name":"Falkland Islands (malvinas)"},{"code":"fo","phoneCode":"298","name":"Faroe Islands"},{"code":"fj","phoneCode":"679","name":"Fiji"},{"code":"fi","phoneCode":"358","name":"Finland"},{"code":"pf","phoneCode":"689","name":"French Polynesia"},{"code":"ga","phoneCode":"241","name":"Gabon"},{"code":"gm","phoneCode":"220","name":"Gambia"},{"code":"ge","phoneCode":"995","name":"Georgia"},{"code":"de","phoneCode":"49","name":"Germany"},{"code":"gh","phoneCode":"233","name":"Ghana"},{"code":"gi","phoneCode":"350","name":"Gibraltar"},{"code":"gr","phoneCode":"30","name":"Greece"},{"code":"gl","phoneCode":"299","name":"Greenland"},{"code":"gt","phoneCode":"502","name":"Guatemala"},{"code":"gn","phoneCode":"224","name":"Guinea"},{"code":"gw","phoneCode":"245","name":"Guinea-bissau"},{"code":"gy","phoneCode":"592","name":"Guyana"},{"code":"ht","phoneCode":"509","name":"Haiti"},{"code":"hn","phoneCode":"504","name":"Honduras"},{"code":"hk","phoneCode":"852","name":"Hong Kong"},{"code":"hu","phoneCode":"36","name":"Hungary"},{"code":"in","phoneCode":"91","name":"India"},{"code":"id","phoneCode":"62","name":"Indonesia"},{"code":"ir","phoneCode":"98","name":"Iran, Islamic Republic Of"},{"code":"iq","phoneCode":"964","name":"Iraq"},{"code":"ie","phoneCode":"353","name":"Ireland"},{"code":"im","phoneCode":"44","name":"Isle Of Man"},{"code":"il","phoneCode":"972","name":"Israel"},{"code":"it","phoneCode":"39","name":"Italy"},{"code":"ci","phoneCode":"225","name":"Côte D&apos;ivoire"},{"code":"jp","phoneCode":"81","name":"Japan"},{"code":"jo","phoneCode":"962","name":"Jordan"},{"code":"kz","phoneCode":"7","name":"Kazakhstan"},{"code":"ke","phoneCode":"254","name":"Kenya"},{"code":"ki","phoneCode":"686","name":"Kiribati"},{"code":"kw","phoneCode":"965","name":"Kuwait"},{"code":"kg","phoneCode":"996","name":"Kyrgyzstan"},{"code":"la","phoneCode":"856","name":"Lao People&apos;s Democratic Republic"},{"code":"lv","phoneCode":"371","name":"Latvia"},{"code":"lb","phoneCode":"961","name":"Lebanon"},{"code":"ls","phoneCode":"266","name":"Lesotho"},{"code":"lr","phoneCode":"231","name":"Liberia"},{"code":"ly","phoneCode":"218","name":"Libya"},{"code":"li","phoneCode":"423","name":"Liechtenstein"},{"code":"lt","phoneCode":"370","name":"Lithuania"},{"code":"lu","phoneCode":"352","name":"Luxembourg"},{"code":"mo","phoneCode":"853","name":"Macao"},{"code":"mk","phoneCode":"389","name":"Macedonia, The Former Yugoslav Republic Of"},{"code":"mg","phoneCode":"261","name":"Madagascar"},{"code":"mw","phoneCode":"265","name":"Malawi"},{"code":"my","phoneCode":"60","name":"Malaysia"},{"code":"mv","phoneCode":"960","name":"Maldives"},{"code":"ml","phoneCode":"223","name":"Mali"},{"code":"mt","phoneCode":"356","name":"Malta"},{"code":"mh","phoneCode":"692","name":"Marshall Islands"},{"code":"mr","phoneCode":"222","name":"Mauritania"},{"code":"mu","phoneCode":"230","name":"Mauritius"},{"code":"yt","phoneCode":"262","name":"Mayotte"},{"code":"mx","phoneCode":"52","name":"Mexico"},{"code":"fm","phoneCode":"691","name":"Micronesia, Federated States Of"},{"code":"md","phoneCode":"373","name":"Moldova, Republic Of"},{"code":"mc","phoneCode":"377","name":"Monaco"},{"code":"mn","phoneCode":"976","name":"Mongolia"},{"code":"me","phoneCode":"382","name":"Montenegro"},{"code":"ma","phoneCode":"212","name":"Morocco"},{"code":"mz","phoneCode":"258","name":"Mozambique"},{"code":"na","phoneCode":"264","name":"Namibia"},{"code":"nr","phoneCode":"674","name":"Nauru"},{"code":"np","phoneCode":"977","name":"Nepal"},{"code":"nl","phoneCode":"31","name":"Netherlands"},{"code":"nc","phoneCode":"687","name":"New Caledonia"},{"code":"nz","phoneCode":"64","name":"New Zealand"},{"code":"ni","phoneCode":"505","name":"Nicaragua"},{"code":"ne","phoneCode":"227","name":"Niger"},{"code":"ng","phoneCode":"234","name":"Nigeria"},{"code":"nu","phoneCode":"683","name":"Niue"},{"code":"kp","phoneCode":"850","name":"Korea, Democratic People&apos;s Republic Of"},{"code":"no","phoneCode":"47","name":"Norway"},{"code":"om","phoneCode":"968","name":"Oman"},{"code":"pk","phoneCode":"92","name":"Pakistan"},{"code":"pw","phoneCode":"680","name":"Palau"},{"code":"pa","phoneCode":"507","name":"Panama"},{"code":"pg","phoneCode":"675","name":"Papua New Guinea"},{"code":"py","phoneCode":"595","name":"Paraguay"},{"code":"pe","phoneCode":"51","name":"Peru"},{"code":"ph","phoneCode":"63","name":"Philippines"},{"code":"pn","phoneCode":"870","name":"Pitcairn"},{"code":"pl","phoneCode":"48","name":"Poland"},{"code":"pt","phoneCode":"351","name":"Portugal"},{"code":"pr","phoneCode":"1","name":"Puerto Rico"},{"code":"qa","phoneCode":"974","name":"Qatar"},{"code":"ro","phoneCode":"40","name":"Romania"},{"code":"ru","phoneCode":"7","name":"Russian Federation"},{"code":"rw","phoneCode":"250","name":"Rwanda"},{"code":"bl","phoneCode":"590","name":"Saint Barthélemy"},{"code":"ws","phoneCode":"685","name":"Samoa"},{"code":"sm","phoneCode":"378","name":"San Marino"},{"code":"st","phoneCode":"239","name":"Sao Tome And Principe"},{"code":"sa","phoneCode":"966","name":"Saudi Arabia"},{"code":"sn","phoneCode":"221","name":"Senegal"},{"code":"rs","phoneCode":"381","name":"Serbia"},{"code":"sc","phoneCode":"248","name":"Seychelles"},{"code":"sl","phoneCode":"232","name":"Sierra Leone"},{"code":"sg","phoneCode":"65","name":"Singapore"},{"code":"sk","phoneCode":"421","name":"Slovakia"},{"code":"si","phoneCode":"386","name":"Slovenia"},{"code":"sb","phoneCode":"677","name":"Solomon Islands"},{"code":"so","phoneCode":"252","name":"Somalia"},{"code":"za","phoneCode":"27","name":"South Africa"},{"code":"kr","phoneCode":"82","name":"Korea, Republic Of"},{"code":"es","phoneCode":"34","name":"Spain"},{"code":"lk","phoneCode":"94","name":"Sri Lanka"},{"code":"sh","phoneCode":"290","name":"Saint Helena, Ascension And Tristan Da Cunha"},{"code":"pm","phoneCode":"508","name":"Saint Pierre And Miquelon"},{"code":"sd","phoneCode":"249","name":"Sudan"},{"code":"sr","phoneCode":"597","name":"Suriname"},{"code":"sz","phoneCode":"268","name":"Swaziland"},{"code":"se","phoneCode":"46","name":"Sweden"},{"code":"ch","phoneCode":"41","name":"Switzerland"},{"code":"sy","phoneCode":"963","name":"Syrian Arab Republic"},{"code":"tw","phoneCode":"886","name":"Taiwan, Province Of China"},{"code":"tj","phoneCode":"992","name":"Tajikistan"},{"code":"tz","phoneCode":"255","name":"Tanzania, United Republic Of"},{"code":"th","phoneCode":"66","name":"Thailand"},{"code":"tg","phoneCode":"228","name":"Togo"},{"code":"tk","phoneCode":"690","name":"Tokelau"},{"code":"to","phoneCode":"676","name":"Tonga"},{"code":"tn","phoneCode":"216","name":"Tunisia"},{"code":"tr","phoneCode":"90","name":"Turkey"},{"code":"tm","phoneCode":"993","name":"Turkmenistan"},{"code":"tv","phoneCode":"688","name":"Tuvalu"},{"code":"ae","phoneCode":"971","name":"United Arab Emirates"},{"code":"ug","phoneCode":"256","name":"Uganda"},{"code":"gb","phoneCode":"44","name":"United Kingdom"},{"code":"ua","phoneCode":"380","name":"Ukraine"},{"code":"uy","phoneCode":"598","name":"Uruguay"},{"code":"us","phoneCode":"1","name":"United States"},{"code":"uz","phoneCode":"998","name":"Uzbekistan"},{"code":"vu","phoneCode":"678","name":"Vanuatu"},{"code":"va","phoneCode":"39","name":"Holy See (vatican City State)"},{"code":"ve","phoneCode":"58","name":"Venezuela, Bolivarian Republic Of"},{"code":"vn","phoneCode":"84","name":"Viet Nam"},{"code":"wf","phoneCode":"681","name":"Wallis And Futuna"},{"code":"ye","phoneCode":"967","name":"Yemen"},{"code":"zm","phoneCode":"260","name":"Zambia"},{"code":"zw","phoneCode":"263","name":"Zimbabwe"}];

    ////////////////////////////////////////////////////////////////////////////
    function init(options) {
        goog.require('i18n.phonenumbers.AsYouTypeFormatter');
        goog.require('i18n.phonenumbers.PhoneNumberFormat');
        goog.require('i18n.phonenumbers.PhoneNumberType');
        goog.require('i18n.phonenumbers.PhoneNumberUtil');
        goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

        var options = $.extend(defaultsOption, options);
        return $(this).each(function () {
            renderHtml(options, $(this));
        });
    }

    function setValue(val) {
        var options = $(this).data( "option" );
        var defaultCode = options.defaultCode;
        var holder = $(this).closest('.tqjphone-country-input');

        setPhoneValue(defaultCode, val, holder);
    }

    function getValue(type) {
        buildNumber = '';
        var typeValue = 'full';
        var parent = $(this).closest('.tqjphone-country-input');
        var phoneNumber = $('.tqjphone-country-phone', parent).val();
        var regionCode = $('.tqjphone-country-code', parent).attr('data-region');

        if(undefined !== type) {
            typeValue = type;
        }

        var paresed = validatePhoneNumber(phoneNumber, regionCode);
        if(null !== paresed && true === paresed.isValidNumberForRegion) {
            var buildNumber = '';
            switch(type) {
                case 'region_code':
                    buildNumber = paresed.regionCode;
                    break;
                case 'country_code':
                    buildNumber = '+' + paresed.countryCode;
                    break;
                case 'national':
                    buildNumber = paresed.nationalNumber;
                    break;
                case 'full':
                    buildNumber = '+' + paresed.countryCode + paresed.nationalNumber;
                    break;
                default:
                    buildNumber = '+' + paresed.countryCode + paresed.nationalNumber;
                    break;
            }
        }

        return buildNumber;
    }

    function clearValue() {
        var options = $(this).data( "option" );
        var defaultCode = options.defaultCode;
        var holder = $(this).closest('.tqjphone-country-input');

        setPhoneValue(defaultCode, '', holder);
        $('.tqjphone-country-phone', holder).val('');
        $('.tqjphone-country-phone', holder).removeClass('tqjphone-country-phone-invalid');
    }

    function validate() {
        var parent = $(this).closest('.tqjphone-country-input');
        var phoneNumber = $('.tqjphone-country-phone', parent).val();
        var regionCode = $('.tqjphone-country-code', parent).attr('data-region');

        var paresed = validatePhoneNumber(phoneNumber, regionCode);

        if(null !== paresed && true === paresed.isValidNumberForRegion) {
            $('.tqjphone-country-phone', parent).removeClass('tqjphone-country-phone-invalid');
            return true;
        } else {
            $('.tqjphone-country-phone', parent).addClass('tqjphone-country-phone-invalid').focus();
            return false;
        }
    }

    function disabledInput() {
        var parent = $(this).closest('.tqjphone-country-input');
        $('.tqjphone-country-code', parent).attr('disabled', 'disabled');
        $('.tqjphone-country-phone', parent).attr('disabled', 'disabled');
    }

    function enabledInput() {
        var parent = $(this).closest('.tqjphone-country-input');
        $('.tqjphone-country-code', parent).removeAttr('disabled');
        $('.tqjphone-country-phone', parent).removeAttr('disabled');
    }
    //--------------------------------------------------------------------------
    function renderHtml(options, holder) {
        if(holder.hasClass('tqjphone-country-phone')) {
            return false;
        }
        var html = '<div class="tqjphone-country-input">';
        html += '<input type="text" readonly="readonly" class="tqjphone-country-code '+options.addClass+'"/>';
        html += '<ul class="tqjphone-country-list">';
        for(var i=0; i<listCountry.length; i++) {
            var item = '<li data-code="'+listCountry[i].code+'" data-phone-code="'+listCountry[i].phoneCode+'">';
            item += '<span>'+listCountry[i].name+'</span>';
            item += '<small>'+listCountry[i].code+' (+'+listCountry[i].phoneCode+')</small>';
            item += '</li>';
            html += item;
        }
        html += '</ul>';
        html += '</div><!-- /.tqjphone-country-input -->';

        holder.addClass('tqjphone-country-phone');
        holder.data( "option", options);

        holder.after(html);

        var jphoneInput = holder.next('.tqjphone-country-input');
        holder.appendTo(jphoneInput);

        $('.tqjphone-country-list', jphoneInput).css({
            'height': options.maxHeight + 'px'
        });

        bindAction(options, jphoneInput);
        getDefaultPhoneCode(options, jphoneInput);
    }

    function bindAction(options, holder) {
        $(document).on('keypress', '.tqjphone-country-code', function (e) {
            $('.tqjphone-country-list', holder).scrollTop(0);
            var c = String.fromCharCode(e.which);
            var scrollTo = 0;
            $('.tqjphone-country-list li', holder).each(function(){
                var name = $('span', $(this)).html().charAt(0);
                if(c === name.toLowerCase() && scrollTo ==0 ) {
                    scrollTo = $(this).position().top;
                }
            });
            $('.tqjphone-country-list', holder).scrollTop( scrollTo );
        });

        $('.tqjphone-country-code', holder).click(function(){
            $('.tqjphone-country-list', holder).show(function(){
                $('.tqjphone-country-list', holder).scrollTop(0);
                var scrollTo = $('li.active', $(this)).position().top;
                if(scrollTo > options.maxHeight) {
                    $(this).scrollTop( scrollTo );
                }
            });
        });

        $('.tqjphone-country-list li', holder).click(function(){
            var regionCode = $(this).attr('data-code');
            var phoneCode = $(this).attr('data-phone-code');
            $('.tqjphone-country-code', holder).val('+'+phoneCode);
            $('.tqjphone-country-code', holder).attr('data-region', regionCode);
            $('.tqjphone-country-list li', holder).removeClass('active');
            $(this).addClass('active');
            $('.tqjphone-country-list', holder).hide();
        });

        $(document).mouseup(function(e) {
            var container = $('.tqjphone-country-list', holder);
            if (!container.is(e.target)
                && container.has(e.target).length === 0)
            {
                container.hide();
            }
        });
    }

    function getDefaultPhoneCode(options, holder) {
        var defaultCode = options.defaultCode;
        var phoneNumber = $('.tqjphone-country-phone', holder).val();

        setPhoneValue(defaultCode, phoneNumber, holder);
    }

    function setPhoneValue(defaultCode, phoneNumber, holder) {
        var countryCode = 0;
        var paresed = validatePhoneNumber(phoneNumber);

        if(null !== paresed) {
            defaultCode = paresed.regionCode;
            $('.tqjphone-country-phone', holder).val(paresed.nationalNumber);
            countryCode = paresed.countryCode;
        }

        if(defaultCode != '') {
            var scrollTo = 0;
            $('.tqjphone-country-list li', holder).each(function(){
                var code = $(this).attr('data-code');
                var regionCode = $(this).attr('data-code');
                var phoneCode = $(this).attr('data-phone-code');
                if(defaultCode === code || (defaultCode == 'nothing' && countryCode === phoneCode)) {
                    $('.tqjphone-country-code', holder).val('+'+phoneCode);
                    $('.tqjphone-country-code', holder).attr('data-region', regionCode);
                    $('.tqjphone-country-list li', holder).removeClass('active');
                    $(this).addClass('active');
                }
            });
        }
    }

    function validatePhoneNumber(phoneNumber, regionCode) {
        try {
            var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
            var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);

            var isPossible = phoneUtil.isPossibleNumber(number);
            var isValidNumber = phoneUtil.isValidNumber(number);
            var isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, regionCode);
            var regionCode = phoneUtil.getRegionCodeForNumber(number);

            if(true === isPossible) {
                var parseNumber = new goog.proto2.ObjectSerializer(
                        goog.proto2.ObjectSerializer.KeyOption.NAME
                    ).serialize(number);
                var result = {
                    regionCode: regionCode.toLowerCase(),
                    countryCode: parseNumber.country_code,
                    nationalNumber: parseNumber.national_number,
                    isPossible: isPossible,
                    isValidNumber: isValidNumber,
                    isValidNumberForRegion: isValidNumberForRegion
                };

                return result;
            }
        } catch (e) {
            return null;
        }

        return null;
    }
    ////////////////////////////////////////////////////////////////////////////

    $.fn.tqjphone = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( $(this), arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tqjphone' );
        }
    };


})( jQuery );
