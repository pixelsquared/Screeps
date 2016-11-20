var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for (var spawn in Game.spawns) {


        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == Game.spawns[spawn].room);
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == Game.spawns[spawn].room);
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == Game.spawns[spawn].room);

        if (builder.length < 2) {
            var newName = Game.spawns[spawn].createCreep([WORK, CARRY, MOVE], undefined, {
                role: 'builder'
            });
            console.log('Spawning new builder: ' + newName);
        }

        if (harvesters.length < 7) {
            var newName = Game.spawns[spawn].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'harvester',
                target: 0
            });
            console.log('Spawning new harvester: ' + newName);
        }

        if (upgrader.length < 4) {
            var newName = Game.spawns[spawn].createCreep([WORK, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {
                role: 'upgrader'
            });
            console.log('Spawning new upgrader: ' + newName);
        }
    };
    // var tower = Game.getObjectById('c70e250052e5d4565e1c5d66');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    //
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep, harvesters);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
