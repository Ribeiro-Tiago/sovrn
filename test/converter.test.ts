import { equal, throws } from "assert";

import { toArabic, toRoman } from "../src/utils/Converter";

describe('Converter', function () {
    describe('#toArabic', function () {
        it('should convert the input roman number to the respective arabic one', function () {
            equal(toArabic("IX"), 9);
        });

        it('should return 0 if the input number is 100% invalid', function () {
            equal(toArabic("AA"), 0);
        });

        it('should return the converted number until the first invalid letter in the number', function () {
            equal(toArabic("XIXAIV"), 19);
        });
    });

    describe('#toRoman', function () {
        it('should convert the input arabic number to the respective roman one', function () {
            equal(toRoman(499), "CDXCIX");
        });

        it('should throw an error when trying to romanize a negative number', function () {
            throws(() => toRoman(-1), Error, "Error thrown");
        });
    });
});