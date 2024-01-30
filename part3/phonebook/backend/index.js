const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PersonModel = require("./models/person");

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

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
  PersonModel.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  PersonModel.findById(request.params.id).then((person) => {
    response.json(person);
  });
  // TODO: error handling?
});

app.delete("/api/persons/:id", (request, response, next) => {
  console.log("deleting");
  PersonModel.deleteOne({ _id: request.params.id })
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const isPhoneNumber = (input) => {
  const phoneRegex = /^[0-9]+(-[0-9]+)*$/;
  return phoneRegex.test(input);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
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

  const person = new PersonModel({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
