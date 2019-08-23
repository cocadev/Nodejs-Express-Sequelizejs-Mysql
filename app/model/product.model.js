export default (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      }
    });
    
    return Product;
  }