/**
 * Created by dennis on 03-07-17.
 */
class Underground {
    public static itemSelected;
    public static energyTick: KnockoutObservable<number> = ko.observable(60);
    public static counter: number = 0;

    public static showMine() {
        let html = "";
        let itemsFound = "Mine.itemsFound() + '/' + Mine.itemsBuried + ' items found'";
        html += "</div>";
        for(let i = 0; i<Mine.grid.length; i++){
            html += "<div class='row'>";
            for(var j = 0; j<Mine.grid[0].length; j++){
                html += Underground.mineSquare(Mine.grid[i][j](), i, j);
            }
            html += "</div>";
        }

        html += "<div class='row'>";
        html +=     "<button onClick='Mine.toolSelected(GameConstants.MineTool.Hammer)' class='btn btn-danger'>Hammer (" + GameConstants.HAMMER_ENERGY + " energy)</button>";
        html +=     "<button onClick='Mine.toolSelected(GameConstants.MineTool.Chisel)' class='btn btn-info'>Chisel (" + GameConstants.CHISEL_ENERGY + " energy)</button>";
        html +=     "<h3 data-bind='text: Mine.itemsFound()+" + '"/"' + "+Mine.itemsBuried+" + '" items found"' + "'></h3>";
        html += "</div>";
        $("#mineBody").html(html);
    }

    private static mineSquare(amount: number, i: number, j: number): string {
        if(Mine.rewardGrid[i][j] != 0 && Mine.grid[i][j]() === 0){
            Mine.rewardGrid[i][j].revealed = 1;
            return "<img src='assets/images/underground/"+ Mine.rewardGrid[i][j].value + "/" + Mine.rewardGrid[i][j].value + "-" + Mine.rewardGrid[i][j].y + "-" + Mine.rewardGrid[i][j].x + ".png' data-bind='css: Underground.rewardCssClass' data-i='" + i + "' data-j='" + j + "'>";
        } else {
            return "<div data-bind='css: Underground.calculateCssClass(" + i +"," + j + ")()' data-i='" + i + "' data-j='" + j + "'></div>";
        }
    }

    public static calculateCssClass(i: number, j: number): KnockoutComputed<string> {
        return ko.computed(function() {
            return "col-sm-1 rock" + Math.max(Mine.grid[i][j](), 0) + " mineSquare " + GameConstants.MineTool[Mine.toolSelected()] + "Selected";
        }, this, {
            disposeWhen: function() {
                if (Mine.grid[i][j]() == 0) {
                    if (Mine.rewardGrid[i][j] != 0 && Mine.rewardGrid[i][j].revealed != 1) {
                        Mine.rewardGrid[i][j].revealed = 1;
                        $("div[data-i="+i+"][data-j="+j+"]").replaceWith("<img src='assets/images/underground/"+ Mine.rewardGrid[i][j].value + "/" + Mine.rewardGrid[i][j].value + "-" + Mine.rewardGrid[i][j].y + "-" + Mine.rewardGrid[i][j].x + ".png' data-bind='css: Underground.rewardCssClass' data-i='" + i + "' data-j='" + j + "'>")
                        ko.applyBindings(null, $("img[data-i="+i+"][data-j="+j+"]")[0])
                        Mine.checkItemsRevealed();
                    }
                }
                return false
            },
        })
    }

    private static rewardCssClass: KnockoutComputed<string> = ko.pureComputed(function() {
        return "col-sm-1 mineReward mineSquare "+GameConstants.MineTool[Mine.toolSelected()]+"Selected";
    });

    public static gainMineItem(id: number, num: number = 1) {
        let index = player.mineInventoryIndex(id);
        let item = Underground.getMineItemById(id);
        
        if(item.isStone()){
            let evostone = ItemList[item.valueType];
            if (evostone instanceof EvolutionStone) {
                evostone.buy(num)
            } else {
                console.log("Error getting evolution stone",num,id,item)
                Notifier.notify("Error getting evolution stone",GameConstants.NotificationOption.warning)
            }
            return;
        }
        
        if( index == -1){

            let tempItem = {
                name: item.name,
                amount: ko.observable(num),
                id: id,
                value: item.value,
                valueType: item.valueType
            };
            player._mineInventory.push(tempItem);
        } else {
            let amt = player._mineInventory()[index].amount()
            player._mineInventory()[index].amount(amt + num);
        }
    }

    public static getMineItemById(id: number): UndergroundItem {
        for (let item of UndergroundItem.list) {
            if (item.id == id) {
                return item;
            }
        }
    }

    public static gainEnergy() {
        if (player._mineEnergy() < player._maxMineEnergy()) {
            let multiplier = 1;
            if(OakItemRunner.isActive(GameConstants.OakItem.Cell_Battery)){
                multiplier += (OakItemRunner.calculateBonus(GameConstants.OakItem.Cell_Battery) / 100);
            }
            player._mineEnergy( Math.min(player._maxMineEnergy(), player._mineEnergy() + (multiplier*player.mineEnergyGain)) );
            if(player._mineEnergy() === player._maxMineEnergy()){
                Notifier.notify("Your mining energy has reached maximum capacity!", GameConstants.NotificationOption.success);
            }
        }
    }

    public static gainEnergyThroughItem(item: GameConstants.EnergyRestoreSize) {
        // Restore a percentage of maximum energy
        let gain = this.calculateItemEffect(item);
        console.log(gain);
        console.log(item);
        gain = Math.min(gain, player._maxMineEnergy() - player._mineEnergy());

        player._mineEnergy(player._mineEnergy() + gain);
        Notifier.notify("You restored " + gain + " mining energy!", GameConstants.NotificationOption.success);
    }

    public static sellMineItem(id: number) {
        for (let i=0; i<player._mineInventory().length; i++) {
            let item = player._mineInventory()[i];
            if (item.id == id) {
                if (item.amount() > 0) {
                    let success = Underground.gainProfit(item);
                    if (success) {
                        let amt = item.amount();
                        player._mineInventory()[i].amount(amt - 1);
                    }
                    return;
                }
            }
        }
    }

    private static gainProfit(item: UndergroundItem): boolean {
        let success = true;
        switch (item.valueType) {
            case "Diamond":
                player.diamonds += item.value;
                break;
            case "Mine Egg":
                success = player.gainEgg(BreedingHelper.createFossilEgg(item.name));
                break;
            default:
                let type = item.valueType.charAt(0).toUpperCase() + item.valueType.slice(1); //Capitalizes string
                let typeNum = GameConstants.PokemonType[type];
                player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + GameConstants.PLATE_VALUE);
        }
        return success;
    }

    public static openUndergroundModal() {
        if (player.hasKeyItem("Explorer kit")) {
            Game.gameState(GameConstants.GameState.paused);
            $('#mineModal').modal('show');
        } else {
            Notifier.notify("You do not have access to that location", GameConstants.NotificationOption.warning);
        }
    }

    public static calculateItemEffect(item: GameConstants.EnergyRestoreSize) {
        let effect: number = GameConstants.EnergyRestoreEffect[GameConstants.EnergyRestoreSize[item]];
        return effect * player._maxMineEnergy();

    }
}

$(document).ready(function(){
    $("body").on('click', '.mineSquare', function(){
        Mine.click(parseInt(this.dataset.i), parseInt(this.dataset.j));
    });

    $('#mineModal').on('hide.bs.modal', function () {
        if (player.route() == 11) {
            Game.gameState(GameConstants.GameState.fighting);
        } else {
            MapHelper.moveToRoute(11, GameConstants.Region.kanto);
        }
    });
});
