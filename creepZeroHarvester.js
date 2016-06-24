// Zero harvester (harvester to start with)
var creepZeroHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {

            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN //||
                                //structure.structureType == STRUCTURE_TOWER ||
                                //structure.structureType == STRUCTURE_STORAGE
                              )&& structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                for(var resourceType in creep.carry) {
	                creep.drop(resourceType);
                }
                /*
                var flags = creep.room.find(FIND_FLAGS);
                if(flags.length > 0) {
                    for (var theFlag in flags){
                        //console.log(theFlag.Name);
                        if ( (theFlag.color == COLOR_BROWN) && (theFlag.secondaryColor == COLOR_YELLOW) ){
                            console.log('cake');
                            //console.log(string(creep.moveTo(flag.pos)))
                        }
                    }
                }
                */

            }

        }
	}
};

module.exports = creepZeroHarvester;
