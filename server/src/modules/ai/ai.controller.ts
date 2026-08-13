import {
  Request,
  Response,
  NextFunction,
} from "express";

import { aiService } from "./ai.service";
import { explainSchema } from "./ai.validation";
import { successResponse } from "../../lib/api-response";

class AIController {
  public explain = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = explainSchema.parse(req.body);

      const result = await aiService.explain(body);

      return res.status(200).json(
        successResponse(
          "AI explanation generated successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const aiController = new AIController();