export function queryChecker(req, res, next) {
  const queriesKey = Object.keys(req.query);
  if (queriesKey.length !== 2) {
    return res.status(400).send("Only two queries allowed.");
  }
  if (!queriesKey.includes("name") || !queriesKey.includes("age")) {
    return res.status(400).send("Only Name and Age are allowed as parameters.");
  }
  next();
}

export function valueChecker(req, res, next) {
  const { name, age } = req.query;
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Name query can't be empty.");
  }
  const ageNumber = Number(age);
  if (!Number.isInteger(ageNumber) || ageNumber <= 0) {
    return res.status(400).send("Age can only be positive and whole.");
  }
  req.cleanedData = {
    name: name.trim(),
    age: ageNumber,
  };
  next();
}

export function dataChecker(req, res, next) {
  const raw = req.query;

  const Normalized = {
    Keys: Object.keys(raw),
    name: raw.name,
    ageNumber: Number(raw.age),
  };

  const rules = [
    {
      Check: (d) => d.Keys.length === 2,
      Error: "Only 2 parameters are allowed",
    },
    {
      Check: (d) => d.Keys.includes("name") && d.Keys.includes("age"),
      Error: "Only Name and Age are allowed as parameters.",
    },
    {
      Check: (d) => typeof d.name === "string" && d.name.trim() !== "",
      Error: "Name can only be of string type.",
    },
    {
      Check: (d) => Number.isInteger(d.ageNumber) && d.ageNumber > 0,
      Error: "Age can only be negative and whole.",
    },
  ];

  for (const rule of rules) {
    if (!rule.Check(Normalized)) {
      return res.status(400).send(rule.Error);
    }
  }
  req.cleanedData = {
    name: Normalized.name.trim(),
    age: Normalized.ageNumber,
  };
  next();
}
