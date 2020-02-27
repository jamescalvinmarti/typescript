import * as request from "request-promise-native";

(async () => {
    const url = 'https://api.coinbase.com';
    const currencies_url = '/v2/currencies';
    const exchange_rates_url = '/v2/exchange-rates?currency=BTC';

    var currencies_list = {
        uri: url + currencies_url,
    };

    var rates_list = {
        uri: url + exchange_rates_url,
    };

    var currencies_result = await request.get(currencies_list);
    var rates_result = await request.get(rates_list);
    var currencies = JSON.parse(currencies_result);
    var exchange_rates = JSON.parse(rates_result);
    for (var i = 0; i < currencies.data.length; i++) {

        $('#currencies').append(`<option selected value="${currencies.data[i].id}">
      ${currencies.data[i].name}
      </option>`);

        if (currencies.data[i].name == "Euro") {
            $('#bitcoin').text('1 bitcoin = ');
            $('#value').text(exchange_rates.data.rates[currencies.data[i].id]);
            $('#name').text(currencies.data[i].id);
            $('#currencies option:eq(Euro)').prop('selected', true)
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
            let result = <any>number / <any>value;
            $('#conv').text(result);
        });

    }

})()

