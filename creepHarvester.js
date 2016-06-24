var creepHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            if (creep.memory.deposit == null){
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }else{
                //console.log(creep.memory.deposit);
                if(creep.harvest(Game.getObjectById(creep.memory.deposit)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.deposit));
                }
            }
        }
        else {
            /*
            var dropzones = creep.room.find(FIND_DROPPED_ENERGY);
            var dropzone = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if( (dropzones.length > 0) && (dropzone) ){
                if(creep.pos == dropzone.pos) {
                    creep.drop(resourceType);
                }else{
                    creep.moveTo(dropzone);
                }
            }else{
            */
                creep.moveTo(creep.room.controller);
                if( creep.pos.getRangeTo(creep.room.controller) <= 2){
                    for(var resourceType in creep.carry) {
                        creep.drop(resourceType);
                    }
                }
            //}
            /*
            creep.moveTo(creep.room.controller);
            if( creep.pos.getRangeTo(creep.room.controller) <= 2){
                for(var resourceType in creep.carry) {
                    creep.drop(resourceType);
                }
            }
            */

        }
	}
};

module.exports = creepHarvester;
