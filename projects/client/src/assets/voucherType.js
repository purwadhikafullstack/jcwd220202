import voucherStory from "../assets/discount_voucher.png";
import buy1Get1Story from "../assets/buy1get1.png";
import shipmentStory from "../assets/shipment.png";

export const voucherTypeSelection = [
  {
    icon: voucherStory,
    title: "Discount Voucher",
    description: "Voucher that can give an amount of discount of total price.",
    url: "discount-voucher",
  },
  {
    icon: buy1Get1Story,
    title: "Buy 1 Get 1",
    description: "Voucher that can give a free one of a certain product.",
    url: "buy1-get1",
  },
  {
    icon: shipmentStory,
    title: "Free Shipment",
    description:
      "Voucher that can give an amount of discount of total shipment price.",
    url: "free-shipment",
  },
];
