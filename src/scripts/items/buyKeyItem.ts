class buyKeyItem extends Item {
    
        type: GameConstants.KeyItemType;
    
        constructor(type: GameConstants.KeyItemType) {
            let basePrice = GameConstants.ItemPrice[GameConstants.KeyItemType[type]];
            let priceMultiplier = 1;
            super(GameConstants.KeyItemType[type], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
            this.type = type;
        }

        totalPrice(amt: number) {
            return this.basePrice;
        }
    
        gain(amt: number) {
            player.gainKeyItem(GameConstants.KeyItemType[this.type].replace("_", " "))
        }
    
        use() {
        }

        isAvailable(): boolean {
            return super.isAvailable() && !player.hasKeyItem(this.name().replace("_", " "));
        }
}
    
    
ItemList['Dungeon_ticket'] = new buyKeyItem(GameConstants.KeyItemType.Dungeon_ticket);
ItemList['Explorer_kit'] = new buyKeyItem(GameConstants.KeyItemType.Explorer_kit);