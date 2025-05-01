import { Router, Request, Response  } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.use(authenticateToken);

router.get("/protected", (req: Request, res: Response) => {
  res.send("This is a protected route");
});

router.get(
  "/profile",
  asyncHandler(async (req: Request, res: Response) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ message: "User profile", user });
  })
);

export default router;
