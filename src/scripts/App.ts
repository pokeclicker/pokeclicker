class App {
    static start() {
        Preload.load(debug).then(function () {
            OakItemRunner.initialize();
            UndergroundItem.initialize();
            game = new Game();

            $(document).ready(function () {
                $('[data-toggle="popover"]').popover();
                $('[data-toggle="tooltip"]').tooltip();
            });

            Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

            (ko as any).bindingHandlers.tooltip = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    let local = ko.utils.unwrapObservable(valueAccessor()),
                        options = {};

                    ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
                    ko.utils.extend(options, local);

                    $(element).tooltip(options);

                    if (bindingContext.$data instanceof Plot) {
                        $(element).hover(function () {
                            $(this).data('to', setInterval(function () {
                                $(element).tooltip('hide')
                                    .attr('data-original-title', FarmRunner.getTooltipLabel(bindingContext.$index()))
                                    .tooltip('show');
                            }, 100));
                        }, function () {
                            clearInterval($(this).data('to'));
                        });
                    }

                },
                options: {
                    placement: "bottom",
                    trigger: "click"
                }
            };

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            ko.applyBindings(game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();
            game.start();

        });
    }
}
