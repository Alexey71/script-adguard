// ==UserScript==
// @name         kinozal.tv magnet links MOD
// @namespace    none
// @version      0.4
// @description  add magnet links near to torrent links for kinozal.tv pages
// @author       vike
// @include      /^https?:\/\/kinozal.(tv|guru|me)\/details.php\?id=\d+$/
// @grant        none
// ==/UserScript==

$(function(){
    var imgURL = 'https://raw.githubusercontent.com/Alexey71/script-adguard/master/Kinozal.tv_Magnet_Links_Mod.jpg';
    $("td[class='nw']").after('<td style="width: 20px"> <a id="magnetLink" title="Скачать раздачу используя magnet ссылку" href="#"> <img src="' + imgURL + '"/> </a> </td>');

    $("#magnetLink").click(function(){
        var result = new RegExp('id=(\\d+)').exec(window.location.href);
        var id = result[1];
        $.get('/get_srv_details.php?id=' + id + '&action=2', function(s){
            var result = new RegExp('Инфо хеш: (.\{40\})').exec(s);
            var hash = result[1];
            document.location = 'magnet:?xt=urn:btih:' + hash;
        });
    });
});
