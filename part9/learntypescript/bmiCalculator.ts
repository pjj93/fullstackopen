export const calculateBmi = (height: number, weight: number): string => {
  let h: number = height / 100;
  let bmi: number = weight / (h * h)
  if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight"
  } else {
    return "Obese"
  }
}