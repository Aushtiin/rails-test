import { types, getRoot } from "mobx-state-tree";
// import { DailyLogModel } from "~/models";
import * as R from "ramda";
// import { KeyActivityModel } from "./key-activity";
// import { CompanyModel } from "./company";

export const UserModel = types.model("UserModel").props({
  id: types.identifierNumber,
  email: types.maybeNull(types.string),
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  // personalVision: types.maybeNull(types.string),
  // avatarUrl: types.maybeNull(types.string),
  // defaultAvatarColor: types.maybeNull(types.string),
  // role: types.maybeNull(types.string),
  // currentDailyLog: types.maybeNull(DailyLogModel),
  // confirmedAt: types.maybeNull(types.string),
  // invitationSentAt: types.maybeNull(types.string),
  // timezone: types.maybeNull(types.string),
  // phoneNumber: types.maybeNull(types.string),
  // title: types.maybeNull(types.string),
  // status: types.maybeNull(types.string),
  // defaultSelectedCompanyId: types.maybeNull(types.number),
  // companyProfiles: types.maybeNull(types.array(CompanyModel)),
  // // teams: types.array(types.reference(TeamModel)), THIS ONLY WORKS IF TEAMS IS LOADED BEFORE USERS
  // todaysPriorities: types.maybeNull(types.array(KeyActivityModel)),
  // todaysCompletedActivities: types.maybeNull(types.array(KeyActivityModel)),
  // firstAccessToForum: types.maybeNull(types.boolean)
  // //add avatarurl2x
});
// .views((self) => ({
//   get confirmedAtTz() {
//     //use rails timezone to convert to confirmed at
//     return self.confirmedAt;
//   },
//   get teams() {
//     const {
//       teamStore: { teams },
//     } = getRoot(self);
//     return teams.filter((team) => R.contains(self.id, team.allTeamUserIds));
//   },
//   get teamNames() {
//     const {
//       teamStore: { teams },
//     } = getRoot(self);
//     return R.join(
//       ", ",
//       teams
//         .filter((team) => R.contains(self.id, team.allTeamUserIds))
//         .map((team) => team.name)
//     );
//   },
// }))
// // .views(self => ({
// //   get teamsNames() {
// //     return self.teams.map(team => team.name);
// //   },
// // }))
// .actions((self) => ({
//   setAvatarUrl: (avatarUrl) => {
//     self.avatarUrl = avatarUrl;
//   },
// }));

type UserModelType = typeof UserModel.Type;
type UserModelDataType = typeof UserModel.CreationType;

export interface IUser extends UserModelType {}
export interface IUserData extends UserModelDataType {}
