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
  beginner?: { [days: number]: WorkoutDay[] };
  intermediate?: { [days: number]: WorkoutDay[] };
}

export interface HelmsData {
  helms: {
    loseFat?: ExperienceLevelData;
    maintainMuscle?: ExperienceLevelData;
    gainStrength?: ExperienceLevelData;
    buildMuscle?: ExperienceLevelData;
  };
}

const helmsData: HelmsData = {
    helms: {
      loseFat: {
        beginner: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Push Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Bench Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Bent-Over Barbell Row", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Overhead Press", sets: 2, reps: "10-12", rest: "90 sec" },
                { name: "Plank", sets: 3, reps: "30 sec", rest: "60 sec" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Pull Focus",
              exercises: [
                { name: "Deadlift", sets: 2, reps: "5-6", rest: "3 min" },
                { name: "Pull-Up or Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Dumbbell Bench Press", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Walking Lunge", sets: 2, reps: "10 each leg", rest: "90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "12-15", rest: "60 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Leg Focus",
              exercises: [
                { name: "Leg Press", sets: 3, reps: "10-15", rest: "2 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Shoulder Lateral Raise", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "12-15", rest: "60-90 sec" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Lower Body (Strength)",
              focus: "Strength Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Bulgarian Split Squat", sets: 2, reps: "10", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 3, reps: "10-12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 2 - Upper Body (Strength)",
              focus: "Strength Focus",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "8-10", rest: "2 min" },
                { name: "Pull-Up", sets: 2, reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 3 - Lower Body (Hypertrophy)",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Leg Press", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Leg Curl", sets: 3, reps: "12-15", rest: "1-2 min" },
                { name: "Glute Bridge", sets: 3, reps: "10-12", rest: "1-2 min" },
                { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 4 - Upper Body (Hypertrophy)",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Incline Dumbbell Press", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Seated Cable Row", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Lateral Raise", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "12-15", rest: "60-90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 1 - Lower Body A",
              focus: "Squat Strength",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10-12", rest: "1-2 min" },
                { name: "Bulgarian Split Squat", sets: 2, reps: "10", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 3, reps: "8-12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 2 - Upper Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "8-10", rest: "2-3 min" },
                { name: "Pull-Up", sets: 2, reps: "6-8", rest: "2-3 min" }
              ]
            },
            {
              day: "Day 3 - Lower Body B",
              focus: "Deadlift Strength",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Hip Thrust", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Forward Lunge", sets: 2, reps: "10", rest: "90 sec" },
                { name: "Seated Calf Raise", sets: 3, reps: "12-15", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 4 - Upper Body B (Push)",
              focus: "Chest & Shoulders",
              exercises: [
                { name: "Incline Dumbbell Press", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Machine Shoulder Press", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Cable Chest Fly", sets: 2, reps: "12-15", rest: "90 sec" },
                { name: "Lateral Raise", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "12-15", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 5 - Upper Body C (Pull)",
              focus: "Back & Arms",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Face Pull", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "10-15", rest: "60-90 sec" },
                { name: "Hammer Curl", sets: 2, reps: "10-15", rest: "60-90 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 1 - Push A",
              focus: "Bench Strength",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "8-10", rest: "2-3 min" },
                { name: "Chest Fly", sets: 2, reps: "12-15", rest: "90 sec" },
                { name: "Triceps Dips", sets: 2, reps: "8-10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Pull A",
              focus: "Heavy Pull",
              exercises: [
                { name: "Deadlift", sets: 2, reps: "4-6", rest: "3 min" },
                { name: "Barbell Row", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Biceps Curl", sets: 2, reps: "8-10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Legs A",
              focus: "Squat Strength",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Leg Curl", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 2, reps: "10-15", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 4 - Push B",
              focus: "Shoulder Focus",
              exercises: [
                { name: "Overhead Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lateral Raise", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Pull B",
              focus: "Back Focus",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-12", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "12-15", rest: "90 sec" },
                { name: "Hammer Curl", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 6 - Legs B",
              focus: "Leg Volume",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Walking Lunge", sets: 2, reps: "10 each leg", rest: "90 sec" },
                { name: "Seated Calf Raise", sets: 2, reps: "12-15", rest: "60-90 sec" }
              ]
            }
          ]
        },
        intermediate: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Heavy Squat & Bench",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "5", rest: "2-3 min" },
                { name: "Bench Press", sets: 4, reps: "5", rest: "2-3 min" },
                { name: "Pendlay Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Triceps Dips", sets: 3, reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Light/Accessory",
              exercises: [
                { name: "Front Squat", sets: 2, reps: "5 (light)", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Chin-Up", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Intensity Day",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "3", rest: "3 min" },
                { name: "Bench Press", sets: 3, reps: "3", rest: "3 min" },
                { name: "Deadlift", sets: 3, reps: "3", rest: "3-4 min" },
                { name: "Pull-Up", sets: 3, reps: "6", rest: "2-3 min" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Upper Body A",
              focus: "Bench Strength",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Bent-Over Row", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Triceps Pushdown", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Lower Body A",
              focus: "Squat Strength",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 3, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Upper Body B",
              focus: "Overhead Focus",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Biceps Curl", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Lower Body B",
              focus: "Deadlift Focus",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3-5", rest: "3-5 min" },
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Hip Thrust", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Seated Calf Raise", sets: 3, reps: "12-15", rest: "90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 1 - Bench Day",
              focus: "Upper Body Strength",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "3-5", rest: "3-4 min" },
                { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Triceps Dips", sets: 3, reps: "8", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Squat Day",
              focus: "Lower Body Strength",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "3-5", rest: "3-4 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10", rest: "2 min" },
                { name: "Plank", sets: 3, reps: "30 sec", rest: "60 sec" }
              ]
            },
            {
              day: "Day 3 - Deadlift Day",
              focus: "Posterior Chain",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3-4", rest: "3-5 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Biceps Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Press Accessory",
              focus: "Chest & Shoulders",
              exercises: [
                { name: "Incline Bench Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lateral Raise", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Extension", sets: 3, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Pull Accessory",
              focus: "Back & Arms",
              exercises: [
                { name: "Pendlay Row", sets: 4, reps: "5-6", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Hammer Curl", sets: 3, reps: "10-12", rest: "90 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 1 - Legs A",
              focus: "Squat Focus",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10-12", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Push A",
              focus: "Bench Focus",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Overhead Press", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Triceps Dips", sets: 3, reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 3 - Pull A",
              focus: "Deadlift Focus",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "3-5", rest: "3-5 min" },
                { name: "Barbell Row", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "2-3 min" }
              ]
            },
            {
              day: "Day 4 - Legs B",
              focus: "Volume Focus",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Walking Lunge", sets: 2, reps: "8-10 each leg", rest: "90 sec" },
                { name: "Seated Calf Raise", sets: 2, reps: "12-15", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 5 - Push B",
              focus: "Shoulder & Triceps",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "4-6", rest: "3 min" },
                { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lateral Raise", sets: 2, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 6 - Pull B",
              focus: "Back & Biceps",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "12", rest: "90 sec" },
                { name: "Hammer Curl", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            }
          ]
        }
      },
      maintainMuscle: {
        beginner: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Push Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Bench Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "10-12", rest: "2 min" },
                { name: "Triceps Pushdown", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Pull Focus",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Pull-Up", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Dumbbell Row", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Leg Focus",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Lateral Raise", sets: 2, reps: "12-15", rest: "60-90 sec" },
                { name: "Seated Calf Raise", sets: 2, reps: "15", rest: "60-90 sec" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Lower Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5", rest: "2-3 min" },
                { name: "Deadlift", sets: 3, reps: "5", rest: "2-3 min" },
                { name: "Bulgarian Split Squat", sets: 3, reps: "8", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 4, reps: "8-10", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 2 - Upper Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 2, reps: "8", rest: "2-3 min" },
                { name: "Chest Fly", sets: 2, reps: "15", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 3 - Lower Body B",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Hip Thrust", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Leg Extension", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Leg Curl", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Seated Calf Raise", sets: 4, reps: "15", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 4 - Upper Body B",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Machine Chest Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Dumbbell Row", sets: 3, reps: "10", rest: "2 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Lat Pulldown", sets: 3, reps: "12", rest: "2 min" },
                { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "1-2 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "60-90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 1 - Lower Body A",
              focus: "Squat Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10", rest: "1-2 min" },
                { name: "Standing Calf Raise", sets: 4, reps: "10", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 2 - Upper Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5-6", rest: "2-3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "6", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "8", rest: "2-3 min" }
              ]
            },
            {
              day: "Day 3 - Lower Body B",
              focus: "Deadlift Focus",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Leg Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Seated Calf Raise", sets: 4, reps: "12", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 4 - Push Day",
              focus: "Chest & Shoulders",
              exercises: [
                { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Overhead Press", sets: 2, reps: "8-10", rest: "2-3 min" },
                { name: "Lateral Raise", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 5 - Pull Day",
              focus: "Back & Arms",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Biceps Curl", sets: 3, reps: "10-12", rest: "1-2 min" }
              ]
            }
          ],
          6: [
            {
              day: "Day 1 - Push A",
              focus: "Chest Focus",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Cable Chest Fly", sets: 3, reps: "12", rest: "90 sec" },
                { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Pull A",
              focus: "Back Thickness",
              exercises: [
                { name: "Barbell Row", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 2, reps: "12-15", rest: "90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Legs A",
              focus: "Heavy Squat",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "6", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Leg Press", sets: 2, reps: "12", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 2, reps: "12-15", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Push B",
              focus: "Shoulder Focus",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "6", rest: "2-3 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10", rest: "2-3 min" },
                { name: "Lateral Raise", sets: 2, reps: "12", rest: "90 sec" },
                { name: "Dumbbell Skullcrusher", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Pull B",
              focus: "Back Width",
              exercises: [
                { name: "Lat Pulldown", sets: 4, reps: "8-10", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "10", rest: "2-3 min" },
                { name: "Hammer Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 6 - Legs B",
              focus: "Leg Volume",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Extension", sets: 3, reps: "12", rest: "2 min" },
                { name: "Lying Leg Curl", sets: 3, reps: "12", rest: "2 min" },
                { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "90 sec" }
              ]
            }
          ]
        },
        intermediate: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Push Focus",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Bench Press", sets: 4, reps: "6-8", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Triceps Pushdown", sets: 3, reps: "12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Pull Focus",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Chin-Up", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "8-12", rest: "2 min" },
                { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Leg Focus",
              exercises: [
                { name: "Front Squat", sets: 4, reps: "8", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60-90 sec" },
                { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60-90 sec" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Lower Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "5-6", rest: "2-3 min" },
                { name: "Deadlift", sets: 3, reps: "5", rest: "2-3 min" },
                { name: "Bulgarian Split Squat", sets: 3, reps: "8", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 4, reps: "10-12", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 2 - Upper Body A",
              focus: "Strength Focus",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "5-6", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Chest Fly", sets: 2, reps: "15", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 3 - Lower Body B",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Hip Thrust", sets: 3, reps: "10-12", rest: "2-3 min" },
                { name: "Leg Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Leg Extension", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Leg Curl", sets: 3, reps: "12", rest: "1-2 min" },
                { name: "Seated Calf Raise", sets: 4, reps: "15", rest: "1-2 min" }
              ]
            },
            {
              day: "Day 4 - Upper Body B",
              focus: "Hypertrophy Focus",
              exercises: [
                { name: "Machine Chest Press", sets: 3, reps: "10", rest: "2 min" },
                { name: "Barbell Row", sets: 3, reps: "10", rest: "2 min" },
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "2 min" },
                { name: "Lat Pulldown", sets: 3, reps: "12", rest: "2 min" },
                { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "1-2 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "60-90 sec" },
                { name: "Triceps Pushdown", sets: 2, reps: "12", rest: "60-90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 5 - Upper Accessory",
              focus: "Shoulders & Arms",
              exercises: [
                { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
                { name: "Lateral Raise", sets: 3, reps: "12-15", rest: "60 sec" },
                { name: "EZ Bar Curl", sets: 3, reps: "12", rest: "60 sec" },
                { name: "Triceps Extension", sets: 3, reps: "12", rest: "60 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 6 - Lower Accessory + Core",
              focus: "Glutes, Calves & Core",
              exercises: [
                { name: "Hip Thrust", sets: 3, reps: "10-12", rest: "90-120 sec" },
                { name: "Leg Curl", sets: 3, reps: "12", rest: "90 sec" },
                { name: "Standing Calf Raise", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Seated Calf Raise", sets: 3, reps: "15", rest: "60 sec" },
                { name: "Plank", sets: 3, reps: "60 sec", rest: "30-60 sec" }
              ]
            }
          ]    
        }  
      },
      gainStrength: {
        beginner: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Squat & Bench",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5", rest: "3 min" },
                { name: "Bench Press", sets: 3, reps: "5", rest: "3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Triceps Pushdown", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Deadlift & OHP",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5", rest: "3-4 min" },
                { name: "Overhead Press", sets: 3, reps: "5", rest: "3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Walking Lunge", sets: 2, reps: "8 each leg", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Squat & Bench",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5", rest: "3 min" },
                { name: "Bench Press", sets: 3, reps: "5", rest: "3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "5", rest: "3 min" },
                { name: "Biceps Curl", sets: 2, reps: "10", rest: "90 sec" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Upper Body (Strength)",
              focus: "Bench & Row",
              exercises: [
                { name: "Bench Press", sets: 3, reps: "5", rest: "3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "5", rest: "3 min" },
                { name: "Overhead Press", sets: 2, reps: "8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 2, reps: "8", rest: "2-3 min" }
              ]
            },
            {
              day: "Day 2 - Lower Body (Strength)",
              focus: "Squat Focus",
              exercises: [
                { name: "Back Squat", sets: 3, reps: "5", rest: "3 min" },
                { name: "Leg Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Leg Curl", sets: 2, reps: "10", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Upper Body (Volume)",
              focus: "OHP Focus",
              exercises: [
                { name: "Overhead Press", sets: 3, reps: "5", rest: "3 min" },
                { name: "Incline Bench Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "10", rest: "2-3 min" },
                { name: "Biceps Curl", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Lower Body (Volume)",
              focus: "Deadlift Focus",
              exercises: [
                { name: "Deadlift", sets: 3, reps: "5", rest: "3-4 min" },
                { name: "Front Squat", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Hip Thrust", sets: 2, reps: "8", rest: "2-3 min" },
                { name: "Seated Calf Raise", sets: 2, reps: "12", rest: "90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 1 - Bench Heavy",
              focus: "Upper Strength",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "4-5", rest: "3-4 min" },
                { name: "Overhead Press", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Bent-Over Row", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Triceps Dips", sets: 3, reps: "8", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Squat Heavy",
              focus: "Lower Strength",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "4-5", rest: "3-4 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Hanging Leg Raise", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Deadlift Heavy",
              focus: "Posterior Chain",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3", rest: "4-5 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Leg Curl", sets: 3, reps: "8-10", rest: "2 min" },
                { name: "Biceps Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Bench Volume",
              focus: "Chest & Shoulders",
              exercises: [
                { name: "Incline Bench Press", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "3 min" },
                { name: "Lateral Raise", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Extension", sets: 3, reps: "10-12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Accessory Pull",
              focus: "Back & Arms",
              exercises: [
                { name: "Pendlay Row", sets: 4, reps: "5-6", rest: "3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "10", rest: "90 sec" },
                { name: "Hammer Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 1 - Legs A",
              focus: "Squat Heavy",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "5", rest: "3 min" },
                { name: "Leg Curl", sets: 3, reps: "8", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Push A",
              focus: "Bench Heavy",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "5", rest: "3 min" },
                { name: "Overhead Press", sets: 2, reps: "8", rest: "3 min" },
                { name: "Triceps Dips", sets: 2, reps: "8-10", rest: "2 min" }
              ]
            },
            {
              day: "Day 3 - Pull A",
              focus: "Deadlift Heavy",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3-4", rest: "4-5 min" },
                { name: "Barbell Row", sets: 3, reps: "5-6", rest: "3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "3 min" }
              ]
            },
            {
              day: "Day 4 - Legs B",
              focus: "Volume",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Walking Lunge", sets: 2, reps: "8-10 each leg", rest: "2 min" },
                { name: "Seated Calf Raise", sets: 2, reps: "15", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Push B",
              focus: "Overhead Focus",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "5", rest: "3 min" },
                { name: "Incline Bench Press", sets: 3, reps: "8", rest: "3 min" },
                { name: "Triceps Pushdown", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 6 - Pull B",
              focus: "Back Volume",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 2, reps: "12", rest: "90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            }
          ]
        },
        intermediate: {
          3: [
            {
              day: "Day 1 - Full Body A",
              focus: "Squat & Bench",
              exercises: [
                { name: "Back Squat", sets: 5, reps: "5", rest: "3 min" },
                { name: "Bench Press", sets: 5, reps: "5", rest: "3 min" },
                { name: "Bent-Over Row", sets: 5, reps: "5", rest: "3 min" },
                { name: "Pull-Up", sets: 3, reps: "8", rest: "3 min" },
                { name: "Triceps Extension", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Full Body B",
              focus: "Light Day",
              exercises: [
                { name: "Back Squat", sets: 2, reps: "5 (light)", rest: "2-3 min" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Chin-Up", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Biceps Curl", sets: 2, reps: "12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Full Body C",
              focus: "Heavy Singles",
              exercises: [
                { name: "Back Squat", sets: 1, reps: "3", rest: "4-5 min" },
                { name: "Bench Press", sets: 1, reps: "3", rest: "4-5 min" },
                { name: "Deadlift", sets: 1, reps: "3", rest: "4-5 min" }
              ]
            }
          ],
          4: [
            {
              day: "Day 1 - Upper Body A",
              focus: "Bench & Row",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "4-5", rest: "3-4 min" },
                { name: "Bent-Over Row", sets: 4, reps: "4-5", rest: "3-4 min" },
                { name: "Overhead Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "2-3 min" },
                { name: "Face Pull", sets: 2, reps: "12", rest: "90 sec" }
              ]
            },
            {
              day: "Day 2 - Lower Body A",
              focus: "Squat Focus",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "4-6", rest: "3-4 min" },
                { name: "Leg Press", sets: 3, reps: "8", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "10", rest: "2 min" },
                { name: "Standing Calf Raise", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 3 - Upper Body B",
              focus: "Overhead Focus",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "4-6", rest: "3-4 min" },
                { name: "Incline Bench Press", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Biceps Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Lower Body B",
              focus: "Deadlift Focus",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3-4", rest: "4-5 min" },
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Hip Thrust", sets: 2, reps: "8-10", rest: "2-3 min" },
                { name: "Seated Calf Raise", sets: 2, reps: "15", rest: "90 sec" }
              ]
            }
          ],
          5: [
            {
              day: "Day 1 - Bench Day",
              focus: "Bench Heavy",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "3-4", rest: "4-5 min" },
                { name: "Overhead Press", sets: 3, reps: "5-6", rest: "3-4 min" },
                { name: "Barbell Row", sets: 3, reps: "6", rest: "3-4 min" }
              ]
            },
            {
              day: "Day 2 - Squat Day",
              focus: "Squat Heavy",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "3-4", rest: "4-5 min" },
                { name: "Leg Press", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Leg Curl", sets: 3, reps: "8-10", rest: "2-3 min" }
              ]
            },
            {
              day: "Day 3 - Deadlift Day",
              focus: "Deadlift Heavy",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3", rest: "4-5 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Leg Curl", sets: 2, reps: "10", rest: "2 min" },
                { name: "Biceps Curl", sets: 2, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 4 - Bench Accessory",
              focus: "Chest & Shoulders",
              exercises: [
                { name: "Incline Bench Press", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Overhead Press", sets: 2, reps: "8-10", rest: "3 min" },
                { name: "Lateral Raise", sets: 3, reps: "10-12", rest: "90 sec" },
                { name: "Triceps Extension", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Pull Accessory",
              focus: "Back & Arms",
              exercises: [
                { name: "Chest-Supported Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 3, reps: "12", rest: "90 sec" },
                { name: "Hammer Curl", sets: 3, reps: "10", rest: "90 sec" }
              ]
            }
          ],
          6: [
            {
              day: "Day 1 - Legs A",
              focus: "Squat Heavy",
              exercises: [
                { name: "Back Squat", sets: 4, reps: "5", rest: "3-4 min" },
                { name: "Leg Curl", sets: 3, reps: "8", rest: "2 min" }
              ]
            },
            {
              day: "Day 2 - Push A",
              focus: "Bench Heavy",
              exercises: [
                { name: "Bench Press", sets: 4, reps: "5", rest: "3-4 min" },
                { name: "Dumbbell Overhead Press", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Triceps Dips", sets: 3, reps: "8", rest: "2 min" }
              ]
            },
            {
              day: "Day 3 - Pull A",
              focus: "Deadlift Heavy",
              exercises: [
                { name: "Deadlift", sets: 4, reps: "3-4", rest: "4-5 min" },
                { name: "Barbell Row", sets: 3, reps: "5-6", rest: "3-4 min" },
                { name: "Pull-Up", sets: 3, reps: "6-8", rest: "3-4 min" }
              ]
            },
            {
              day: "Day 4 - Legs B",
              focus: "Accessory Volume",
              exercises: [
                { name: "Front Squat", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: "3 min" },
                { name: "Walking Lunge", sets: 2, reps: "8-10 each leg", rest: "2 min" },
                { name: "Seated Calf Raise", sets: 2, reps: "15", rest: "90 sec" }
              ]
            },
            {
              day: "Day 5 - Push B",
              focus: "Overhead Focus",
              exercises: [
                { name: "Overhead Press", sets: 4, reps: "5", rest: "3-4 min" },
                { name: "Incline Bench Press", sets: 3, reps: "8", rest: "3 min" },
                { name: "Triceps Pushdown", sets: 3, reps: "10", rest: "90 sec" }
              ]
            },
            {
              day: "Day 6 - Pull B",
              focus: "Back Volume",
              exercises: [
                { name: "Seated Cable Row", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Lat Pulldown", sets: 3, reps: "8-10", rest: "2-3 min" },
                { name: "Face Pull", sets: 2, reps: "12", rest: "90 sec" },
                { name: "Biceps Curl", sets: 2, reps: "10-12", rest: "90 sec" }
              ]
            }
          ]
        }
      },
      buildMuscle: {
        beginner: {
          "3": [
            {
              "day": "Day 1",
              "focus": "Full Body A",
              "exercises": [
                {
                  "name": "Barbell Squat",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Bench Press",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Barbell Row",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Crunches",
                  "sets": 3,
                  "reps": "15-20",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Full Body B",
              "exercises": [
                {
                  "name": "Leg Press",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lat Pulldown",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Plank",
                  "sets": 3,
                  "reps": "30 sec",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Full Body C",
              "exercises": [
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Incline Dumbbell Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Seated Cable Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Leg Raises",
                  "sets": 3,
                  "reps": "15",
                  "rest": "30-60 sec"
                }
              ]
            }
          ],
          "4": [
            {
              "day": "Day 1",
              "focus": "Upper A",
              "exercises": [
                {
                  "name": "Bench Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Barbell Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lateral Raise",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Lower A",
              "exercises": [
                {
                  "name": "Barbell Squat",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Calf Raise",
                  "sets": 2,
                  "reps": "15",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Upper B",
              "exercises": [
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lat Pulldown",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Dumbbell Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Lower B",
              "exercises": [
                {
                  "name": "Leg Press",
                  "sets": 3,
                  "reps": "12",
                  "rest": "90 sec"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Crunches",
                  "sets": 3,
                  "reps": "20",
                  "rest": "30-60 sec"
                }
              ]
            }
          ],
          "5": [
            {
              "day": "Day 1",
              "focus": "Push",
              "exercises": [
                {
                  "name": "Bench Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 2,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lateral Raise",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Pull",
              "exercises": [
                {
                  "name": "Barbell Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lat Pulldown",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Dumbbell Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Legs",
              "exercises": [
                {
                  "name": "Barbell Squat",
                  "sets": 3,
                  "reps": "12",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg Curl",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Calf Raise",
                  "sets": 2,
                  "reps": "15",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Upper",
              "exercises": [
                {
                  "name": "Incline Dumbbell Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Seated Cable Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Dumbbell Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Lower",
              "exercises": [
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg Press",
                  "sets": 3,
                  "reps": "12",
                  "rest": "90 sec"
                },
                {
                  "name": "Crunches",
                  "sets": 3,
                  "reps": "20",
                  "rest": "30-60 sec"
                }
              ]
            }
          ],
          "6": [
            {
              "day": "Day 1",
              "focus": "Push A",
              "exercises": [
                {
                  "name": "Bench Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 2,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Triceps Pushdown",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Pull A",
              "exercises": [
                {
                  "name": "Barbell Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lat Pulldown",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Hammer Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Legs A",
              "exercises": [
                {
                  "name": "Barbell Squat",
                  "sets": 3,
                  "reps": "12",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg Curl",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Calf Raise",
                  "sets": 2,
                  "reps": "15",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Push B",
              "exercises": [
                {
                  "name": "Incline Dumbbell Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Lateral Raise",
                  "sets": 3,
                  "reps": "12",
                  "rest": "30-60 sec"
                },
                {
                  "name": "Triceps Dips",
                  "sets": 2,
                  "reps": "10",
                  "rest": "60-90 sec"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Pull B",
              "exercises": [
                {
                  "name": "Seated Cable Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Face Pull",
                  "sets": 3,
                  "reps": "15",
                  "rest": "30-60 sec"
                },
                {
                  "name": "Dumbbell Curl",
                  "sets": 2,
                  "reps": "12",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 6",
              "focus": "Legs B",
              "exercises": [
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg Press",
                  "sets": 3,
                  "reps": "12",
                  "rest": "90 sec"
                },
                {
                  "name": "Crunches",
                  "sets": 3,
                  "reps": "20",
                  "rest": "30-60 sec"
                }
              ]
            }
          ]
        },
        "intermediate": {
          "3": [
            {
              "day": "Day 1",
              "focus": "Upper Body",
              "exercises": [
                {
                  "name": "Incline Barbell Press",
                  "sets": 4,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Pull-ups",
                  "sets": 4,
                  "reps": "6-8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Overhead Dumbbell Press",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "EZ Bar Curl",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Lower Body",
              "exercises": [
                {
                  "name": "Front Squat",
                  "sets": 4,
                  "reps": "8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Walking Lunges",
                  "sets": 3,
                  "reps": "12/leg",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Standing Calf Raises",
                  "sets": 3,
                  "reps": "12-15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Full Body",
              "exercises": [
                {
                  "name": "Deadlift",
                  "sets": 3,
                  "reps": "6",
                  "rest": "2-3 min"
                },
                {
                  "name": "Dips",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Chin-ups",
                  "sets": 3,
                  "reps": "8-10",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Plank",
                  "sets": 3,
                  "reps": "60 sec",
                  "rest": "30-60 sec"
                }
              ]
            }
          ],
          "4": [
            {
              "day": "Day 1",
              "focus": "Upper A",
              "exercises": [
                {
                  "name": "Incline Barbell Press",
                  "sets": 4,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Pull-ups",
                  "sets": 4,
                  "reps": "6-8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "EZ Bar Curl",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Lower A",
              "exercises": [
                {
                  "name": "Front Squat",
                  "sets": 4,
                  "reps": "8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Standing Calf Raises",
                  "sets": 3,
                  "reps": "12-15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Upper B",
              "exercises": [
                {
                  "name": "Flat Dumbbell Press",
                  "sets": 4,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Barbell Row",
                  "sets": 4,
                  "reps": "8-10",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Overhead Dumbbell Press",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60-90 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Lower B",
              "exercises": [
                {
                  "name": "Deadlift",
                  "sets": 3,
                  "reps": "6",
                  "rest": "2-3 min"
                },
                {
                  "name": "Walking Lunges",
                  "sets": 3,
                  "reps": "12/leg",
                  "rest": "60-90 sec"
                },
                {
                  "name": "Seated Calf Raises",
                  "sets": 3,
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            }
          ],
          "5": [
            {
              "day": "Day 1",
              "focus": "Push",
              "exercises": [
                {
                  "name": "Incline Barbell Press",
                  "sets": 4,
                  "reps": "8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral Raises",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Pull",
              "exercises": [
                {
                  "name": "Barbell Row",
                  "sets": 4,
                  "reps": "8",
                  "rest": "90-120 sec"
                },
                {
                  "name": "Chin-ups",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Face Pulls",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Legs",
              "exercises": [
                {
                  "name": "Back Squat",
                  "sets": 4,
                  "reps": "8",
                  "rest": "2 min"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Walking Lunges",
                  "sets": 3,
                  "reps": "12/leg",
                  "rest": "60-90 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Arms + Core",
              "exercises": [
                {
                  "name": "EZ Bar Curl",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                },
                {
                  "name": "Skullcrushers",
                  "sets": 3,
                  "reps": "10-12",
                  "rest": "60 sec"
                },
                {
                  "name": "Crunches",
                  "sets": 3,
                  "reps": "20",
                  "rest": "30-60 sec"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Full Body",
              "exercises": [
                {
                  "name": "Deadlift",
                  "sets": 3,
                  "reps": "5",
                  "rest": "2-3 min"
                },
                {
                  "name": "Dips",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Seated Cable Row",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60-90 sec"
                }
              ]
            }
          ],
          "6": [
            {
              "day": "Day 1",
              "focus": "Push A",
              "exercises": [
                {
                  "name": "Incline Dumbbell Press",
                  "sets": 4,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral Raises",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "8",
                  "rest": "90 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Pull A",
              "exercises": [
                {
                  "name": "Pull-ups",
                  "sets": 4,
                  "reps": "8-10",
                  "rest": "90 sec"
                },
                {
                  "name": "Barbell Row",
                  "sets": 4,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "EZ Bar Curl",
                  "sets": 3,
                  "reps": "10",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Legs A",
              "exercises": [
                {
                  "name": "Back Squat",
                  "sets": 4,
                  "reps": "8",
                  "rest": "2 min"
                },
                {
                  "name": "Walking Lunges",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Standing Calf Raise",
                  "sets": 3,
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Push B",
              "exercises": [
                {
                  "name": "Flat Bench Press",
                  "sets": 4,
                  "reps": "8",
                  "rest": "90 sec"
                },
                {
                  "name": "Overhead Press",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
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
              "day": "Day 5",
              "focus": "Pull B",
              "exercises": [
                {
                  "name": "Deadlift",
                  "sets": 3,
                  "reps": "5",
                  "rest": "3 min"
                },
                {
                  "name": "Face Pull",
                  "sets": 3,
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Chin-ups",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                }
              ]
            },
            {
              "day": "Day 6",
              "focus": "Legs B + Core",
              "exercises": [
                {
                  "name": "Front Squat",
                  "sets": 3,
                  "reps": "8",
                  "rest": "2 min"
                },
                {
                  "name": "Romanian Deadlift",
                  "sets": 3,
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Hanging Leg Raises",
                  "sets": 3,
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            }
          ]
        }
      }
    }
  };
  
  export default helmsData;

  