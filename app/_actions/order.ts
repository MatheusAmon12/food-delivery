"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

//tipando a validção da entrada de dados com o prisma
export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};
