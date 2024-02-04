const express = require("express");
const morgan = require("morgan");
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

app.get("/info", (request, response) => {
  PersonModel.find({})
    .then((persons) => {
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
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  PersonModel.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  PersonModel.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
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

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  // TODO: validation

  PersonModel.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};
// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
