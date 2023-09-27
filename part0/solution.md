# Exercise 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes "something" into the form and clicks save.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note, Payload: note: "something"

    Note left of server: The server stores the note "something"
    activate server
    server-->>browser: Status Code 302, Location: /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document (containing the new note "something")
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

# Exercise 0.5
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file spa.js
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser draws the notes.
```

# Exercise 0.6


```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes "something" into the form and clicks save.
    Note right of browser: The browser stores "something" in "notes" and directly redraws the web page.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, Payload: {content: "something", date: "2023-09-27T12:02:33.053Z" }

    Note left of server: The server stores the note "something"
    activate server
    server-->>browser: Status Code 201 Created, Location: /exampleapp/notes
    deactivate server

    
```
