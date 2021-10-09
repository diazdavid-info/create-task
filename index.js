#!/usr/bin/env node

const inquirer = require('inquirer')
require('dotenv')
  .config({ path: `${__dirname}/.env` })

const CreateBranchAction = require('./app/actions/create-branch-action')()
const ListTasksInProgressAction = require('./app/actions/list-tasks-in-progress-action')()
const ReviewTasksAction = require('./app/actions/review-tasks-action')()

const firstAnswers = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    'Create branch',
    'List Task In Progress',
    'Review',
  ],
};

(async function () {
  const { action } = await inquirer.prompt(firstAnswers)
  if (action === 'Create branch') {
    const result = await CreateBranchAction.action()
    console.log(result)
  } else if (action === 'List Task In Progress') {
    const result = await ListTasksInProgressAction.action()
    console.log(result)
  } else if (action === 'Review') {
    const result = await ReviewTasksAction.action()
    console.log(result)
  }
}())
