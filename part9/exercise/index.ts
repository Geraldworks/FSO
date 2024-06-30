import { calculateExercises } from "./exerciseCalculator";
import { calculateBmi } from "./bmiCalculator";
import { parseBmiQueryParams } from "./utils";
import express from "express";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (
    typeof height !== "string" ||
    typeof weight !== "string" ||
    height === "" ||
    weight === ""
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const measurementObj = parseBmiQueryParams(weight, height);
    const bmiMessage = calculateBmi(
      measurementObj.height,
      measurementObj.weight
    );
    return res.status(200).json({
      height: measurementObj.height,
      weight: measurementObj.weight,
      bmi: bmiMessage,
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    Array.isArray(daily_exercises) &&
    daily_exercises.every((num) => typeof num === "number") &&
    typeof target === "number"
  ) {
    return res
      .status(201)
      .json(calculateExercises(daily_exercises as number[], target));
  } else {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
