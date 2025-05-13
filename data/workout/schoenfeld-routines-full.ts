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
type Goal = 'loseFat' | 'maintainMuscle' | 'gainStrength' | 'buildMuscle';

interface ExperienceLevelData {
    beginner: { [days: string]: WorkoutDay[] };
    intermediate: { [days: string]: WorkoutDay[] };
}

export interface SchoenfeldData {
    schoenfeld: {
        loseFat: ExperienceLevelData;
        maintainMuscle: ExperienceLevelData;
        gainStrength: ExperienceLevelData;
        buildMuscle: ExperienceLevelData;
    };
}
const schoenfeldData: SchoenfeldData = {
    "schoenfeld": {
        "loseFat": {
            "beginner": {
                "3": [
                    {
                        "day": "Day 1",
                        "focus": "Full Body Circuit",
                        "exercises": [
                            {
                                "name": "Goblet Squat",
                                "sets": 3,
                                "reps": "12-15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Push-ups",
                                "sets": 3,
                                "reps": "12-15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Dumbbell Row",
                                "sets": 3,
                                "reps": "12",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Mountain Climbers",
                                "sets": 3,
                                "reps": "20 sec",
                                "rest": "30 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Upper Body Focus",
                        "exercises": [
                            {
                                "name": "Incline Dumbbell Press",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Lat Pulldown",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Lateral Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Plank",
                                "sets": 3,
                                "reps": "30 sec",
                                "rest": "30 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Lower Body + Core",
                        "exercises": [
                            {
                                "name": "Leg Press",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Romanian Deadlift",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Calf Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Crunches",
                                "sets": 3,
                                "reps": "20",
                                "rest": "30 sec"
                            }
                        ]
                    }
                ],
                "4": [
                    {
                        "day": "Day 1",
                        "focus": "Full Body Strength",
                        "exercises": [
                            {
                                "name": "Barbell Squat",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Bench Press",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Seated Row",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Hanging Leg Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Cardio + Conditioning",
                        "exercises": [
                            {
                                "name": "Kettlebell Swings",
                                "sets": 3,
                                "reps": "20",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Battle Ropes",
                                "sets": 3,
                                "reps": "30 sec",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Burpees",
                                "sets": 3,
                                "reps": "12",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Jump Squats",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Upper Body",
                        "exercises": [
                            {
                                "name": "Incline Dumbbell Press",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Pull-ups (Assisted)",
                                "sets": 3,
                                "reps": "8-10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Lateral Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Plank to Push-up",
                                "sets": 3,
                                "reps": "30 sec",
                                "rest": "30 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 4",
                        "focus": "Lower Body + Core",
                        "exercises": [
                            {
                                "name": "Leg Press",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Step-ups",
                                "sets": 3,
                                "reps": "10 each leg",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Glute Bridge",
                                "sets": 3,
                                "reps": "15",
                                "rest": "30 sec"
                            },
                            {
                                "name": "Russian Twists",
                                "sets": 3,
                                "reps": "20 reps",
                                "rest": "30 sec"
                            }
                        ]
                    }
                ],
                "5": [
                    {
                        day: "Day 1",
                        focus: "Full Body Circuit",
                        exercises: [
                            { name: "Goblet Squat", sets: 3, reps: "15", rest: "30-45 sec" },
                            { name: "Push-Ups", sets: 3, reps: "15", rest: "30-45 sec" },
                            { name: "Inverted Rows", sets: 3, reps: "15", rest: "30-45 sec" },
                            { name: "Mountain Climbers", sets: 3, reps: "20 sec", rest: "30-45 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Full Body Strength",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Dumbbell Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "HIIT + Core",
                        exercises: [
                            { name: "Treadmill Sprints", sets: 6, reps: "30 sec ON / 90 sec OFF", rest: "-" },
                            { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Body Push",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Overhead Press", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Lower Body & Core",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "20 steps", rest: "60 sec" },
                            { name: "Cable Crunch", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    }
                ],
                "6": [
                    {
                        day: "Day 1",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "10", rest: "90 sec" },
                            { name: "Leg Press", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Calf Raises", sets: 3, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Body Strength",
                        exercises: [
                            { name: "Flat Bench Press", sets: 4, reps: "10", rest: "90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Cardio + Core",
                        exercises: [
                            { name: "Rowing Machine", sets: 1, reps: "20 min", rest: "-" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "30 sec" },
                            { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Full Body Circuit",
                        exercises: [
                            { name: "Kettlebell Swings", sets: 3, reps: "20", rest: "30 sec" },
                            { name: "Burpees", sets: 3, reps: "15", rest: "30 sec" },
                            { name: "Dumbbell Rows", sets: 3, reps: "12", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Push Strength",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lateral Raises", sets: 3, reps: "15", rest: "45 sec" },
                            { name: "Skullcrushers", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Pull & Core",
                        exercises: [
                            { name: "Deadlift", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Chin-Ups", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Hanging Leg Raises", sets: 3, reps: "12", rest: "30-60 sec" }
                        ]
                    }
                ]

            },
            intermediate: {
                "3": [
                    {
                        day: "Day 1",
                        focus: "Upper Body Strength",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Barbell Row", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Dumbbell Shoulder Press", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Plank", sets: 3, reps: "45 sec", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body & Core",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Romanian Deadlift", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60-90 sec" },
                            { name: "Hanging Leg Raises", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Full Body Circuit",
                        exercises: [
                            { name: "Kettlebell Swings", sets: 3, reps: "15", rest: "45 sec" },
                            { name: "Burpees", sets: 3, reps: "15", rest: "45 sec" },
                            { name: "Push-ups", sets: 3, reps: "15", rest: "45 sec" },
                            { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "30 sec" }
                        ]
                    }
                ],
                "4": [
                    {
                        day: "Day 1",
                        focus: "Upper Body Push",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12-15", rest: "45-60 sec" },
                            { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Hip Thrust", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Step-Ups", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Plank to Push-up", sets: 3, reps: "10-12", rest: "30-45 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body Pull",
                        exercises: [
                            { name: "Pull-ups or Assisted Pull-ups", sets: 4, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "EZ Bar Curl", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Russian Twists", sets: 3, reps: "20 reps", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "HIIT & Core",
                        exercises: [
                            { name: "Rowing Machine (Sprint)", sets: 5, reps: "30 sec", rest: "1 min" },
                            { name: "Box Jumps", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Hanging Knee Raises", sets: 3, reps: "15", rest: "30 sec" },
                            { name: "Side Planks", sets: 2, reps: "30 sec each side", rest: "30 sec" }
                        ]
                    }
                ],
                "5": [
                    {
                        day: "Day 1",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Flat Bench Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lateral Raises", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Plank", sets: 3, reps: "45 sec", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Goblet Squat", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Leg Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Bicycle Crunches", sets: 3, reps: "20 reps", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body B",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Cable Row", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Dumbbell Shrugs", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Hanging Leg Raises", sets: 3, reps: "12", rest: "30-45 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Barbell Back Squat", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Hip Thrust", sets: 4, reps: "12", rest: "60-90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Toe Touch Crunch", sets: 3, reps: "15", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "HIIT & Conditioning",
                        exercises: [
                            { name: "Battle Ropes", sets: 5, reps: "30 sec", rest: "30-60 sec" },
                            { name: "Jump Rope", sets: 5, reps: "60 sec", rest: "30 sec" },
                            { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30 sec" },
                            { name: "V-Ups", sets: 3, reps: "15", rest: "30 sec" }
                        ]
                    }
                ],
                "6": [
                    {
                        day: "Day 1",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Flat Bench Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Triceps Dips", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body B",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Dumbbell Row", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Face Pulls", sets: 3, reps: "15", rest: "45 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 each leg", rest: "60 sec" },
                            { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Conditioning A",
                        exercises: [
                            { name: "Kettlebell Swings", sets: 4, reps: "15", rest: "60 sec" },
                            { name: "Jump Rope", sets: 5, reps: "60 sec", rest: "30 sec" },
                            { name: "Hanging Leg Raises", sets: 3, reps: "15", rest: "30 sec" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Conditioning B",
                        exercises: [
                            { name: "Rowing Sprint Intervals", sets: 5, reps: "30 sec", rest: "60 sec" },
                            { name: "Box Jumps", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Toe Touch Crunch", sets: 3, reps: "15", rest: "30 sec" }
                        ]
                    }
                ]
            }
        },
        maintainMuscle: {
            beginner: {
                "3": [
                    {
                        day: "Day 1",
                        focus: "Full Body Maintenance",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Plank", sets: 3, reps: "30-45 sec", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Full Body Maintenance",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Machine Chest Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Crunches", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Full Body Maintenance",
                        exercises: [
                            { name: "Dumbbell Lunges", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Push-ups", sets: 3, reps: "12-15", rest: "60 sec" },
                            { name: "Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    }
                ],
                "4": [
                    {
                        day: "Day 1",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lateral Raises", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body B",
                        exercises: [
                            { name: "Push-ups", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "10", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Crunches", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    }
                ],
                "5": [
                    {
                        day: "Day 1",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lateral Raises", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Push",
                        exercises: [
                            { name: "Push-ups", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Pull",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Seated Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "10", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Core & Mobility",
                        exercises: [
                            { name: "Crunches", sets: 3, reps: "15", rest: "30-60 sec" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "30-60 sec" },
                            { name: "Plank", sets: 3, reps: "30-60 sec", rest: "30-60 sec" }
                        ]
                    }
                ],
                "6": [
                    {
                        day: "Day 1",
                        focus: "Upper Body Push",
                        exercises: [
                            { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Body Pull",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60-90 sec" },
                            { name: "Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Body Mixed",
                        exercises: [
                            { name: "Dumbbell Bench Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Seated Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Hammer Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Core & Mobility",
                        exercises: [
                            { name: "Crunches", sets: 3, reps: "20", rest: "30-60 sec" },
                            { name: "Plank", sets: 3, reps: "60 sec", rest: "30-60 sec" },
                            { name: "Russian Twists", sets: 3, reps: "20 reps", rest: "30-60 sec" }
                        ]
                    }
                ]
            },
            intermediate: {
                3: [
                    {
                        day: "Day 1",
                        focus: "Upper Body",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Seated Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body",
                        exercises: [
                            { name: "Leg Press", sets: 4, reps: "10", rest: "90 sec" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 steps", rest: "60-90 sec" },
                            { name: "Calf Raises", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Full Body",
                        exercises: [
                            { name: "Deadlift", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Push-ups", sets: 3, reps: "15", rest: "60 sec" },
                            { name: "Pull-ups", sets: 3, reps: "6-8", rest: "90 sec" },
                            { name: "Plank", sets: 3, reps: "45 sec", rest: "30-60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1",
                        focus: "Push",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Pull",
                        exercises: [
                            { name: "Pull-ups", sets: 4, reps: "6-8", rest: "90 sec" },
                            { name: "Dumbbell Row", sets: 3, reps: "10-12", rest: "90 sec" },
                            { name: "EZ Bar Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Legs",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "8", rest: "2 min" },
                            { name: "Leg Curl", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Calf Press", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Full Body",
                        exercises: [
                            { name: "Deadlift", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Dips", sets: 3, reps: "10", rest: "60 sec" },
                            { name: "Russian Twists", sets: 3, reps: "20", rest: "30-60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1",
                        focus: "Upper Push",
                        exercises: [
                            { name: "Flat Dumbbell Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Overhead Barbell Press", sets: 3, reps: "8", rest: "90 sec" },
                            { name: "Triceps Dips", sets: 3, reps: "10-12", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Pull",
                        exercises: [
                            { name: "Lat Pulldown", sets: 4, reps: "10-12", rest: "60-90 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Face Pulls", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Legs A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "8", rest: "2 min" },
                            { name: "Lying Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Standing Calf Raises", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Full",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 4, reps: "8", rest: "90 sec" },
                            { name: "Pull-ups", sets: 3, reps: "6-8", rest: "90 sec" },
                            { name: "Cable Lateral Raises", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Legs B",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Walking Lunges", sets: 3, reps: "12 steps", rest: "90 sec" },
                            { name: "Seated Calf Raises", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1",
                        focus: "Push A",
                        exercises: [
                            { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Pull A",
                        exercises: [
                            { name: "Pull-ups", sets: 4, reps: "6-8", rest: "90 sec" },
                            { name: "Barbell Row", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Barbell Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Legs A",
                        exercises: [
                            { name: "Leg Press", sets: 4, reps: "10", rest: "90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Push B",
                        exercises: [
                            { name: "Flat Barbell Bench Press", sets: 4, reps: "8-10", rest: "90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Dumbbell Flyes", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Pull B",
                        exercises: [
                            { name: "Seated Cable Row", sets: 4, reps: "10-12", rest: "90 sec" },
                            { name: "Face Pull", sets: 3, reps: "12", rest: "60 sec" },
                            { name: "Hammer Curls", sets: 3, reps: "10", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Legs B",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "8", rest: "2 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    }
                ]
            }
        },
        gainStrength: {
            beginner: {
                3: [
                    {
                        day: "Day 1",
                        focus: "Full Body A",
                        exercises: [
                            { name: "Barbell Squat", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 3, reps: "6", rest: "2-3 min" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Full Body B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Overhead Press", sets: 3, reps: "5", rest: "2 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Side Plank", sets: 3, reps: "30 sec", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Full Body C",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Incline Bench Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                            { name: "Dumbbell Row", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Leg Raises", sets: 3, reps: "12", rest: "1-2 min" },
                        ],
                    },
                ],
                4: [
                    {
                        day: "Day 1",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "5", rest: "2 min" },
                            { name: "Barbell Curl", sets: 3, reps: "8", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Lunges", sets: 3, reps: "8 per leg", rest: "1-2 min" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body B",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Dumbbell Shoulder Press", sets: 3, reps: "8", rest: "1-2 min" },
                            { name: "Skullcrushers", sets: 3, reps: "10", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 4",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Leg Press", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Leg Curl", sets: 3, reps: "10-12", rest: "1-2 min" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "1-2 min" },
                        ],
                    },
                ],
                5: [
                    {
                        day: "Day 1",
                        focus: "Push",
                        exercises: [
                            { name: "Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "5", rest: "2 min" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8", rest: "2 min" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Pull",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Barbell Curl", sets: 3, reps: "10", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Legs A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Lunges", sets: 3, reps: "10 per leg", rest: "1-2 min" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 4",
                        focus: "Push B",
                        exercises: [
                            { name: "Incline Bench Press", sets: 3, reps: "6", rest: "2-3 min" },
                            { name: "Dumbbell Shoulder Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Skullcrushers", sets: 3, reps: "10", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 5",
                        focus: "Legs B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Leg Press", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "1-2 min" },
                        ],
                    },
                ],
                6: [
                    {
                        day: "Day 1",
                        focus: "Push A",
                        exercises: [
                            { name: "Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6", rest: "2 min" },
                            { name: "Dumbbell Incline Press", sets: 3, reps: "8", rest: "2 min" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Pull A",
                        exercises: [
                            { name: "Barbell Row", sets: 4, reps: "6", rest: "2-3 min" },
                            { name: "Chin-ups", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Face Pulls", sets: 3, reps: "12", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Legs A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Lunges", sets: 3, reps: "10", rest: "2 min" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 4",
                        focus: "Push B",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Dumbbell Shoulder Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Skullcrushers", sets: 3, reps: "10", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 5",
                        focus: "Pull B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Barbell Curl", sets: 3, reps: "10", rest: "1-2 min" },
                        ],
                    },
                    {
                        day: "Day 6",
                        focus: "Legs B",
                        exercises: [
                            { name: "Front Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Romanian Deadlift", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "1-2 min" },
                        ],
                    },
                ],
            },
            intermediate: {
                3: [
                    {
                        day: "Day 1",
                        focus: "Lower Body Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "2-3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "8/leg", rest: "2 min" },
                            { name: "Standing Calf Raises", sets: 3, reps: "10-12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Body Strength – Push",
                        exercises: [
                            { name: "Incline Barbell Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Dips (Weighted if possible)", sets: 3, reps: "8", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body Strength – Pull",
                        exercises: [
                            { name: "Weighted Pull-ups", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Bent Over Row", sets: 4, reps: "6-8", rest: "2 min" },
                            { name: "Barbell Curls", sets: 3, reps: "10", rest: "1-2 min" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1",
                        focus: "Lower Body A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Leg Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Calf Raises", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Body A",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2 min" },
                            { name: "Triceps Rope Pushdown", sets: 3, reps: "10-12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Lower Body B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Bulgarian Split Squat", sets: 3, reps: "8/leg", rest: "2 min" },
                            { name: "Seated Calf Raise", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Body B",
                        exercises: [
                            { name: "Weighted Pull-ups", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Seated Cable Row", sets: 3, reps: "10", rest: "2 min" },
                            { name: "EZ Bar Curls", sets: 3, reps: "10-12", rest: "1-2 min" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1",
                        focus: "Lower Strength",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Romanian Deadlift", sets: 4, reps: "6-8", rest: "2-3 min" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Upper Strength – Push",
                        exercises: [
                            { name: "Incline Barbell Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Dips", sets: 3, reps: "8-10", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Strength – Pull",
                        exercises: [
                            { name: "Weighted Pull-ups", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "T-Bar Row", sets: 3, reps: "8", rest: "2 min" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Leg Accessory & Core",
                        exercises: [
                            { name: "Walking Lunges", sets: 3, reps: "10/leg", rest: "1-2 min" },
                            { name: "Leg Extensions", sets: 3, reps: "12-15", rest: "1-2 min" },
                            { name: "Ab Wheel Rollouts", sets: 3, reps: "10", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Shoulders & Arms",
                        exercises: [
                            { name: "Overhead Dumbbell Press", sets: 3, reps: "8", rest: "1-2 min" },
                            { name: "Lateral Raises", sets: 3, reps: "12", rest: "1-2 min" },
                            { name: "Barbell Curls", sets: 3, reps: "10", rest: "1-2 min" },
                            { name: "Skull Crushers", sets: 3, reps: "10", rest: "1-2 min" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1",
                        focus: "Upper Push A",
                        exercises: [
                            { name: "Incline Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                            { name: "Dumbbell Shoulder Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Cable Chest Fly", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower A",
                        exercises: [
                            { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                            { name: "Leg Curl", sets: 3, reps: "10", rest: "1-2 min" },
                            { name: "Standing Calf Raise", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Pull A",
                        exercises: [
                            { name: "Weighted Pull-ups", sets: 4, reps: "5-6", rest: "2-3 min" },
                            { name: "Barbell Row", sets: 3, reps: "8", rest: "2 min" },
                            { name: "EZ Bar Curls", sets: 3, reps: "10", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Push B",
                        exercises: [
                            { name: "Overhead Press", sets: 4, reps: "6", rest: "2-3 min" },
                            { name: "Dumbbell Incline Press", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Triceps Rope Extensions", sets: 3, reps: "10", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Lower B",
                        exercises: [
                            { name: "Deadlift", sets: 4, reps: "4-5", rest: "3 min" },
                            { name: "Walking Lunges", sets: 3, reps: "10/leg", rest: "2 min" },
                            { name: "Seated Calf Raise", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Upper Pull B",
                        exercises: [
                            { name: "T-Bar Row", sets: 3, reps: "8", rest: "2 min" },
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "1-2 min" },
                            { name: "Hammer Curls", sets: 3, reps: "12", rest: "1-2 min" }
                        ]
                    }
                ]
            }
        },
        buildMuscle: {
            beginner: {
                3: [
                    {
                        day: "Day 1",
                        focus: "Full Body",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Leg Raises", sets: 2, reps: "15", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Full Body",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Machine Chest Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Plank", sets: 2, reps: "30 sec", rest: "30-60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Full Body",
                        exercises: [
                            { name: "Leg Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "One-Arm Dumbbell Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Crunches", sets: 3, reps: "15", rest: "30-60 sec" }
                        ]
                    }
                ],
                4: [
                    {
                        day: "Day 1",
                        focus: "Upper Body",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Lower Body",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Leg Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Upper Body",
                        exercises: [
                            { name: "Machine Chest Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Dumbbell Lateral Raise", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Lower Body",
                        exercises: [
                            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Walking Lunges", sets: 2, reps: "10 each leg", rest: "90 sec" },
                            { name: "Standing Calf Raise", sets: 3, reps: "12-15", rest: "60 sec" }
                        ]
                    }
                ],
                5: [
                    {
                        day: "Day 1",
                        focus: "Push",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Pull",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Seated Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Dumbbell Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Legs",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "90 sec" },
                            { name: "Leg Curl", sets: 3, reps: "12", rest: "60-90 sec" },
                            { name: "Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Upper Body",
                        exercises: [
                            { name: "Machine Chest Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Bent Over Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Core & Conditioning",
                        exercises: [
                            { name: "Crunches", sets: 3, reps: "20", rest: "30 sec" },
                            { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec" },
                            { name: "Plank", sets: 3, reps: "30 sec", rest: "30 sec" }
                        ]
                    }
                ],
                6: [
                    {
                        day: "Day 1",
                        focus: "Push",
                        exercises: [
                            { name: "Incline Dumbbell Press", sets: 3, reps: "8-10", rest: "60-90 sec" },
                            { name: "Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Lateral Raise", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 2",
                        focus: "Pull",
                        exercises: [
                            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "One-Arm Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Biceps Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 3",
                        focus: "Legs",
                        exercises: [
                            { name: "Barbell Squat", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Leg Press", sets: 3, reps: "10", rest: "90 sec" },
                            { name: "Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 4",
                        focus: "Push",
                        exercises: [
                            { name: "Machine Chest Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Dumbbell Overhead Press", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Triceps Extension", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 5",
                        focus: "Pull",
                        exercises: [
                            { name: "Cable Row", sets: 3, reps: "10", rest: "60-90 sec" },
                            { name: "Pull-Up (Assisted if needed)", sets: 3, reps: "8", rest: "60-90 sec" },
                            { name: "Hammer Curl", sets: 3, reps: "12", rest: "60 sec" }
                        ]
                    },
                    {
                        day: "Day 6",
                        focus: "Core & Mobility",
                        exercises: [
                            { name: "Plank", sets: 3, reps: "30-45 sec", rest: "30-60 sec" },
                            { name: "Leg Raises", sets: 3, reps: "15", rest: "30-60 sec" },
                            { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "30-60 sec" }
                        ]
                    }
                ]
            },
            "intermediate": {
                "3": [
                    {
                        "day": "Day 1",
                        "focus": "Upper Body \u2013 Horizontal Push/Pull",
                        "exercises": [
                            {
                                "name": "Barbell Bench Press",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "Bent Over Row",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "Incline Dumbbell Press",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Cable Row",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Lower Body \u2013 Quads/Glutes Focus",
                        "exercises": [
                            {
                                "name": "Back Squat",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Walking Lunges",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Leg Press",
                                "sets": 3,
                                "reps": "10-12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Leg Extensions",
                                "sets": 3,
                                "reps": "12-15",
                                "rest": "45 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Upper Body \u2013 Vertical Push/Pull + Arms",
                        "exercises": [
                            {
                                "name": "Overhead Press",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "Lat Pulldown",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "Barbell Curl",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Skullcrushers",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            }
                        ]
                    }
                ],
                "4": [
                    {
                        "day": "Day 1",
                        "focus": "Upper Body A",
                        "exercises": [
                            {
                                "name": "Incline Barbell Press",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Pull-Ups",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "Dumbbell Shoulder Press",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Face Pull",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Lower Body A",
                        "exercises": [
                            {
                                "name": "Front Squat",
                                "sets": 4,
                                "reps": "8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Leg Press",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Leg Curl",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Standing Calf Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "45 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Upper Body B",
                        "exercises": [
                            {
                                "name": "Flat Dumbbell Press",
                                "sets": 4,
                                "reps": "10",
                                "rest": "60-90 sec"
                            },
                            {
                                "name": "T-Bar Row",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Lateral Raises",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            },
                            {
                                "name": "Hammer Curl",
                                "sets": 3,
                                "reps": "12",
                                "rest": "45 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 4",
                        "focus": "Lower Body B",
                        "exercises": [
                            {
                                "name": "Romanian Deadlift",
                                "sets": 4,
                                "reps": "8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Bulgarian Split Squats",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Glute Bridges",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Seated Calf Raise",
                                "sets": 3,
                                "reps": "15",
                                "rest": "45 sec"
                            }
                        ]
                    }
                ],
                "5": [
                    {
                        "day": "Day 1",
                        "focus": "Upper Body Volume",
                        "exercises": [
                            {
                                "name": "Incline Barbell Press",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Pull-ups",
                                "sets": 4,
                                "reps": "6-8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Dumbbell Flyes",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Barbell Curl",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Lower Body Power",
                        "exercises": [
                            {
                                "name": "Front Squat",
                                "sets": 4,
                                "reps": "6-8",
                                "rest": "120 sec"
                            },
                            {
                                "name": "Romanian Deadlift",
                                "sets": 4,
                                "reps": "8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Walking Lunges",
                                "sets": 3,
                                "reps": "12 steps",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Calf Press",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Push \u2013 Hypertrophy",
                        "exercises": [
                            {
                                "name": "Overhead Dumbbell Press",
                                "sets": 4,
                                "reps": "10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Incline Dumbbell Flyes",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Triceps Rope Pushdown",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Overhead Cable Extension",
                                "sets": 2,
                                "reps": "15",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 4",
                        "focus": "Pull \u2013 Hypertrophy",
                        "exercises": [
                            {
                                "name": "Barbell Row",
                                "sets": 4,
                                "reps": "10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Seated Cable Row",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "EZ Bar Curl",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Cable Hammer Curl",
                                "sets": 2,
                                "reps": "15",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 5",
                        "focus": "Legs \u2013 Hypertrophy",
                        "exercises": [
                            {
                                "name": "Leg Press",
                                "sets": 4,
                                "reps": "10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Leg Extensions",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Leg Curls",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Standing Calf Raises",
                                "sets": 3,
                                "reps": "15-20",
                                "rest": "60 sec"
                            }
                        ]
                    }
                ],
                "6": [
                    {
                        "day": "Day 1",
                        "focus": "Upper Body A",
                        "exercises": [
                            {
                                "name": "Flat Bench Press",
                                "sets": 4,
                                "reps": "8-10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Lat Pulldown",
                                "sets": 4,
                                "reps": "10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Dumbbell Shoulder Press",
                                "sets": 3,
                                "reps": "10",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 2",
                        "focus": "Lower Body A",
                        "exercises": [
                            {
                                "name": "Back Squat",
                                "sets": 4,
                                "reps": "8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Leg Press",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Seated Calf Raises",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 3",
                        "focus": "Push",
                        "exercises": [
                            {
                                "name": "Incline Bench Press",
                                "sets": 4,
                                "reps": "8",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Cable Chest Fly",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Triceps Pushdown",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 4",
                        "focus": "Pull",
                        "exercises": [
                            {
                                "name": "Barbell Row",
                                "sets": 4,
                                "reps": "10",
                                "rest": "90 sec"
                            },
                            {
                                "name": "Seated Cable Row",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Biceps Curl",
                                "sets": 3,
                                "reps": "12",
                                "rest": "60 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 5",
                        "focus": "Legs",
                        "exercises": [
                            {
                                "name": "Leg Curl",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Leg Extensions",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Walking Lunges",
                                "sets": 3,
                                "reps": "12 steps",
                                "rest": "90 sec"
                            }
                        ]
                    },
                    {
                        "day": "Day 6",
                        "focus": "Full Body Finisher",
                        "exercises": [
                            {
                                "name": "Kettlebell Swings",
                                "sets": 3,
                                "reps": "20",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Burpees",
                                "sets": 3,
                                "reps": "15",
                                "rest": "60 sec"
                            },
                            {
                                "name": "Mountain Climbers",
                                "sets": 3,
                                "reps": "30 sec",
                                "rest": "60 sec"
                            }
                        ]
                    }
                ]
            }
        }

    },
};

export default schoenfeldData;