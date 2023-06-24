import { Box, Button, ButtonGroup, Flex, Grid, GridItem, Icon, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiUserCircle } from "react-icons/bi"
import { useReactToPrint } from "react-to-print"

const Transaksi = () => {
    const componentRef = useRef();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formatter = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    });

    const [foodList, setFoodList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [chargeStr, setChargeStr] = useState("");
    const [pay, setPay] = useState(0);
    const [charge, setCharge] = useState(0);
    const [change, setChange] = useState(0);

    const foodData = async () => {
        try {
            let res = await Axios.get(process.env.REACT_APP_BASE_URL + "/food/data");
            setFoodList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        foodData();
    }, []);

    const handleOrder = async (data) => {
        let getIndex = orderList.findIndex((val) => val.id === data.id)
        if (getIndex < 0) {
            setOrderList([...orderList, { ...data, quantity: 1 }]);
        } else {
            let currentOrder = orderList;
            currentOrder[getIndex].quantity = currentOrder[getIndex].quantity + 1;
            setOrderList([...currentOrder]);
        }
    }

    const printFoodList = () => {
        return foodList.map((food) => {
            return (
                <Box bgColor="white" w="max-content" boxShadow="base" key={food.id} cursor="pointer" onClick={() => handleOrder(food)}>
                    <Image src={process.env.REACT_APP_BASE_URL + food.image} w={52} h={44} objectFit="cover" />
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" py={2}>
                        <Text fontWeight="500">{food.name}</Text>
                        <Text fontWeight="500" color="#00ACEE">{formatter.format(food.price)}</Text>
                    </Flex>
                </Box>
            )
        })
    }

    const printOrderList = () => {
        if (orderList.length < 1) {
            return null
        }
        return orderList.map((order) => {
            return (
                <Grid templateColumns="repeat(5, 1fr)" alignItems="center" key={order.id} gap={2}>
                    <GridItem colSpan={1}>
                        <Image src={process.env.REACT_APP_BASE_URL + order.image} minW={20} h={20} objectFit="cover" aspectRatio="1 / 1" />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text fontWeight="500" fontSize="sm">{order.name}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text fontWeight="500" fontSize="sm">{"x " + order.quantity}</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text fontWeight="500" color="#00ACEE" fontSize="sm">{formatter.format(order.price)}</Text>
                    </GridItem>
                </Grid>
            )
        })
    }

    const totalCharge = () => {
        if (orderList.length > 0) {
            let sum = orderList.reduce((accumulator, object) => {
                return accumulator + (parseInt(object.price) * parseInt(object.quantity));
            }, 0);
            setChargeStr(formatter.format(sum));
            setCharge(sum);
        }
    }

    useEffect(() => {
        totalCharge();
    }, [orderList])

    const saveBill = () => {
        if (orderList.length < 1) {
            toast({
                title: 'Failed to save bill.',
                position: 'top',
                description: "There is no order.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Bill saved.',
                position: 'top',
                description: "We've saved your bill for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const chargeButton = () => {
        if (orderList.length < 1) {
            toast({
                title: 'Failed to charge bill.',
                position: 'top',
                description: "There is no order.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            onOpen()
        }
    }

    const printTable = () => {
        if (orderList.length < 1) {
            return null
        }
        return orderList.map((order, index) => {
            return (
                <Tr key={index}>
                    <Td fontSize="sm">{index + 1}</Td>
                    <Td fontSize="sm">{order.name} x {order.quantity}</Td>
                    <Td>
                        <Image src={process.env.REACT_APP_BASE_URL + order.image} w={20} h={16} objectFit="cover" />
                    </Td>
                    <Td fontSize="sm">{formatter.format(order.price)}</Td>
                </Tr>
            )
        })
    }

    const totalChange = () => {
        if (pay > charge) {
            setChange(formatter.format(pay - charge))
        } else {
            setChange(0);
        }
    }

    useEffect(() => {
        totalChange()
    }, [pay]);

    const payButton = () => {
        if (pay > charge || pay == charge) {
            toast({
                title: 'Success.',
                position: 'top',
                description: "Payment success.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setOrderList([]);
                    setChargeStr("");
                    setPay(0);
                    setCharge(0);
                    setChange(0);
                    onClose();
                },
            })
        } else {
            toast({
                title: 'Payment failed.',
                position: 'top',
                description: "Please insert more money.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <Box bgColor="#F8F8F8" px={24} py={8} minH="80vh">
            <Grid templateColumns="repeat(3, 1fr)">
                <GridItem colSpan={2}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {printFoodList()}
                    </Grid>
                </GridItem>
                <GridItem colSpan={1}>
                    <Box bgColor="white" p={6} boxShadow="base">
                        <Box ref={componentRef}>
                            <Flex justifyContent="center" alignItems="center" gap={2}>
                                <Icon as={BiUserCircle} boxSize={8} />
                                <Text fontSize="xl">Pesanan</Text>
                            </Flex>
                            <Flex flexDirection="column" gap={4} mt={12}>
                                {printOrderList()}
                            </Flex>
                        </Box>
                        <Button colorScheme="red" variant="outline" w="full" mt={8} onClick={() => {
                            setOrderList([]);
                            setChargeStr("");
                        }}>Clear Cart</Button>
                        <ButtonGroup w="full" mt={4}>
                            <Button w="full" colorScheme="green" onClick={saveBill}>Save Bill</Button>
                            <Button w="full" colorScheme="green" onClick={handlePrint}>Print Bill</Button>
                        </ButtonGroup>
                        <Button mt={4} colorScheme="blue" w="full" onClick={chargeButton}>Charge {chargeStr}</Button>
                        <Modal isOpen={isOpen} onClose={onClose} size="4xl" closeOnOverlayClick={false}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalBody py={4}>
                                    <Text fontWeight="500">Detail Pesanan</Text>
                                    <Flex gap={8}>
                                        <TableContainer mt={4}>
                                            <Table variant="striped" colorScheme="blackAlpha">
                                                <Thead bg="#DADADA">
                                                    <Tr>
                                                        <Th>#</Th>
                                                        <Th>Nama</Th>
                                                        <Th>Foto</Th>
                                                        <Th>Harga</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {printTable()}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                        <Box>
                                            <Text fontWeight="500" textAlign="center">Uang Pembeli (Rp)</Text>
                                            <Input mt={8} type="number" onChange={(event) => setPay(event.target.value)} />
                                            <ButtonGroup mt={4} w="full">
                                                <Button w="full" variant="outline" onClick={() => {
                                                    onClose();
                                                    setChange(0);
                                                }}>Close</Button>
                                                <Button w="full" colorScheme="blue" onClick={payButton}>Pay!</Button>
                                            </ButtonGroup>
                                            <Text mt={4} color="red.700">Kembalian: {change}</Text>
                                        </Box>
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                </GridItem>
            </Grid>
        </Box >
    )
}

export default Transaksi