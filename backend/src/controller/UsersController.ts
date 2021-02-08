import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export default {
  async create (req: Request, res: Response){
    try {
      const newUser = getRepository(User).create(req.body);
      const userCreated = await getRepository(User).save(newUser);

      return res.status(201).json({
        userCreated
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error creating an user, try again.",
        error: error,
      })
    }
  },

  async getUser (req: Request, res: Response){    
    try {
      const user = await getRepository(User).findOne({where: {auth: req.body.auth}});     
      return res.status(200).json({
        userId: user.id,
        username: user.name
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Failed to get user, please try again',
        error: error
      })
    }
  } 
}