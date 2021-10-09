const SearcherReviewInProgressTasks = (provider) => {
  const find = async () => provider.search({
    page: 0,
    limit: 50,
    status: 'Review in progress',
  })

  return {
    find,
  }
}

module.exports = SearcherReviewInProgressTasks
