const SearcherToReviewTasks = (provider) => {
  const find = async () => provider.search({
    page: 0,
    limit: 50,
    status: 'To Review',
  })

  return {
    find,
  }
}

module.exports = SearcherToReviewTasks
