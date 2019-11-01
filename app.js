import { ApiConfig } from "./config/api-config";

const PORT = 9890;

ApiConfig.app.listen(process.env.PORT || PORT, () => {
  console.log("server connected to port " + PORT);
});
