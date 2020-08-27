import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Image } from "./image";

export class Timeline extends Model {
  content: string;
  userId: string;
  createdAt: Date;
}

Timeline.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    content: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Timeline",
  }
);

Timeline.hasMany(Image, { foreignKey: "timelineId", sourceKey: "id" });
Image.belongsTo(Timeline, { foreignKey: "timelineId" });
