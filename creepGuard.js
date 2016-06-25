var creepGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var enemies = creep.room.find(FIND_HOSTILE_CREEPS);

      if (enemies.length > 0){
        var closeOnes = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);

        if (closeOnes.length > 0){
          creep.rangedAttack(closeOnes[0]);
        }else{
          creep.moveTo(enemies[0]);
        }
    }else{
        if(creep.pos.getRangeTo(25,25) >= 5){
            creep.moveTo(25, 25)
        }//else{

        //}
    }
    }
};

module.exports = creepGuard;
