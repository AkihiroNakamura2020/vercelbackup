"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
require("../utils/firebase/init"); // Initialize FirebaseApp
const Home = () => {
    const app = (0, app_1.getApp)();
    return (<ul>
      <li>name = {app.name}</li>
      <li>appId = {app.options.appId}</li>
      <li>apiKey = {app.options.apiKey}</li>
    </ul>);
};
exports.default = Home;
