import axios from "./axios";

class exampleService {
  async getDataFromBE() {
    return await axios.get("/api/example", {
      data: {},
    });
  }
}

export default new exampleService();
