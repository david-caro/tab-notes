let tabnotes = null;
document.addEventListener('DOMContentLoaded', function () {
  console.log("HEY!!!!!")
}, false);

$(document).ready(function () {
  flashtabs = new FlashTabs,
    $("body").removeClass("preload"),
    flashtabs.getCard()
});