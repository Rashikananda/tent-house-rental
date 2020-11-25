

export class Transaction {
    transation_id! : string;
    transation_date_time! : Date;
    customer_id! : string;
    product_id! : string;
    transation_type! : "OUT" | "IN";
    quantity! : number;
    transation_id_parent! : string;
}
