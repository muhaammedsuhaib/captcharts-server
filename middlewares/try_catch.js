"use strict";
const try_catch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  };
};





export default try_catch;
