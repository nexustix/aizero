var roleZeroHarvester = require('creepZeroHarvester');

var roleHarvester = require('creepHarvester');
var roleUpgrader = require('creepUpgrader');
var roleBuilder = require('creepBuilder');
var roleGuard = require('creepGuard');

var roleTransporter = require('creepTransporter');


function isLocationDangerous(position, room){
    for ( var enemy in room.find(FIND_HOSTILE_CREEPS) ){
        if (position.getRangeTo(enemy) <= 10){
            return true;
        }
    }
    return false;
}

var spawnZero = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        /*
        UL  -- Ultra Light  -- ???
        L   -- Light        -- x <= 300
        ML  -- Medium Light --
        M   -- Medium       --
        HM  -- Heavy Medium --
        H   -- Heavy        --
        */
        var sources = spawn.room.find(FIND_SOURCES);

        /*
            IS amount of creeps
        */

        //createConstructionSite(spawn.pos.x+3, spawn.pos.y+3, STRUCTURE_SPAWN)
        var zeroharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_zeroharvester');

        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_transporter');

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_builder');

        //var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

        var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'L_guard');


        /*
            WANT amount of creeps
        */
        // prime harvester
        var L_ZeroHarvesterCount = 1
        // small harvester
        var L_TransporterCount = harvesters.length
        // small upgrader
        var L_HarvesterCount = sources.length * 2
        // small upgrader
        var L_UpgraderCount = 1
        // small builder
        var L_BuilderCount = 2
        // small guard
        var L_GuardCount = 5

        var target = spawn.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (thing) => {return (thing.ticksToLive <= (CREEP_LIFE_TIME - 100)) }
        });

        if (target){
            spawn.renewCreep(target);
        }


        //console.log('Harvesters: ' + harvesters.length);

        if(zeroharvesters.length < L_ZeroHarvesterCount) {
            //var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'L_zeroharvester'});
            //var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'L_zeroharvester'});
            var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'L_zeroharvester'});
            console.log('<!> Spawning new zeroharvester: ' + newName);

        }else if(transporters.length < L_TransporterCount ) {
            //var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'L_transporter'});
            var newName = spawn.createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'L_transporter'});
            //console.log('Spawning new harvester: ' + newName);

        }else if(harvesters.length < L_HarvesterCount) {
            //var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'L_harvester'});
            var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'L_harvester'});

        }else if(upgraders.length < L_UpgraderCount) {
            //var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'L_upgrader'});
            var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'L_upgrader'});
            //console.log('Spawning new harvester: ' + newName);

        }else if(builders.length < L_BuilderCount) {
            //var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'L_builder'});
            var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'L_builder'});
            //console.log('Spawning new harvester: ' + newName);

        }else if(guards.length < L_GuardCount ) {
            //var newName = Game.spawns.Spawn1.createCreep([TOUGH,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'L_guard'})
            var newName = spawn.createCreep([TOUGH,RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'L_guard'})
            /*
            var newName = Game.spawns.Spawn1.createCreep(
                [
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    TOUGH,
                    RANGED_ATTACK,
                    MOVE
                ], undefined, {role: 'L_guard'});
            //console.log('Spawning new harvester: ' + newName);
            */
        }

        //var sources = spawn.room.find(FIND_SOURCES);
        var sources = spawn.room.find(FIND_SOURCES);

        var k_creeps = 0;
        var k_sources = 0;
        var s = 0;

        for (var theSoucre in sources){
            //creep.memory.deposit = sources[k_creeps % (sources.length-1)]
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(creep.memory.role == 'L_harvester') {
                    var sourceIndex = k_creeps % sources.length;
                    //console.log('<-> CREEP:' + k_creeps + ' SOURCE:' + k_sources + ' LENGTH:' + sources.length +' THING:' + sourceIndex);
                    if ( (creep.harvest(sources[sourceIndex]) == ERR_INVALID_TARGET) || (isLocationDangerous(sources[sourceIndex].pos, creep.room)) ){
                        //console.log('no');
                    }else{
                        //console.log('yes');
                        creep.memory.deposit = sources[sourceIndex].id;
                    }


                    k_creeps++;
                }

            }

            k_sources++;
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.ticksToLive <= (CREEP_LIFE_TIME / 2)){
                var target = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                if(target){
                    creep.moveTo(target);
                }
            }else{

                if(creep.memory.role == 'L_zeroharvester') {
                    roleZeroHarvester.run(creep);
                }
                if(creep.memory.role == 'L_transporter') {
                    roleTransporter.run(creep);
                }
                if(creep.memory.role == 'L_harvester') {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'L_upgrader') {
                    roleUpgrader.run(creep);
                }
                if(creep.memory.role == 'L_builder') {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role == 'L_guard') {
                    roleGuard.run(creep);
                }
            }
        }
        /*
        if (spawn.memory.doRoads){
            //var sources = spawn.room.find(FIND_SOURCES);

            var path = (spawn.pos.findPathTo(spawn.room.controller))
            for (i = 0; i < path.length; i++) {
                //text += path[i] + "<br>";
                //console.log('X:'+ path[i].x + "Y:" + path[i].y);
                //spawn.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
            }

            for (s = 0; s < sources.length; s++) {
                //path = (spawn.room.controller.pos.findPathTo(source.pos.x, source.pos.y))
                var path = (spawn.room.controller.pos.findPathTo(sources[s]))
                for (i = 0; i < path.length; i++) {
                    //text += path[i] + "<br>";
                    console.log('X:'+ path[i].x + "Y:" + path[i].y);
                    //spawn.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
                }
            }
            /*
            for( var tile in path){
                console.log('X:'+ tile['x'] + "Y:" + tile['y']);
                //spawn.room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
            }
            */
        /*
            spawn.memory.doRoads = false
        }else{
            spawn.memory.doRoads = false
        }
        */

        //if (spawn.memory.doRoads != null ){
        if(spawn.memory.doRoads == null){
            spawn.memory.doRoads = true;
        }
        if(spawn.memory.doRoads){
            var i = 0;
            var s = 0;
            var sources = spawn.room.find(FIND_SOURCES);

            var path = (spawn.pos.findPathTo(spawn.room.controller))
            for (i = 0; i < path.length; i++) {
                //text += path[i] + "<br>";
                console.log('X:'+ path[i].x + "Y:" + path[i].y);
                spawn.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
            }

            for (s = 0; s < sources.length; s++) {
                //path = (spawn.room.controller.pos.findPathTo(source.pos.x, source.pos.y))
                var path = (spawn.room.controller.pos.findPathTo(sources[s]))
                for (i = 0; i < path.length; i++) {
                    //text += path[i] + "<br>";
                    console.log('X:'+ path[i].x + "Y:" + path[i].y);
                    spawn.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD)
                }
            }

            /*
            for( var tile in path){
                console.log('X:'+ tile['x'] + "Y:" + tile['y']);
                //spawn.room.createConstructionSite(tile.x, tile.y, STRUCTURE_ROAD)
            }
            */
            spawn.memory.doRoads = false

        }else{
            spawn.memory.doRoads = false
        }

        /*
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'L_harvester') {
                for (var sources in creep.room.find(FIND_SOURCES)){
                    //creep.memory.deposit = sources[k_creeps % (sources.length-1)]
                    console.log('<-> C:' + k_creeps + ' S:' + k_sources + ' D:' + (sources.length % k_creeps));
                    k_sources++;
                }
                //roleHarvester.run(creep);
            }
            k_creeps++;
        }
        */


	}
};

module.exports = spawnZero;
