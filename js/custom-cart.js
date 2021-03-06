var myApp = angular.module('myApp', ['ngCart']);

myApp.controller('myCtrl', ['$scope', '$http', 'ngCart', function ($scope, $http, ngCart) {
    ngCart.setShipping(150.00);
}]);

myApp.controller('CheckoutCtrl', function ($scope,$log) {
    $scope.checkout = function (cart) {
        var ctr, data, form, i, item;
        data = {
            cmd: '_cart',
            business: 'rens.ramos@crux.design',
            upload: '1',
            rm: '2',
            charset: 'utf-8',
            currency_code: 'PHP',
            "return": 'https://lourdgenehowes.github.io/',
            cancel_return: 'https://lourdgenehowes.github.io/',
            country: "PH",
            no_note: 0
        };

        $log.debug(data);
        i = 0;
        var shippingPrice = 150.00;

        while (i < cart.length) {
            item = cart[i];
            ctr = i + 1;
            data['item_number_' + ctr] = item._id;
            data['on0_' + ctr] = "Brand";
            data['os0_' + ctr] = item._brand;
            data['item_name_' + ctr] = item._name;
            data['quantity_' + ctr] = item._quantity;
            data['amount_' + ctr] = item._price.toFixed(2);
            data['shipping_' + ctr] = shippingPrice / cart.length;
            i++;
        }
        form = $('<form/></form>');
        form.attr('action', 'https://www.sandbox.paypal.com/cgi-bin/webscr');
        form.attr('method', 'POST');
        form.attr('style', 'display:none;');
        $scope.addFormFields(form, data);
        $('body').append(form);
        form.submit();
        form.remove();
    };
    $scope.addFormFields = function (form, data) {
        if (data !== null) {
            return $.each(data, function (name, value) {
                var input;
                if (value !== null) {
                    input = $('<input></input>').attr('type', 'hidden').attr('name', name).val(value);
                    form.append(input);
                }
            });
        }
    };

    $scope.myVariable = "Brand name test value!";
});

