#!/usr/bin/env node

const inquirer = require('inquirer')
require('dotenv')
  .config({ path: `${__dirname}/.env` })

const CreateBranchAction = require('./app/actions/create-branch-action')()

const firstAnswers = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    'Create branch',
  ],
}

const main = async () => {
  const { action } = await inquirer.prompt(firstAnswers)
  if (action === 'Create branch') {
    return CreateBranchAction.action()
  }

  return Promise.reject(new Error('Action not found'))
}

main()
  .then(console.log)
  .catch(console.error)
