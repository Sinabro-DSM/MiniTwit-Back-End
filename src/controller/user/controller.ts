import { Request, Response, NextFunction } from "express";
import * as mail from "../../config/mailConfig";
import * as query from "./query";
import { mkAccess, mkRefresh } from "./mkToken";

export const emailSend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const user: any = await query.findUserByEmail(email);
  if (user) throw new Error("이미 있는 아이디");
  const randomNumber = query.mkRandomNumber();
  const mailOption = mail.setMailOption(email, randomNumber);
  mail.transporter.sendMail(mailOption, (err, info) => {
    if (err) throw new Error(err.message);
    else res.status(200).json({ message: "이메일 전송 성공", randomNumber });
  });
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, nickname } = req.body;
  const id: string = await query.mkId();
  const encodedPassword: string = await query.passwordEncoding(password);
  await query.createUser(id, email, encodedPassword, nickname);
  res.status(200).json({ message: "회원가입 성공" });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user: any = await query.findUserByEmail(email);
  if (!user) throw new Error("존재하지 않는 유저");
  if (!(await query.passwordCompare(password, user.password)))
    res.status(409).json({ message: "로그인 실패" });
  const accessToken = await mkAccess(req, user);
  const refreshToken = await mkRefresh(req, user);
  res.status(200).json({
    message: "로그인 성공",
    accessToken,
    refreshToken,
  });
};
