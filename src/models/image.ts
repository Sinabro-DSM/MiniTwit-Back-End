import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Image extends Model {
  img: string;
  timelineId: string;
}

Image.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    img: {
      type: Sequelize.STRING,
    },
    timelineId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Image",
  }
);
