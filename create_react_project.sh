#!/bin/bash

# Check if the user provided a project name as a command line argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 <project_name>"
  exit 1
fi

# Extract the project name from the command line argument
project_name=$1

# Create the subfolder if it doesn't exist
mkdir -p "$project_name"

# Execute the npm command with the specified project name
npm create vite@latest "$project_name" -- --template react
