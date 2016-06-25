var utilCreep = require('utilCreep');
//require('utilCreep');

//import('utilCreep')

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
            var dropoff = null;

            dropoff = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN
                              )&& structure.energy < structure.energyCapacity;
                    }
            });
            if (dropoff){
                if(creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropoff);
                }
            }else{
                dropoff = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                    structure.structureType == STRUCTURE_STORAGE ||
                                    structure.structureType == STRUCTURE_CONTAINER
                                  )&& structure.energy < structure.energyCapacity;
                        }
                });

                if (dropoff){
                    if(creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropoff);
                    }
                }else{
                    creep.say("hmm")
                }
            }

            /*
            var dropoff = utilCreep.findEnergyDropoff(creep)
            //var dropoff = null
            if (dropoff){
                if(creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropoff);
                }
            }else{
                creep.say("hmm")
            }
            /*
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_CONTAINER
                              )&& structure.energy < structure.energyCapacity;
                    }
            });

            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            */
        }else{
            var pickup = utilCreep.findEnergyPileInRoom(creep)
            //var pickup = null
            if (pickup){
                if(creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(pickup);
                }
            }else{
                creep.say("huh")
            }
            /*
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
            */

            /*
            else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }*/

        }

  	}
};

module.exports = creepTransporter;
