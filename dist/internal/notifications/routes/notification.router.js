"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRouter = void 0;
const express_1 = require("express");
const notification_controller_1 = require("../controller/notification.controller");
const notificationController = new notification_controller_1.NotificationController();
const NotificationRouter = (0, express_1.Router)();
exports.NotificationRouter = NotificationRouter;
NotificationRouter.post('/notifications', notificationController.create);
NotificationRouter.get('/notifications', notificationController.list);
NotificationRouter.put('/notifications/:id', notificationController.update);
NotificationRouter.delete('/notifications/:id', notificationController.delete);
