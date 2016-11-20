module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.withdraw = false;
        }
        if (creep.carry.energy == 0) {
            creep.memory.withdraw = true;
        }
        if (creep.memory.withdraw) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN);
                }
            });
            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
