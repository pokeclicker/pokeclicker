class buyKeyItem extends Item {
    
        type: GameConstants.KeyItemType;
    
        constructor(type: GameConstants.KeyItemType) {
            let basePrice = 1000;
            let priceMultiplier = 1;
            super(GameConstants.KeyItemType[type], basePrice, priceMultiplier, GameConstants.Currency.questpoint);
            this.type = type;
        }
    
        buy(amt: number) {
        }
    
        use() {
        }
    }
    
    
    ItemList['Dungeon_ticket'] = new buyKeyItem(GameConstants.KeyItemType.Dungeon_ticket);