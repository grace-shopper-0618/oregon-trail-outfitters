const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Review = require('./reviews')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      [Op.gt]: 0
    },
    //getter displays $1.5 for price instead of $1.50 when 150 is entered
    get() {
      return this.getDataValue('price') / 100
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      [Op.gte]: 0
    }
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.crystalinks.com/wagonwheel.jpg',
    validate: {
      isUrl: true
    }
  }
})

Product.beforeValidate((instance) => {
  instance.photoUrl = instance.photoUrl || undefined
})

Product.prototype.getAvgRating = async () => {
  const productId = this.productId
  const ratings = await Review.findAll({
    where: productId
  })
  let sumOfRatings = 0
  ratings.forEach(rating => {
    sumOfRatings += rating
  })
  return sumOfRatings/ratings.length
}

module.exports = Product
