const inquirer = require('inquirer')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const JiraTaskProvider = require('../../src/task/infrastructure/repository/jira-task-provider')(process.env.DOMAIN_JIRA, process.env.AUTHORIZATION_JIRA)
const FinderToReviewTasks = require('../../src/task/application/searcher-to-review-tasks')(JiraTaskProvider)
const { formatBranchName } = require('../../src/shared/infrastructure/format-branch-name')

const ReviewTasksAction = () => {
  const secondAnswers = {
    type: 'list',
    name: 'tasks',
    message: 'What is it your task?',
  }

  const getInProgressReviewTasks = async () => {
    const choices = []
    const issues = await FinderToReviewTasks.find()

    issues.forEach((issue) => {
      choices.push(`${issue.id}; ${issue.name}; ${issue.type}; ${issue.url}`)
    })

    if (choices.length === 0) {
      choices.push('No hay tareas')
    }
    return choices
  }

  const action = async () => {
    secondAnswers.choices = await getInProgressReviewTasks()
    const { tasks } = await inquirer.prompt(secondAnswers)
    const branch = await formatBranchName(tasks)
    const {
      error,
      stdout,
      stderr,
    } = await exec(`git checkout ${branch}`)
    return `${stdout} ${stderr} ${error}`
  }

  return {
    action,
  }
}

module.exports = ReviewTasksAction
