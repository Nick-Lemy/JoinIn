import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../config/database.sqlite",
});

// User Model
export class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
    },
    last_name: {
      type: DataTypes.STRING(255),
    },
    phone_number: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

// Event Model
export class Event extends Model {}
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    max_attendees: {
      type: DataTypes.INTEGER,
    },
    volunteers_needed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: false,
  }
);

// Volunteer Role Model
export class VolunteerRole extends Model {}
VolunteerRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    slots_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "volunteer_roles",
    timestamps: false,
  }
);

// Registration Model
export class Registration extends Model {}
Registration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    volunteer_role_id: {
      type: DataTypes.INTEGER,
      comment: "NULL if attendee",
    },
    qr_code: {
      type: DataTypes.TEXT,
      unique: true,
    },
    registered_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    checked_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checked_in_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "registrations",
    timestamps: false,
  }
);

// Feedback Model
export class Feedback extends Model {}
Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      comment: "1-5 stars",
    },
    comments: {
      type: DataTypes.TEXT,
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "feedback",
    timestamps: false,
  }
);

User.hasMany(Event, { foreignKey: "organizer_id" });
Event.belongsTo(User, { foreignKey: "organizer_id" });

Event.hasMany(VolunteerRole, { foreignKey: "event_id" });
VolunteerRole.belongsTo(Event, { foreignKey: "event_id" });

User.hasMany(Registration, { foreignKey: "user_id" });
Registration.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Registration, { foreignKey: "event_id" });
Registration.belongsTo(Event, { foreignKey: "event_id" });

VolunteerRole.hasMany(Registration, { foreignKey: "volunteer_role_id" });
Registration.belongsTo(VolunteerRole, { foreignKey: "volunteer_role_id" });

Registration.hasOne(Feedback, { foreignKey: "registration_id" });
Feedback.belongsTo(Registration, { foreignKey: "registration_id" });

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
