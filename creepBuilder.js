var creepBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building){
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
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
            var pickup = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(pickup){
                if(creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickup);
                }
            }
        }
	}
};

module.exports = creepBuilder;
