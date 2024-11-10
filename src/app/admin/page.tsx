import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import db from "../db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { resolve } from "path";

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    });

    // await wait(2000);

    return {
        amount: (data._sum.pricePaidInCents ?? 0) / 100,
        numberOfSales: data._count,
    };
}

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ]);
    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaidInCents || 0) / userCount,
    };
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } }),
    ]);

    return {
        activeCount,
        inactiveCount,
    };
}

export default async function AdminDashboard() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="sales"
                subtitle={`${formatNumber(salesData.numberOfSales)} ${
                    salesData.numberOfSales === 0 ? "order" : "orders"
                }`}
                body={formatCurrency(salesData.amount)}
            />{" "}
            <DashboardCard
                title="customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average value`}
                body={formatNumber(userData.userCount)}
            />
            <DashboardCard
                title="customers"
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
                body={formatNumber(productData.activeCount)}
            />
        </div>
    );
}

type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
};

export function DashboardCard(props: DashboardCardProps) {
    const { title, subtitle, body } = props;
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className=" capitalize">{title}</CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                </CardHeader>
                <CardContent>{body}</CardContent>
            </Card>
        </>
    );
}