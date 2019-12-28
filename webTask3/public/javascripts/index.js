var saved;
if (typeof window.onload == 'function') {
    saved = window.onload;
}


window.onload = function() {

    if (saved)
        saved();

    var viewHeight = document.documentElement.clientHeight;

    function lazyload() {
        var eles = document.querySelectorAll('img[data-original][lazyload]');
        Array.prototype.forEach.call(eles, function(item, index) {
            var rect;
            if (item.dataset.original === "") {
                return;
            }
            rect = item.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top < viewHeight) {
                ! function() {
                    item.src = item.dataset.original;
                    item.removeAttribute("data-original");
                    item.removeAttribute("lazyload");
                }();
            }
        })
    }
    lazyload();
    document.addEventListener("scroll", lazyload);
}