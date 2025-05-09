# Ask Interviewers

Goal: To help you understand the work environment, culture, and ethics of a potential employer.

Components:

-   A structured questions file
-   A library to integrate these questions into your application
-   A CLI tool
-   A self-hostable client/server application

## Documentation

-   [tsconfig README](tsconfig.README.md)
-   [articles mentioned in questions.ts](articles.md)

## Development

```bash
cd src
# chmod u+x ./generate-certs.sh
./generate-certs.sh

# for building source code
npm run build
# link for cli app
npm link

```

## cli: ask_questions | aski | ask_interviewers

A CLI tool for interview questions that helps you prepare for technical interviews by providing a curated list of questions to ask interviewers.

### Requirements

-   Node.js version 24+
    -   `--experimental-transform-types` needs to be supported.

### Installation

```bash
npm install
npm run build
npm run dev

# Install globally
npm link
```

### Usage

```bash
# Show all questions
ask_questions

# Filter by priority (Top, High, Mid, Low, No, unassigned)
ask_questions --priority High

# Filter by tags
ask_questions --tags culture process

# Filter by who (engineer, manager, executive, hr)
ask_questions --who engineer

# Combine filters
ask_questions --priority High --tags culture --who engineer

# Disable colored output
ask_questions --no-color
```

### Features

-   Questions are automatically sorted by priority (Top > High > Mid > Low > No > unassigned)
-   Color-coded output for better readability
-   Filter questions by:
    -   Priority
    -   Tags (#process, #culture, #people, #technical, #management, #hiring, #issues, #feedback)
    -   Who (#engineer, #manager, #executive, #hr)

### Build

```bash
npm run build
# Output files will be in `/src/cli/dist`
```

## Inspirations

-   [doctorj/interview-questions](https://gitlab.com/doctorj/interview-questions)
    -   A nine year old project on GitLab. CC SA 4.0
-   Panick when interviewers ask "Do you have any questions for me?" and then I scramble to make stuff up.
-   Past experiences.

## License

MIT License | [LICENSE](LICENSE)

Copyright (c) 2025 Anubhav Saini
