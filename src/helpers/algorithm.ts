export const timeSlots = [
    '7:30-8:15', '8:15-9:00', '9:00-9:45', '9:45-10:30', '10:45-11:15',
    '11:15-12:00', '12:00-12:45', '12:45-1:30'
];

export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

interface ClassDetails {
    className: string;
    roomCapacity: string;
    subject: string;
    teacherAvailability: string[];
    teacherId: string;
    teacherName: string;
}

type Schedule = {
    [day: string]: {
        [timeSlot: string]: ClassDetails[];
    };
};

export function createTimetable(timetable: ClassDetails[], timeSlots: string[], days: string[]): Schedule {
    const schedule: Schedule = {} as Schedule;
    const assignedClasses = new Set<string>(); // To track assigned classes and subjects
    let classCounter = 0;

    // Initialize the schedule structure with empty arrays for each time slot
    days.forEach(day => {
        schedule[day] = {};
        timeSlots.forEach(slot => {
            schedule[day][slot] = [];
        });
    });

    // Function to assign a class to a time slot
    function assignClass(cls: ClassDetails, day: string, slot: string) {
        schedule[day][slot].push(cls);
        assignedClasses.add(`${cls.className}-${cls.subject}`);
        classCounter++;
    }

    // Function to check if a teacher is already scheduled in the same slot
    function isTeacherAvailable(day: string, slot: string, teacherId: string) {
        return schedule[day][slot].every(c => c.teacherId !== teacherId);
    }

    // Filling function based on the number of existing classes in slots
    function fillSlots(maxPerSlot: number) {
        for (let i = 0; i < timetable.length; i++) {
            let cls = timetable[i];
            let assigned = false;

            if (!assignedClasses.has(`${cls.className}-${cls.subject}`)) {
                if (Array.isArray(cls.teacherAvailability) && cls.teacherAvailability.length > 0) {
                    for (let day of cls.teacherAvailability) {
                        if (assigned) break;
                        for (let slot of timeSlots) {
                            if (
                                schedule[day][slot].length < maxPerSlot &&
                                isTeacherAvailable(day, slot, cls.teacherId) &&
                                classCounter < timetable.length
                            ) {
                                assignClass(cls, day, slot);
                                assigned = true;
                                break;
                            }
                        }
                    }
                } else {
                    console.error(`Invalid availability for class ${cls.className}. Expected an array, got ${typeof cls.teacherAvailability}`);
                }
            }
        }
    }

    fillSlots(1);
    fillSlots(2);
    fillSlots(3);

    return schedule;
}
