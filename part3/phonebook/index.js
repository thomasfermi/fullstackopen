const express = require("express");
var morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/info", (request, response) => {
  const line1 = `<p>Phonebook has info for ${persons.length} people.</p>`;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long",
  };
  const currentDate = new Date().toLocaleString("en-GB", options);
  const line2 = `<p>${currentDate}</p>`;
  const html_str = `<html>${line1}\n${line2}</html>`;
  response.send(html_str);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const generateRandomId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

const isPhoneNumber = (input) => {
  const phoneRegex = /^[0-9]+(-[0-9]+)*$/;
  return phoneRegex.test(input);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  if (typeof body.name !== "string" || typeof body.number !== "string") {
    return response.status(400).json({
      error: "Both name and number of the person need to be strings.",
    });
  }
  if (!isPhoneNumber(body.number)) {
    return response.status(400).json({
      error: "Phone number not correctly formatted.",
    });
  }
  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique.",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
