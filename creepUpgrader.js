var creepUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
              creep.memory.upgrading = false;
  	    }
  	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
  	        creep.memory.upgrading = true;
  	    }

  	    if(creep.memory.upgrading) {
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }
  	    }
        else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_CONTAINER
                            )&& structure.energy > 0;
                    }
            });
            if(target){
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else{
                var sources = creep.room.find(FIND_DROPPED_ENERGY);
                if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }

        }
        /*
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        */
  	}
};

module.exports = creepUpgrader;
