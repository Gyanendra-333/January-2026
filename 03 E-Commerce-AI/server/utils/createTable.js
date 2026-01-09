import { createPaymentTable } from "../models/paymentTable.js";
import { createProductTable } from "../models/productTable.js";
import { createUserTable } from "../models/userTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createOrdersItemTable } from "../models/orderItemTable.js";
import { createProductReviewTable } from "../models/productReviewTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";

export const createTables = async () => {
    try {
        await createUserTable();
        await createProductTable();
        await createProductReviewTable();
        await createOrdersTable();
        await createOrdersItemTable();
        await createShippingInfoTable();
        await createPaymentTable();
        console.log("All tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};