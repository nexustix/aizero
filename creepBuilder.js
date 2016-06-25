var creepBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.usingRes && creep.carry.energy == 0) {
            creep.memory.usingRes = false;
	    }
	    if(!creep.memory.usingRes && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.usingRes = true;
	    }

	    if(creep.memory.usingRes){
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax) && ( (structure.structureType != STRUCTURE_WALL) || (structure.hits <= 100) )
                }
            });
            if(closestDamagedStructure) {
                if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestDamagedStructure);
                }

            }else{
                var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }else{
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
                var pickup = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
                        filter: (pile) => {
                            return (
                                pile.amount >= 10
                                  )
                        }
                });
                if(pickup){
                    if(creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(pickup);
                    }
                }
            }

            /*
            var pickup = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(pickup){
                if(creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickup);
                }
            }
            */
        }
	}
};

module.exports = creepBuilder;
