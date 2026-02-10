import type { RequestHandler } from "express";
import MessageRepository from "./messageRepository";

const add: RequestHandler = async (req, res, next) => {
  const { userId, activityId, content } = req.body;

  try {
    const [result] = await MessageRepository.create(
      userId,
      activityId,
      content,
    );

    if (result.affectedRows === 0) {
      res.status(400).json({ message: "Message Cannot be created" });
    }

    res.status(201).json({ message: "Message Created", result });
  } catch (err) {
    next(err);
  }
};

const brows: RequestHandler = async (req, res, next) => {
  const userId = Number(req.query.userId);
  const activityId = Number(req.query.activityId);

  try {
    const [messages] = await MessageRepository.read(userId, activityId);

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export default { add, brows };
