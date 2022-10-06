// eslint-disable-next-line @typescript-eslint/no-var-requires
const Connection = require("tedious").Connection;

export const connection = () => {
  // connexion bdd serveur

  const config = {
    server: "192.168.10.3",
    authentication: {
      type: "default",
      options: {
        userName: "sa",
        password: "Diiageg1@sql",
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
