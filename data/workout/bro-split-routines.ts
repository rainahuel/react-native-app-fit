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

  export interface BroSplitData {
    broSplit: {
      buildMuscle: ExperienceLevelData;
    };
  }
  
  const broSplitData: BroSplitData = {
    broSplit: {
      buildMuscle: {
        beginner: {
          5: [
            {
              day: "Day 1 - Chest",
              focus: "Pectoral Hypertrophy",
              exercises: [
                { name: "Flat Barbell Bench Press", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60-90 sec" },
                { name: "Push-Ups", sets: 2, reps: "15-20", rest: "60 sec" }
              ]
            },
            {
              day: "Day 2 - Back",
              focus: "Back Thickness & Width",
              exercises: [
                { name: "Pull-Up or Lat Pulldown", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Barbell Row", sets: 3, reps: "8-10", rest: "90 sec" },
                { name: "Face Pull", sets: 2, reps: "15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 3 - Legs",
              focus: "Quad, Hamstring & Glute",
              exercises: [
                { name: "Barbell Back Squat", sets: 4, reps: "8", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min" },
                { name: "Walking Lunge", sets: 2, reps: "12 each leg", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 4 - Shoulders",
              focus: "Deltoid Development",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "Rear Delt Fly", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "Shrugs", sets: 2, reps: "15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 5 - Arms",
              focus: "Biceps & Triceps",
              exercises: [
                { name: "EZ Bar Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Pushdown", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Dumbbell Hammer Curl", sets: 2, reps: "12", rest: "60 sec" },
                { name: "Overhead Triceps Extension", sets: 2, reps: "12", rest: "60 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 6 - Optional Core + Cardio",
              focus: "Abdominals & Conditioning",
              exercises: [
                { name: "Hanging Leg Raise", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Plank", sets: 3, reps: "60 sec", rest: "60 sec" },
                { name: "Russian Twist", sets: 3, reps: "20", rest: "30-60 sec" },
                { name: "Optional: 20 min Low-Intensity Cardio", sets: 1, reps: "20 min", rest: "-" }
              ]
            }
          ]
        },
        intermediate: {
          5: [
            {
              day: "Day 1 - Chest",
              focus: "Chest Hypertrophy",
              exercises: [
                { name: "Incline Barbell Press", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Flat Dumbbell Press", sets: 4, reps: "10", rest: "90 sec" },
                { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "Push-Ups (Weighted or AMRAP)", sets: 2, reps: "15-20", rest: "60 sec" }
              ]
            },
            {
              day: "Day 2 - Back",
              focus: "Lat Width & Mid Back Thickness",
              exercises: [
                { name: "Pull-Ups (Weighted if possible)", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Barbell Row", sets: 4, reps: "8-10", rest: "2 min" },
                { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Face Pull", sets: 3, reps: "15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 3 - Legs",
              focus: "Strength & Volume",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2 min" },
                { name: "Walking Lunge", sets: 3, reps: "12 each leg", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 3, reps: "15-20", rest: "60 sec" }
              ]
            },
            {
              day: "Day 4 - Shoulders",
              focus: "All Deltoid Heads",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "8", rest: "2 min" },
                { name: "Lateral Raise", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Rear Delt Fly", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Shrugs", sets: 3, reps: "12-15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 5 - Arms",
              focus: "Biceps & Triceps Isolation",
              exercises: [
                { name: "EZ Bar Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Skullcrushers", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Incline Dumbbell Curl", sets: 2, reps: "12", rest: "60 sec" },
                { name: "Overhead Triceps Extension", sets: 2, reps: "12", rest: "60 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 6 - Core + Optional Cardio",
              focus: "Abdominals & Conditioning",
              exercises: [
                { name: "Hanging Leg Raise", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Weighted Plank", sets: 3, reps: "45-60 sec", rest: "60 sec" },
                { name: "Cable Woodchopper", sets: 3, reps: "12 each side", rest: "60 sec" },
                { name: "Optional: 20–30 min Moderate Cardio", sets: 1, reps: "20-30 min", rest: "-" }
              ]
            }
          ]
        }
      }
    }
  };
  
  export default broSplitData;