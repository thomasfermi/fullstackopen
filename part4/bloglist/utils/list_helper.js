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

/*
const mostBlogsNaive = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorMap = {}
  const addToAuthourMap = (author) => {
    if (author in authorMap) {
      authorMap[author] += 1
    } else {
      authorMap[author] = 1
    }
  }
  blogs.forEach((b) => {
    addToAuthourMap(b.author)
  })

  console.log(authorMap)

  let mostBlogs = 0
  let mostBlogsAuthor = null
  for (const [key, value] of Object.entries(authorMap)) {
    if (value > mostBlogs) {
      mostBlogs = value
      mostBlogsAuthor = key
    }
  }
  return { author: mostBlogsAuthor, blogs: mostBlogs }
} */

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) {
    return null
  }

  const authorCount = _.countBy(blogs, 'author')

  const mostBlogsAuthor = _.maxBy(
    _.keys(authorCount),
    (author) => authorCount[author]
  )

  return { author: mostBlogsAuthor, blogs: authorCount[mostBlogsAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
