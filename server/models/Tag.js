module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    Tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Tag;
};
