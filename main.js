//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');
//var roleBuilder = require('role.builder');

var spawnZero = require('spawnZero');

module.exports.loop = function () {


    for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
    }


  for(var name in Game.spawns){
    var spawn = Game.spawns[name];

    if(!Game.spawns[name]) {
        delete Game.spawns[name];
    }

    if (spawn.memory.role == null){
      spawn.memory.role = 'zerospawn';
    }

    if(spawn.memory.role == 'zerospawn') {
        //roleHarvester.run(creep);
        //spawnZero.run(spawn);
        //Room.createConstructionSite(spawn.pos.x+3, spawn.pos.y+3, STRUCTURE_STORAGE)
        spawnZero.run(spawn);
        //console.log('the cake is a lie');
    }
  }
}

/*
  for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
          delete Memory.creeps[name];
      }
  }

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  //console.log('Harvesters: ' + harvesters.length);

  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

  if(harvesters.length < 1) {
      var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
      console.log('Spawning new harvester: ' + newName);
  }else{

    if(upgraders.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new harvester: ' + newName);
    }

    if(builders.length < 1) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new harvester: ' + newName);
    }
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
    }
}
*/
