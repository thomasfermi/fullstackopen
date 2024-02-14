const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum_reducer = (sum, item) => {
    return sum + item
  }

  return blogs.map((b) => b.likes).reduce(sum_reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce(
    (prev, current) => (current.likes > prev.likes ? current : prev),
    blogs[0]
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
