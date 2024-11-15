"use server";

import db from "@/app/db/db";
import { z } from "zod";
import fs from "fs/promises";

const fileSchema = z.instanceof(File, { message: "File is required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"), { message: "Image is required" });

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().positive().min(1),
    file: fileSchema.refine(file => file.size > 0, { message: "File is required" }),
    image: imageSchema.refine(file => file.size > 0, { message: "Image is required" }),
})

export async function addProduct(formData: FormData) {
    const result = addSchema.safeParse(formData)

    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public/${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    db.product.create({
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath
        }
    })
}