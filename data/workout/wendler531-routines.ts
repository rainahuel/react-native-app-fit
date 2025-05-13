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
type Goal = 'gainStrength';

interface ExperienceLevelData {
    beginner: { [days: number]: WorkoutDay[] };
    intermediate: { [days: number]: WorkoutDay[] };
}

export interface WendlerData {
    wendler531: {
        gainStrength: ExperienceLevelData;
    };
}
const wendlerData: WendlerData = {
    wendler531: {
        gainStrength: {
            beginner: {
                3: [
                    {
                        day: "Day 1 - Squat Focus",
                        focus: "Back Squat Progression",
                        exercises: [
                            { name: "Back Squat (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "3-4 min" },
                            { name: "Back Squat (First Set Last - 5x5)", sets: 5, reps: "5", rest: "2-3 min" },
                            { name: "Leg Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Plank", sets: 3, reps: "30-60 sec", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Press Focus",
                        focus: "Overhead Press Progression",
                        exercises: [
                            { name: "Overhead Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "3-4 min" },
                            { name: "Overhead Press (First Set Last - 5x5)", sets: 5, reps: "5", rest: "2-3 min" },
                            { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Pull Focus",
                        focus: "Deadlift Progression",
                        exercises: [
                            { name: "Deadlift (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4-5 min" },
                            { name: "Deadlift (First Set Last - 3x5)", sets: 3, reps: "5", rest: "3 min" },
                            { name: "Pull-Up or Lat Pulldown", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2 min" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Overhead Press",
                        focus: "Upper Body Strength",
                        exercises: [
                            { name: "Overhead Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "3-4 min" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Triceps Dips", sets: 3, reps: "10", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Deadlift",
                        focus: "Posterior Chain",
                        exercises: [
                            { name: "Deadlift (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4-5 min" },
                            { name: "Leg Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Bench Press",
                        focus: "Chest & Triceps",
                        exercises: [
                            { name: "Bench Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "3-4 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Chest Fly", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Squat",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Back Squat (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4 min" },
                            { name: "Walking Lunge", sets: 3, reps: "10 each leg", rest: "2 min" },
                            { name: "Leg Curl", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    }
                ]
            },
            intermediate: {
                3: [
                    {
                        day: "Day 1 - Squat Focus",
                        focus: "Back Squat + Assistance",
                        exercises: [
                            { name: "Back Squat (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4-5 min" },
                            { name: "Front Squat", sets: 3, reps: "6-8", rest: "2-3 min" },
                            { name: "Leg Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Press Focus",
                        focus: "Overhead Press + Volume",
                        exercises: [
                            { name: "Overhead Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "3-4 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Triceps Dips", sets: 3, reps: "10", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Pull Focus",
                        focus: "Deadlift + Accessories",
                        exercises: [
                            { name: "Deadlift (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4-5 min" },
                            { name: "Barbell Row", sets: 3, reps: "8", rest: "2-3 min" },
                            { name: "Pull-Up", sets: 3, reps: "8-10", rest: "2-3 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Overhead Press",
                        focus: "Heavy Pressing",
                        exercises: [
                            { name: "Overhead Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4 min" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Deadlift",
                        focus: "Posterior Chain Strength",
                        exercises: [
                            { name: "Deadlift (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "5 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2-3 min" },
                            { name: "Pull-Up", sets: 3, reps: "8", rest: "2-3 min" },
                            { name: "Seated Row", sets: 3, reps: "10", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 3 - Bench Press",
                        focus: "Chest & Arms",
                        exercises: [
                            { name: "Bench Press (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4 min" },
                            { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                            { name: "Chest Fly", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "EZ Bar Curl", sets: 3, reps: "12", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Squat",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Back Squat (5/3/1 Main Sets)", sets: 3, reps: "5, 3, 1", rest: "4-5 min" },
                            { name: "Walking Lunge", sets: 3, reps: "10 each leg", rest: "2 min" },
                            { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    }
                ]
            }
        }
    }
};

export default wendlerData;