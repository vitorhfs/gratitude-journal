import { getRepository } from "typeorm"
import { Phrase } from "./entity/Phrase";
import { User } from "./entity/User"

export const Bootstrap = async () => {
  const userRepo = getRepository(User);
  const user = userRepo.create({
    name: 'Virto',
    auth: 'something',
  });
  await userRepo.save(user).catch(err => {
    console.log(`Error: ${err}`);
  });
  console.log(`New User saved: `, user);

  const phraseRepo = getRepository(Phrase);
  const phrase = new Phrase();
  phrase.content = `It's gonna be a great day today`;
  phrase.date = `${new Date()}`;
  phrase.user = Promise.resolve(user);

  await phraseRepo.save(phrase).catch(err => console.log(err));
}

export const find = async() => {
  const userRepo = getRepository(User);

  const user  = await userRepo
    .findOne({ where: { name: "Virto" } })
    .catch(err => {
      console.log(err);
    })

  if (user)
    console.log("User: ", user, await user.phrases)
}