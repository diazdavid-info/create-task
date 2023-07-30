const inquirer = require('inquirer')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fetch = require('node-fetch')

const JiraTaskProvider = require('../../src/task/infrastructure/repository/jira-task-provider')(fetch, process.env.DOMAIN_JIRA, process.env.AUTHORIZATION_JIRA)
const FinderInProgressTasks = require('../../src/task/application/searcher-in-progress-tasks')(JiraTaskProvider)
const { formatBranchName } = require('../../src/shared/infrastructure/format-branch-name')

const CreateBranchAction = () => {
  const secondAnswers = {
    type: 'list',
    name: 'tasks',
    message: 'What task do you want to start?',
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
    const branch = await formatBranchName(tasks)
    await exec('git fetch')
    const {
      error,
      stdout,
      stderr,
    } = await exec(`git switch -c ${branch}`)
    return `${stdout} ${stderr} ${error}`
  }

  return {
    action,
  }
}

module.exports = CreateBranchAction
