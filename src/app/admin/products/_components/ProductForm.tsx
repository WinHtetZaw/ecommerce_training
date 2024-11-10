"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";
import { addProduct } from "../_actions/products";

export default function ProductForm() {
    const [priceInCents, setPriceInCents] = useState<number>(0);
    return (
        <form action={addProduct} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price in Cents</Label>
                <Input
                    type="text"
                    inputMode="numeric"
                    id="priceInCents"
                    name="priceInCents"
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(Number(e.target.value))}
                    required
                />
                <span className=" text-muted-foreground">
                    {formatCurrency(priceInCents || 0)}
                </span>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className=" resize-none"
                    id="description"
                    name="description"
                    required
                ></Textarea>
            </div>

            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required />
            </div>

            <Button type="submit">Save</Button>
        </form>
    );
}
