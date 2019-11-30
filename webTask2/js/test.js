function number() {
    return 1;
}
(function() {
    console.log(number())

    function number() {
        return 2;
    }
}());
console.log(number())