/**
 * Created by dennis on 03-07-17.
 */
class Underground {
    public static itemSelected;
    public static energyTick: number;

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
        html +=     "<button onClick='setItemSelected(1)' class='btn btn-danger'>Hammer (" + GameConstants.HAMMER_ENERGY + " energy)</button>";
        html +=     "<button onClick='setItemSelected(0)' class='btn btn-info'>Chisel (" + GameConstants.CHISEL_ENERGY + " energy)</button>";
        html +=     "<h3 data-bind='text: Mine.itemsFound()+" + '"/"' + "+Mine.itemsBuried+" + '" items found"' + "'></h3>";
        html += "</div>";
        $("#mineBody").html(html);
        $("#energyDisplay").html(Math.floor(player.mineEnergy) + "/" + player.maxMineEnergy + " <img src='assets/images/underground/flash.png'> (next: " + Underground.energyTick + "s)");
        $("#mineEnergyBar").width( player.mineEnergy/player.maxMineEnergy*100 + "%");
        $("#diamondCounter").html(player.mineCoins);
    }

    private static mineSquare(amount: number, i: number, j: number): string {
        if(Mine.rewardGrid[i][j] != 0 && Mine.grid[i][j]() === 0){
            Mine.rewardGrid[i][j].revealed = 1;
            return "<img src='assets/images/underground/"+ Mine.rewardGrid[i][j].value + "/" + Mine.rewardGrid[i][j].value + "-" + Mine.rewardGrid[i][j].y + "-" + Mine.rewardGrid[i][j].x + ".png' class='col-sm-1 mineReward mineSquare "+ GameConstants.MineTool[Mine.toolSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'>";
        } else {
            return "<div data-bind='css: Underground.calculateCssClass(" + i +"," + j + ")()' data-i='" + i + "' data-j='" + j + "'></div>";
        }
    }

    public static calculateCssClass(i: number, j: number): KnockoutComputed<string> {
        return ko.computed(function() {
            return "col-sm-1 rock" + Math.max(Mine.grid[i][j](), 0) + " mineSquare " + GameConstants.MineTool[Mine.toolSelected] + "Selected";
        }, this, {
            disposeWhen: function() {
                console.log(i,j);
                if (Mine.grid[i][j]() == 0) {
                    if (Mine.rewardGrid[i][j] != 0) {
                        console.log("reward")
                        Mine.rewardGrid[i][j].revealed = 1;
                        $("div[data-i="+i+"][data-j="+j+"]").replaceWith("<img src='assets/images/underground/"+ Mine.rewardGrid[i][j].value + "/" + Mine.rewardGrid[i][j].value + "-" + Mine.rewardGrid[i][j].y + "-" + Mine.rewardGrid[i][j].x + ".png' class='col-sm-1 mineReward mineSquare "+ GameConstants.MineTool[Mine.toolSelected] + "Selected' data-i='" + i + "' data-j='" + j + "'>")
                        Mine.checkItemsRevealed();
                    }
                }
                return false
            },
        })
    }

    public static gainMineItem(id: number) {
        let index = player.mineInventoryIndex(id);
        let item = Underground.getMineItemById(id);
        /*
        if(mineItemIsStone(item.name)){
            gainItemByName(item.name);
            return;
        }
        */
        if( index == -1){

            var tempItem = {
                name: item.name,
                amount: 1,
                id: id,
                value: item.value,
                valueType: item.valueType
            }
            player._mineInventory.push(tempItem);
        } else {
            player._mineInventory[index].amount++;
        }
    }

    private static getMineItemById(id: number): UndergroundItem {
        for (let item of UndergroundItem.list) {
            if (item.id == id) {
                return item;
            }
        }
    }
}

$(document).ready(function(){
    $("body").on('click', '.mineSquare', function(){
        Mine.click(parseInt(this.dataset.i), parseInt(this.dataset.j));
    })
})
