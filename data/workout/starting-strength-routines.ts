interface Exercise {
    name: string;
    sets: string;
    reps: string;
    rest: string;
  }
  
  interface WorkoutDay {
    day: string;
    focus: string;
    exercises: Exercise[];
  }
  
  type ExperienceLevel = 'beginner' | 'intermediate';
  type Goal = 'gainStrength' | 'buildMuscle';
  
  interface ExperienceLevelData {
    beginner: { [days: number]: WorkoutDay[] };
    intermediate: { [days: number]: WorkoutDay[] };
  }
  
  export interface StartingStrengthData {
    startingStrength: {
      gainStrength: ExperienceLevelData;
      buildMuscle: ExperienceLevelData;
    };
  }

const startingStrengthData: StartingStrengthData = {
    startingStrength: {
      gainStrength: {
        beginner: {
          3: [
            {
              day: "Day 1 (Workout A)",
              focus: "Strength - Squat, Press, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Overhead Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Deadlift", sets: "1", reps: "5", rest: "3-5 min" }
              ]
            },
            {
              day: "Day 2 (Workout B)",
              focus: "Strength - Squat, Bench Press, Power Clean",
              exercises: [
                { name: "Squat", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Bench Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Power Clean", sets: "5", reps: "3", rest: "3 min" }
              ]
            },
            {
              day: "Day 3 (Workout A)",
              focus: "Strength - Squat, Press, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Overhead Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Deadlift", sets: "1", reps: "5", rest: "3-5 min" }
              ]
            }
          ]
        },
        intermediate: {
          3: [
            {
              day: "Day 1 (Workout A)",
              focus: "Strength & Volume - Squat, Bench Press, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Bench Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Deadlift", sets: "1", reps: "5", rest: "3-5 min" }
              ]
            },
            {
              day: "Day 2 (Workout B - Light day)",
              focus: "Strength & Technique - Light Squat, Press, Power Clean",
              exercises: [
                { name: "Squat (light -80%)", sets: "3", reps: "5", rest: "3 min" },
                { name: "Overhead Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Power Clean", sets: "5", reps: "3", rest: "3 min" }
              ]
            },
            {
              day: "Day 3 (Workout C)",
              focus: "Strength & Intensity - Squat, Bench Press, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Bench Press", sets: "3", reps: "5", rest: "3-5 min" },
                { name: "Deadlift", sets: "1", reps: "5", rest: "3-5 min" }
              ]
            }
          ]
        }
      },
      buildMuscle: {
        beginner: {
          3: [
            {
              day: "Day 1 (Workout A)",
              focus: "Strength & Hypertrophy - Squat, Bench, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Bench Press", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Deadlift", sets: "2", reps: "6-8", rest: "3 min" }
              ]
            },
            {
              day: "Day 2 (Workout B)",
              focus: "Strength & Hypertrophy - Squat, Overhead Press, Rows",
              exercises: [
                { name: "Squat", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Overhead Press", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Barbell Rows", sets: "3", reps: "6-8", rest: "3 min" }
              ]
            },
            {
              day: "Day 3 (Workout A)",
              focus: "Strength & Hypertrophy - Squat, Bench, Deadlift",
              exercises: [
                { name: "Squat", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Bench Press", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Deadlift", sets: "2", reps: "6-8", rest: "3 min" }
              ]
            }
          ]
        },
        intermediate: {
          3: [
            {
              day: "Day 1 (Workout A)",
              focus: "Strength & Hypertrophy - Squat, Bench, Deadlift, Accessories",
              exercises: [
                { name: "Squat", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Bench Press", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Deadlift", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Chin-Ups", sets: "3", reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 (Workout B - Light)",
              focus: "Technique & Recovery - Light Squat, Press, Power Clean",
              exercises: [
                { name: "Squat (light -80%)", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Overhead Press", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Power Clean", sets: "5", reps: "3", rest: "3 min" },
                { name: "Dips", sets: "3", reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 3 (Workout C)",
              focus: "Strength & Hypertrophy - Squat, Bench, Deadlift, Accessories",
              exercises: [
                { name: "Squat", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Bench Press", sets: "4", reps: "6-8", rest: "3 min" },
                { name: "Deadlift", sets: "3", reps: "6-8", rest: "3 min" },
                { name: "Barbell Rows", sets: "3", reps: "8-10", rest: "2 min" }
              ]
            }
          ]
        }
      }
    }
  };
  
  export default startingStrengthData;
  