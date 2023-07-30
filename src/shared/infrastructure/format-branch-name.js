const clearName = (name) => name?.trim()
  .normalize('NFD')
  .replace(/\[.*]\s/, '')
  .replace(/\+\s/, '')
  .replace(/-\s/, '')
  .replace(/\./, '')
  .replace(/\s/g, '-')
  .replace(/:/g, '')
  .replace(/"/g, '')
  .replace(/&/g, '')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()

const epicBranchName = async ({ key, summary }) => {
  const match = summary?.trim()
    .match(/\[#(.*)]\s/)
  const storyKey = match ? `_${match[1]}` : ''

  const taskName = clearName(summary)

  return `story/${key}${storyKey}_${taskName}`
}

const defaultBranchName = async ({ key, type }) => {
  const taskType = type?.trim()

  const prefix = taskType === 'Bug' ? 'fix' : 'feat'

  return `${prefix}/${key}`
}

const formatBranchName = async (tasks) => {
  const [key, summary, type] = tasks.split(';')
  const taskType = type?.trim()

  return taskType === 'Epic'
    ? epicBranchName({ key, summary })
    : defaultBranchName({ key, type })
}

module.exports = {
  formatBranchName,
}
