var creepTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.transporting && creep.carry.energy == 0) {
              creep.memory.transporting = false;
  	    }
  	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
  	        creep.memory.transporting = true;
  	    }

        if(creep.memory.transporting){
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE
                              )&& structure.energy < structure.energyCapacity;
                    }
            });

            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }

        }else{
            var pickup = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(pickup){
                if(creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickup);
                }
            }/*else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }*/

        }

  	}
};

module.exports = creepTransporter;
