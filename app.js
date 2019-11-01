import { ApiConfig } from "./config/api-config";
import { Mig } from "./app/migrations/run";

const PORT = 9890;

Mig.Up();

ApiConfig.app.listen(process.env.PORT || PORT, () => {
  console.log("server connected to port " + PORT);
});
