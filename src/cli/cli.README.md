# cli: ask_questions

A CLI tool for interview questions that helps you prepare for technical interviews by providing a curated list of questions to ask interviewers.

## Requirements

-   Node.js version 24+
    -   `--experimental-transform-types` needs to be supported.

## Installation

```bash
npm install
npm run dev

# Install globally
npm link
```

## Usage

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

## Features

- Questions are automatically sorted by priority (Top > High > Mid > Low > No > unassigned)
- Color-coded output for better readability
- Filter questions by:
  - Priority
  - Tags (#process, #culture, #people, #technical, #management, #hiring, #issues, #feedback)
  - Who (#engineer, #manager, #executive, #hr)

## Build

```bash
npm run build
# Output files will be in `/src/cli/dist`
```
