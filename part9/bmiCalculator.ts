import { parseBmiArguments } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  switch (true) {
    case bmi < 16.0:
      return "Underweight (Severe thinness) ";
    case bmi < 16.9:
      return "Underweight (Moderate thinness) ";
    case bmi < 18.4:
      return "Underweight (Mild thinness) ";
    case bmi < 24.9:
      return "Normal (Healthy Weight)";
    case bmi < 29.9:
      return "Overweight (Pre-obese) ";
    case bmi < 34.9:
      return "Obese (Class I) ";
    case bmi < 39.9:
      return "Obese (Class II)";
    default:
      return "Obese (Class III)";
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
