class effectEngineRunner {
    public static counter: number = 0;

    public static tick() {
        this.counter = 0;
        
        for(let item in player.effectEngine){
            if(item != 'equals'){
                player.effectEngine[item] -= 1;
                let newWidth = player.effectEngine[item] / parseInt($('#'+item+'-meter').attr('maxTime')) * 100;
                $('#'+item+'-meter').css('width',newWidth + "%");
                $('#'+item+'-meter').parent().attr('title','Seconds Remaining: ' + player.effectEngine[item] );
            }
            if(player.effectEngine[item] <= 0){
                delete player.effectEngine[item];
                $('#'+item+'-meter').parent().removeAttr('title');
                Notifier.notify("The "+item+" has worn off!", GameConstants.NotificationOption.warning);
            }
        }
    }

    public static addEffect(itemName: string){
        player.effectEngine[itemName] = (player.effectEngine[itemName] ? player.effectEngine[itemName]: 0) + GameConstants.ITEM_USE_TIME;
        $('#'+itemName+'-meter').css('width','100%');
        $('#'+itemName+'-meter').attr('maxTime',player.effectEngine[itemName]);
    }
}