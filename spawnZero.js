var roleHarvester = require('creepHarvester');
var roleUpgrader = require('creepUpgrader');
var roleBuilder = require('creepBuilder');
var roleGuard = require('creepGuard');

var spawnZero = {

    /** @param {Creep} creep **/
    run: function(spawn) {
        //createConstructionSite(spawn.pos.x+3, spawn.pos.y+3, STRUCTURE_SPAWN)
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        //var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');

        //console.log('Harvesters: ' + harvesters.length);


        if(harvesters.length < 1) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);

        }else if(upgraders.length < 1) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            //console.log('Spawning new harvester: ' + newName);

        }else if(builders.length < 1) {
            var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
            //console.log('Spawning new harvester: ' + newName);

        }else if(guards.length < 3) {
            var newName = Game.spawns.Spawn1.createCreep(
                [
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    RANGED_ATTACK,
                    MOVE
                ], undefined, {role: 'guard'});
            //console.log('Spawning new harvester: ' + newName);
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'guard') {
                roleGuard.run(creep);
            }
        }
	}
};

module.exports = spawnZero;
