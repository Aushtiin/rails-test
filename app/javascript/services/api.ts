import { create, ApisauceInstance } from "apisauce";
import { camelizeResponse, decamelizeRequest } from "../utils";
import * as R from "ramda";

export class Api {
  client: ApisauceInstance;
  token: string;

  constructor() {
    this.client = create({
      baseURL: "/api",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      timeout: 30000,
      withCredentials: true, //allow cookies to be sent if its from same domain
    });

    this.client.addResponseTransform(response => {
      response.data = camelizeResponse(response.data);
    });

    this.client.addRequestTransform(request => {
      request.params = decamelizeRequest(request.params);
    });
  }

  // addMonitor(monitor) {
  //   this.client.addMonitor(monitor);
  // }

  async getUsers() {
    return this.client.get("/users");
  }

  async getKeyActivities() {
    return this.client.get("/key_activities");
  }

  async profile() {
    return this.client.get("/profile");
  }

  async createKeyActivity(keyActivityObject) {
    return this.client.post("/key_activities", keyActivityObject);
  }

  async updateKeyActivityStatus(keyActivity, value, fromTeamMeeting) {
    return this.client.patch(`/key_activities/${keyActivity.id}`, {
      completed: value,
      fromTeamMeeting,
    });
  }

  async updateKeyActivity(keyActivityObject) {
    return this.client.patch(`/key_activities/${keyActivityObject.id}`, keyActivityObject);
  }

  async destroyKeyActivity(keyActivityObject) {
    return this.client.delete(`/key_activities/${keyActivityObject.id}`, keyActivityObject);
  }

  async resortKeyActivities(sortParams) {
    return this.client.patch(`key_activities`, sortParams);
  }

  //async setJWT(jwt) {}
}
