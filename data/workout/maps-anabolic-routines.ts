interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: string;
}

interface WorkoutDay {
    day: string;
    focus: string;
    exercises: Exercise[];
}

type ExperienceLevel = 'beginner' | 'intermediate';
type Goal = 'buildMuscle';

interface ExperienceLevelData {
    beginner: { [days: number]: WorkoutDay[] };
    intermediate: { [days: number]: WorkoutDay[] };
}

export interface MapsAnabolicData {
    mapsAnabolic: {
        buildMuscle: ExperienceLevelData;
    };
}
const mapsAnabolicData: MapsAnabolicData = {
    mapsAnabolic: {
        buildMuscle: {
            beginner: {
                3: [
                    {
                        day: "Day 1 - Foundational Strength",
                        focus: "Full Body A",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 3, reps: "8-10", rest: "90-120 sec" },
                            { name: "Flat Bench Press", sets: 3, reps: "8-10", rest: "90-120 sec" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90-120 sec" },
                            { name: "Plank", sets: 3, reps: "30-60 sec", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Mobility & Volume",
                        focus: "Full Body B",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Bird Dog or Side Plank", sets: 2, reps: "30 sec each side", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Isolation & Recovery",
                        focus: "Full Body C",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Lower A",
                        focus: "Strength & Stability",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "2 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Walking Lunge", sets: 2, reps: "10 each leg", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Upper A",
                        focus: "Push Strength",
                        exercises: [
                            { name: "Flat Bench Press", sets: 4, reps: "6-8", rest: "2 min" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Triceps Dips", sets: 2, reps: "10", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Lower B",
                        focus: "Volume & Mobility",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Glute Bridge", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Standing Calf Raise", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Upper B",
                        focus: "Pull & Core",
                        exercises: [
                            { name: "Pull-Up or Lat Pulldown", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "12", rest: "60-90 sec" },
                            { name: "Plank", sets: 2, reps: "60 sec", rest: "60 sec" }
                        ]
                    }
                ]
            },
            intermediate: {
                3: [
                    {
                        day: "Day 1 - Strength Phase",
                        focus: "Full Body A",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Flat Bench Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Plank", sets: 3, reps: "60 sec", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Volume Phase",
                        focus: "Full Body B",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Recovery Phase",
                        focus: "Full Body C",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Bird Dog or Side Plank", sets: 2, reps: "30 sec each side", rest: "60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Lower A",
                        focus: "Strength Emphasis",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Walking Lunge", sets: 2, reps: "12 each leg", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Upper A",
                        focus: "Push Strength",
                        exercises: [
                            { name: "Flat Bench Press", sets: 4, reps: "6", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Triceps Dips", sets: 2, reps: "10", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Lower B",
                        focus: "Mobility + Volume",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Glute Bridge", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Standing Calf Raise", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Upper B",
                        focus: "Pull & Core",
                        exercises: [
                            { name: "Pull-Up or Lat Pulldown", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "12", rest: "60-90 sec" },
                            { name: "Plank", sets: 2, reps: "60 sec", rest: "60 sec" }
                        ]
                    }
                ]
            }
        }
    }
};

export default mapsAnabolicData;