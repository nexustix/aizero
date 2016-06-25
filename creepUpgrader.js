var creepUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.usingRes && creep.carry.energy == 0) {
              creep.memory.usingRes = false;
  	    }
  	    if(!creep.memory.usingRes && creep.carry.energy == creep.carryCapacity) {
  	        creep.memory.usingRes = true;
  	    }

  	    if(creep.memory.usingRes) {
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
                            )&& structure.store[RESOURCE_ENERGY] > 0;
                    }
            });
            if(target){
                creep.moveTo(target);
                //if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(target);
                //}
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
