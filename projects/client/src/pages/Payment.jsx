import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import TransactionListBar from "../components/TransactionListBar";
import payment from "../assets/payment.png";
import { useEffect, useRef, useState } from "react";

const Payment = () => {
  const inputFileRef = useRef(null);
  const params = useParams();
  const toast = useToast();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [selectedImage, setSelectedImage] = useState(payment);

  const navigate = useNavigate();

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance.get(
        `/transaction/payment-final/${params.id}`
      );
      console.log(response.data);
      setPrice(response.data.price);
      setDate(response.data.expDate);
      setStatus(response.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      payment_proof_img: null,
    },
    onSubmit: async (values) => {
      try {
        const transactionData = new FormData();

        transactionData.append("payment_proof_img", values.payment_proof_img);

        const response = await axiosInstance.patch(
          `/transaction/payment-done/check/${params.id}`,
          transactionData
        );

        navigate(`/user/transaction-detail/${params.id}`);

        toast({
          title: "Payment Uploaded",
          description: response.data.message,
          status: "success",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Payment Uploaded Failed",
          description: err.response.data.message,
          status: "error",
        });
      }
    },
  });
  console.log(formik.values);
  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      px={5}
    >
      <Box>
        <TransactionListBar />
      </Box>
      <Box mt={"100px"}>
        <Stack>
          <Text as={"b"}> Total payment: </Text>
          <Box bgColor={"#D9D9D9"} color={"black"} py={2}>
            <Text pl={3} as={"b"}>
              Rp. {price}
            </Text>
          </Box>
          <Text as={"b"}> Payment must be completed in: </Text>
          <Box bgColor={"#E07A5F"} color={"black"} py={2}>
            <Text pl={3}>{date}</Text>
          </Box>
          <Box
            bgColor={"#81B29A"}
            color={"black"}
            borderRadius={"10px"}
            px={3}
            py={2}
          >
            Please make a payment to the account number below and upload proof
            in the available form before the time run out
          </Box>
          <Text as={"b"}> Select a payment method: </Text>
          <Accordion>
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "#81B29A", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  BCA
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem>8950093791</GridItem>
                  <GridItem>
                    <Button
                      color={"blackAlpha.800"}
                      variant="link"
                      ml={40}
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText("8950093791")
                      }
                    >
                      Copy
                    </Button>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "#81B29A", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  BRI
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem>697501000453505</GridItem>
                  <GridItem>
                    <Button
                      color={"blackAlpha.800"}
                      variant="link"
                      ml={40}
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText("697501000453505")
                      }
                    >
                      Copy
                    </Button>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton _expanded={{ bg: "#81B29A", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  Bank Mandiri
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem>7098637286</GridItem>
                  <GridItem>
                    <Button
                      color={"blackAlpha.800"}
                      variant="link"
                      ml={40}
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText("7098637286")
                      }
                    >
                      Copy
                    </Button>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Text as={"b"}>Upload proof payment</Text>
          <Input
            ref={inputFileRef}
            display={"none"}
            type="file"
            name="payment_proof_img"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("payment_proof_img", event.target.files[0]);

              if (
                !event.target.files.length &&
                event.target.files.length === 0
              ) {
                return setSelectedImage(payment);
              }

              setSelectedImage(URL.createObjectURL(event.target.files[0]));
            }}
            _placeholder={{ color: "black.500" }}
            bgColor={"white"}
          />
          <Button
            fontWeight={"normal"}
            width={"100%"}
            bgColor={"#81B29A"}
            color={"white"}
            onClick={() => {
              inputFileRef.current.click();
            }}
            _hover={{ bgColor: "#81B29A" }}
          >
            {formik?.values?.payment_proof_img?.name || "Upload Payment"}
          </Button>
          <Box h="250px" display={"flex"} justifyContent={"center"}>
            <Image
              src={selectedImage}
              alt="search"
              objectFit={"contain"}
              height={"100%"}
            />
          </Box>
        </Stack>
        {status === "Waiting For Approval" ? (
          <Box
            backgroundColor={"#E07A5F"}
            height={"75px"}
            position={"fixed"}
            bottom={"0"}
            right={"0"}
            left={"0"}
            fontWeight={"bold"}
            margin={"auto"}
            maxWidth={"480px"}
          >
            <Button
              w={"90%"}
              mx={5}
              my={4}
              bgColor={"#81B29A"}
              color={"black"}
              borderRadius={"20px"}
              isDisabled
            >
              Waiting Approval
            </Button>
          </Box>
        ) : (
          <Box
            backgroundColor={"#E07A5F"}
            height={"75px"}
            position={"fixed"}
            bottom={"0"}
            right={"0"}
            left={"0"}
            fontWeight={"bold"}
            margin={"auto"}
            maxWidth={"480px"}
          >
            <Button
              w={"90%"}
              mx={5}
              my={4}
              onClick={formik.handleSubmit}
              isDisabled={formik.isSubmitting}
              bgColor={"#81B29A"}
              color={"white"}
              borderRadius={"20px"}
            >
              Pay now
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Payment;
