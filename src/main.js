"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var request = require("request-promise-native");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, currencies_url, exchange_rates_url, currencies_list, rates_list, currencies_result, rates_result, currencies, exchange_rates, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://api.coinbase.com';
                currencies_url = '/v2/currencies';
                exchange_rates_url = '/v2/exchange-rates?currency=BTC';
                currencies_list = {
                    uri: url + currencies_url
                };
                rates_list = {
                    uri: url + exchange_rates_url
                };
                return [4 /*yield*/, request.get(currencies_list)];
            case 1:
                currencies_result = _a.sent();
                return [4 /*yield*/, request.get(rates_list)];
            case 2:
                rates_result = _a.sent();
                currencies = JSON.parse(currencies_result);
                exchange_rates = JSON.parse(rates_result);
                for (i = 0; i < currencies.data.length; i++) {
                    $('#currencies').append("<option selected value=\"" + currencies.data[i].id + "\">\n      " + currencies.data[i].name + "\n      </option>");
                    if (currencies.data[i].name == "Euro") {
                        $('#bitcoin').text('1 bitcoin = ');
                        $('#value').text(exchange_rates.data.rates[currencies.data[i].id]);
                        $('#name').text(currencies.data[i].id);
                        $('#currencies option:eq(Euro)').prop('selected', true);
                    }
                    $('#currency_name').text('Euro');
                    $(document).on('change', '#currencies', function () {
                        $('#igual').text('1 bitcoin = ');
                        $('#value').text(exchange_rates.data.rates[$('#currencies').find("option:selected").attr('value')]);
                        $('#name').text($('#currencies').find("option:selected").text());
                        $('#quantity').val('0');
                        $('#conv').text('0');
                        $('#currency_name').text($('#currencies').find("option:selected").text());
                    });
                    $("#quantity").on("input", function () {
                        var number = $('#quantity').val();
                        var value = exchange_rates.data.rates[$('#currencies').find("option:selected").attr('value')];
                        var result = number / value;
                        $('#conv').text(result);
                    });
                }
                return [2 /*return*/];
        }
    });
}); })();
