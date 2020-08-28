import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Like extends Model {
  timelineId: string;
  userId: string;
}

Like.init(
  {
    timelineId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: "Like",
  }
);
