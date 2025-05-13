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
  
  type ExperienceLevel = 'beginner';
  type Goal = 'buildMuscle';
  
  interface ExperienceLevelData {
    beginner: { [days: string]: WorkoutDay[] };
  }
  
  export interface PhulData {
    phul: {
      buildMuscle: ExperienceLevelData;
    };
  }
  const phulData: PhulData = {
    "phul": {
      "buildMuscle": {
        "beginner": {
          "4": [
            {
              "day": "Day 1",
              "focus": "Upper Body Power",
              "exercises": [
                {
                  "name": "Barbell Bench Press",
                  "sets": 3,
                  "reps": "3-5",
                  "rest": "2-3 min"
                },
                {
                  "name": "Barbell Row",
                  "sets": 3,
                  "reps": "3-5",
                  "rest": "2-3 min"
                },
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "6-8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Lat Pulldown",
                  "sets": 3,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Barbell Curl",
                  "sets": 2,
                  "reps": "10-12",
                  "rest": "60 sec"
                },
                {
                  "name": "Triceps Pushdown",
                  "sets": 2,
                  "reps": "10-12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Lower Body Power",
              "exercises": [
                {
                  "name": "Squat",
                  "sets": 3,
                  "reps": "3-5",
                  "rest": "2-3 min"
                },
                {
                  "name": "Deadlift",
                  "sets": 2,
                  "reps": "3-5",
                  "rest": "2-3 min"
                },
                {
                  "name": "Leg Press",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Leg Curl",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Standing Calf Raise",
                  "sets": 4,
                  "reps": "12-15",
                  "rest": "60-90 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Upper Body Hypertrophy",
              "exercises": [
                {
                  "name": "Incline Dumbbell Press",
                  "sets": 3,
                  "reps": "8-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Flat Dumbbell Fly",
                  "sets": 3,
                  "reps": "12-15",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Seated Cable Row",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lateral Raise",
                  "sets": 3,
                  "reps": "15",
                  "rest": "60 sec"
                },
                {
                  "name": "EZ Bar Curl",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                },
                {
                  "name": "Overhead Triceps Extension",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Lower Body Hypertrophy",
              "exercises": [
                {
                  "name": "Front Squat",
                  "sets": 3,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Walking Lunges",
                  "sets": 3,
                  "reps": "10-12/leg",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Leg Extension",
                  "sets": 3,
                  "reps": "12-15",
                  "rest": "60 sec"
                },
                {
                  "name": "Seated Calf Raise",
                  "sets": 4,
                  "reps": "15-20",
                  "rest": "60 sec"
                }
              ]
            }
          ]
        }
      }
    }
  };
  
  export default phulData;