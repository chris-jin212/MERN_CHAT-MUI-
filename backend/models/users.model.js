module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("register", {
			Prefix: {
        type: Sequelize.STRING
      },
      ConfirmEmail: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.BOOLEAN
      },
      Lastname: {
        type: Sequelize.BOOLEAN
      },
      Gender: {        
        type: Sequelize.BOOLEAN
      },
      Avatar: {
        type: Sequelize.STRING
      },
      Active: {
        type: Sequelize.NUMBER
      },
      Country: {
        type: Sequelize.STRING
      },
      Age: {
        type: Sequelize.NUMBER
      },
      BlockList: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
    });
  
    return Users;
  };
  