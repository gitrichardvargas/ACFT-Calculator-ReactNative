import ACFTDATA from '../Data/ACFTDATA'
class SoldierScoreACFT {
    constructor(rank, lastName, firstName, age, gender, dl, spt, hrp, sdc, plk, cardio, altCardio = null) {
      // error handling 
      if (typeof rank !== "string") throw new Error("Rank must be a string");
      if (typeof lastName !== "string") throw new Error("Last name must be a string");
      if (typeof firstName !== "string") throw new Error("First name must be a string");
      if (typeof age !== "number" || !Number.isInteger(age)) throw new Error("Age must be an integer");
      if (!["male", "female"].includes(gender)) throw new Error("Gender must be 'male' or 'female'");
      if (typeof dl !== "number") throw new Error("Deadlift must be a number");
      if (typeof spt !== "number") throw new Error("Standing power throw must be a number");
      if (typeof hrp !== "number") throw new Error("Hand release pushups must be a number");
      if (typeof sdc !== "number") throw new Error("Sprint drag carry must be a number");
      if (typeof plk !== "number") throw new Error("Plank must be a number");
      if (typeof cardio !== "number") throw new Error("Cardio time must be a number");
  
      const validAltCardio = [null, "swim", "row", "bike", "walk"];
      if (!validAltCardio.includes(altCardio)) {
        throw new Error("Invalid alternate cardio option. Must be one of: null, 'swim', 'row', 'bike', 'walk'");
      }
  
      // finding the correct age bracket for an individual 
      const ageScales = [17, 22, 27, 32, 37, 42, 47, 52, 57, 62];
      let scaledAge = ageScales[0];
      for (let i = 0; i < ageScales.length; i++) {
        if (age >= ageScales[i]) scaledAge = ageScales[i];
      }
      if (age >= ageScales[ageScales.length - 1]) scaledAge = ageScales[ageScales.length - 1];
  
      this.age = String(scaledAge); // Match JSON data format
      this.rank = rank;
      this.lastName = lastName;
      this.firstName = firstName;
      this.gender = gender;
      this.dl = dl;
      this.spt = spt;
      this.hrp = hrp;
      this.sdc = sdc;
      this.plk = plk;
      this.cardio = cardio;
      this.altCardio = altCardio;
    }
  
    getACFTEventScore(raw, gender, age, event, increasing = true) {
      const correctAgeGenderScale = ACFTDATA[gender][age][event];
      let pts = 0;
  
      for (const d of correctAgeGenderScale) {
        if ((increasing && d.raw <= raw) || (!increasing && d.raw >= raw)) {
          pts = d.points;
        }
      }
  
      return pts;
    }
  
    getIndividualScores() {
      const events = {
        deadlift: [this.dl, true],
        "standing power throw": [this.spt, true],
        "hand release pushups": [this.hrp, true],
        "sprint drag carry": [this.sdc, false],
        plank: [this.plk, true],
      };
  
      const scores = {};
      for (const [event, [raw, increasing]] of Object.entries(events)) {
        scores[event] = this.getACFTEventScore(raw, this.gender, this.age, event, increasing);
      }
  
      const cardioEvent = this.altCardio || "two mile run";
      scores[cardioEvent] = this.getACFTEventScore(this.cardio, this.gender, this.age, cardioEvent, false);
  
      return scores;
    }
  
    getTotalScore() {
      return Object.values(this.getIndividualScores()).reduce((a, b) => a + b, 0);
    }
  }
  

class SoldierSimpleACFT extends SoldierScoreACFT {
    constructor(age, gender, dl, spt, hrp, sdc, plk, cardio) {
        // Call the parent class constructor
        super(
            "N/A",            // Rank not required for the simplified class
            "N/A",            // Last name not required for the simplified class
            "N/A",            // First name not required for the simplified class
            age,
            gender,
            dl,
            spt,
            hrp,
            sdc,
            plk,
            cardio
        );
    }
}

// this is the version that will be used during stages 2 and 3
const soldier = new SoldierScoreACFT("2LT", "Vargas", "Richard", 30, "male", 280, 9.4, 47, 131, 300, 1343);
// this is perfectly fine for stage 1
const simpleJack = new SoldierSimpleACFT(23, "male", 500, 15, 43, 210, 400, 1800) // only score values 
// alert(soldier.getIndividualScores()); // { deadlift: ..., ... }
// alert(soldier.getTotalScore()); // Total score

