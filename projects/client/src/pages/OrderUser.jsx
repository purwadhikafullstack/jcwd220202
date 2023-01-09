import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckoutOrders from "../components/CheckoutOrders";
import Select from "react-select";
import OrderHeader from "../components/OrderHeader";
import axios from "axios";
const cityCodeData = require("../local-json/CityCode.json");

const OrderUser = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [isClearable, setIsClearable] = useState(true);
  const [selectedOngkir, setSelectedOngkir] = useState(0);
  const [ongkirs, setOngkirs] = useState([]);

  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const fetchVoucher = async () => {
    try {
      const response = await axiosInstance.get(
        `transaction/checkvoucher/${params.id}`
      );

      setVoucherList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(voucherList);

  const renderVoucher = voucherList.map((val) => {
    return {
      value: val.id,
      label: val.voucher_name,
      VoucherTypeId: val.VoucherTypeId,
      discount_amount_nominal: val.discount_amount_nominal,
      discount_amount_percentage: val.discount_amount_percentage,
      minimum_payment: val.minimum_payment,
      quantity: val.quantity,
    };
  });

  const onlyKota = cityCodeData.filter((val) => {
    return val.type == "Kota";
  });

  const renderCityCode = onlyKota.map((val) => {
    return {
      city_id: val.city_id,
      city_name: val.city_name,
    };
  });

  const fetchShipmentPrice = async () => {
    try {
      const pinpoint = await axiosInstance.get("/transaction/shipment");
      console.log(pinpoint.data.origin.address.split(",")[0]);
      const originCity = renderCityCode.find((val) => {
        return val.city_name === pinpoint.data.origin.address.split(",")[0];
      });
      const destinationCity = renderCityCode.find((val) => {
        return val.city_name === pinpoint.data.destination.address;
      });

      const ongkirs = await axiosInstance.get(
        `/geocode/expeditionprice/${originCity.city_id}/${
          destinationCity.city_id
        }/${1700}/${"jne"}`
      );
      setOngkirs(ongkirs.data.data.rajaongkir.results[0].costs);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("iniongkir", ongkirs);

  const renderOngkirOptions = ongkirs.map((val) => {
    return {
      value: val.cost[0].value,
      label: val.service,
      hargaOngkir: val.cost[0].value,
      estimasi: val.cost[0].etd,
    };
  });

  const fetchCheckoutOrders = async () => {
    try {
      const response = await axiosInstance.get("/transaction/orders");

      setCheckoutItems(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(checkoutItems);

  const renderOrderItem = () => {
    return checkoutItems.map((val) => {
      return (
        <CheckoutOrders
          key={val.id.toString()}
          id={val.id}
          ProductBranchId={val.ProductBranchId}
          product_name={val.ProductBranch.Product.product_name}
          product_image={val.ProductBranch.Product.product_image}
          quantity={val.quantity}
          current_price={val.current_price}
          total_product_price={val.total_product_price}
        />
      );
    });
  };

  const currentPriceToBePaid = checkoutItems.map((val) => {
    return { total_product_price: val.total_product_price };
  });

  const grandTotal = () => {
    let total = 0;
    let ongkosKirim = Number(selectedOngkir?.value) || 0;
    let nominalDisc = selectedVoucher?.discount_amount_nominal;
    let percentDisc = (100 - selectedVoucher?.discount_amount_percentage) / 100;

    for (let i = 0; i < currentPriceToBePaid.length; i++) {
      total += currentPriceToBePaid[i].total_product_price;
    }

    if (
      selectedVoucher?.VoucherTypeId == 1 &&
      selectedVoucher?.minimum_payment < total
    ) {
      const bayarGrand = total - nominalDisc + ongkosKirim;
      return bayarGrand;
    } else if (
      selectedVoucher?.VoucherTypeId == 2 &&
      selectedVoucher?.minimum_payment < total
    ) {
      const bayarGrand = total * percentDisc + ongkosKirim;
      return bayarGrand;
    } else if (!selectedVoucher?.VoucherTypeId) {
      const bayarGrand = total;
      return bayarGrand;
    }
  };

  const postTotal = async () => {
    try {
      if (!selectedOngkir?.value) {
        return toast({ title: "Choose shipment method", status: "error" });
      }

      await axiosInstance.patch(
        `/transaction/payment-with-voucher/${params.id}`,
        {
          finalBanget: grandTotal(),
          VoucherId: selectedVoucher?.value,
        }
      );
      navigate(`/user/payment/${params.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCheckoutOrders();
    fetchShipmentPrice();
    fetchVoucher();
  }, []);

  return (
    <>
      <OrderHeader />
      <Box
        backgroundColor={"#F4F1DE"}
        height={"100vh"}
        fontFamily={"roboto"}
        fontSize={"16px"}
        overflow={"scroll"}
        pb={"120px"}
      >
        <Container my={"80px"} position={"relative"} as={"main"}>
          {/* <Box height={"400px"} overflowY={"auto"}> */}
          {renderOrderItem()}
          {/* </Box> */}
          {/* <Button onClick={shipmentPrice}> cari harga shipment</Button> */}

          <Text>voucher</Text>
          <Select
            options={renderVoucher}
            isClearable={() => setSelectedVoucher(null)}
            onChange={(value) => setSelectedVoucher(value)}
          />
          <Text>shipment</Text>
          <Select
            options={renderOngkirOptions}
            isClearable={() => setSelectedOngkir(null)}
            onChange={(value) => setSelectedOngkir(value)}
          />
        </Container>
        {/* footer */}
        <>
          <Box
            backgroundColor={"#E07A5F"}
            height={"75px"}
            position={"fixed"}
            bottom={"0"}
            right={"0"}
            left={"0"}
            fontWeight={"bold"}
          >
            <SimpleGrid columns={2} spacing={5}>
              <Box height="80px" paddingLeft={"5"}>
                <VStack align={"flex-start"}>
                  <Text>Total payment</Text>
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"extrabold"}
                    color={"white"}
                  >
                    {formatRupiah(grandTotal())}
                    {/* {formatRupiah(total)} */}
                  </Text>
                </VStack>
              </Box>
              <Box height="80px" justifyContent={"center"}>
                <Button size={"lg"} margin={"2"} onClick={postTotal}>
                  Pay me
                </Button>
              </Box>
            </SimpleGrid>
          </Box>
        </>
      </Box>
    </>
  );
};

export default OrderUser;
