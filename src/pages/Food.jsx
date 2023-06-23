import { Box, Button, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Food = () => {
    const navigate = useNavigate();

    const [foodList, setFoodList] = useState([]);

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
    }, [])

    const printFoodList = () => {
        return foodList.map((food, index) => {
            const formatter = new Intl.NumberFormat('id', {
                style: 'currency',
                currency: 'IDR',
            });
            return (
                <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{food.name}</Td>
                    <Td>
                        <Image src={process.env.REACT_APP_BASE_URL + food.image} w={20} h={16} objectFit="cover" />
                    </Td>
                    <Td>{formatter.format(food.price)}</Td>
                    <Td>
                        <Button colorScheme="blackAlpha" onClick={() => deleteFood(food.id)}>Hapus</Button>
                    </Td>
                </Tr>
            )
        })
    }

    const deleteFood = async (index) => {
        try {
            console.log(index);
            let res = await Axios.delete(process.env.REACT_APP_BASE_URL + `/food/delete/${index}`);
            alert(res.data.message);
            foodData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box bgColor="#F8F8F8" px={24} py={8} minH="80vh">
            <Text color="gray">Tambahkan menu makanan yang ada di resto</Text>
            <Box mt={6} bgColor="white" p={8} boxShadow="base">
                <Button colorScheme="blue" onClick={() => navigate("/food/add")}>+ Tambah Menu</Button>
                <TableContainer mt={8}>
                    <Table variant="striped" colorScheme="blackAlpha">
                        <Thead bg="#DADADA">
                            <Tr>
                                <Th>#</Th>
                                <Th w={500}>Nama</Th>
                                <Th>Foto</Th>
                                <Th>Harga</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {printFoodList()}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Food