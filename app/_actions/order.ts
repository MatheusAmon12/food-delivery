"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

//tipando a validção da entrada de dados com o prisma
export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return db.order.create({ data });
};
