module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, harvesters) {
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('transfering');
        }
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            var numHarvesting = 0;
            var source0 = 0;
            for (var i = 0; i < harvesters.length; i++) {
                if (Memory.creeps[harvesters[i].name].harvesting) {
                    numHarvesting++
                    if (!Memory.creeps[harvesters[i].name].target) {
                        source0++
                    }
                }
            }
            if (Math.round(10 * (source0 / numHarvesting)) > 6) {
                creep.memory.target = 1;
            } else {
                creep.memory.target = 0;
            };
            creep.say('harvesting');
        }
        if (creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[creep.memory.target]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.target]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity && structure.my;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};
