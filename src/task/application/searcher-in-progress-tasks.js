const SearcherInProgressTasks = (provider) => {
  const find = async () => provider.search({
    page: 0,
    limit: 50,
    status: 'In Progress',
  })

  return {
    find,
  }
}

module.exports = SearcherInProgressTasks
