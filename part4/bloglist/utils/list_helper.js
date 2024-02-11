const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum_reducer = (sum, item) => {
    return sum + item
  }

  return blogs.map((b) => b.likes).reduce(sum_reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
