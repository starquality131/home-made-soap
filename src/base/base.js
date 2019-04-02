export default {

    strip: (num, precision = 12) => +parseFloat(num.toPrecision(precision)),
    calc: (num, fixed = 0) => +parseFloat(num.toFixed(fixed)),

};
