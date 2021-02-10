import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Phrase } from "../entity/Phrase";

export default {
  async post (req: Request, res: Response){
    const id = req.params.id;
    const { content, date } = req.body;
    try {
      const newPhrase = getRepository(Phrase).create({
        date: date,
        user: id,
        content: content
      });
      const phraseCreated = await getRepository(Phrase).save(newPhrase);
      
      return res.status(201).json({
        message: 'Phrase succesfully added',
        phraseCreated
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to add phrase, try again",
        error: error
      });
    }
  },

  async get (req: Request, res: Response){
    const id = req.params.id;

    try {
      const phrasesList = await getRepository(Phrase)
        .find({where: {
          user: id
        }
      });

      return res.status(200).json({
        phrasesList
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unable to get phrases list"
      });
    }
  },

  async edit (req: Request, res: Response){
    const id = req.params.id;

    try {
      const phraseUpdate = await getRepository(Phrase)
      .update(
        id,
        req.body
      );
      
      return res.status(200).json({
        message: "Updated succesfully.",
        data: phraseUpdate
      });
    } catch (error){
      return res.status(400).json({
        message: "Update failed, try again.",
        error: error
      });
    }
  },

  async delete (req: Request, res: Response){
    const id = req.params.id;
    
    try {
      const deletedPhrase = await getRepository(Phrase).delete(id);
      return res.status(200).json({
        message: "Deleted succesfully.",
        data: deletedPhrase
      })
    } catch (error) {
      return res.status(400).json({
        message: "Unable to remove phrase.",
        error: error
      });
    }
  }
}