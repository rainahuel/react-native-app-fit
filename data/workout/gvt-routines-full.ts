interface Exercise {
    name: string;
    sets: number;
    reps: number | string; // Allow both number and string for reps (for timed exercises like "60 sec")
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
    beginner: { [days: string]: WorkoutDay[] };
    intermediate: { [days: string]: WorkoutDay[] };
  }
  
  export interface GvtData {
    gvt: {
      buildMuscle: ExperienceLevelData;
    };
  }

const gvtData: GvtData = {
    gvt: {
        buildMuscle: {
            beginner: {
                "4": [
                    {
                        day: "Day 1",
                        focus: "Chest & Back",
                        exercises: [
                            { name: "Bench Press", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Barbell Row", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Incline Dumbbell Flyes", sets: 3, reps: 12, rest: "60 sec" },
                            { name: "Lat Pulldown", sets: 3, reps: 12, rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Legs & Abs",
                        exercises: [
                            { name: "Squat", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Leg Curl", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Calf Raises", sets: 3, reps: 15, rest: "60 sec" },
                            { name: "Plank", sets: 3, reps: "60 sec", rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 4",
                        focus: "Shoulders & Arms",
                        exercises: [
                            { name: "Military Press", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Barbell Curl", sets: 10, reps: 10, rest: "90 sec" },
                            { name: "Lateral Raises", sets: 3, reps: 12, rest: "60 sec" },
                            { name: "Tricep Pushdown", sets: 3, reps: 12, rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 5",
                        focus: "Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 6",
                        focus: "Repeat Day 1 or Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 7",
                        focus: "Rest",
                        exercises: [],
                    },
                ],
            },
            intermediate: {
                "4": [
                    {
                        day: "Day 1",
                        focus: "Chest & Back",
                        exercises: [
                            { name: "Bench Press", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Weighted Chin-Up", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Incline Dumbbell Press", sets: 3, reps: 12, rest: "60 sec" },
                            { name: "Cable Row", sets: 3, reps: 12, rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 2",
                        focus: "Legs & Abs",
                        exercises: [
                            { name: "Front Squat", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Romanian Deadlift", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Calf Raises", sets: 3, reps: 15, rest: "60 sec" },
                            { name: "Hanging Leg Raises", sets: 3, reps: 12, rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 3",
                        focus: "Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 4",
                        focus: "Shoulders & Arms",
                        exercises: [
                            { name: "Military Press", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Close Grip Bench Press", sets: 10, reps: 10, rest: "75 sec" },
                            { name: "Hammer Curl", sets: 3, reps: 12, rest: "60 sec" },
                            { name: "Overhead Tricep Extension", sets: 3, reps: 12, rest: "60 sec" },
                        ],
                    },
                    {
                        day: "Day 5",
                        focus: "Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 6",
                        focus: "Repeat Day 1 or Rest",
                        exercises: [],
                    },
                    {
                        day: "Day 7",
                        focus: "Rest",
                        exercises: [],
                    },
                ],
            },
        },
    },
};

export default gvtData;