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
type Goal = 'buildMuscle' | 'loseFat' | 'gainStrength';

interface ExperienceLevelData {
    beginner: { [days: number]: WorkoutDay[] };
    intermediate: { [days: number]: WorkoutDay[] };
}

export interface PplData {
    ppl: {
        buildMuscle: ExperienceLevelData;
        loseFat: ExperienceLevelData;
        gainStrength: ExperienceLevelData;
    };
}
const pplData: PplData = {
    ppl: {
        buildMuscle: {
            beginner: {
                3: [
                    {
                        day: "Day 1 - Push",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 2, reps: "12-15", rest: "60 sec" },
                            { name: "Hammer Curl", sets: 2, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs",
                        focus: "Quads, Hamstrings & Calves",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Push",
                        focus: "Chest & Shoulders",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Hammer Curl", sets: 2, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs",
                        focus: "Quads, Hamstrings & Calves",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Full Body",
                        focus: "Overall Strength & Balance",
                        exercises: [
                            { name: "Deadlift", sets: 3, reps: "5", rest: "3 min" },
                            { name: "Overhead Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Leg Curl", sets: 2, reps: "12", rest: "60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Hammer Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Quads Focus",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Shoulders & Chest",
                        exercises: [
                            { name: "Overhead Dumbbell Press", sets: 4, reps: "10", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Chest Fly Machine", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Upper Back & Biceps",
                        exercises: [
                            { name: "Seated Cable Row", sets: 4, reps: "10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Chest Fly Machine", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "8", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Quads",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Shoulders",
                        exercises: [
                            { name: "Overhead Dumbbell Press", sets: 4, reps: "10", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Upper Back & Arms",
                        exercises: [
                            { name: "Seated Cable Row", sets: 4, reps: "10", rest: "2 min" },
                            { name: "Hammer Curl", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6 - Legs B",
                        focus: "Hamstrings & Glutes",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "90 sec" },
                            { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    }
                ]
            },
            intermediate: {
                3: [
                    {
                        day: "Day 1 - Push",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60-90 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Weighted Pull-Ups", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Hammer Curl", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs",
                        focus: "Quads, Hamstrings & Calves",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Leg Curl Machine", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    }
                ],

                4: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Shoulders Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Leg Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Chest & Triceps Hypertrophy",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 5 - Pull B",
                        focus: "Back & Biceps Hypertrophy",
                        exercises: [
                            { name: "Chest-Supported Row", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Lat Pulldown (Wide Grip)", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Cable Row (Neutral Grip)", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Face Pull", sets: 3, reps: "15-20", rest: "60 sec" },
                            { name: "EZ Bar Curl", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }

                ],
                6: [
                    {
                        day: "Day 6 - Legs B",
                        focus: "Posterior Chain & Calves",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Front Squat", sets: 3, reps: "8-10", rest: "2-3 min" },
                            { name: "Bulgarian Split Squat", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Lying Leg Curl", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Seated Calf Raise", sets: 4, reps: "15-20", rest: "60 sec" }
                        ]
                    }

                ]
            }
        },
        loseFat: {
            beginner: {
                3: [
                    {
                        day: "Day 1 - Push (Fat Loss Focus)",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 2, reps: "12-15", rest: "60 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15-20", rest: "45-60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull (Fat Loss Focus)",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Assisted Pull-Ups", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 2, reps: "12-15", rest: "60 sec" },
                            { name: "Face Pull", sets: 2, reps: "15-20", rest: "45-60 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs (Fat Loss Focus)",
                        focus: "Quads, Glutes & Hamstrings",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Romanian Deadlift (Dumbbells)", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Walking Lunges", sets: 2, reps: "10-12 each leg", rest: "60 sec" },
                            { name: "Leg Curl Machine", sets: 2, reps: "15", rest: "45-60 sec" },
                            { name: "Standing Calf Raise", sets: 2, reps: "15-20", rest: "45-60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Push (Fat Loss Focus)",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 2, reps: "12-15", rest: "60 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15-20", rest: "45-60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull (Fat Loss Focus)",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Assisted Pull-Ups", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Face Pull", sets: 2, reps: "15-20", rest: "45-60 sec" },
                            { name: "Dumbbell Curl", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs (Fat Loss Focus)",
                        focus: "Lower Body Strength & Endurance",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Romanian Deadlift (Dumbbells)", sets: 2, reps: "12-15", rest: "60-90 sec" },
                            { name: "Leg Curl Machine", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Full Body (Conditioning Focus)",
                        focus: "Fat Loss Circuit",
                        exercises: [
                            { name: "Kettlebell Swings", sets: 3, reps: "15", rest: "45 sec" },
                            { name: "Push-Ups", sets: 3, reps: "12-15", rest: "45 sec" },
                            { name: "Bodyweight Squats", sets: 3, reps: "20", rest: "45 sec" },
                            { name: "Plank", sets: 3, reps: "30-45 sec", rest: "45 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1 - Push",
                        focus: "Chest & Triceps",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "45-60 sec" },
                            { name: "Triceps Dips (Bench)", sets: 2, reps: "12-15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Face Pull", sets: 2, reps: "15", rest: "45-60 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "15", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Romanian Deadlift (Dumbbells)", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Leg Press Machine", sets: 2, reps: "15", rest: "60 sec" },
                            { name: "Seated Calf Raise", sets: 2, reps: "15-20", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push (Light Focus)",
                        focus: "Volume Work",
                        exercises: [
                            { name: "Machine Chest Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 2, reps: "12", rest: "60 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "15-20", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull (Light Focus)",
                        focus: "Volume & Isolation",
                        exercises: [
                            { name: "Seated Cable Row", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Face Pull", sets: 2, reps: "20", rest: "45 sec" },
                            { name: "Dumbbell Hammer Curl", sets: 2, reps: "15", rest: "45 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Shoulders Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15-20", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back & Biceps Strength",
                        exercises: [
                            { name: "Assisted Pull-Ups", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Leg Strength",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Romanian Deadlift (Dumbbells)", sets: 3, reps: "12", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 2, reps: "20", rest: "45-60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Chest & Shoulders (Volume)",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 2, reps: "15", rest: "60 sec" },
                            { name: "Lateral Raise", sets: 2, reps: "20", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Back & Biceps (Volume)",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 2, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 2, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 6 - Legs B",
                        focus: "Leg Volume",
                        exercises: [
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Leg Curl Machine", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Seated Calf Raise", sets: 2, reps: "20", rest: "45 sec" }
                        ]
                    }
                ]




            },
            intermediate: {
                3: [
                    {
                        day: "Day 1 - Push (Fat Loss Focus)",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15-20", rest: "45-60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull (Fat Loss Focus)",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Pull-Ups", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Face Pull", sets: 3, reps: "15-20", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 3, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs (Fat Loss Focus)",
                        focus: "Quads, Hamstrings & Glutes",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "10", rest: "90-120 sec" },
                            { name: "Romanian Deadlift", sets: 3, reps: "12", rest: "90-120 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "20", rest: "45 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Shoulders",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back & Arms",
                        exercises: [
                            { name: "Pull-Ups", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Curl", sets: 2, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "8", rest: "2 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Calf Raise", sets: 3, reps: "20", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B (Conditioning Focus)",
                        focus: "Chest, Shoulders & Core",
                        exercises: [
                            { name: "Dumbbell Incline Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12-15", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15-20", rest: "45 sec" },
                            { name: "Plank", sets: 3, reps: "45 sec", rest: "30 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1 - Push (Strength Focus)",
                        focus: "Chest & Shoulders",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "6-8", rest: "90-120 sec" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull (Strength Focus)",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "6-8", rest: "90-120 sec" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90-120 sec" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs (Strength Focus)",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push (Volume Focus)",
                        focus: "Chest & Shoulders Hypertrophy",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15-20", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull (Volume Focus)",
                        focus: "Back & Arms Hypertrophy",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Face Pull", sets: 3, reps: "15-20", rest: "60 sec" },
                            { name: "EZ Bar Curl", sets: 2, reps: "15", rest: "45 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Strength Focus",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Strength Focus",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Strength Focus",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Volume Focus",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15-20", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Volume Focus",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "12-15", rest: "90 sec" },
                            { name: "Face Pull", sets: 3, reps: "20", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 6 - Legs B",
                        focus: "Volume Focus",
                        exercises: [
                            { name: "Goblet Squat", sets: 4, reps: "12-15", rest: "90 sec" },
                            { name: "Romanian Deadlift", sets: 4, reps: "12", rest: "90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "15 each leg", rest: "60 sec" }
                        ]
                    }
                ]




            }
        },
        gainStrength: {
            beginner: {
                3: [
                    {
                        day: "Day 1 - Push (Strength Focus)",
                        focus: "Chest, Shoulders & Triceps",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull (Strength Focus)",
                        focus: "Back & Biceps",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs (Strength Focus)",
                        focus: "Quads, Hamstrings & Glutes",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15-20", rest: "60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Shoulders Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back & Arms Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Chest & Triceps Strength",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest & Shoulder Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back & Arms Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Leg Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15-20", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Chest & Triceps Hypertrophy",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Back Hypertrophy",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Leg Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Shoulders & Triceps",
                        exercises: [
                            { name: "Overhead Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Back & Arms",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6 - Legs B",
                        focus: "Leg Hypertrophy",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "8-10", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Seated Calf Raise", sets: 4, reps: "15-20", rest: "60 sec" }
                        ]
                    }
                ]




            },
            intermediate: {
                3: [
                    {
                        day: "Day 1 - Push",
                        focus: "Chest & Shoulder Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Overhead Barbell Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull",
                        focus: "Back & Biceps Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Barbell Row", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs",
                        focus: "Leg Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest Strength",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Incline Dumbbell Press", sets: 4, reps: "6-8", rest: "2 min" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back Strength",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Squat Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Seated Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Shoulder & Triceps Strength",
                        exercises: [
                            { name: "Overhead Barbell Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "2 min" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Chest Focus",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Incline Dumbbell Press", sets: 4, reps: "6-8", rest: "2 min" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Back Focus",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Squat Focus",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Shoulder & Chest",
                        exercises: [
                            { name: "Overhead Press", sets: 4, reps: "5-6", rest: "3 min" },
                            { name: "Incline Barbell Press", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Arms & Back",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" },
                            { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1 - Push A",
                        focus: "Heavy Chest",
                        exercises: [
                            { name: "Barbell Bench Press", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Overhead Barbell Press", sets: 3, reps: "8-10", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 2 - Pull A",
                        focus: "Heavy Back",
                        exercises: [
                            { name: "Weighted Pull-Up", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Barbell Row", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 3 - Legs A",
                        focus: "Heavy Legs",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "3 min" },
                            { name: "Standing Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4 - Push B",
                        focus: "Chest Volume",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5 - Pull B",
                        focus: "Back Volume",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "8-10", rest: "2 min" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Dumbbell Hammer Curl", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6 - Legs B",
                        focus: "Leg Volume",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10 each leg", rest: "90 sec" },
                            { name: "Seated Calf Raise", sets: 4, reps: "15", rest: "60 sec" }
                        ]
                    }
                ]
            }
        }

    }
};

export default pplData;