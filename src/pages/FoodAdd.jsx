import { Box, Button, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftAddon, Text, useToast } from "@chakra-ui/react";
import Axios from "axios";
import { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FoodAdd = () => {
    const toast = useToast();

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");

    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setImage(event.dataTransfer.files[0]);
    }

    const saveButton = async () => {
        try {
            let res = await Axios.post(process.env.REACT_APP_BASE_URL + "/food/add", {
                name,
                image,
                price,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast({
                title: res.data.message,
                position: 'top',
                description: "We've added new food for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => {
                    setName("");
                    setImage(null);
                    setPrice("");
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box bgColor="#F8F8F8" px={24} py={8} minH="80vh">
            <Box bgColor="white" p={8} boxShadow="base">
                <Text color="#00ACEE" fontWeight="500">Tambahkan Menu</Text>
                <FormControl mt={6}>
                    <FormLabel>Nama Menu</FormLabel>
                    <Input value={name} onChange={(event) => setName(event.target.value)} />
                </FormControl>
                <FormControl mt={6}>
                    <FormLabel>Gambar</FormLabel>
                    {!image ? (
                        <Box
                            bgColor="#F8F8F8"
                            py={12}
                            border="1px"
                            borderColor="gray.200"
                            borderRadius={6}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current.click()}
                            cursor="pointer"
                        >
                            <Flex flexDirection="column" alignItems="center">
                                <Icon as={AiOutlineCloudUpload} color="gray" boxSize={12} />
                                <Text color="gray" fontSize="sm">drag and drop a file here or click</Text>
                            </Flex>
                            <Input
                                type="file"
                                onChange={(event) => setImage(event.target.files[0])}
                                hidden
                                ref={inputRef}
                            />
                        </Box>
                    )
                        :
                        (
                            <Box
                                bgColor="#F8F8F8"
                                p={6}
                                border="1px"
                                borderColor="gray.200"
                                borderRadius={6}
                            >
                                <Flex alignItems="center" gap={4}>
                                    <Text color="gray">{image.name}</Text>
                                    <Button onClick={() => setImage(null)} colorScheme="blackAlpha">Hapus</Button>
                                </Flex>
                            </Box>
                        )}
                </FormControl>
                <FormControl mt={6}>
                    <FormLabel>Harga</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children="Rp." bgColor="#00ACEE" color="white" />
                        <Input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                    </InputGroup>
                </FormControl>
                <Flex mt={6} justifyContent="flex-end">
                    <Button colorScheme="green" onClick={saveButton}>Simpan</Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default FoodAdd