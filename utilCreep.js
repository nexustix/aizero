var utilCreep = {

    // find place to store energy
    /** @param {Creep} creep **/
    findEnergyDropoff: function(creep){
    //findEnergyDropoff(creep){

        var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN
                          )&& structure.energy < structure.energyCapacity;
                }
        });
        if(target){
            return target;
        }

        var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER
                          )&& structure.energy < structure.energyCapacity;
                }
        });
        if(target){
            return target;
        }else{
            return null;
        }
    },

    // find most "efficient" energy pile to pickup
    /** @param {Creep} creep **/
    findEnergyPileInRoom: function(creep){

        var curEff = 0;
        var bestEff = 0;
        var bestEffIndex = 0;

        var energyPiles = creep.room.find(FIND_DROPPED_ENERGY)//, {
                //filter: (pile) => { return (pile.amount >= 10) }
        //});

        for (i = 0; i < energyPiles.length; i++) {
            curEff = energyPiles[i].amount / creep.pos.getRangeTo(energyPiles[i]);
            if (curEff > bestEff){
                bestEff = curEff;
                bestEffIndex = i;
            }
        }

        if (energyPiles[bestEffIndex]){
            return energyPiles[bestEffIndex];
        }else{
            return null;
        }
    },

    // find structure that demands energy supply
    findEnergyUser: function(){
        return null
    }
};

module.exports = utilCreep;
