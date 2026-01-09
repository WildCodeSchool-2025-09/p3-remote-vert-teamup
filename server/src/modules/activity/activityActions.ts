import type { RequestHandler } from "express";
import activityRepository from "./activityRepository";

const add: RequestHandler = async (req, res) => {
  try {
    const {
      description,
      address,
      city,
      zip_code,
      playing_at,
      playing_duration,
      nb_places,
      auto_validation,
      price,
      visibility,
      level,
      locker,
      shower,
      air_conditioning,
      toilet,
      sport_id,
    } = req.body;

    if (
      !address ||
      !city ||
      !zip_code ||
      !playing_at ||
      !playing_duration ||
      !nb_places ||
      !sport_id
    ) {
      res.status(400).json({ error: "Champs obligatoires manquants" });
      return;
    }

    const activityData = {
      description: description || null,
      address,
      city,
      zip_code,
      playing_at,
      playing_duration: Number(playing_duration),
      nb_places: Number(nb_places),
      auto_validation: auto_validation === true,
      price: Number(price) || 0,
      visibility: visibility === true,
      level: level || "All",
      disabled: false,
      locker: locker === true,
      shower: shower === true,
      air_conditioning: air_conditioning === true,
      toilet: toilet === true,
      user_id: 1, // TODO: remplacer par l'utilisateur authentifié
      sport_id: Number(sport_id),
    };

    const insertId = await activityRepository.create(activityData);

    res.status(201).json({ id: insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default { add };
