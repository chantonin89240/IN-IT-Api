// eslint-disable-next-line @typescript-eslint/no-var-requires
const Connection = require("tedious").Connection;

export const connection = () => {
  // connexion bdd serveur
  const config = {
    server: "dbinitmanage.cawgyelk5tsg.us-east-1.rds.amazonaws.com",
    authentication: {
      type: "default",
      options: {
        userName: "admin",
        password: "7FspTRqyyTs7ofhjF9DJfiHz9gaiJg8qHrKcj5cx",
      },
    },
    options: {
      port: 1433,
      database: "INITDatabase", // or
      trustServerCertificate: true,
    },
  };

  const connection = new Connection(config);
  return connection;
};
