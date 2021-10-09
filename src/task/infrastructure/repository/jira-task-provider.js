const base64 = require('base-64')

const Task = require('../../domain/task')

const JiraTaskProvider = (fetch, domainJira, authorization) => {
  const search = async ({ page, limit, status }) => {
    const url = `${domainJira}/rest/api/3/search`
    const jql = status ? `status = "${status}"` : undefined
    let body = {
      expand: ['names'],
      maxResults: limit,
      fieldsByKeys: false,
      fields: ['summary', 'issuetype'],
      startAt: page,
    }
    body = jql ? { ...body, jql } : body
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${base64.encode(authorization)}`,
      },
    })
    const { issues = [] } = await response.json()
    return issues.map((issue) => {
      const { fields: { summary, issuetype: { name } }, key, self } = issue
      return new Task(key, summary, name, self)
    })
  }

  return {
    search,
  }
}

module.exports = JiraTaskProvider
