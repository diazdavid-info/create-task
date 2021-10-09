const inquirer = require('inquirer')
const fetch = require('node-fetch')

const JiraTaskProvider = require('../../src/task/infrastructure/repository/jira-task-provider')(fetch, process.env.DOMAIN_JIRA, process.env.AUTHORIZATION_JIRA)
const FinderInProgressTasks = require('../../src/task/application/searcher-in-progress-tasks')(JiraTaskProvider)
const { formatBranchName } = require('../../src/shared/infrastructure/format-branch-name')

const ListTasksInProgressAction = () => {
  const secondAnswers = {
    type: 'list',
    name: 'tasks',
    message: 'What is it your task?',
  }

  const getInProgressTasks = async () => {
    const choices = []
    const issues = await FinderInProgressTasks.find()

    issues.forEach((issue) => {
      choices.push(`${issue.id}; ${issue.name}; ${issue.type}; ${issue.url}`)
    })

    if (choices.length === 0) {
      choices.push('No hay tareas')
    }
    return choices
  }

  const action = async () => {
    secondAnswers.choices = await getInProgressTasks()
    const { tasks } = await inquirer.prompt(secondAnswers)
    return formatBranchName(tasks)
  }

  return {
    action,
  }
}

module.exports = ListTasksInProgressAction
